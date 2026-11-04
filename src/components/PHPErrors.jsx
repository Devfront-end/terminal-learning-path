import { useMemo, useState } from 'react';
import { phpErrorCategories, phpErrors } from '../data/phpErrors.js';

const CATEGORY_COLORS = {
  syntax: 'text-red-300 border-red-900/50 bg-red-950/20',
  runtime: 'text-orange-300 border-orange-900/50 bg-orange-950/20',
  data: 'text-yellow-300 border-yellow-900/50 bg-yellow-950/20',
  framework: 'text-indigo-300 border-indigo-900/50 bg-indigo-950/20',
};

function BulletList({ title, items, tone = 'text-gray-300' }) {
  return (
    <div>
      <h3 className="text-encre-400 text-xs font-semibold mb-2">{title}</h3>
      <ul className="space-y-1.5">
        {items.map((item, index) => (
          <li key={index} className={`text-xs leading-5 ${tone}`}>
            <span className="text-encre-700 mr-2">›</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PHPErrors() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filteredErrors = useMemo(() => {
    const q = search.trim().toLowerCase();
    return phpErrors.filter(error => {
      const matchesCategory = activeCategory === 'all' || error.category === activeCategory;
      const haystack = [
        error.title,
        error.symptom,
        ...error.causes,
        ...error.diagnosis,
        ...error.fixes,
        ...error.commands,
      ].join(' ').toLowerCase();

      return matchesCategory && (!q || haystack.includes(q));
    });
  }, [activeCategory, search]);

  const categoryLabel = (id) => phpErrorCategories.find(category => category.id === id)?.label || id;

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="border-b border-gray-800/60 bg-gray-950/40 px-4 py-3 shrink-0">
        <div className="flex flex-wrap items-center gap-3">
          <div className="text-red-300 text-xs font-bold uppercase tracking-wider mr-2">
            Erreurs PHP
          </div>
          {phpErrorCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded border transition-all ${
                activeCategory === category.id
                  ? 'border-red-500/50 bg-red-500/10 text-red-200'
                  : 'border-gray-800 text-gray-500 hover:text-gray-300 hover:border-gray-700'
              }`}
            >
              {category.label}
            </button>
          ))}
          <input
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Rechercher une erreur, un symptome..."
            className="ml-auto min-w-56 bg-gray-900/60 border border-gray-700 rounded px-3 py-1.5 text-xs text-gray-300 outline-none focus:border-red-500 placeholder-gray-600"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="border border-red-900/30 bg-red-950/10 rounded-lg px-4 py-3">
          <h2 className="text-red-300 text-sm font-semibold">Diagnostiquer avant de corriger</h2>
          <p className="text-gray-400 text-xs leading-5 mt-1">
            Lis toujours la premiere erreur utile, le fichier et la ligne, puis remonte quelques lignes avant.
            Une erreur PHP affiche souvent l endroit ou le probleme explose, pas toujours l endroit ou il commence.
          </p>
        </div>

        {filteredErrors.map(error => (
          <article
            key={error.id}
            className="bg-gray-900/40 border border-gray-800/50 rounded-lg overflow-hidden hover:border-red-900/40 transition-all"
          >
            <div className="px-4 py-3 border-b border-gray-800/50 flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${CATEGORY_COLORS[error.category]}`}>
                    {categoryLabel(error.category)}
                  </span>
                  <h2 className="text-gray-100 text-sm font-semibold">{error.title}</h2>
                </div>
                <p className="text-gray-400 text-xs leading-5 mt-2">{error.symptom}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 p-4">
              <BulletList title="Causes probables" items={error.causes} />
              <BulletList title="Diagnostic" items={error.diagnosis} tone="text-blue-100/80" />
              <BulletList title="Resolution" items={error.fixes} tone="text-green-100/80" />
            </div>

            {error.commands.length > 0 && (
              <div className="border-t border-gray-800/50 px-4 py-3">
                <h3 className="text-encre-400 text-xs font-semibold mb-2">Commandes utiles</h3>
                <div className="flex flex-col gap-2">
                  {error.commands.map((command, index) => (
                    <code
                      key={index}
                      className="block bg-black/40 border border-gray-800 rounded px-3 py-2 text-green-300 text-xs overflow-x-auto"
                    >
                      {command}
                    </code>
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}

        {filteredErrors.length === 0 && (
          <p className="text-gray-500 text-xs">Aucune erreur ne correspond a cette recherche.</p>
        )}
      </div>
    </div>
  );
}
