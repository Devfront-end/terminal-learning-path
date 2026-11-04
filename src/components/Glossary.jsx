import { useState } from 'react';

export default function Glossary() {
  const terms = [
    {
      term: "API",
      definition: "Application Programming Interface - Interface permettant à des applications de communiquer entre elles.",
      category: "Général"
    },
    {
      term: "Array",
      definition: "Structure de données en PHP qui stocke plusieurs valeurs dans une seule variable. Peut être indexé (numérique) ou associatif (clé => valeur).",
      category: "PHP"
    },
    {
      term: "Autoloading (PSR-4)",
      definition: "Mécanisme qui charge automatiquement les classes PHP sans avoir besoin d'inclure manuellement les fichiers. Standardisé par PSR-4.",
      category: "PHP"
    },
    {
      term: "Backend",
      definition: "Partie serveurs d'une application web. Gère la logique métier, la base de données, l'authentification, etc.",
      category: "Architecture"
    },
    {
      term: "Base de données",
      definition: "Système organisé de stockage et de récupération de données. MySQL, PostgreSQL et SQLite sont des SGBD populaires avec PHP.",
      category: "Base de données"
    },
    {
      term: "Cache",
      definition: "Mécanisme de stockage temporaire de données pour accélérer les requêtes récurrentes.",
      category: "Performance"
    },
    {
      term: "Class",
      definition: "Modèle ou template pour créer des objets en programmation orientée objet (POO). En PHP, définie avec le mot-clé 'class'.",
      category: "POO"
    },
    {
      term: "Composer",
      definition: "Gestionnaire de dépendances pour PHP. Permet d'installer, mettre à jour et gérer les bibliothèques tierces.",
      category: "Outils"
    },
    {
      term: "Controller",
      definition: "Dans l'architecture MVC, composant qui traite les requêtes HTTP, interagit avec les modèles et renvoie une réponse.",
      category: "MVC"
    },
    {
      term: "CSS",
      definition: "Cascading Style Sheets - Langage de feuilles de style utilisé pour décrire la présentation d'un document HTML.",
      category: "Frontend"
    },
    {
      term: "Dependency Injection",
      definition: "Pattern de conception où les dépendances (services, objets) sont injectées plutôt que créées à l'intérieur de la classe. Utilisé dans Symfony et Laravel.",
      category: "Architecture"
    },
    {
      term: "DOCTYPE",
      definition: "Déclaration qui informe le navigateur du type et de la version du document HTML.",
      category: "HTML"
    },
    {
      term: "Entity",
      definition: "Dans Doctrine ORM, classe PHP qui représente une table de base de données et ses relations.",
      category: "Doctrine"
    },
    {
      term: "Framework",
      definition: "Structure logicielle qui fournit une base pour développer des applications. Symfony, Laravel sont des frameworks PHP populaires.",
      category: "PHP"
    },
    {
      term: "Frontend",
      definition: "Partie client d'une application web. Comprend HTML, CSS, JavaScript et les frameworks comme React, Vue.js.",
      category: "Architecture"
    },
    {
      term: "GET",
      definition: "Méthode HTTP utilisée pour récupérer des données depuis un serveur. Les paramètres sont visibles dans l'URL.",
      category: "HTTP"
    },
    {
      term: "Git",
      definition: "Système de contrôle de version distribué. Permet de suivre les modifications du code, collaborer et revenir à des versions précédentes.",
      category: "Outils"
    },
    {
      term: "HTML",
      definition: "HyperText Markup Language - Langage de balisage pour structurer le contenu des pages web.",
      category: "Web"
    },
    {
      term: "HTTP",
      definition: "HyperText Transfer Protocol - Protocole de communication utilisé pour transférer des données sur le web.",
      category: "Réseau"
    },
    {
      term: "HTTPS",
      definition: "HTTP Secure - Version sécurisée du protocole HTTP utilisant le cryptage SSL/TLS.",
      category: "Sécurité"
    },
    {
      term: "Index",
      definition: "En base de données, structure qui améliore la vitesse des requêtes. En PHP, index.php est souvent le point d'entrée de l'application.",
      category: "Base de données"
    },
    {
      term: "JavaScript",
      definition: "Langage de programmation utilisé pour rendre les pages web interactives. Souvent utilisé avec PHP pour le frontend.",
      category: "Frontend"
    },
    {
      term: "JSON",
      definition: "JavaScript Object Notation - Format léger d'échange de données, facilement lisible par les humains et analysable par les machines.",
      category: "Données"
    },
    {
      term: "Key-Value",
      definition: "Structure de données simple qui associe des clés uniques à des valeurs. Utilisée dans les tableaux associatifs PHP et les bases de données NoSQL.",
      category: "Données"
    },
    {
      term: "Laravel",
      definition: "Framework PHP moderne avec une syntaxe élégante. Offre des outils pour le routing, l'ORM, les queues, etc.",
      category: "Framework"
    },
    {
      term: "Library (Bibliothèque)",
      definition: "Collection de fonctions pré-écrites qui peuvent être utilisées dans un projet. Installées via Composer en PHP.",
      category: "PHP"
    },
    {
      term: "MVC",
      definition: "Model-View-Controller - Pattern d'architecture qui sépare l'application en trois composants : le modèle (données), la vue (interface), et le contrôleur (logique).",
      category: "Architecture"
    },
    {
      term: "Method",
      definition: "Fonction définie à l'intérieur d'une classe. En PHP, peut être publique, privée ou protégée.",
      category: "POO"
    },
    {
      term: "Middleware",
      definition: "Couche logicielle qui interceptent les requêtes HTTP pour effectuer des tâches (authentification, logging, etc.) avant qu'elles n'atteignent le contrôleur.",
      category: "HTTP"
    },
    {
      term: "Migration",
      definition: "Fichier qui définit les modifications à apporter à la base de données. Utilisé avec les ORM comme Doctrine.",
      category: "Base de données"
    },
    {
      term: "Model",
      definition: "Dans MVC, composant qui gère les données et la logique métier. Interagit avec la base de données.",
      category: "MVC"
    },
    {
      term: "MySQL",
      definition: "Système de gestion de base de données relationnelle (SGBDR) open source, très utilisé avec PHP.",
      category: "Base de données"
    },
    {
      term: "Namespace",
      definition: "Mécanisme en PHP pour éviter les conflits de noms entre classes et fonctions. Permet d'organiser le code de manière hiérarchique.",
      category: "PHP"
    },
    {
      term: "ORM",
      definition: "Object-Relational Mapping - Technique qui permet de manipuler une base de données avec un langage orienté objet. Doctrine est l'ORM de Symfony.",
      category: "Base de données"
    },
    {
      term: "Object",
      definition: "Instance d'une classe en programmation orientée objet. Contient des propriétés (données) et des méthodes (fonctions).",
      category: "POO"
    },
    {
      term: "POO",
      definition: "Programmation Orientée Objet - Paradigme de programmation basé sur le concept d'objets qui contiennent des données et des comportements.",
      category: "Programmation"
    },
    {
      term: "POST",
      definition: "Méthode HTTP utilisée pour envoyer des données à un serveur. Les paramètres ne sont pas visibles dans l'URL (contrairement à GET).",
      category: "HTTP"
    },
    {
      term: "Repository",
      definition: "Dans Doctrine, classe qui gère les opérations de base de données pour une entité (find, findAll, save, delete).",
      category: "Doctrine"
    },
    {
      term: "REST",
      definition: "Representational State Transfer - Style d'architecture pour les services web qui utilise les méthodes HTTP (GET, POST, PUT, DELETE).",
      category: "API"
    },
    {
      term: "Route",
      definition: "Définition d'une URL et de son association avec un contrôleur/méthode. En Symfony, configurée dans config/routes.yaml ou via des annotations.",
      category: "Routing"
    },
    {
      term: "Session",
      definition: "Mécanisme de stockage de données spécifiques à un utilisateur pendant sa visite sur un site. En PHP, gérée via $_SESSION.",
      category: "Web"
    },
    {
      term: "SQL",
      definition: "Structured Query Language - Langage standard pour interagir avec les bases de données relationnelles.",
      category: "Base de données"
    },
    {
      term: "Symfony",
      definition: "Framework PHP complet et modulaire. Utilise des composants réutilisables et suit les meilleures pratiques.",
      category: "Framework"
    },
    {
      term: "Template",
      definition: "Fichier qui définit la structure et la présentation d'une page. En PHP, souvent avec Twig (Symfony) ou Blade (Laravel).",
      category: "Vue"
    },
    {
      term: "Trait",
      definition: "Mécanisme en PHP pour réutiliser du code dans plusieurs classes sans utiliser l'héritage multiple.",
      category: "PHP"
    },
    {
      term: "View",
      definition: "Dans MVC, composant qui gère l'affichage et la présentation des données à l'utilisateur.",
      category: "MVC"
    },
    {
      term: "Vendor",
      definition: "Dossier où Composer installe les dépendances du projet. Ne doit jamais être versionné dans Git.",
      category: "Composer"
    },
    {
      term: "XML",
      definition: "eXtensible Markup Language - Langage de balisage extensible utilisé pour stocker et transporter des données.",
      category: "Données"
    },
    {
      term: "YAML",
      definition: "YAML Ain't Markup Language - Format de sérialisation de données lisible par les humains, utilisé dans Symfony pour la configuration.",
      category: "Configuration"
    }
  ];

  const categories = [...new Set(terms.map(t => t.category))];
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [search, setSearch] = useState('');

  const filteredTerms = terms.filter(term => {
    const matchesCategory = selectedCategory === 'Tous' || term.category === selectedCategory;
    const matchesSearch = term.term.toLowerCase().includes(search.toLowerCase()) ||
                       term.definition.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="border-b border-gray-700 bg-gray-900 px-3 py-2 md:px-4 md:py-3 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-purple-300 text-xs font-bold uppercase tracking-wider">
            Glossaire
          </span>
          <span className="text-gray-500 text-xs hidden md:block">Termes et définitions PHP & Web</span>
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
              placeholder="Rechercher un terme..."
              className="flex-1 min-w-40 bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm text-gray-300 outline-none focus:border-encre-400 placeholder-gray-500"
            />
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {['Tous', ...categories].map(cat => (
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
          {filteredTerms.length > 0 ? (
            filteredTerms.map((term, index) => (
              <div
                key={index}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 hover:border-encre-700 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-encre-400 text-base font-semibold mb-1">
                      {term.term}
                      <span className="text-encre-500 text-xs ml-2 font-normal">[{term.category}]</span>
                    </h3>
                    <p className="text-gray-300 text-sm leading-5">{term.definition}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg px-4 py-6 text-center">
              <p className="text-yellow-400 text-sm">Aucun terme trouvé</p>
              <p className="text-gray-500 text-xs mt-1">Essayez un autre mot-clé ou sélectionnez une autre catégorie</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
