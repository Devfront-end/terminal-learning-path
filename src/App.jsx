import { useState } from 'react';
import Terminal from './components/Terminal.jsx';
import Exercises from './components/Exercises.jsx';
import Reference from './components/Reference.jsx';
import History from './components/History.jsx';
import Tree from './components/Tree.jsx';
import AskCLI from './components/AskCLI.jsx';
import CLIExercises from './components/CLIExercises.jsx';
import Snippets from './components/Snippets.jsx';
import CodeEditor from './components/CodeEditor.jsx';
import IPConfig from './components/IPConfig.jsx';
import PHPErrors from './components/PHPErrors.jsx';
import PHPFundamentals from './components/PHPFundamentals.jsx';
import Glossary from './components/Glossary.jsx';
import Links from './components/Links.jsx';
// import PHPConfig from './components/PHPConfig.jsx';
import { useTerminal } from './hooks/useTerminal.js';

const tabs = [
  { id: 'terminal', label: '⚡ Terminal' },
  { id: 'exercises', label: '📚 Exercices' },
  { id: 'reference', label: '📖 Référence' },
  { id: 'snippets', label: '🗂️ Snippets' },
  { id: 'editor', label: '✏️ Éditeur' },
  { id: 'php-errors', label: '🛡️ Gestion des erreurs' },
  { id: 'php-fundamentals', label: '📘 Fondamentaux PHP' },
  { id: 'tree', label: '🌲 Arborescence' },
  { id: 'cli', label: '🖥️ Bash Essentials' },
  { id: 'ipconfig', label: '🌐 Réseau' },
  { id: 'glossary', label: '📖 Glossaire' },
  { id: 'links', label: '🔗 Liens' },
];

const getTabClass = (tab, activeTab) => {
  const base = 'px-4 py-3 text-xs font-semibold border-b-2 transition-all';
  if (activeTab === tab) {
    return base + ' border-cyan-400 text-cyan-400';
  }
  return base + ' border-transparent text-gray-400 hover:text-cyan-300 cursor-pointer';
};

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
    executeCommand,
    validateExercise,
    resetTerminal,
  } = useTerminal();

  return (
    <div className="w-full h-screen bg-gray-900 flex flex-col overflow-hidden">
      {/* Header - Responsive */}
      <div className="border-b border-gray-700 bg-gray-900 px-4 md:px-6 py-3">
        <div className="flex items-center gap-2 md:gap-3 mb-1">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-cyan-400 rounded-full animate-pulse"></div>
          <h1 className="text-lg md:text-xl font-bold text-cyan-400 cursor-default select-none truncate">TERMINAL LEARNING PATH</h1>
        </div>
        <p className="text-xs text-gray-400 hidden md:block">CLI Linux, Git et PHP</p>
      </div>

      {/* Tabs - Responsive with horizontal scroll on mobile */}
      <div className="flex border-b border-gray-700 bg-gray-900 px-4 md:px-6 overflow-x-auto">
        <div className="flex space-x-1 md:space-x-0 min-w-max">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={getTabClass(tab.id, activeTab) + ' whitespace-nowrap'}
            >
              {tab.label}
            </button>
          ))}
        </div>
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
        {activeTab === 'snippets' && (
          <Snippets />
        )}
        {activeTab === 'editor' && (
          <CodeEditor />
        )}
        {activeTab === 'php-errors' && (
          <PHPErrors />
        )}
        {activeTab === 'php-fundamentals' && (
          <PHPFundamentals />
        )}
        {activeTab === 'tree' && (
          <Tree />
        )}
        {activeTab === 'cli' && (
          <CLIExercises />
        )}
        {activeTab === 'ipconfig' && (
          <IPConfig />
        )}
        {activeTab === 'glossary' && (
          <Glossary />
        )}
        {activeTab === 'links' && (
          <Links />
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-700 bg-gray-900 px-4 md:px-6 py-2 flex items-center justify-between text-xs text-gray-500">
        <span>Répertoire: <span className="text-cyan-400">{currentDir}</span></span>
        <button onClick={resetTerminal} className="text-gray-500 hover:text-gray-300 cursor-pointer">
          ↻ Réinitialiser
        </button>
      </div>
    </div>
  );
}
