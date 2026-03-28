import { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';

const LANGS = [
  { id: 'javascript', label: 'JavaScript', color: 'text-yellow-400' },
  { id: 'php',        label: 'PHP',        color: 'text-indigo-400' },
  { id: 'python',     label: 'Python',     color: 'text-green-400' },
  { id: 'html',       label: 'HTML',       color: 'text-orange-400' },
  { id: 'css',        label: 'CSS',        color: 'text-blue-400' },
];

const DEFAULTS = {
  javascript: `// JavaScript
const nombres = [1, 2, 3, 4, 5];
const doubles = nombres.map(x => x * 2);
console.log(doubles);`,
  php: `<?php
$nombres = [1, 2, 3, 4, 5];
$doubles = array_map(fn($x) => $x * 2, $nombres);
print_r($doubles);`,
  python: `# Python
nombres = [1, 2, 3, 4, 5]
doubles = [x * 2 for x in nombres]
print(doubles)`,
  html: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Ma page</title>
</head>
<body>
  <h1>Bonjour le monde</h1>
</body>
</html>`,
  css: `/* CSS */
.container {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #1a1a2e;
  border-radius: 8px;
}`,
};

export default function CodeEditor() {
  const [lang, setLang]     = useState('javascript');
  const [code, setCode]     = useState(DEFAULTS['javascript']);
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const editorRef = useRef(null);

  const changeLang = (l) => {
    setLang(l);
    setCode(DEFAULTS[l] || '');
    setOutput('');
  };

  const runJS = () => {
    setRunning(true);
    setOutput('');
    const logs = [];
    const origLog = console.log;
    const origError = console.error;
    console.log = (...args) => logs.push(args.map(a => JSON.stringify(a, null, 2)).join(' '));
    console.error = (...args) => logs.push('❌ ' + args.join(' '));
    try {
      // eslint-disable-next-line no-new-func
      new Function(code)();
      setOutput(logs.join('\n') || '(aucun output)');
    } catch (e) {
      setOutput('❌ ' + e.message);
    } finally {
      console.log = origLog;
      console.error = origError;
      setRunning(false);
    }
  };

  const canRun = lang === 'javascript';

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-1 border-b border-gray-800/60 bg-gray-950/40 px-4 shrink-0">
        {LANGS.map(l => (
          <button
            key={l.id}
            onClick={() => changeLang(l.id)}
            className={`px-4 py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-all ${
              lang === l.id ? `${l.color} border-current` : 'text-gray-500 border-transparent hover:text-gray-300'
            }`}
          >
            {l.label}
          </button>
        ))}
        {canRun && (
          <button
            onClick={runJS}
            disabled={running}
            className="ml-auto px-4 py-1.5 text-xs bg-green-900/40 border border-green-700/60 text-green-300 rounded hover:bg-green-900/60 disabled:opacity-40 font-semibold"
          >
            ▶ Exécuter (JS)
          </button>
        )}
      </div>

      {/* Editor + Output */}
      <div className={`flex-1 overflow-hidden flex ${output ? 'flex-col' : ''}`}>
        <div className={output ? 'h-2/3' : 'flex-1'}>
          <Editor
            height="100%"
            language={lang}
            value={code}
            onChange={v => setCode(v || '')}
            onMount={e => { editorRef.current = e; }}
            theme="vs-dark"
            options={{
              fontSize: 13,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              lineNumbers: 'on',
              tabSize: 2,
              automaticLayout: true,
            }}
          />
        </div>

        {output && (
          <div className="h-1/3 border-t border-gray-800/60 bg-gray-950/80 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 font-semibold">Output</span>
              <button onClick={() => setOutput('')} className="text-gray-600 hover:text-gray-400 text-xs">✕</button>
            </div>
            <pre className="text-xs font-mono text-green-300 whitespace-pre-wrap">{output}</pre>
          </div>
        )}
      </div>

      {!canRun && (
        <div className="px-4 py-2 border-t border-gray-800/40 text-xs text-gray-600">
          L'exécution est disponible uniquement pour JavaScript (directement dans le navigateur).
        </div>
      )}
    </div>
  );
}
