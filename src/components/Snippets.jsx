import { useState } from 'react';
import { snippets } from '../data/snippets.js';

const LANGS = [
  { id: 'all',    label: 'Tous',       color: 'text-encre-400' },
  { id: 'js',     label: 'JavaScript', color: 'text-yellow-400' },
  { id: 'php',    label: 'PHP',        color: 'text-indigo-400' },
  { id: 'python', label: 'Python',     color: 'text-green-400' },
];

const LANG_COLORS = {
  js:     'text-yellow-400 border-yellow-900/40 bg-yellow-900/10',
  php:    'text-indigo-400 border-indigo-900/40 bg-indigo-900/10',
  python: 'text-green-400 border-green-900/40 bg-green-900/10',
};

export default function Snippets() {
  const [activeLang, setActiveLang] = useState('all');
  const [copied, setCopied]         = useState(null);
  const [search, setSearch]         = useState('');

  const filtered = snippets.filter(s => {
    const matchLang = activeLang === 'all' || s.lang === activeLang;
    const q = search.toLowerCase();
    const matchSearch = !q || s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
    return matchLang && matchSearch;
  });

  const copy = (id, code) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-3 border-b border-gray-800/60 bg-gray-950/40 px-4 shrink-0">
        {LANGS.map(l => (
          <button
            key={l.id}
            onClick={() => setActiveLang(l.id)}
            className={`px-4 py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-all ${
              activeLang === l.id ? `${l.color} border-current` : 'text-gray-500 border-transparent hover:text-gray-300'
            }`}
          >
            {l.label}
          </button>
        ))}
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher…"
          className="ml-auto bg-gray-900/60 border border-gray-700 rounded px-3 py-1.5 text-xs text-gray-300 outline-none focus:border-encre-600 placeholder-gray-600 w-48"
        />
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filtered.map(s => (
          <div key={s.id} className="bg-gray-900/40 border border-gray-800/40 rounded-lg overflow-hidden hover:border-gray-700/60 transition-all">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800/40">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${LANG_COLORS[s.lang] || 'text-gray-400'}`}>
                    {s.lang}
                  </span>
                  <span className="text-gray-200 text-xs font-semibold">{s.title}</span>
                </div>
                <p className="text-gray-500 text-xs mt-0.5">{s.description}</p>
              </div>
              <button
                onClick={() => copy(s.id, s.code)}
                className="shrink-0 ml-3 px-3 py-1 text-xs bg-gray-800 border border-gray-700 text-gray-400 rounded hover:text-encre-300 hover:border-encre-700 transition-all"
              >
                {copied === s.id ? '✓ Copié' : '📋'}
              </button>
            </div>
            {/* Code */}
            <pre className="p-4 text-xs font-mono text-green-300 overflow-x-auto leading-relaxed">{s.code}</pre>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-gray-500 text-xs col-span-2">Aucun snippet trouvé.</p>
        )}
      </div>
    </div>
  );
}
