import { useState } from 'react';
import { findRows, grepRows, gitRows, cdRows } from '../data/reference.js';
import { vfs } from '../data/vfs.js';

// ── Définitions des wizards (construits depuis reference.js) ───────────────

const GREP_OPTIONS = [
  { flag: 'n', label: '-n', desc: 'Numéros de lignes', note: grepRows.find(r => r.cmd === 'grep -n "pattern"')?.note },
  { flag: 'i', label: '-i', desc: 'Insensible à la casse', note: grepRows.find(r => r.cmd === 'grep -i "pattern"')?.note },
  { flag: 'r', label: '-r', desc: 'Récursif (sous-dossiers)', note: grepRows.find(r => r.cmd === 'grep -r "pattern" .')?.note },
  { flag: 'l', label: '-l', desc: 'Noms de fichiers seulement', note: grepRows.find(r => r.cmd === 'grep -l "pattern"')?.note },
  { flag: 'c', label: '-c', desc: 'Compter les occurrences', note: grepRows.find(r => r.cmd === 'grep -c "pattern"')?.note },
  { flag: 'v', label: '-v', desc: 'Inverser (exclure le pattern)', note: grepRows.find(r => r.cmd === 'grep -v "pattern"')?.note },
  { flag: 'E', label: '-E', desc: 'Regex étendu', note: grepRows.find(r => r.cmd === 'grep -E "regex"')?.note },
];

const FIND_TYPES = [
  { value: 'f', label: '-type f', desc: findRows.find(r => r.cmd === '-type f')?.desc, note: findRows.find(r => r.cmd === '-type f')?.note },
  { value: 'd', label: '-type d', desc: findRows.find(r => r.cmd === '-type d')?.desc, note: findRows.find(r => r.cmd === '-type d')?.note },
  { value: '', label: 'Les deux', desc: 'Fichiers et dossiers sans filtre', note: '' },
];

const FIND_EXTRAS = [
  { flag: '-mtime -7', label: '-mtime -7', desc: findRows.find(r => r.cmd === '-mtime -7')?.desc, note: findRows.find(r => r.cmd === '-mtime -7')?.note },
  { flag: '-mmin -30', label: '-mmin -30', desc: findRows.find(r => r.cmd === '-mmin -30')?.desc, note: findRows.find(r => r.cmd === '-mmin -30')?.note },
  { flag: '-size +1M', label: '-size +1M', desc: 'Cherche fichiers de plus de 1 MB', note: findRows.find(r => r.cmd === '-size +5M')?.note },
  { flag: '| wc -l', label: '| wc -l', desc: 'Compter le nombre de résultats', note: 'Pipe vers wc -l pour avoir le total' },
];

const GIT_SUBCOMMANDS = gitRows.map(r => ({
  sub: r.cmd.replace('git ', ''),
  desc: r.desc,
  note: r.note,
  example: r.example,
}));

// Suggestions de dossiers du VFS
function getDirSuggestions(currentDir) {
  const items = vfs[currentDir] || [];
  const dirs = items.filter(i => i.endsWith('/')).map(i => i.slice(0, -1));
  return [...dirs, '/home/john_doe/projets/my_project', '/var/log'];
}

// ── Sous-composants UI ─────────────────────────────────────────────────────

function StepHeader({ step, total, label }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-xs text-gray-500">Étape {step}/{total}</span>
      <div className="flex-1 h-px bg-gray-800" />
      <span className="text-xs font-mono text-cyan-400">{label}</span>
    </div>
  );
}

function Question({ text, hint, ref_note }) {
  return (
    <div className="mb-3">
      <p className="text-sm text-white font-semibold mb-1">{text}</p>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
      {ref_note && <p className="text-xs text-cyan-500/70 italic mt-1">📖 {ref_note}</p>}
    </div>
  );
}

function ToggleOption({ flag, label, desc, note, selected, onToggle }) {
  return (
    <button
      onClick={() => onToggle(flag)}
      className={`flex items-start gap-2 w-full text-left p-2 rounded border text-xs transition-all ${selected ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300' : 'border-gray-700 bg-gray-900/30 text-gray-400 hover:border-gray-500'}`}
    >
      <span className={`mt-0.5 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center text-xs ${selected ? 'border-cyan-500 bg-cyan-500 text-black' : 'border-gray-600'}`}>
        {selected ? '✓' : ''}
      </span>
      <span>
        <span className="font-mono font-bold mr-2">{label}</span>
        <span>{desc}</span>
        {note && <span className="block text-gray-500 text-xs mt-0.5">{note}</span>}
      </span>
    </button>
  );
}

function ChoiceOption({ value, label, desc, note, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(value)}
      className={`flex items-start gap-2 w-full text-left p-2 rounded border text-xs transition-all ${selected ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300' : 'border-gray-700 bg-gray-900/30 text-gray-400 hover:border-gray-500'}`}
    >
      <span className={`mt-0.5 w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center ${selected ? 'border-cyan-500 bg-cyan-500' : 'border-gray-600'}`}>
        {selected && <span className="w-2 h-2 rounded-full bg-black block" />}
      </span>
      <span>
        <span className="font-mono font-bold mr-2">{label}</span>
        <span>{desc}</span>
        {note && <span className="block text-gray-500 text-xs mt-0.5">{note}</span>}
      </span>
    </button>
  );
}

function Preview({ command }) {
  return (
    <div className="mt-3 p-2 bg-gray-950 border border-cyan-900/40 rounded">
      <span className="text-gray-500 text-xs">Commande générée : </span>
      <span className="font-mono text-green-300 text-xs">{command}</span>
    </div>
  );
}

// ── Wizard grep ────────────────────────────────────────────────────────────

function GrepWizard({ onApply }) {
  const [step, setStep] = useState(0);
  const [pattern, setPattern] = useState('');
  const [path, setPath] = useState('.');
  const [options, setOptions] = useState([]);

  const toggleOpt = (flag) => setOptions(o => o.includes(flag) ? o.filter(f => f !== flag) : [...o, flag]);

  const buildCmd = () => {
    const flags = options.length ? `-${options.join('')} ` : '';
    return `grep ${flags}"${pattern || 'pattern'}" ${path}`;
  };

  const steps = ['pattern', 'path', 'options'];
  const total = steps.length;

  return (
    <div className="p-4 space-y-3">
      <StepHeader step={step + 1} total={total} label="grep" />

      {step === 0 && (
        <>
          <Question
            text="Quel texte chercher ?"
            hint="Le mot, la fonction, ou l'expression à trouver dans les fichiers"
            ref_note={grepRows[0]?.note}
          />
          <input
            autoFocus
            value={pattern}
            onChange={e => setPattern(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && pattern && setStep(1)}
            placeholder="ex: validateField, error, function login..."
            className="w-full bg-gray-950 border border-gray-700 rounded px-3 py-2 text-green-300 font-mono text-sm outline-none focus:border-cyan-600 placeholder-gray-600"
          />
          <p className="text-xs text-gray-500">Exemples tirés de vos cas d'usage :</p>
          <div className="flex flex-wrap gap-1">
            {['validateField', 'error', 'function', '$result', 'TODO', 'Exception'].map(ex => (
              <button key={ex} onClick={() => { setPattern(ex); setStep(1); }}
                className="px-2 py-1 text-xs bg-gray-800 text-yellow-300 rounded hover:bg-gray-700 font-mono">
                {ex}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <Question
            text="Où chercher ?"
            hint=". = répertoire courant · *.php = tous les fichiers PHP · chemin absolu ou relatif"
            ref_note="r = recursive — cherche dans tous les sous-dossiers"
          />
          <input
            autoFocus
            value={path}
            onChange={e => setPath(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && setStep(2)}
            placeholder="ex: . ou *.php ou /home/john_doe/projets/my_project"
            className="w-full bg-gray-950 border border-gray-700 rounded px-3 py-2 text-green-300 font-mono text-sm outline-none focus:border-cyan-600 placeholder-gray-600"
          />
          <div className="flex flex-wrap gap-1">
            {['.', '*.php', '*.log', 'app/Model/Budget.php', 'logs/error.log', '/var/log'].map(ex => (
              <button key={ex} onClick={() => { setPath(ex); setStep(2); }}
                className="px-2 py-1 text-xs bg-gray-800 text-blue-300 rounded hover:bg-gray-700 font-mono">
                {ex}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <Question
            text="Options à activer ?"
            hint="Sélectionnez zéro ou plusieurs options · depuis l'onglet Référence → grep"
          />
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {GREP_OPTIONS.map(o => (
              <ToggleOption key={o.flag} {...o} selected={options.includes(o.flag)} onToggle={toggleOpt} />
            ))}
          </div>
        </>
      )}

      <Preview command={buildCmd()} />

      <div className="flex gap-2 pt-1">
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)}
            className="px-3 py-1.5 text-xs border border-gray-700 text-gray-400 rounded hover:border-gray-500">
            ← Retour
          </button>
        )}
        {step < total - 1 ? (
          <button onClick={() => setStep(s => s + 1)}
            disabled={step === 0 && !pattern}
            className="flex-1 px-3 py-1.5 text-xs bg-cyan-900/40 border border-cyan-700 text-cyan-300 rounded hover:bg-cyan-900/60 disabled:opacity-40">
            Suivant →
          </button>
        ) : (
          <button onClick={() => onApply(buildCmd())}
            className="flex-1 px-3 py-1.5 text-xs bg-green-900/40 border border-green-700 text-green-300 rounded hover:bg-green-900/60 font-semibold">
            ✓ Insérer la commande
          </button>
        )}
      </div>
    </div>
  );
}

// ── Wizard find ────────────────────────────────────────────────────────────

function FindWizard({ currentDir, onApply }) {
  const [step, setStep] = useState(0);
  const [path, setPath] = useState('.');
  const [typeVal, setTypeVal] = useState('f');
  const [name, setName] = useState('');
  const [extras, setExtras] = useState([]);

  const toggleExtra = (flag) => setExtras(o => o.includes(flag) ? o.filter(f => f !== flag) : [...o, flag]);

  const buildCmd = () => {
    const parts = ['find', path];
    if (typeVal) parts.push(`-type ${typeVal}`);
    if (name) parts.push(`-name "${name}"`);
    const pipeExtras = extras.filter(e => e.startsWith('|'));
    const flagExtras = extras.filter(e => !e.startsWith('|'));
    parts.push(...flagExtras);
    const cmd = parts.join(' ');
    return pipeExtras.length ? cmd + ' ' + pipeExtras.join(' ') : cmd;
  };

  const dirSuggestions = getDirSuggestions(currentDir);
  const total = 4;

  return (
    <div className="p-4 space-y-3">
      <StepHeader step={step + 1} total={total} label="find" />

      {step === 0 && (
        <>
          <Question
            text="Chercher dans quel dossier ?"
            hint=". = ici (répertoire courant) · chemin absolu ou relatif"
            ref_note={findRows[1]?.note}
          />
          <input autoFocus value={path} onChange={e => setPath(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && setStep(1)}
            placeholder="ex: . ou /home/john_doe/projets/my_project"
            className="w-full bg-gray-950 border border-gray-700 rounded px-3 py-2 text-green-300 font-mono text-sm outline-none focus:border-cyan-600 placeholder-gray-600"
          />
          <div className="flex flex-wrap gap-1">
            {['.', ...dirSuggestions].map(d => (
              <button key={d} onClick={() => { setPath(d); setStep(1); }}
                className="px-2 py-1 text-xs bg-gray-800 text-blue-300 rounded hover:bg-gray-700 font-mono">
                📁 {d}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <Question text="Que chercher ?" hint="Choisissez le type d'éléments à trouver" />
          <div className="space-y-1">
            {FIND_TYPES.map(t => (
              <ChoiceOption key={t.value} value={t.value} label={t.label} desc={t.desc} note={t.note}
                selected={typeVal === t.value} onSelect={v => { setTypeVal(v); setStep(2); }} />
            ))}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <Question
            text="Filtrer par nom ? (optionnel)"
            hint="* remplace n'importe quoi · laissez vide pour tout retourner"
            ref_note={findRows[4]?.note}
          />
          <input autoFocus value={name} onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && setStep(3)}
            placeholder="ex: *.php, error.log, README*, *test*"
            className="w-full bg-gray-950 border border-gray-700 rounded px-3 py-2 text-green-300 font-mono text-sm outline-none focus:border-cyan-600 placeholder-gray-600"
          />
          <div className="flex flex-wrap gap-1">
            {['*.php', '*.log', '*.md', '*test*', 'composer.json', 'README*'].map(ex => (
              <button key={ex} onClick={() => { setName(ex); setStep(3); }}
                className="px-2 py-1 text-xs bg-gray-800 text-yellow-300 rounded hover:bg-gray-700 font-mono">
                {ex}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <Question text="Options supplémentaires ?" hint="Depuis l'onglet Référence → find" />
          <div className="space-y-1">
            {FIND_EXTRAS.map(o => (
              <ToggleOption key={o.flag} flag={o.flag} label={o.label} desc={o.desc} note={o.note}
                selected={extras.includes(o.flag)} onToggle={toggleExtra} />
            ))}
          </div>
        </>
      )}

      <Preview command={buildCmd()} />

      <div className="flex gap-2 pt-1">
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)}
            className="px-3 py-1.5 text-xs border border-gray-700 text-gray-400 rounded hover:border-gray-500">
            ← Retour
          </button>
        )}
        {step < total - 1 ? (
          <button onClick={() => setStep(s => s + 1)}
            className="flex-1 px-3 py-1.5 text-xs bg-cyan-900/40 border border-cyan-700 text-cyan-300 rounded hover:bg-cyan-900/60">
            Suivant →
          </button>
        ) : (
          <button onClick={() => onApply(buildCmd())}
            className="flex-1 px-3 py-1.5 text-xs bg-green-900/40 border border-green-700 text-green-300 rounded hover:bg-green-900/60 font-semibold">
            ✓ Insérer la commande
          </button>
        )}
      </div>
    </div>
  );
}

// ── Wizard git ─────────────────────────────────────────────────────────────

function GitWizard({ onApply }) {

  return (
    <div className="p-4 space-y-3">
      <StepHeader step={1} total={1} label="git" />
      <Question text="Quelle commande git ?" hint="Depuis l'onglet Référence → Git — commandes essentielles" />
      <div className="space-y-1 max-h-52 overflow-y-auto">
        {GIT_SUBCOMMANDS.map((g, i) => (
          <button key={i} onClick={() => onApply('git ' + g.sub)}
            className="flex items-start gap-3 w-full text-left p-2 rounded border border-gray-700 bg-gray-900/30 text-xs hover:border-cyan-700 hover:bg-cyan-950/20 transition-all">
            <span className="font-mono text-green-300 whitespace-nowrap">git {g.sub}</span>
            <span className="text-gray-400">{g.desc}</span>
            {g.note && <span className="text-gray-600 italic ml-auto">{g.note}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Wizard cd ──────────────────────────────────────────────────────────────

function CdWizard({ currentDir, onApply }) {
  const [path, setPath] = useState('');
  const dirSuggestions = getDirSuggestions(currentDir);

  return (
    <div className="p-4 space-y-3">
      <StepHeader step={1} total={1} label="cd" />
      <Question
        text="Où voulez-vous aller ?"
        hint="Chemin absolu, relatif, ~ (home), .. (parent), - (précédent)"
        ref_note={cdRows[2]?.result}
      />
      <input autoFocus value={path} onChange={e => setPath(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && onApply('cd ' + (path || '~'))}
        placeholder="ex: .. ou my_project/app ou /home/john_doe"
        className="w-full bg-gray-950 border border-gray-700 rounded px-3 py-2 text-green-300 font-mono text-sm outline-none focus:border-cyan-600 placeholder-gray-600"
      />
      <div className="flex flex-wrap gap-1">
        {['..', '~', '-', ...dirSuggestions].map(d => (
          <button key={d} onClick={() => onApply('cd ' + d)}
            className="px-2 py-1 text-xs bg-gray-800 text-blue-300 rounded hover:bg-gray-700 font-mono">
            {d.startsWith('/') || d === '..' || d === '~' || d === '-' ? d : '📁 ' + d}
          </button>
        ))}
      </div>
      <Preview command={'cd ' + (path || '~')} />
      <button onClick={() => onApply('cd ' + (path || '~'))}
        className="w-full px-3 py-1.5 text-xs bg-green-900/40 border border-green-700 text-green-300 rounded hover:bg-green-900/60 font-semibold">
        ✓ Insérer la commande
      </button>
    </div>
  );
}

// ── Export principal ───────────────────────────────────────────────────────

const WIZARD_TRIGGERS = {
  grep: { label: '🔍 Construire un grep', component: GrepWizard },
  find: { label: '🗂 Construire un find', component: FindWizard },
  git:  { label: '🌿 Choisir une commande git', component: GitWizard },
  cd:   { label: '📁 Naviguer vers un dossier', component: CdWizard },
};

export function detectWizard(input) {
  const t = input.trimStart();
  for (const [key] of Object.entries(WIZARD_TRIGGERS)) {
    if (t === key || t === key + ' ') return key;
  }
  return null;
}

export default function CommandWizard({ cmd, currentDir, onApply, onClose }) {
  const def = WIZARD_TRIGGERS[cmd];
  if (!def) return null;
  const Wizard = def.component;

  return (
    <div className="absolute bottom-full left-0 right-0 mb-1 bg-gray-900 border border-cyan-800/60 rounded-t shadow-2xl z-20 max-h-[420px] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-gray-950/60 sticky top-0">
        <span className="text-xs font-semibold text-cyan-400">{def.label}</span>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Référence → onglet 📖</span>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300 ml-2">✕</button>
        </div>
      </div>
      <Wizard currentDir={currentDir} onApply={onApply} onClose={onClose} />
    </div>
  );
}
