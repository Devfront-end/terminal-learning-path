import { useState, useRef, useEffect } from 'react';
import Terminal from './components/Terminal.jsx';
import Exercises from './components/Exercises.jsx';
import Reference from './components/Reference.jsx';
import History from './components/History.jsx';
import Tree from './components/Tree.jsx';
import AskCLI from './components/AskCLI.jsx';
import CLIExercises from './components/CLIExercises.jsx';
import TicketAnalyser from './components/TicketAnalyser.jsx';
import Snippets from './components/Snippets.jsx';
import CodeEditor from './components/CodeEditor.jsx';
import { useTerminal } from './hooks/useTerminal.js';

const H2_HASH = 'REMOVED';
const H2_SESSION_KEY = 'h2_unlocked';

async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

const tabs = [
  { id: 'terminal', label: '⚡ Terminal' },
  { id: 'exercises', label: '📚 Exercices' },
  { id: 'reference', label: '📖 Référence' },
  { id: 'snippets', label: '🗂️ Snippets' },
  { id: 'editor', label: '✏️ Éditeur' },
  { id: 'tree', label: '🌲 Arborescence' },
  { id: 'cli', label: '🖥️ Bash Essentials' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('terminal');
  const [hiddenVisible, setHiddenVisible] = useState(false);
  const [hiddenVisible2, setHiddenVisible2] = useState(() => sessionStorage.getItem(H2_SESSION_KEY) === '1');
  const [showH2Modal, setShowH2Modal] = useState(false);
  const [h2Input, setH2Input] = useState('');
  const [h2Error, setH2Error] = useState(false);
  const clickCount = useRef(0);
  const clickTimer = useRef(null);
  const {
    command, setCommand,
    output,
    history,
    historyIndex, setHistoryIndex,
    currentDir,
    feedback,
    feedbackType,
    hint,
    executeCommand,
    validateExercise,
    resetTerminal,
  } = useTerminal();

  useEffect(() => {
    const onKey = (e) => {
      if (!e.ctrlKey || !e.shiftKey) return;
      if (e.key === 'A') {
        e.preventDefault();
        setHiddenVisible(v => {
          if (v) setActiveTab('terminal');
          else setActiveTab('ticket');
          return !v;
        });
      } else if (e.key === 'H') {
        e.preventDefault();
        if (hiddenVisible2) setActiveTab('history');
      } else if (e.key === 'Y') {
        e.preventDefault();
        if (hiddenVisible2) setActiveTab('ask');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [hiddenVisible2]);

  const handleTitleClick = () => {
    clickCount.current += 1;
    clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => { clickCount.current = 0; }, 600);
    if (clickCount.current === 5) {
      clickCount.current = 0;
      if (hiddenVisible2) {
        setHiddenVisible2(false);
        sessionStorage.removeItem(H2_SESSION_KEY);
        setActiveTab('terminal');
      } else {
        setShowH2Modal(true);
      }
    } else if (clickCount.current === 3) {
      setHiddenVisible(v => {
        if (v) setActiveTab('terminal');
        else setActiveTab('ticket');
        return !v;
      });
    }
  };

  const checkH2 = async () => {
    const hash = await sha256(h2Input);
    if (hash === H2_HASH) {
      sessionStorage.setItem(H2_SESSION_KEY, '1');
      setHiddenVisible2(true);
      setActiveTab('history');
      setShowH2Modal(false);
      setH2Input('');
    } else {
      setH2Error(true);
      setH2Input('');
      setTimeout(() => setH2Error(false), 2000);
    }
  };

  const getTabClass = (tab) => {
    const base = 'px-4 py-3 text-xs font-semibold border-b-2 transition-all';
    if (activeTab === tab) {
      return base + ' border-cyan-400 text-cyan-400';
    }
    return base + ' border-transparent text-gray-500 hover:text-cyan-300 cursor-pointer';
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-cyan-900/30 bg-gray-950/50 px-6 py-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
          <h1 className="text-xl font-bold text-cyan-400 cursor-default select-none" onClick={handleTitleClick}>TERMINAL LEARNING PATH</h1>
        </div>
        <p className="text-xs text-gray-400">CLI Linux et Git</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-cyan-900/30 bg-gray-950/30 px-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={getTabClass(tab.id)}
          >
            {tab.label}
          </button>
        ))}
        {hiddenVisible && (
          <button
            onClick={() => setActiveTab('ticket')}
            className={getTabClass('ticket')}
          >
            ⚙️
          </button>
        )}
        {hiddenVisible2 && (
          <>
            <button
              onClick={() => setActiveTab('history')}
              className={getTabClass('history')}
            >
              ✓ Historique
            </button>
            <button
              onClick={() => setActiveTab('ask')}
              className={getTabClass('ask')}
            >
              💬 Question
            </button>
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'terminal' && (
          <Terminal
            output={output}
            history={history}
            command={command}
            setCommand={setCommand}
            historyIndex={historyIndex}
            setHistoryIndex={setHistoryIndex}
            feedback={feedback}
            feedbackType={feedbackType}
            hint={hint}
            currentDir={currentDir}
            onExecute={executeCommand}
            onReset={resetTerminal}
          />
        )}
        {activeTab === 'exercises' && (
          <Exercises onValidate={validateExercise} />
        )}
        {activeTab === 'reference' && (
          <Reference />
        )}
        {activeTab === 'history' && (
          <History history={history} />
        )}
        {activeTab === 'snippets' && (
          <Snippets />
        )}
        {activeTab === 'editor' && (
          <CodeEditor />
        )}
        {activeTab === 'tree' && (
          <Tree />
        )}
        {activeTab === 'ask' && (
          <AskCLI />
        )}
        {activeTab === 'cli' && (
          <CLIExercises />
        )}
        {activeTab === 'ticket' && (
          <TicketAnalyser />
        )}
      </div>

      {/* Modal H2 */}
      {showH2Modal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-950 border border-cyan-900/50 rounded-lg p-6 flex flex-col gap-4 shadow-xl">
            <div className="text-cyan-400 text-sm font-semibold">🔒 Accès restreint</div>
            <div className="flex gap-2">
              <input
                type="password"
                value={h2Input}
                onChange={e => setH2Input(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') checkH2(); if (e.key === 'Escape') { setShowH2Modal(false); setH2Input(''); } }}
                placeholder="Mot de passe…"
                autoFocus
                className={`bg-gray-900 border rounded px-3 py-2 text-sm text-gray-200 outline-none font-mono ${h2Error ? 'border-red-500' : 'border-gray-700 focus:border-cyan-600'}`}
              />
              <button
                onClick={checkH2}
                className="px-4 py-2 bg-cyan-600/20 border border-cyan-600/40 text-cyan-300 rounded text-sm font-semibold hover:bg-cyan-600/30"
              >→</button>
            </div>
            {h2Error && <div className="text-red-400 text-xs">Mot de passe incorrect</div>}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-cyan-900/30 bg-gray-950/50 px-6 py-2 flex items-center justify-between text-xs text-gray-500">
        <span>Répertoire: <span className="text-cyan-400">{currentDir}</span></span>
        <button onClick={resetTerminal} className="text-gray-500 hover:text-gray-300 cursor-pointer">
          ↻ Réinitialiser
        </button>
      </div>
    </div>
  );
}
