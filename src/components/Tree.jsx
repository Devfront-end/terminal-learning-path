import { useState, useMemo } from 'react';

// ── Parser ────────────────────────────────────────────────────────────────────

function parseTree(text) {
  const lines = text.split('\n');
  const nodes = [];
  const pathStack = []; // { name, depth }

  for (const raw of lines) {
    if (!raw.trim()) continue;

    // Root line (no tree chars)
    const treeMatch = raw.match(/^((?:[│\s]   )*)[├└]── (.+)$/u);
    if (!treeMatch) {
      const name = raw.trim().replace(/\/$/, '');
      if (name) {
        pathStack.length = 0;
        pathStack.push({ name, depth: 0 });
        nodes.push({ name: raw.trim(), depth: 0, path: name, isDir: raw.trim().endsWith('/') });
      }
      continue;
    }

    const indent = treeMatch[1];
    const name = treeMatch[2].trim();
    const depth = Math.round(indent.length / 4) + 1;

    while (pathStack.length > depth) pathStack.pop();

    const cleanName = name.endsWith('/') ? name.slice(0, -1) : name;
    const path = pathStack.map(p => p.name).join('/') + '/' + cleanName;

    nodes.push({ name, depth, path, isDir: name.endsWith('/') });

    if (name.endsWith('/')) {
      pathStack.push({ name: cleanName, depth });
    }
  }

  return nodes;
}

// ── Exemple par défaut ────────────────────────────────────────────────────────

const DEFAULT_TREE = `my_project/
├── app/
│   ├── Controller/
│   │   ├── AppController.php
│   │   └── UsersController.php
│   └── Model/
│       ├── User.php
│       └── Budget.php
├── config/
│   ├── database.php
│   └── routes.php
├── logs/
│   ├── error.log
│   └── debug.log
└── webroot/
    └── index.php`;

// ── Composant ─────────────────────────────────────────────────────────────────

export default function Tree() {
  const [raw, setRaw] = useState(DEFAULT_TREE);
  const [input, setInput] = useState(DEFAULT_TREE);
  const [selected, setSelected] = useState(null);
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);

  const nodes = useMemo(() => parseTree(raw), [raw]);

  const apply = () => { setRaw(input); setSelected(null); setEditing(false); };

  const copy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="px-6 py-3 border-b border-cyan-900/20 bg-gray-950/30 flex items-center gap-3">
        <span className="text-xs text-gray-500">Colle ton arborescence :</span>
        <button
          onClick={() => setEditing(e => !e)}
          className="px-3 py-1 bg-gray-800/60 border border-gray-700/40 text-gray-300 rounded text-xs hover:bg-gray-700/60 cursor-pointer"
        >
          {editing ? 'Annuler' : '✏️ Modifier'}
        </button>
        {editing && (
          <button
            onClick={apply}
            className="px-3 py-1 bg-cyan-700/30 border border-cyan-600/40 text-cyan-300 rounded text-xs hover:bg-cyan-700/50 cursor-pointer"
          >
            ✓ Appliquer
          </button>
        )}
      </div>

      {editing ? (
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 bg-gray-950/80 text-green-300 text-xs font-mono p-4 outline-none resize-none border-b border-cyan-900/20"
          placeholder="Colle ici le résultat de `tree` ou n'importe quelle arborescence..."
          spellCheck={false}
        />
      ) : (
        <div className="flex-1 overflow-hidden flex">
          {/* Tree */}
          <div className="flex-1 overflow-y-auto p-4 font-mono border-r border-cyan-900/20">
            {nodes.map((node, i) => (
              <div
                key={i}
                onClick={() => setSelected(node)}
                className={`flex items-center gap-1 py-0.5 px-1 rounded cursor-pointer hover:bg-gray-800/40 ${selected?.path === node.path ? 'bg-cyan-900/30 border border-cyan-700/40' : ''}`}
                style={{ paddingLeft: `${node.depth * 16 + 4}px` }}
              >
                <span className="text-xs">{node.isDir ? '📁' : '📄'}</span>
                <span className={`text-xs ml-1 ${node.isDir ? 'text-blue-300' : 'text-gray-300'}`}>
                  {node.name}
                </span>
              </div>
            ))}
          </div>

          {/* Panneau chemin */}
          <div className="w-72 flex-shrink-0 overflow-y-auto p-4 space-y-4">
            {selected ? (
              <>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Chemin complet</div>
                  <div className="bg-gray-900/60 border border-cyan-900/30 rounded px-3 py-2 font-mono text-green-300 text-xs break-all">
                    {selected.path}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-gray-500">Commandes</div>
                  {selected.isDir && (
                    <CmdLine label="cd" cmd={`cd ${selected.path}`} onCopy={copy} />
                  )}
                  <CmdLine label="find" cmd={`find ${selected.path}`} onCopy={copy} />
                  {!selected.isDir && (
                    <CmdLine label="grep" cmd={`grep -n "" ${selected.path}`} onCopy={copy} />
                  )}
                  {selected.isDir && (
                    <CmdLine label="ls" cmd={`ls ${selected.path}`} onCopy={copy} />
                  )}
                </div>

                {copied && (
                  <div className="text-xs text-green-400">✓ Copié !</div>
                )}
              </>
            ) : (
              <div className="text-xs text-gray-600">Clique sur un fichier ou dossier pour voir son chemin.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CmdLine({ label, cmd, onCopy }) {
  return (
    <div
      onClick={() => onCopy(cmd)}
      className="flex items-center gap-2 bg-gray-900/40 border border-gray-800/40 rounded px-3 py-2 cursor-pointer hover:border-cyan-700/40 group"
    >
      <span className="text-cyan-500 text-xs font-semibold w-8 shrink-0">{label}</span>
      <span className="font-mono text-green-300 text-xs flex-1 break-all">{cmd}</span>
      <span className="text-gray-600 text-xs group-hover:text-gray-400">📋</span>
    </div>
  );
}
