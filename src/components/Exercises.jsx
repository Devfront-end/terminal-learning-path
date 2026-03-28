import { useState, useRef, useEffect } from 'react';
import { exercises } from '../data/exercises.js';

const categoryLabels = { cd: 'Navigation — cd & pwd', find: 'Recherche — find', grep: 'Recherche texte — grep', git: 'Contrôle de version — git' };
const categoryColors = {
  cd: { text: 'text-blue-400', border: 'border-blue-900/40' },
  find: { text: 'text-orange-400', border: 'border-orange-900/40' },
  grep: { text: 'text-purple-400', border: 'border-purple-900/40' },
  git: { text: 'text-green-400', border: 'border-green-900/40' },
};

export default function Exercises({ onValidate }) {
  const [exerciseMode, setExerciseMode] = useState(null);
  const [exCommand, setExCommand] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (exerciseMode && inputRef.current) inputRef.current.focus();
  }, [exerciseMode]);

  const feedbackClass = feedbackType === 'success'
    ? 'bg-green-950/30 text-green-300 border-green-900/30'
    : feedbackType === 'error'
    ? 'bg-red-950/30 text-red-300 border-red-900/30'
    : 'bg-blue-950/30 text-blue-300 border-blue-900/30';

  const handleValidate = () => {
    if (!exerciseMode) return;
    const result = onValidate(exerciseMode, exCommand);
    setFeedbackType(result.success ? 'success' : 'error');
    if (result.success) {
      setFeedback(result.message + (result.explanation ? '\n\nExplication: ' + result.explanation : ''));
    } else {
      setFeedback(result.message + (result.explanation ? '\n\nExplication: ' + result.explanation : ''));
    }
  };

  const handleShowSolution = () => {
    if (!exerciseMode) return;
    const ex = exercises[exerciseMode];
    setExCommand(ex.hint);
  };

  const handleBack = () => {
    setExerciseMode(null);
    setExCommand('');
    setFeedback('');
    setFeedbackType('');
  };

  const handleStartExercise = (key) => {
    setExerciseMode(key);
    setExCommand('');
    setFeedback('');
    setFeedbackType('');
  };

  const exerciseKeys = Object.keys(exercises);
  const currentIndex = exerciseKeys.indexOf(exerciseMode);

  const handlePrev = () => {
    if (currentIndex > 0) handleStartExercise(exerciseKeys[currentIndex - 1]);
  };
  const handleNext = () => {
    if (currentIndex < exerciseKeys.length - 1) handleStartExercise(exerciseKeys[currentIndex + 1]);
  };

  if (!exerciseMode) {
    // Group by category
    const grouped = {};
    Object.entries(exercises).forEach(([key, ex]) => {
      if (!grouped[ex.category]) grouped[ex.category] = [];
      grouped[ex.category].push([key, ex]);
    });

    return (
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {Object.entries(grouped).map(([cat, items]) => {
          const color = categoryColors[cat] || { text: 'text-cyan-400', border: 'border-cyan-900/40' };
          return (
            <div key={cat}>
              <h2 className={`text-sm font-bold mb-4 pb-2 border-b ${color.text} ${color.border}`}>
                {categoryLabels[cat] || cat}
              </h2>
              <div className="space-y-3">
                {items.map(([key, ex]) => (
                  <div key={key} className="bg-gray-900/40 border border-gray-800/40 rounded p-4 flex items-start justify-between gap-4 hover:border-cyan-600/30 transition-all">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-cyan-300 font-semibold text-xs mb-1">{ex.title}</h3>
                      <p className="text-gray-400 text-xs truncate">{ex.challenge}</p>
                    </div>
                    <button
                      onClick={() => handleStartExercise(key)}
                      className="shrink-0 px-3 py-1.5 bg-cyan-600/20 border border-cyan-600/40 text-cyan-300 rounded text-xs font-semibold hover:bg-cyan-600/30 cursor-pointer"
                    >
                      Commencer
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  const ex = exercises[exerciseMode];
  const color = categoryColors[ex.category] || { text: 'text-cyan-400', border: 'border-cyan-900/40' };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <button onClick={handleBack} className="text-cyan-400 text-xs hover:text-cyan-300 flex items-center gap-2 cursor-pointer">
          ← Retour aux exercices
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex <= 0}
            className="px-3 py-1 bg-gray-800/60 border border-gray-700/40 text-gray-300 rounded text-xs hover:bg-gray-700/60 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            ← Précédent
          </button>
          <span className="text-gray-500 text-xs">{currentIndex + 1} / {exerciseKeys.length}</span>
          <button
            onClick={handleNext}
            disabled={currentIndex >= exerciseKeys.length - 1}
            className="px-3 py-1 bg-gray-800/60 border border-gray-700/40 text-gray-300 rounded text-xs hover:bg-gray-700/60 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            Suivant →
          </button>
        </div>
      </div>
      <div className="bg-gray-900/40 border border-cyan-600/30 rounded p-5 space-y-4">
        <div>
          <span className={`text-xs font-semibold ${color.text} uppercase tracking-wider`}>
            {categoryLabels[ex.category] || ex.category}
          </span>
          <h3 className="text-cyan-400 font-bold text-sm mt-1">{ex.title}</h3>
        </div>
        <div className="bg-yellow-950/20 border border-yellow-900/30 p-3 rounded">
          <p className="text-yellow-200 text-xs font-semibold mb-1">Défi</p>
          <p className="text-gray-300 text-xs">{ex.challenge}</p>
        </div>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={exCommand}
            onChange={e => setExCommand(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleValidate(); } }}
            placeholder="Entrez votre commande..."
            className="flex-1 bg-gray-950/50 border border-cyan-900/20 rounded px-3 py-2 text-green-300 text-xs outline-none focus:border-cyan-600/50"
          />
          <button
            onClick={handleShowSolution}
            className="shrink-0 px-3 py-2 bg-yellow-600/20 border border-yellow-600/40 text-yellow-300 rounded text-xs font-semibold hover:bg-yellow-600/30 cursor-pointer"
          >
            Solution
          </button>
          <button
            onClick={handleValidate}
            className="shrink-0 px-4 py-2 bg-green-600/20 border border-green-600/40 text-green-300 rounded text-xs font-semibold hover:bg-green-600/30 cursor-pointer"
          >
            Valider
          </button>
        </div>
        {feedback && (
          <div className={`${feedbackClass} p-4 rounded text-xs border leading-relaxed whitespace-pre-wrap`}>
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
}
