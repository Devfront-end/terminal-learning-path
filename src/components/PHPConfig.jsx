import { useState } from 'react';

// Configurations PHP par environnement
const phpConfigs = {
  production: {
    name: 'Production',
    color: 'red',
    description: 'Configuration sécurisée pour un environnement de production',
    settings: [
      {
        directive: 'display_errors',
        value: 'Off',
        description: 'Désactive l\'affichage des erreurs à l\'écran (sécurité)',
        recommendation: '✅ Toujours Off en production',
      },
      {
        directive: 'log_errors',
        value: 'On',
        description: 'Active l\'enregistrement des erreurs dans les logs',
        recommendation: '✅ Toujours On en production',
      },
      {
        directive: 'error_log',
        value: '/var/log/php_errors.log',
        description: 'Chemin vers le fichier de log des erreurs PHP',
        recommendation: '✅ Chemins absolus recommandés',
      },
      {
        directive: 'error_reporting',
        value: 'E_ALL & ~E_DEPRECATED & ~E_STRICT',
        description: 'Niveau de rapport d\'erreur (toutes sauf deprecated et strict)',
        recommendation: '✅ Évite les warnings inutiles',
      },
      {
        directive: 'ignore_repeated_errors',
        value: 'On',
        description: 'Ignore les erreurs répétées pour éviter le spam de logs',
        recommendation: '✅ Réduit la taille des logs',
      },
      {
        directive: 'ignore_repeated_source',
        value: 'On',
        description: 'Ignore les erreurs répétées depuis la même source',
        recommendation: '✅ Complémentaire au précédent',
      },
      {
        directive: 'log_errors_max_len',
        value: '1024',
        description: 'Longueur maximale des messages de log',
        recommendation: '✅ Empêche les logs trop longs',
      },
      {
        directive: 'html_errors',
        value: 'Off',
        description: 'Désactive le formatage HTML des erreurs',
        recommendation: '✅ Sécurité (XSS)',
      },
    ],
  },
  development: {
    name: 'Développement',
    color: 'green',
    description: 'Configuration pour le développement local avec debug',
    settings: [
      {
        directive: 'display_errors',
        value: 'On',
        description: 'Affiche les erreurs directement dans le navigateur',
        recommendation: '✅ Utile pour debugger rapidement',
      },
      {
        directive: 'log_errors',
        value: 'On',
        description: 'Enregistre aussi les erreurs dans les logs',
        recommendation: '✅ Double sécurité',
      },
      {
        directive: 'error_log',
        value: '/var/log/php_dev_errors.log',
        description: 'Fichier de log séparé pour le développement',
        recommendation: '✅ Garde les logs de prod propres',
      },
      {
        directive: 'error_reporting',
        value: 'E_ALL',
        description: 'Affiche TOUS les types d\'erreurs y compris notices et warnings',
        recommendation: '✅ Maximum d\'infos pour debug',
      },
      {
        directive: 'display_startup_errors',
        value: 'On',
        description: 'Affiche les erreurs de démarrage PHP',
        recommendation: '✅ Détecte les erreurs de syntaxe',
      },
      {
        directive: 'xdebug.mode',
        value: 'develop,debug',
        description: 'Active Xdebug pour le profiling et le debugging',
        recommendation: '✅ Requiert l\'extension Xdebug',
      },
      {
        directive: 'xdebug.client_port',
        value: '9003',
        description: 'Port pour Xdebug (nouvelle version)',
        recommendation: '✅ Port par défaut pour Xdebug 3+',
      },
    ],
  },
  staging: {
    name: 'Staging/Pré-production',
    color: 'orange',
    description: 'Configuration intermédiaire pour les tests finaux',
    settings: [
      {
        directive: 'display_errors',
        value: 'Off',
        description: 'Désactivé comme en production',
        recommendation: '✅ Simule la production',
      },
      {
        directive: 'log_errors',
        value: 'On',
        description: 'Logs activés pour le debugging',
        recommendation: '✅ Permet le diagnostic',
      },
      {
        directive: 'error_log',
        value: '/var/log/php_staging_errors.log',
        description: 'Fichier de log dédié au staging',
        recommendation: '✅ Séparation des environnements',
      },
      {
        directive: 'error_reporting',
        value: 'E_ALL & ~E_NOTICE & ~E_STRICT',
        description: 'Toutes les erreurs sauf notices et strict',
        recommendation: '✅ Équilibre entre debug et propreté',
      },
      {
        directive: 'max_execution_time',
        value: '120',
        description: 'Temps max d\'exécution (en secondes)',
        recommendation: '✅ Plus long qu\'en production pour les tests',
      },
      {
        directive: 'memory_limit',
        value: '512M',
        description: 'Limite de mémoire',
        recommendation: '✅ Permet des tests plus lourds',
      },
    ],
  },
};

// Conseils généraux
const generalTips = [
  {
    title: 'Où placer ces configurations ?',
    content: 'Ces directives peuvent être placées dans :',
    items: [
      'Le fichier `php.ini` principal',
      'Un fichier `.user.ini` dans le répertoire du projet (partagé)',
      'Un fichier `.htaccess` avec `php_value` ou `php_flag` (Apache)',
      'Directement dans le code avec `ini_set()` (temporaire)',
    ],
  },
  {
    title: 'Bonnes pratiques',
    content: 'Recommandations pour la gestion des erreurs :',
    items: [
      'Utilisez des niveaux de log différents (error, warning, info, debug)',
      'Rotez vos fichiers de log pour éviter qu\'ils ne deviennent trop gros',
      'Ne stockez jamais de données sensibles dans les messages de log',
      'Utilisez un système de monitoring (Sentry, Datadog) en plus des logs',
      'Testez toujours vos configurations après modification',
    ],
  },
  {
    title: 'Vérification des configurations',
    content: 'Pour vérifier les configurations actuelles :',
    items: [
      '`phpinfo()` - Affiche toutes les configurations PHP',
      '`ini_get("display_errors")` - Vérifie une directive spécifique',
      '`php -i | grep error` - En ligne de commande',
      'Créez un fichier test.php avec `<?php phpinfo(); ?>`',
    ],
  },
  {
    title: 'Niveaux de error_reporting',
    content: 'Les différents niveaux :',
    items: [
      'E_ALL - Toutes les erreurs et warnings',
      'E_ERROR - Erreurs fatales',
      'E_WARNING - Warnings non fatals',
      'E_PARSE - Erreurs de syntaxe',
      'E_NOTICE - Notices (variables non définies)',
      'E_STRICT - Suggestions pour le code',
      'E_DEPRECATED - Fonctions dépréciées',
    ],
  },
];

const colorClasses = {
  red: 'text-red-300 border-red-900/50 bg-red-950/20',
  green: 'text-green-300 border-green-900/50 bg-green-950/20',
  orange: 'text-orange-300 border-orange-900/50 bg-orange-950/20',
};

export default function PHPConfig() {
  const [activeEnv, setActiveEnv] = useState('production');
  const config = phpConfigs[activeEnv];

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="border-b border-cyan-900/30 bg-gray-950/50 px-6 py-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
          <h1 className="text-xl font-bold text-cyan-400">Configuration PHP</h1>
        </div>
        <p className="text-xs text-gray-400">Gestion des erreurs et du logging</p>
      </div>

      {/* Sélecteur d'environnement */}
      <div className="border-b border-cyan-900/20 bg-gray-950/30 px-6 py-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">Environnement :</span>
          {Object.keys(phpConfigs).map((envKey) => (
            <button
              key={envKey}
              onClick={() => setActiveEnv(envKey)}
              className={`px-4 py-2 text-sm font-semibold rounded border transition-all ${
                activeEnv === envKey
                  ? `border-${phpConfigs[envKey].color}-500/50 bg-${phpConfigs[envKey].color}-950/20 text-${phpConfigs[envKey].color}-200`
                  : 'border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300'
              }`}
            >
              {phpConfigs[envKey].name}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">{config.description}</p>
      </div>

      {/* Configuration */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {/* Titre de la section */}
          <div className="border-b border-cyan-900/30 pb-3 mb-4">
            <h2 className="text-lg font-semibold text-cyan-400">
              php.ini - Configuration des erreurs
            </h2>
          </div>

          {/* Liste des directives */}
          <div className="grid grid-cols-1 gap-3">
            {config.settings.map((setting, index) => (
              <div
                key={`${activeEnv}-${setting.directive}`}
                className="bg-gray-900/40 border border-gray-800/40 rounded-lg p-4 hover:border-cyan-800/50 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <code className="text-cyan-300 text-sm font-semibold">
                      {setting.directive}
                    </code>
                    <span className="text-gray-600 mx-2">=</span>
                    <code className="text-green-300 text-sm font-semibold">
                      {setting.value}
                    </code>
                  </div>
                </div>
                <p className="text-gray-400 text-xs mt-2 leading-5">
                  {setting.description}
                </p>
                <p className="text-gray-500 text-xs mt-1 italic">
                  {setting.recommendation}
                </p>
              </div>
            ))}
          </div>

          {/* Snippet prêt à copier */}
          <div className="mt-6 border-t border-cyan-900/30 pt-6">
            <h3 className="text-sm font-semibold text-cyan-400 mb-3">
              📋 Copier la configuration pour {config.name}
            </h3>
            <div className="bg-black/60 border border-cyan-900/40 rounded-lg p-4">
              <pre className="text-xs text-green-300 overflow-x-auto">
{config.settings
  .map(s => `; ${s.description}`)
  .join('\n')}

{config.settings
  .map(s => `${s.directive} = ${s.value}`)
  .join('\n')}
              </pre>
            </div>
          </div>

          {/* Conseils généraux */}
          <div className="mt-8 border-t border-cyan-900/30 pt-6">
            <h3 className="text-sm font-semibold text-cyan-400 mb-4">
              💡 Conseils et bonnes pratiques
            </h3>
            <div className="space-y-4">
              {generalTips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-gray-900/30 border border-gray-800/30 rounded-lg p-4"
                >
                  <h4 className="text-cyan-300 text-sm font-semibold mb-2">
                    {tip.title}
                  </h4>
                  <p className="text-gray-400 text-xs mb-2">{tip.content}</p>
                  <ul className="list-disc list-inside space-y-1">
                    {tip.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-gray-400 text-xs leading-5"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-cyan-900/30 bg-gray-950/50 px-6 py-3">
        <p className="text-xs text-gray-500">
          ⚠️ Après modification de php.ini, redémarrez votre serveur web (Apache/Nginx/PHP-FPM)
        </p>
      </div>
    </div>
  );
}
