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

// Configuration .htaccess
const htaccessConfigs = {
  production: {
    name: 'Production',
    color: 'red',
    code: `php_flag display_errors off
php_flag log_errors on
php_value error_log /var/log/php_errors.log
php_value error_reporting "E_ALL & ~E_DEPRECATED & ~E_STRICT"
php_value log_errors_max_len 1024
php_flag html_errors off`,
    description: 'Configuration Apache pour la production via .htaccess',
  },
  development: {
    name: 'Développement',
    color: 'green',
    code: `php_flag display_errors on
php_flag log_errors on
php_value error_log /var/log/php_dev_errors.log
php_value error_reporting E_ALL
php_flag display_startup_errors on
php_value max_execution_time 300`,
    description: 'Configuration Apache pour le développement local',
  },
};

// Code PHP pour Monolog
const monologSnippets = [
  {
    id: 'basic',
    title: 'Configuration Monolog de base',
    description: 'Configuration minimale pour logger dans un fichier',
    code: `require 'vendor/autoload.php';
use Monolog\Logger;
use Monolog\Handler\StreamHandler;

// Créer un logger
$log = new Logger('app');

// Ajouter un handler pour les warnings et erreurs
$log->pushHandler(new StreamHandler('/var/log/app.log', Logger::WARNING));

// Utilisation
$log->error('Erreur critique', ['context' => $data]);
$log->warning('Avertissement important');
$log->info('Information', ['user_id' => 123]);
$log->debug('Debug', ['variable' => $value]);`,
    recommendation: 'Installez Monolog via Composer: composer require monolog/monolog',
  },
  {
    id: 'advanced',
    title: 'Configuration Monolog avancée',
    description: 'Plusieurs handlers avec rotation de fichiers',
    code: `require 'vendor/autoload.php';
use Monolog\Logger;
use Monolog\Handler\RotatingFileHandler;
use Monolog\Formatter\LineFormatter;

// Créer un logger
$log = new Logger('app');

// Formatter personnalisé
$formatter = new LineFormatter(
    '[%datetime%] %channel%.%level_name%: %message% %context% %extra%\n',
    'Y-m-d H:i:s',
    true,
    true
);

// Handler pour les erreurs (rotation quotidienne, 30 jours)
$errorHandler = new RotatingFileHandler(
    '/var/log/app_errors.log',
    30,
    Logger::ERROR
);
$errorHandler->setFormatter($formatter);
$log->pushHandler($errorHandler);

// Handler pour les infos (rotation par taille, 10 Mo)
$infoHandler = new RotatingFileHandler(
    '/var/log/app_info.log',
    0,
    Logger::INFO,
    true,
    0777,
    true,
    10485760 // 10 Mo
);
$infoHandler->setFormatter($formatter);
$log->pushHandler($infoHandler);

// Utilisation
$log->error('Erreur critique', ['context' => $data]);
$log->info('Action effectuée', ['user_id' => $userId]);`,
    recommendation: 'RotatingFileHandler évite les fichiers de log trop volumineux',
  },
];

// Gestionnaire d'exceptions
const exceptionHandlers = [
  {
    id: 'basic',
    title: 'Gestionnaire d\'exceptions de base',
    description: 'Gestionnaire simple pour capturer les erreurs fatales',
    code: `set_exception_handler(function($e) {
    error_log(
        $e->getMessage() . " dans " .
        $e->getFile() . " à la ligne " .
        $e->getLine()
    );
    http_response_code(500);
    echo "Une erreur est survenue.";
});`,
    recommendation: 'Enregistre l\'erreur dans les logs et affiche un message générique à l\'utilisateur',
  },
  {
    id: 'advanced',
    title: 'Gestionnaire d\'exceptions avancé',
    description: 'Avec logging Monolog et gestion JSON pour les APIs',
    code: `use Monolog\Logger;
use Monolog\Handler\StreamHandler;

// Initialiser le logger
$log = new Logger('exceptions');
$log->pushHandler(new StreamHandler('/var/log/exceptions.log', Logger::ERROR));

set_exception_handler(function($e) use ($log) {
    $log->error(
        $e->getMessage(),
        [
            'file' => $e->getFile(),
            'line' => $e->getLine(),
            'trace' => $e->getTraceAsString(),
            'code' => $e->getCode()
        ]
    );
    
    if (php_sapi_name() !== 'cli') {
        http_response_code(500);
        header('Content-Type: application/json');
        echo json_encode([
            'error' => 'Internal Server Error',
            'code' => 500,
            'message' => 'Une erreur interne est survenue',
            'reference' => bin2hex(random_bytes(4))
        ]);
    } else {
        echo "\nERROR: " . $e->getMessage() . "\n";
        echo "File: " . $e->getFile() . ":" . $e->getLine() . "\n";
        exit(1);
    }
});

register_shutdown_function(function() use ($log) {
    $error = error_get_last();
    if ($error !== null && $error['type'] === E_ERROR) {
        $log->error('Erreur fatale', [
            'message' => $error['message'],
            'file' => $error['file'],
            'line' => $error['line']
        ]);
    }
});`,
    recommendation: 'Capture aussi les erreurs fatales avec register_shutdown_function',
  },
];

// Conseils généraux
const generalTips = [
  {
    title: 'Où placer ces configurations ?',
    content: 'Ces directives peuvent être placées dans :',
    items: [
      'Le fichier `php.ini` principal',
      'Un fichier `.user.ini` dans le répertoire du projet (partagé)',
      'Un fichier `.htaccess` avec `php_flag` ou `php_value` (Apache uniquement)',
      'Directement dans le code avec `ini_set()` (temporaire, pour le script courant)',
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
      'En production, affichez des messages génériques aux utilisateurs',
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
      'E_ERROR - Erreurs fatales (ne peuvent pas être capturées)',
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
  const [activeTab, setActiveTab] = useState('php-ini');
  const config = phpConfigs[activeEnv];

  const subTabs = [
    { id: 'php-ini', label: 'php.ini', icon: '📄' },
    { id: 'htaccess', label: '.htaccess', icon: '🌐' },
    { id: 'monolog', label: 'Monolog', icon: '📦' },
    { id: 'exceptions', label: 'Exceptions', icon: '⚠️' },
  ];

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="border-b border-cyan-900/30 bg-gray-950/50 px-6 py-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
          <h1 className="text-xl font-bold text-cyan-400">Configuration PHP</h1>
        </div>
        <p className="text-xs text-gray-400">Gestion des erreurs, logging et exceptions</p>
      </div>

      {/* Sélecteur d'environnement */}
      <div className="border-b border-cyan-900/20 bg-gray-950/30 px-6 py-3">
        <div className="flex items-center gap-4 flex-wrap">
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

      {/* Sous-onglets */}
      <div className="border-b border-cyan-900/20 bg-gray-950/20 px-6">
        <div className="flex gap-1 overflow-x-auto pb-1">
          {subTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 text-xs font-semibold rounded-t border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-cyan-400 text-cyan-400 bg-gray-950/40'
                  : 'border-transparent text-gray-500 hover:text-cyan-300'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'php-ini' && (
          <div className="space-y-4">
            <div className="border-b border-cyan-900/30 pb-3 mb-4">
              <h2 className="text-lg font-semibold text-cyan-400">php.ini - Configuration des erreurs</h2>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {config.settings.map((setting) => (
                <div key={`${activeEnv}-${setting.directive}`} className="bg-gray-900/40 border border-gray-800/40 rounded-lg p-4 hover:border-cyan-800/50 transition-all">
                  <div className="flex items-start gap-3">
                    <code className="text-cyan-300 text-sm font-semibold">{setting.directive}</code>
                    <span className="text-gray-600 mx-2">=</span>
                    <code className="text-green-300 text-sm font-semibold">{setting.value}</code>
                  </div>
                  <p className="text-gray-400 text-xs mt-2 leading-5">{setting.description}</p>
                  <p className="text-gray-500 text-xs mt-1 italic">{setting.recommendation}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-cyan-900/30 pt-6">
              <h3 className="text-sm font-semibold text-cyan-400 mb-3">📋 Configuration php.ini pour {config.name}</h3>
              <div className="bg-black/60 border border-cyan-900/40 rounded-lg p-4">
                <pre className="text-xs text-green-300 overflow-x-auto">
{config.settings.map(s => `; ${s.description}`).join('\n')}

{config.settings.map(s => `${s.directive} = ${s.value}`).join('\n')}
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'htaccess' && (
          <div className="space-y-4">
            <div className="border-b border-cyan-900/30 pb-3 mb-4">
              <h2 className="text-lg font-semibold text-cyan-400">Configuration Apache via .htaccess</h2>
              <p className="text-xs text-gray-500 mt-1">Utilisez php_flag pour les booléens, php_value pour les valeurs</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(htaccessConfigs).map(([key, htaccessConfig]) => (
                <div key={key} className="bg-gray-900/40 border border-gray-800/40 rounded-lg p-4">
                  <h3 className={`text-sm font-semibold mb-3 ${colorClasses[htaccessConfig.color]}`}>{htaccessConfig.name}</h3>
                  <p className="text-xs text-gray-500 mb-3">{htaccessConfig.description}</p>
                  <div className="bg-black/60 border border-gray-800/40 rounded p-3">
                    <pre className="text-xs text-green-300 overflow-x-auto whitespace-pre-wrap">{htaccessConfig.code}</pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'monolog' && (
          <div className="space-y-4">
            <div className="border-b border-cyan-900/30 pb-3 mb-4">
              <h2 className="text-lg font-semibold text-cyan-400">Logging avec Monolog</h2>
              <p className="text-xs text-gray-500 mt-1">Monolog est la bibliothèque de logging la plus populaire pour PHP</p>
            </div>
            <div className="space-y-4">
              {monologSnippets.map((snippet) => (
                <div key={snippet.id} className="bg-gray-900/40 border border-gray-800/40 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-cyan-400 mb-2">{snippet.title}</h3>
                  <p className="text-xs text-gray-500 mb-3">{snippet.description}</p>
                  <div className="bg-black/60 border border-cyan-900/40 rounded p-3">
                    <pre className="text-xs text-green-300 overflow-x-auto whitespace-pre-wrap">{snippet.code}</pre>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 italic">{snippet.recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'exceptions' && (
          <div className="space-y-4">
            <div className="border-b border-cyan-900/30 pb-3 mb-4">
              <h2 className="text-lg font-semibold text-cyan-400">Gestion des exceptions PHP</h2>
              <p className="text-xs text-gray-500 mt-1">Capturez et loggez les exceptions pour éviter les erreurs silencieuses</p>
            </div>
            <div className="space-y-4">
              {exceptionHandlers.map((handler) => (
                <div key={handler.id} className="bg-gray-900/40 border border-gray-800/40 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-cyan-400 mb-2">{handler.title}</h3>
                  <p className="text-xs text-gray-500 mb-3">{handler.description}</p>
                  <div className="bg-black/60 border border-cyan-900/40 rounded p-3">
                    <pre className="text-xs text-green-300 overflow-x-auto whitespace-pre-wrap">{handler.code}</pre>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 italic">{handler.recommendation}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-cyan-900/30 pt-6">
              <h3 className="text-sm font-semibold text-cyan-400 mb-3">📋 Exemple complet combiné</h3>
              <div className="bg-black/60 border border-cyan-900/40 rounded-lg p-4">
                <pre className="text-xs text-green-300 overflow-x-auto whitespace-pre-wrap">{`require 'vendor/autoload.php';
use Monolog\\Logger;
use Monolog\\Handler\\StreamHandler;

// 1. Configuration du logger
$log = new Logger('app');
$log->pushHandler(new StreamHandler('/var/log/app.log', Logger::WARNING));

// 2. Configuration PHP (optionnel)
ini_set('display_errors', '0');
ini_set('log_errors', '1');
ini_set('error_log', '/var/log/php_errors.log');

// 3. Gestionnaire d'exceptions global
set_exception_handler(function($e) use ($log) {
    $log->error(
        $e->getMessage(),
        [
            'file' => $e->getFile(),
            'line' => $e->getLine(),
            'trace' => $e->getTraceAsString()
        ]
    );
    
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'error' => 'Internal Server Error',
        'code' => 500
    ]);
});

// 4. Gestion des erreurs fatales
register_shutdown_function(function() use ($log) {
    $error = error_get_last();
    if ($error !== null && $error['type'] === E_ERROR) {
        $log->error('Erreur fatale', [
            'message' => $error['message'],
            'file' => $error['file'],
            'line' => $error['line']
        ]);
    }
});`}</pre>
              </div>
            </div>
          </div>
        )}

        {/* Conseils généraux */}
        <div className="mt-8 border-t border-cyan-900/30 pt-6">
          <h3 className="text-sm font-semibold text-cyan-400 mb-4">💡 Conseils et bonnes pratiques</h3>
          <div className="space-y-4">
            {generalTips.map((tip, index) => (
              <div key={index} className="bg-gray-900/30 border border-gray-800/30 rounded-lg p-4">
                <h4 className="text-cyan-300 text-sm font-semibold mb-2">{tip.title}</h4>
                <p className="text-gray-400 text-xs mb-2">{tip.content}</p>
                <ul className="list-disc list-inside space-y-1">
                  {tip.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-400 text-xs leading-5">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-cyan-900/30 bg-gray-950/50 px-6 py-3">
        <p className="text-xs text-gray-500">
          ⚠️ Après modification de php.ini ou .htaccess, redémarrez votre serveur web (Apache/Nginx/PHP-FPM)
        </p>
      </div>
    </div>
  );
}
