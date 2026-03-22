import { useState } from 'react';
import Terminal from './components/Terminal.jsx';
import Exercises from './components/Exercises.jsx';
import Reference from './components/Reference.jsx';
import History from './components/History.jsx';
import Tree from './components/Tree.jsx';
import { useTerminal } from './hooks/useTerminal.js';

const tabs = [
  { id: 'terminal', label: '⚡ Terminal' },
  { id: 'exercises', label: '📚 Exercices' },
  { id: 'reference', label: '📖 Référence' },
  { id: 'history', label: '✓ Historique' },
  { id: 'tree', label: '🌲 Arborescence' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('terminal');
  const {
    command, setCommand,
    output,
    history,
    historyIndex, setHistoryIndex,
    currentDir,
    feedback,
    feedbackType,
    hint,
    isRunning,
    executeCommand,
    validateExercise,
    resetTerminal,
  } = useTerminal();

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
          <h1 className="text-xl font-bold text-cyan-400">TERMINAL LEARNING PATH</h1>
        </div>
        <p className="text-xs text-gray-400">Test & Validation des Commandes Linux</p>
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
        {activeTab === 'tree' && (
          <Tree />
        )}
      </div>

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
