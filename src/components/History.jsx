export default function History({ history }) {
  if (history.length === 0) {
    return (
      <div className="flex-1 p-6 text-gray-500 text-xs">
        Aucune commande. Allez dans Terminal pour commencer.
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-3">
      <p className="text-gray-400 text-xs mb-4">{history.length} commandes exécutées</p>
      {history.map((item, idx) => (
        <div key={idx} className="bg-gray-900/40 border border-cyan-900/20 rounded p-3">
          <div className="flex items-start justify-between mb-2">
            <code className="text-green-300 text-xs font-semibold">{item.cmd}</code>
            {item.success && <span className="text-green-400 text-xs">✓ Succès</span>}
          </div>
          {item.result && (
            <div className="text-gray-400 text-xs bg-gray-950/50 p-2 rounded whitespace-pre-wrap break-words max-h-20 overflow-y-auto">
              {item.result}
            </div>
          )}
          <div className="text-gray-600 text-xs mt-2">📍 {item.dir}</div>
        </div>
      ))}
    </div>
  );
}
