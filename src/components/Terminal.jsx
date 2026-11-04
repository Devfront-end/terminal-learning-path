import { useRef, useEffect, useState, useCallback } from 'react';
import { vfs } from '../data/vfs.js';
import CommandWizard, { detectWizard } from './CommandWizard.jsx';
import { cdRows, findRows, grepRows, gitRows, fileRows, sysRows, permRows } from '../data/reference.js';

// ── Lookup définition depuis le texte sélectionné ─────────────────────────

const ALL_ROWS = [...cdRows, ...findRows, ...grepRows, ...gitRows, ...fileRows, ...sysRows, ...permRows];

function lookupDefinition(text) {
  const t = text.trim();
  if (t.length < 2) return null;
  // 1. Correspondance exacte
  let match = ALL_ROWS.find(r => r.cmd === t);
  // 2. La sélection commence par la commande connue (ex: "cd ~/docs" → "cd ~")
  if (!match) match = ALL_ROWS.find(r => t.startsWith(r.cmd));
  // 3. La commande commence par la sélection (ex: sélection "cd" → première ligne cd)
  if (!match) match = ALL_ROWS.find(r => r.cmd.startsWith(t));
  return match || null;
}

// ── Logique d'autocomplétion ───────────────────────────────────────────────

function resolvePath(partial, currentDir) {
  if (partial.startsWith('/')) return partial;
  if (partial.startsWith('~/') || partial === '~') return '/home/john_doe' + partial.slice(1);
  return currentDir + '/' + partial;
}

function normalizePath(p) {
  const parts = p.split('/').filter(Boolean);
  const resolved = [];
  for (const part of parts) {
    if (part === '..') resolved.pop();
    else if (part !== '.') resolved.push(part);
  }
  return '/' + resolved.join('/');
}

function getSuggestions(input, currentDir) {
  const trimmed = input.trimStart();

  // Suggestions de commandes (début de ligne)
  if (!/\s/.test(trimmed) && trimmed.length > 0) {
    const cmds = ['cat', 'cd', 'chmod', 'chown', 'clear', 'df', 'du', 'find', 'grep', 'head', 'less', 'ls', 'man', 'ps', 'pwd', 'tail', 'tree', 'whoami'];
    return cmds
      .filter(c => c.startsWith(trimmed))
      .map(c => ({ label: c, completion: c, desc: '' }));
  }

  // cd / ls → suggestions de chemins
  const cdMatch = trimmed.match(/^(cd|ls)\s+(.*)$/);
  if (cdMatch) {
    const partial = cdMatch[2];
    const dirsOnly = cdMatch[1] === 'cd';
    return getPathSuggestions(partial, currentDir, dirsOnly).map(s => ({
      label: s.label,
      completion: cdMatch[1] + ' ' + s.full,
      desc: s.desc,
    }));
  }

  // find → suggestions de chemins
  const findMatch = trimmed.match(/^find\s+([^\s]*)$/);
  if (findMatch) {
    return getPathSuggestions(findMatch[1], currentDir, false).map(s => ({
      label: s.label,
      completion: 'find ' + s.full,
      desc: s.desc,
    }));
  }

  // git → sous-commandes
  if (trimmed === 'git' || trimmed.match(/^git\s+[^\s]*$/)) {
    const partial = trimmed.slice(4).trim();
    const gitCmds = [
      { sub: 'branch --list', desc: 'Lister les branches' },
      { sub: 'branch -d', desc: 'Supprimer une branche (sécurisé)' },
      { sub: 'branch -D', desc: 'Forcer la suppression' },
      { sub: 'log --oneline -5', desc: 'Historique récent' },
      { sub: 'log --oneline --all --graph', desc: 'Vue arborescente' },
      { sub: 'merge', desc: 'Fusionner une branche' },
      { sub: 'checkout main', desc: 'Aller sur main' },
      { sub: 'add .gitignore', desc: 'Indexer .gitignore' },
      { sub: 'commit -m', desc: 'Créer un commit' },
      { sub: 'commit --allow-empty -m', desc: 'Commit de documentation' },
      { sub: 'push origin main', desc: 'Publier sur remote' },
      { sub: 'status', desc: 'État du dépôt' },
      { sub: 'diff', desc: 'Voir les modifications' },
    ];
    return gitCmds
      .filter(g => g.sub.startsWith(partial))
      .map(g => ({ label: 'git ' + g.sub, completion: 'git ' + g.sub, desc: g.desc }));
  }

  return [];
}

function getPathSuggestions(partial, currentDir, dirsOnly) {
  let dir, prefix;

  if (partial.includes('/')) {
    const lastSlash = partial.lastIndexOf('/');
    const dirPart = partial.slice(0, lastSlash) || '/';
    prefix = partial.slice(lastSlash + 1);
    dir = normalizePath(resolvePath(dirPart, currentDir));
  } else {
    dir = currentDir;
    prefix = partial;
  }

  const items = vfs[dir] || [];
  return items
    .filter(item => {
      if (dirsOnly && !item.endsWith('/')) return false;
      return item.toLowerCase().startsWith(prefix.toLowerCase());
    })
    .map(item => {
      const full = partial.includes('/')
        ? partial.slice(0, partial.lastIndexOf('/') + 1) + item
        : item;
      return {
        label: item,
        full: full.endsWith('/') ? full.slice(0, -1) : full,
        desc: item.endsWith('/') ? 'dossier' : 'fichier',
      };
    });
}

// ── Composant Terminal ─────────────────────────────────────────────────────

export default function Terminal({ output, history, command, setCommand, historyIndex, setHistoryIndex, feedback, feedbackType, hint, currentDir, onExecute }) {
  const inputRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [activeWizard, setActiveWizard] = useState(null);
  const [defPopup, setDefPopup] = useState(null); // { row, x, y }

  const handleOutputMouseUp = useCallback((e) => {
    const selected = window.getSelection()?.toString();
    if (!selected || selected.trim().length < 2) { setDefPopup(null); return; }
    const row = lookupDefinition(selected);
    if (row) setDefPopup({ row, x: e.clientX, y: e.clientY });
    else setDefPopup(null);
  }, []);

  useEffect(() => { if (inputRef.current) inputRef.current.focus(); }, []);

  // Recalcule les suggestions / wizard à chaque frappe
  const handleChange = useCallback((e) => {
    const val = e.target.value;
    setCommand(val);
    const wizard = detectWizard(val);
    if (wizard) {
      setActiveWizard(wizard);
      setSuggestions([]);
    } else {
      setActiveWizard(null);
      setSuggestions(getSuggestions(val, currentDir));
    }
    setSelectedIdx(-1);
  }, [currentDir, setCommand]);

  const closeSuggestions = () => { setSuggestions([]); setSelectedIdx(-1); };
  const closeWizard = () => { setActiveWizard(null); inputRef.current?.focus(); };

  const applyWizardCommand = (cmd) => {
    setCommand(cmd);
    setActiveWizard(null);
    inputRef.current?.focus();
  };

  const applySuggestion = (s) => {
    setCommand(s.completion);
    closeSuggestions();
    inputRef.current?.focus();
  };

  const feedbackClass = feedbackType === 'success'
    ? 'bg-green-950/30 text-green-300 border-green-900/30'
    : feedbackType === 'error'
    ? 'bg-red-950/30 text-red-300 border-red-900/30'
    : 'bg-blue-950/30 text-blue-300 border-blue-900/30';

  const handleKeyDown = (e) => {
    // Navigation dans la popup
    if (suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIdx(i => Math.min(i + 1, suggestions.length - 1));
        return;
      }
      if (e.key === 'ArrowUp' && selectedIdx >= 0) {
        e.preventDefault();
        setSelectedIdx(i => i - 1);
        return;
      }
      if (e.key === 'Tab' || e.key === 'Enter' && selectedIdx >= 0) {
        e.preventDefault();
        const target = selectedIdx >= 0 ? suggestions[selectedIdx] : suggestions[0];
        applySuggestion(target);
        return;
      }
      if (e.key === 'Escape') { e.preventDefault(); closeSuggestions(); return; }
    }

    // Comportement normal
    if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length === 1) applySuggestion(suggestions[0]);
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      closeSuggestions();
      if (command.trim()) { onExecute(command); setCommand(''); setHistoryIndex(-1); }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, history.length - 1);
      if (newIndex >= 0) { setHistoryIndex(newIndex); setCommand(history[history.length - 1 - newIndex].cmd); }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = historyIndex - 1;
      if (newIndex >= 0) { setHistoryIndex(newIndex); setCommand(history[history.length - 1 - newIndex].cmd); }
      else { setHistoryIndex(-1); setCommand(''); }
    }
  };

  const lastCmd = history.length > 0 ? history[history.length - 1].cmd : '';

  // Affichage du prompt
  const HOME = '/home/john_doe';
  const promptDisplay = currentDir === HOME
    ? '~'
    : currentDir.startsWith(HOME + '/')
    ? '~' + currentDir.slice(HOME.length)
    : currentDir;

  return (
    <div className="flex-1 flex flex-col overflow-hidden" onMouseDown={() => setDefPopup(null)}>
      {/* Popup définition */}
      {defPopup && (
        <div
          onMouseDown={(e) => e.stopPropagation()}
          style={{ position: 'fixed', top: defPopup.y + 12, left: defPopup.x, zIndex: 50, maxWidth: 340 }}
          className="bg-gray-900 border border-gray-700 rounded-lg shadow-2xl p-3 text-xs"
        >
          <div className="flex items-start justify-between gap-3 mb-1">
            <code className="text-encre-300 font-mono font-semibold">{defPopup.row.cmd}</code>
            <button onClick={() => setDefPopup(null)} className="text-gray-500 hover:text-gray-300 leading-none">✕</button>
          </div>
          <p className="text-gray-200 mb-1">{defPopup.row.desc}</p>
          {defPopup.row.example && (
            <div className="text-gray-500 font-mono bg-gray-900 rounded px-2 py-1 mt-1">
              <span className="text-green-400">ex:</span> {defPopup.row.example}
            </div>
          )}
          {defPopup.row.note && (
            <p className="text-yellow-600/80 mt-1 italic">{defPopup.row.note}</p>
          )}
        </div>
      )}

      {/* Sortie */}
      <div onMouseUp={handleOutputMouseUp} className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-900 border-b border-gray-700 font-mono">
        {output ? (
          <div className="space-y-2">
            <div className="text-gray-600 text-xs">
              <span className="text-encre-400">john_doe@path</span>
              <span className="text-gray-500">:</span>
              <span className="text-blue-400">{promptDisplay}</span>
              <span className="text-gray-500">$</span>{' '}
              <span className="text-green-300">{lastCmd}</span>
            </div>
            <div className="text-gray-300 bg-gray-900 p-3 rounded border border-gray-700 text-xs whitespace-pre-wrap break-words font-mono">
              {output}
            </div>
          </div>
        ) : (
          <div className="text-gray-600 text-xs">Tapez une commande ou appuyez sur <kbd className="bg-gray-800 px-1 rounded">Tab</kbd> pour l'autocomplétion...</div>
        )}
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`${feedbackClass} px-6 py-2 border-b border-gray-700 flex items-center gap-2 text-xs`}>
          {feedback}
        </div>
      )}

      {/* Panneau de guidage contextuel */}
      {hint?.type === 'natural_language' && (
        <div className="px-6 py-3 bg-indigo-950/40 border-b border-indigo-800/30 text-xs space-y-3">
          <p className="text-indigo-300 font-semibold">
            Résultats pour : <span className="text-white">{hint.keywords.join(', ')}</span>
          </p>
          {hint.dirs.length > 0 && (
            <div>
              <p className="text-gray-400 mb-1">📁 Dossiers trouvés :</p>
              <div className="space-y-1">
                {hint.dirs.map(d => (
                  <div key={d} className="flex items-center gap-3">
                    <span className="text-gray-500 font-mono truncate flex-1">{d}</span>
                    <button
                      onMouseDown={(e) => { e.preventDefault(); setCommand('cd ' + d); inputRef.current?.focus(); }}
                      className="text-encre-300 font-mono bg-gray-900/60 border border-encre-900/40 px-2 py-0.5 rounded hover:bg-encre-900/30 cursor-pointer whitespace-nowrap"
                    >
                      cd
                    </button>
                    <button
                      onMouseDown={(e) => { e.preventDefault(); setCommand('ls ' + d); inputRef.current?.focus(); }}
                      className="text-blue-300 font-mono bg-gray-900/60 border border-blue-900/40 px-2 py-0.5 rounded hover:bg-blue-900/30 cursor-pointer whitespace-nowrap"
                    >
                      ls
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {hint.files.length > 0 && (
            <div>
              <p className="text-gray-400 mb-1">📄 Fichiers trouvés :</p>
              <div className="space-y-1">
                {hint.files.map(f => {
                  const basename = f.split('/').pop();
                  return (
                    <div key={f} className="flex items-center gap-3">
                      <span className="text-gray-500 font-mono truncate flex-1">{f}</span>
                      <button
                        onMouseDown={(e) => { e.preventDefault(); setCommand('cat ' + basename); inputRef.current?.focus(); }}
                        className="text-green-300 font-mono bg-gray-900/60 border border-green-900/40 px-2 py-0.5 rounded hover:bg-green-900/30 cursor-pointer whitespace-nowrap"
                      >
                        cat
                      </button>
                      <button
                        onMouseDown={(e) => { e.preventDefault(); setCommand('find . -name "' + basename + '"'); inputRef.current?.focus(); }}
                        className="text-yellow-300 font-mono bg-gray-900/60 border border-yellow-900/40 px-2 py-0.5 rounded hover:bg-yellow-900/30 cursor-pointer whitespace-nowrap"
                      >
                        find
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
      {hint?.type === 'bad_prefix' && (
        <div className="px-6 py-3 bg-yellow-950/30 border-b border-yellow-800/30 text-xs space-y-2">
          <p className="text-yellow-400 font-semibold">
            <code className="bg-gray-900 px-1 rounded">{hint.prefix}</code> n'est pas une commande — il a probablement été copié-collé par erreur depuis un terminal.
          </p>
          <p className="text-gray-300">
            Vouliez-vous dire{' '}
            <button
              onMouseDown={(e) => { e.preventDefault(); setCommand(hint.corrected); inputRef.current?.focus(); }}
              className="text-encre-300 font-mono underline underline-offset-2 cursor-pointer hover:text-encre-200"
            >
              {hint.corrected}
            </button>{' '}?
          </p>
          <p className="text-gray-500">En bash, <code className="bg-gray-900 px-1 rounded">:</code> et <code className="bg-gray-900 px-1 rounded">$</code> ont un rôle spécial. Tape la commande directement sans préfixe.</p>
        </div>
      )}
      {hint?.type === 'cd_not_found' && (
        <div className="px-6 py-3 bg-yellow-950/30 border-b border-yellow-800/30 text-xs space-y-2">
          <p className="text-yellow-400 font-semibold">
            Guide : le dossier <code className="bg-gray-900 px-1 rounded">{ hint.attempted }</code> n'existe pas dans <span className="text-encre-400">{ hint.currentDir }</span>
          </p>
          {hint.closest && (
            <p className="text-gray-300">
              Vouliez-vous dire{' '}
              <button
                onMouseDown={(e) => { e.preventDefault(); setCommand('cd ' + hint.closest); inputRef.current?.focus(); }}
                className="text-encre-300 font-mono underline underline-offset-2 cursor-pointer hover:text-encre-200"
              >
                cd {hint.closest}
              </button>{' '}?
            </p>
          )}
          {hint.availableDirs.length > 0 && (
            <div>
              <p className="text-gray-400 mb-1">Dossiers disponibles ici :</p>
              <div className="flex flex-wrap gap-2">
                {hint.availableDirs.map(d => {
                  const name = d.replace('/', '');
                  return (
                    <button
                      key={d}
                      onMouseDown={(e) => { e.preventDefault(); setCommand('cd ' + name); inputRef.current?.focus(); }}
                      className="font-mono text-blue-300 bg-gray-900/60 border border-blue-900/40 px-2 py-0.5 rounded hover:bg-blue-900/30 cursor-pointer"
                    >
                      📁 {name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          <p className="text-gray-500">Astuce : tape <code className="bg-gray-900 px-1 rounded">ls</code> pour voir le contenu du répertoire courant, puis clique sur un dossier ci-dessus.</p>
        </div>
      )}

      {/* Zone de saisie */}
      <div className="relative px-6 py-4 bg-gray-950/40 border-t border-gray-700">
        {/* Wizard guidé */}
        {activeWizard && (
          <CommandWizard
            cmd={activeWizard}
            currentDir={currentDir}
            onApply={applyWizardCommand}
            onClose={closeWizard}
          />
        )}
        {/* Popup suggestions */}
        {!activeWizard && suggestions.length > 0 && (
          <div className="absolute bottom-full left-6 right-6 mb-1 bg-gray-900 border border-gray-700 rounded shadow-xl z-10 overflow-hidden">
            <div className="px-3 py-1 text-xs text-gray-500 border-b border-gray-800 flex justify-between">
              <span>Suggestions <kbd className="bg-gray-800 px-1 rounded">↑↓</kbd> naviguer · <kbd className="bg-gray-800 px-1 rounded">Tab</kbd> compléter · <kbd className="bg-gray-800 px-1 rounded">Échap</kbd> fermer</span>
              <span>{suggestions.length} résultat{suggestions.length > 1 ? 's' : ''}</span>
            </div>
            <ul className="max-h-48 overflow-y-auto">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  onMouseDown={(e) => { e.preventDefault(); applySuggestion(s); }}
                  className={`flex items-center justify-between px-3 py-2 cursor-pointer text-xs ${i === selectedIdx ? 'bg-gray-800 text-encre-300' : 'hover:bg-gray-800 text-gray-300'}`}
                >
                  <span className="font-mono">
                    {s.label.endsWith('/') || s.desc === 'dossier'
                      ? <span className="text-blue-400">📁 {s.label}</span>
                      : <span className="text-green-300">📄 {s.label}</span>
                    }
                  </span>
                  {s.desc && <span className="text-gray-500 ml-4">{s.desc}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Input */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 font-mono whitespace-nowrap">
            <span className="text-encre-400">john_doe</span>
            <span className="text-gray-600">:</span>
            <span className="text-blue-400">{promptDisplay}</span>
            <span className="text-gray-400"> $</span>
          </span>
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={() => setTimeout(closeSuggestions, 150)}
            placeholder="pwd, ls, cd, find, grep, git, man, clear…"
            className="flex-1 bg-transparent text-green-300 outline-none placeholder-gray-600 terminal-input text-sm font-mono"
          />
          <button
            onMouseDown={(e) => { e.preventDefault(); closeSuggestions(); if (command.trim()) { onExecute(command); setCommand(''); setHistoryIndex(-1); } }}
            className="p-2 text-encre-400 hover:text-encre-300 cursor-pointer"
          >▶</button>
        </div>
      </div>
    </div>
  );
}
