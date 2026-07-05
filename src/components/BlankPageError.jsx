import { phpErrors } from '../data/phpErrors.js';

export default function BlankPageError() {
  const error500 = phpErrors.find(error => error.id === 'blank-page');

  if (!error500) {
    return (
      <div className="flex-1 overflow-hidden flex flex-col p-6">
        <p className="text-gray-400">Erreur 500 non trouvée dans la base de données.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      {/* Header spécifique */}
      <div className="border-b border-red-800/60 bg-red-950/20 px-4 py-3 shrink-0">
        <div className="flex flex-wrap items-center gap-3">
          <div className="text-red-300 text-xs font-bold uppercase tracking-wider">
            Page blanche / Erreur 500 - White Screen of Death
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Notice importante */}
        <div className="border border-red-900/30 bg-red-950/10 rounded-lg px-4 py-3">
          <h2 className="text-red-300 text-sm font-semibold">
            Diagnostic complet de l'erreur 500 (WSOD)
          </h2>
          <p className="text-gray-400 text-xs leading-5 mt-1">
            L'erreur 500 est un SYMPTOME, pas la cause. Utilisez cette page pour identifier et corriger l'erreur racine.
          </p>
        </div>

        {/* Symptômes */}
        <div className="bg-gray-900/40 border border-gray-800/50 rounded-lg px-4 py-3">
          <h3 className="text-cyan-400 text-sm font-semibold mb-2">Symptômes</h3>
          <p className="text-gray-300 text-xs leading-5">{error500.symptom}</p>
        </div>

        {/* Causes */}
        <div className="bg-gray-900/40 border border-gray-800/50 rounded-lg px-4 py-3">
          <h3 className="text-cyan-400 text-sm font-semibold mb-2">Causes possibles</h3>
          <ul className="space-y-1.5">
            {error500.causes.map((cause, index) => (
              <li key={index} className="text-gray-300 text-xs leading-5">
                <span className="text-cyan-700 mr-2">›</span>
                {cause}
              </li>
            ))}
          </ul>
        </div>

        {/* Diagnostic */}
        <div className="bg-gray-900/40 border border-yellow-900/50 rounded-lg px-4 py-3">
          <h3 className="text-yellow-300 text-sm font-semibold mb-2">
            Diagnostic étape par étape
          </h3>
          <div className="space-y-3">
            {error500.diagnosis.map((step, index) => {
              if (step.startsWith('ETAPE')) {
                return (
                  <div key={index} className="mt-2 pt-2 border-t border-gray-800/30">
                    <h4 className="text-yellow-200 text-xs font-semibold">{step}</h4>
                  </div>
                );
              }
              if (step.trim() === '') {
                return null;
              }
              return (
                <p key={index} className="text-gray-300 text-xs leading-5 pl-4">
                  {step.startsWith('  - ') ? step.substring(3) : step}
                </p>
              );
            })}
          </div>
        </div>

        {/* Solutions */}
        <div className="bg-gray-900/40 border border-green-900/50 rounded-lg px-4 py-3">
          <h3 className="text-green-300 text-sm font-semibold mb-2">
            Solutions et bonnes pratiques
          </h3>
          <div className="space-y-3">
            {error500.fixes.map((fix, index) => {
              if (fix.startsWith('SOLUTIONS') || fix.startsWith('ENVIRONNEMENT') || fix.startsWith('PRODUCTION') || fix.startsWith('CHECKLIST') || fix.startsWith('CONFIGURATION') || fix.startsWith('REMEMBREZ')) {
                return (
                  <div key={index} className="mt-2 pt-2 border-t border-gray-800/30">
                    <h4 className="text-green-200 text-xs font-semibold">{fix}</h4>
                  </div>
                );
              }
              if (fix.trim() === '') {
                return null;
              }
              if (fix.startsWith('    ')) {
                return (
                  <code key={index} className="block bg-black/40 border border-gray-800 rounded px-3 py-1.5 text-green-300 text-xs overflow-x-auto whitespace-pre">
                    {fix.trim()}
                  </code>
                );
              }
              return (
                <p key={index} className="text-gray-300 text-xs leading-5 pl-4">
                  {fix.startsWith('  - ') ? fix.substring(3) : fix}
                </p>
              );
            })}
          </div>
        </div>

        {/* Commandes */}
        <div className="bg-gray-900/40 border border-blue-900/50 rounded-lg px-4 py-3">
          <h3 className="text-blue-300 text-sm font-semibold mb-2">Commandes utiles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {error500.commands
              .filter(cmd => cmd.trim() !== '')
              .map((command, index) => (
                <code
                  key={index}
                  className="block bg-black/40 border border-gray-800 rounded px-3 py-1.5 text-blue-300 text-xs overflow-x-auto whitespace-pre"
                >
                  {command}
                </code>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
