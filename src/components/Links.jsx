import { useState } from 'react';

export default function Links() {
  const categories = {
    PHP: [
      {
        name: "PHP.net (Site officiel)",
        url: "https://www.php.net/",
        description: "Site officiel de PHP - Téléchargements, documentation, actualités"
      },
      {
        name: "Documentation PHP officielle",
        url: "https://www.php.net/docs.php",
        description: "La documentation complète et officielle du langage PHP"
      },
      {
        name: "PHP The Right Way",
        url: "https://phptherightway.com/",
        description: "Guide des bonnes pratiques et standards PHP modernes"
      },
      {
        name: "PHP.net Manual (FR)",
        url: "https://www.php.net/manual/fr/",
        description: "Documentation PHP en français"
      },
      {
        name: "PHP FIG",
        url: "https://www.php-fig.org/",
        description: "Framework Interop Group - Standards PSR pour PHP"
      },
      {
        name: "W3Schools PHP",
        url: "https://www.w3schools.com/php/default.asp",
        description: "Tutoriels PHP interactifs avec exemples pratiques"
      },
      {
        name: "Packagist",
        url: "https://packagist.org/",
        description: "Répertoire principal des packages Composer"
      }
    ],
    Frameworks: [
      {
        name: "Symfony",
        url: "https://symfony.com/",
        description: "Framework PHP complet et modulaire"
      },
      {
        name: "Laravel",
        url: "https://laravel.com/",
        description: "Framework PHP élégant et moderne"
      },
      {
        name: "Slim",
        url: "https://www.slimframework.com/",
        description: "Micro-framework PHP pour les API"
      }
    ],
    "Bases de données": [
      {
        name: "MySQL",
        url: "https://dev.mysql.com/",
        description: "SGBD relationnel open source"
      },
      {
        name: "PostgreSQL",
        url: "https://www.postgresql.org/",
        description: "SGBD relationnel avancé"
      },
      {
        name: "SQLite",
        url: "https://www.sqlite.org/",
        description: "Base de données légère embarquée"
      },
      {
        name: "Doctrine ORM",
        url: "https://www.doctrine-project.org/",
        description: "ORM pour PHP, utilisé par Symfony"
      }
    ],
    Frontend: [
      {
        name: "Tailwind CSS",
        url: "https://tailwindcss.com/",
        description: "Framework CSS utility-first"
      },
      {
        name: "React",
        url: "https://react.dev/",
        description: "Bibliothèque JavaScript pour construire des interfaces"
      },
      {
        name: "Vite",
        url: "https://vitejs.dev/",
        description: "Outil de build ultra-rapide pour les applications web"
      }
    ],
    Outils: [
      {
        name: "Composer",
        url: "https://getcomposer.org/",
        description: "Gestionnaire de dépendances pour PHP"
      },
      {
        name: "Git",
        url: "https://git-scm.com/",
        description: "Système de contrôle de version distribué"
      },
      {
        name: "GitHub",
        url: "https://github.com/",
        description: "Plateforme d'hébergement de code avec Git"
      },
      {
        name: "Docker",
        url: "https://www.docker.com/",
        description: "Plateforme de conteneurisation"
      }
    ],
    "Hébergement": [
      {
        name: "OVH",
        url: "https://www.ovh.com/fr/",
        description: "Hébergement web, VPS, serveurs dédiés"
      },
      {
        name: "GitHub Pages",
        url: "https://pages.github.com/",
        description: "Hébergement gratuit de sites statiques"
      },
      {
        name: "Netlify",
        url: "https://www.netlify.com/",
        description: "Hébergement et déploiement continu pour sites statiques"
      }
    ],
    "DSFR": [
      {
        name: "Système de Design de l'État",
        url: "https://www.systeme-de-design.gouv.fr/",
        description: "Design System officiel de l'État français"
      },
      {
        name: "DSFR GitHub",
        url: "https://github.com/GouvernementFR/dsfr",
        description: "Repository GitHub du DSFR"
      },
      {
        name: "Documentation DSFR",
        url: "https://www.systeme-de-design.gouv.fr/version-courante/",
        description: "Documentation complète du DSFR"
      }
    ],
    "Apprentissage": [
      {
        name: "OpenClassrooms PHP",
        url: "https://openclassrooms.com/fr/courses/9188365-devenez-developpeurphp",
        description: "Formation complète pour devenir développeur PHP"
      },
      {
        name: "PHP Tutorial (W3Schools)",
        url: "https://www.w3schools.com/php/",
        description: "Tutoriels PHP interactifs"
      },
      {
        name: "MDN Web Docs",
        url: "https://developer.mozilla.org/fr/",
        description: "Documentation web complète (HTML, CSS, JS)"
      }
    ]
  };

  const [selectedCategory, setSelectedCategory] = useState('PHP');
  const [search, setSearch] = useState('');

  const allLinks = Object.entries(categories).flatMap(([category, links]) =>
    links.map(link => ({ ...link, category }))
  );

  const filteredLinks = allLinks.filter(link => {
    const matchesCategory = selectedCategory === 'Tous' || link.category === selectedCategory;
    const matchesSearch = link.name.toLowerCase().includes(search.toLowerCase()) ||
                       link.description.toLowerCase().includes(search.toLowerCase()) ||
                       link.url.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoryList = ['Tous', ...Object.keys(categories)];

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="border-b border-gray-700 bg-gray-900 px-3 py-2 md:px-4 md:py-3 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-purple-300 text-xs font-bold uppercase tracking-wider">
            Liens utiles
          </span>
          <span className="text-gray-500 text-xs hidden md:block">Ressources pour développeurs</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 md:p-4 lg:p-6 space-y-4">
        {/* Filtres */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3">
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un lien..."
              className="flex-1 min-w-40 bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm text-gray-300 outline-none focus:border-encre-400 placeholder-gray-500"
            />
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {categoryList.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-semibold rounded transition-all ${
                  selectedCategory === cat
                    ? 'bg-encre-900 text-encre-300 border border-encre-700'
                    : 'bg-gray-900 text-gray-400 border border-gray-700 hover:border-gray-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Résultats */}
        <div className="space-y-3">
          {filteredLinks.length > 0 ? (
            filteredLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 hover:border-encre-700 hover:bg-gray-700/50 transition-all group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-encre-400 text-base font-semibold mb-1 group-hover:text-encre-300">
                      {link.name}
                      <span className="text-encre-500 text-xs ml-2 font-normal">[{link.category}]</span>
                    </h3>
                    <p className="text-gray-400 text-sm leading-5">{link.description}</p>
                    <p className="text-gray-500 text-xs mt-1 truncate">{link.url}</p>
                  </div>
                  <span className="text-gray-600 text-xl group-hover:text-encre-400 transition-all">↗</span>
                </div>
              </a>
            ))
          ) : (
            <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg px-4 py-6 text-center">
              <p className="text-yellow-400 text-sm">Aucun lien trouvé</p>
              <p className="text-gray-500 text-xs mt-1">Essayez un autre mot-clé ou sélectionnez une autre catégorie</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
