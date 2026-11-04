export default function DocPhpOffizielle() {
  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="border-b border-blue-800/60 bg-blue-950/20 px-4 py-3 shrink-0">
        <div className="flex flex-wrap items-center gap-3">
          <div className="text-blue-300 text-xs font-bold uppercase tracking-wider">
            Documentation Officielle PHP - Gestion des Erreurs
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* Introduction */}
        <div className="border border-blue-900/30 bg-blue-950/10 rounded-lg px-4 py-3">
          <h2 className="text-blue-300 text-sm font-semibold mb-2">
            Documentation Officielle PHP.net - Gestion des Erreurs
          </h2>
          <p className="text-gray-400 text-xs leading-5">
            Source : <code>https://www.php.net/manual/en/errorfunc.configuration.php</code>
          </p>
        </div>

        {/* Notice importante - Principe fondamental */}
        <div className="border border-red-900/30 bg-red-950/10 rounded-lg px-4 py-3">
          <h3 className="text-red-300 text-sm font-semibold mb-2">
            ⚠️ Principe fondamental pour l'erreur 500 (White Screen of Death)
          </h3>
          <p className="text-gray-300 text-xs leading-5">
            <span className="font-bold text-white">"La clé est toujours les logs - l'erreur 500 est un symptôme, pas la cause."</span>
          </p>
          <p className="text-gray-400 text-xs leading-5 mt-2">
            <strong className="text-encre-300">Action :</strong> Identifiez l'erreur racine dans les logs et corrigez-la !
          </p>
          <p className="text-gray-500 text-xs leading-5 mt-1">
            <strong className="text-encre-300">Source :</strong> Bonnes pratiques PHP.net + expérience terrain
          </p>
        </div>

        {/* Section 1: Types d'erreurs */}
        <div className="bg-gray-900/40 border border-gray-800/50 rounded-lg px-4 py-3">
          <h3 className="text-encre-400 text-sm font-semibold mb-3">
            🔹 1. Types d'erreurs PHP (Constantes prédéfinies)
          </h3>
          <p className="text-gray-400 text-xs mb-3">
            Niveaux d'erreurs définis par PHP. Utilisés avec <code>error_reporting()</code>.
          </p>
          
          <div className="overflow-x-auto">
            <table className="text-xs">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-encre-300 px-2 py-1">Constante</th>
                  <th className="text-left text-encre-300 px-2 py-1">Valeur</th>
                  <th className="text-left text-encre-300 px-2 py-1">Description</th>
                  <th className="text-left text-encre-300 px-2 py-1">Gérable ?</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800/50"><td className="px-2 py-1">E_ERROR</td><td className="px-2 py-1">1</td><td className="px-2 py-1">Erreur fatale d'exécution</td><td className="px-2 py-1 text-red-300">❌ Non</td></tr>
                <tr className="border-b border-gray-800/50"><td className="px-2 py-1">E_WARNING</td><td className="px-2 py-1">2</td><td className="px-2 py-1">Avertissement d'exécution (non fatal)</td><td className="px-2 py-1 text-green-300">✅ Oui</td></tr>
                <tr className="border-b border-gray-800/50"><td className="px-2 py-1">E_PARSE</td><td className="px-2 py-1">4</td><td className="px-2 py-1">Erreur de syntaxe</td><td className="px-2 py-1 text-red-300">❌ Non</td></tr>
                <tr className="border-b border-gray-800/50"><td className="px-2 py-1">E_NOTICE</td><td className="px-2 py-1">8</td><td className="px-2 py-1">Notice d'exécution (conseil)</td><td className="px-2 py-1 text-green-300">✅ Oui</td></tr>
                <tr className="border-b border-gray-800/50"><td className="px-2 py-1">E_CORE_ERROR</td><td className="px-2 py-1">16</td><td className="px-2 py-1">Erreur fatale au démarrage de PHP</td><td className="px-2 py-1 text-red-300">❌ Non</td></tr>
                <tr className="border-b border-gray-800/50"><td className="px-2 py-1">E_CORE_WARNING</td><td className="px-2 py-1">32</td><td className="px-2 py-1">Avertissement au démarrage</td><td className="px-2 py-1 text-green-300">✅ Oui</td></tr>
                <tr className="border-b border-gray-800/50"><td className="px-2 py-1">E_COMPILE_ERROR</td><td className="px-2 py-1">64</td><td className="px-2 py-1">Erreur fatale de compilation</td><td className="px-2 py-1 text-red-300">❌ Non</td></tr>
                <tr className="border-b border-gray-800/50"><td className="px-2 py-1">E_COMPILE_WARNING</td><td className="px-2 py-1">128</td><td className="px-2 py-1">Avertissement de compilation</td><td className="px-2 py-1 text-green-300">✅ Oui</td></tr>
                <tr className="border-b border-gray-800/50"><td className="px-2 py-1">E_USER_ERROR</td><td className="px-2 py-1">256</td><td className="px-2 py-1">Erreur utilisateur (trigger_error)</td><td className="px-2 py-1 text-green-300">✅ Oui</td></tr>
                <tr className="border-b border-gray-800/50"><td className="px-2 py-1">E_USER_WARNING</td><td className="px-2 py-1">512</td><td className="px-2 py-1">Avertissement utilisateur</td><td className="px-2 py-1 text-green-300">✅ Oui</td></tr>
                <tr className="border-b border-gray-800/50"><td className="px-2 py-1">E_USER_NOTICE</td><td className="px-2 py-1">1024</td><td className="px-2 py-1">Notice utilisateur</td><td className="px-2 py-1 text-green-300">✅ Oui</td></tr>
                <tr className="border-b border-gray-800/50"><td className="px-2 py-1">E_STRICT</td><td className="px-2 py-1">2048</td><td className="px-2 py-1">Suggestions pour compatibilité</td><td className="px-2 py-1 text-green-300">✅ Oui</td></tr>
                <tr className="border-b border-gray-800/50"><td className="px-2 py-1">E_RECOVERABLE_ERROR</td><td className="px-2 py-1">4096</td><td className="px-2 py-1">Erreur récupérable (depuis PHP 5.2)</td><td className="px-2 py-1 text-green-300">✅ Oui</td></tr>
                <tr className="border-b border-gray-800/50"><td className="px-2 py-1">E_DEPRECATED</td><td className="px-2 py-1">8192</td><td className="px-2 py-1">Fonctionnalités dépréciées</td><td className="px-2 py-1 text-green-300">✅ Oui</td></tr>
                <tr className="border-b border-gray-800/50"><td className="px-2 py-1">E_USER_DEPRECATED</td><td className="px-2 py-1">16384</td><td className="px-2 py-1">Dépréciations utilisateur</td><td className="px-2 py-1 text-green-300">✅ Oui</td></tr>
                <tr><td className="px-2 py-1 font-semibold text-encre-300">E_ALL</td><td className="px-2 py-1 font-semibold text-encre-300">32767</td><td className="px-2 py-1 font-semibold text-encre-300">Toutes les erreurs</td><td className="px-2 py-1 text-green-300">✅ Oui</td></tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-3 bg-black/40 border border-gray-800 rounded px-3 py-2">
            <code className="text-green-300 text-xs">
              error_reporting(E_ALL);  // Toutes les erreurs
              error_reporting(-1);     // Toutes + futures
            </code>
          </div>
        </div>

        {/* Section 2: Directives de reporting */}
        <div className="bg-gray-900/40 border border-gray-800/50 rounded-lg px-4 py-3">
          <h3 className="text-encre-400 text-sm font-semibold mb-3">
            🔹 2. Directives de Reporting (error_reporting)
          </h3>
          
          <div className="overflow-x-auto">
            <table className="text-xs">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-encre-300 px-2 py-1">Directive</th>
                  <th className="text-left text-encre-300 px-2 py-1">Description</th>
                  <th className="text-left text-encre-300 px-2 py-1">Valeurs</th>
                  <th className="text-left text-encre-300 px-2 py-1">Défaut</th>
                  <th className="text-left text-encre-300 px-2 py-1">Runtime</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800/50">
                  <td className="px-2 py-1">error_reporting</td>
                  <td className="px-2 py-1">Niveau des erreurs rapportées</td>
                  <td className="px-2 py-1">E_ALL, E_ERROR, -1, etc.</td>
                  <td className="px-2 py-1">E_ALL & ~E_DEPRECATED</td>
                  <td className="px-2 py-1 text-green-300">✅ Oui</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="text-gray-400 text-xs mt-2">
            <strong className="text-encre-300">Exemple de configuration :</strong>
          </p>
          <div className="mt-1 bg-black/40 border border-gray-800 rounded px-3 py-2">
            <code className="text-green-300 text-xs">
              error_reporting(E_ALL);  // Développement
              error_reporting(E_ALL & ~E_DEPRECATED);  // Production
              error_reporting(-1);  // Toutes y compris futures
            </code>
          </div>
        </div>

        {/* Section 3: Directives d'affichage */}
        <div className="bg-gray-900/40 border border-gray-800/50 rounded-lg px-4 py-3">
          <h3 className="text-encre-400 text-sm font-semibold mb-3">
            🔹 3. Directives d'Affichage
          </h3>
          
          <div className="overflow-x-auto">
            <table className="text-xs">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-encre-300 px-2 py-1">Directive</th>
                  <th className="text-left text-encre-300 px-2 py-1">Description</th>
                  <th className="text-left text-encre-300 px-2 py-1">Valeurs</th>
                  <th className="text-left text-encre-300 px-2 py-1">Défaut</th>
                  <th className="text-left text-encre-300 px-2 py-1">Runtime</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800/50">
                  <td className="px-2 py-1">display_errors</td>
                  <td className="px-2 py-1">Affiche les erreurs à l'écran</td>
                  <td className="px-2 py-1">On/Off, 1/0</td>
                  <td className="px-2 py-1 text-red-300">On</td>
                  <td className="px-2 py-1 text-green-300">✅ Oui</td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="px-2 py-1">display_startup_errors</td>
                  <td className="px-2 py-1">Affiche erreurs au démarrage</td>
                  <td className="px-2 py-1">On/Off</td>
                  <td className="px-2 py-1">Off</td>
                  <td className="px-2 py-1 text-green-300">✅ Oui</td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="px-2 py-1">html_errors</td>
                  <td className="px-2 py-1">Formate erreurs en HTML</td>
                  <td className="px-2 py-1">On/Off</td>
                  <td className="px-2 py-1">On</td>
                  <td className="px-2 py-1 text-green-300">✅ Oui</td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="px-2 py-1">docref_root</td>
                  <td className="px-2 py-1">URL base pour liens doc</td>
                  <td className="px-2 py-1">Chaîne URL</td>
                  <td className="px-2 py-1">""</td>
                  <td className="px-2 py-1 text-green-300">✅ Oui</td>
                </tr>
                <tr>
                  <td className="px-2 py-1">docref_ext</td>
                  <td className="px-2 py-1">Extension fichiers doc</td>
                  <td className="px-2 py-1">Chaîne</td>
                  <td className="px-2 py-1">".html"</td>
                  <td className="px-2 py-1 text-green-300">✅ Oui</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-2 text-yellow-300 text-xs bg-yellow-900/20 border border-yellow-800/50 rounded px-3 py-2">
            ⚠️ <strong>CRITIQUE :</strong> display_errors doit être <strong>Off</strong> en production !
          </div>
        </div>

        {/* Section 4: Directives de logging */}
        <div className="bg-gray-900/40 border border-gray-800/50 rounded-lg px-4 py-3">
          <h3 className="text-encre-400 text-sm font-semibold mb-3">
            🔹 4. Directives de Journalisation
          </h3>
          
          <div className="overflow-x-auto">
            <table className="text-xs">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-encre-300 px-2 py-1">Directive</th>
                  <th className="text-left text-encre-300 px-2 py-1">Description</th>
                  <th className="text-left text-encre-300 px-2 py-1">Valeurs</th>
                  <th className="text-left text-encre-300 px-2 py-1">Défaut</th>
                  <th className="text-left text-encre-300 px-2 py-1">Runtime</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800/50">
                  <td className="px-2 py-1">log_errors</td>
                  <td className="px-2 py-1">Active la journalisation</td>
                  <td className="px-2 py-1">On/Off</td>
                  <td className="px-2 py-1 text-green-300">On</td>
                  <td className="px-2 py-1 text-green-300">✅ Oui</td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="px-2 py-1">error_log</td>
                  <td className="px-2 py-1">Chemin vers le fichier de log</td>
                  <td className="px-2 py-1">Chemin absolu</td>
                  <td className="px-2 py-1">""</td>
                  <td className="px-2 py-1 text-green-300">✅ Oui</td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="px-2 py-1">log_errors_max_len</td>
                  <td className="px-2 py-1">Longueur max message de log</td>
                  <td className="px-2 py-1">Entier (octets)</td>
                  <td className="px-2 py-1">1024</td>
                  <td className="px-2 py-1 text-green-300">✅ Oui</td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="px-2 py-1">ignore_repeated_errors</td>
                  <td className="px-2 py-1">Ignore erreurs identiques</td>
                  <td className="px-2 py-1">On/Off</td>
                  <td className="px-2 py-1">Off</td>
                  <td className="px-2 py-1 text-green-300">✅ Oui</td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="px-2 py-1">ignore_repeated_source</td>
                  <td className="px-2 py-1">Ignore erreurs de même source</td>
                  <td className="px-2 py-1">On/Off</td>
                  <td className="px-2 py-1">Off</td>
                  <td className="px-2 py-1 text-green-300">✅ Oui</td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="px-2 py-1">track_errors</td>
                  <td className="px-2 py-1">Stocke dernière erreur dans $php_errormsg</td>
                  <td className="px-2 py-1">On/Off</td>
                  <td className="px-2 py-1">Off</td>
                  <td className="px-2 py-1 text-green-300">✅ Oui</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-2 text-green-300 text-xs bg-green-900/20 border border-green-800/50 rounded px-3 py-2">
            ✅ Recommandation : log_errors = On + error_log = "/var/log/php_errors.log" en production
          </div>
        </div>

        {/* Section 5: Exemples de code */}
        <div className="bg-gray-900/40 border border-purple-800/50 rounded-lg px-4 py-3">
          <h3 className="text-purple-400 text-sm font-semibold mb-3">
            🔹 5. Exemples de Code Officiels
          </h3>
          
          <div className="space-y-3">
            <div>
              <p className="text-gray-400 text-xs mb-1">
                <strong className="text-encre-300">set_error_handler() - Gestionnaire d'erreurs personnalisé :</strong>
              </p>
              <div className="bg-black/40 border border-purple-800 rounded px-3 py-2">
                <code className="text-purple-300 text-xs">
{`set_error_handler(function($errno, $errstr, $errfile, $errline) {
    if (!(error_reporting() & $errno)) {
        return false;
    }
    switch ($errno) {
        case E_USER_ERROR:
            error_log("ERREUR: $errstr dans $errfile:$errline");
            exit(1);
            break;
        case E_USER_WARNING:
            error_log("AVERTISSEMENT: $errstr dans $errfile:$errline");
            break;
        case E_USER_NOTICE:
            error_log("NOTICE: $errstr dans $errfile:$errline");
            break;
        default:
            error_log("Erreur inconnue [$errno]: $errstr dans $errfile:$errline");
    }
    return true;  // Empêche PHP de gérer aussi
});`}
                </code>
              </div>
            </div>
            
            <div>
              <p className="text-gray-400 text-xs mb-1">
                <strong className="text-encre-300">set_exception_handler() - Gestionnaire d'exceptions :</strong>
              </p>
              <div className="bg-black/40 border border-purple-800 rounded px-3 py-2">
                <code className="text-purple-300 text-xs">
{`set_exception_handler(function($exception) {
    error_log("Exception non attrapée: " . $exception->getMessage());
    error_log("Fichier: " . $exception->getFile() . ":" . $exception->getLine());
    
    // Afficher une page amicale en production
    http_response_code(500);
    echo json_encode(['error' => 'Une erreur est survenue']);
    exit;
});`}
                </code>
              </div>
            </div>
            
            <div>
              <p className="text-gray-400 text-xs mb-1">
                <strong className="text-encre-300">register_shutdown_function() - Capturer les erreurs fatales :</strong>
              </p>
              <div className="bg-black/40 border border-purple-800 rounded px-3 py-2">
                <code className="text-purple-300 text-xs">
{`register_shutdown_function(function() {
    $error = error_get_last();
    if ($error && in_array($error['type'], [E_ERROR, E_CORE_ERROR, E_COMPILE_ERROR])) {
        error_log("FATAL: " . $error['message'] . " in " . $error['file'] . ":" . $error['line']);
    }
});`}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Configuration recommandée */}
        <div className="bg-gray-900/40 border border-orange-800/50 rounded-lg px-4 py-3">
          <h3 className="text-orange-400 text-sm font-semibold mb-3">
            🔹 6. Configuration Recommandée
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-xs mb-2 font-semibold">
                📂 php.ini (Développement)
              </p>
              <div className="bg-black/40 border border-orange-800 rounded px-3 py-2">
                <code className="text-orange-300 text-xs">
{`error_reporting = E_ALL
display_errors = On
display_startup_errors = On
html_errors = On

log_errors = On
error_log = /tmp/php_errors.log`}
                </code>
              </div>
            </div>
            
            <div>
              <p className="text-gray-400 text-xs mb-2 font-semibold">
                🏢 php.ini (Production) ⚠️
              </p>
              <div className="bg-black/40 border border-red-800 rounded px-3 py-2">
                <code className="text-orange-300 text-xs">
{`error_reporting = E_ALL & ~E_DEPRECATED & ~E_STRICT
display_errors = Off
display_startup_errors = Off
html_errors = Off

log_errors = On
error_log = /var/log/php_errors.log`}
                </code>
              </div>
            </div>
          </div>
          
          <div className="mt-3 text-red-300 text-xs bg-red-900/20 border border-red-800/50 rounded px-3 py-2">
            ⚠️ <strong>CRITIQUE EN PRODUCTION :</strong> display_errors = Off + log_errors = On
          </div>
        </div>

        {/* Section 7: Commandes Complètes de Diagnostic */}
        <div className="bg-gray-900/40 border border-blue-800/50 rounded-lg px-4 py-3">
          <h3 className="text-blue-400 text-sm font-semibold mb-3">
            🔹 7. Commandes Complètes de Diagnostic par Catégorie
          </h3>
          
          {/* 7.1 Commandes de LOGS */}
          <div className="mb-4">
            <h4 className="text-encre-300 text-xs font-semibold mb-2 border-b border-gray-700 pb-1">
              📁 7.1. LOGS - Afficher les erreurs
            </h4>
            <div className="overflow-x-auto">
              <table className="text-xs">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left text-encre-300 px-2 py-1">Commande</th>
                    <th className="text-left text-encre-300 px-2 py-1">À quoi ça sert ?</th>
                    <th className="text-left text-encre-300 px-2 py-1">Résultat</th>
                    <th className="text-left text-encre-300 px-2 py-1">Contexte</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-800/50">
                    <td className="px-2 py-1 font-mono">tail -n 100 /var/log/php*-fpm.log</td>
                    <td className="px-2 py-1">100 dernières lignes des logs PHP-FPM</td>
                    <td className="px-2 py-1">Erreurs PHP (Parse error, Warning, Notice, Fatal)</td>
                    <td className="px-2 py-1">Serveur avec PHP-FPM</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="px-2 py-1 font-mono">tail -n 100 /var/log/apache2/error.log</td>
                    <td className="px-2 py-1">100 dernières erreurs Apache</td>
                    <td className="px-2 py-1">Erreurs HTTP (500, 404, 403)</td>
                    <td className="px-2 py-1">Serveur Apache</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="px-2 py-1 font-mono">tail -n 100 /var/log/nginx/error.log</td>
                    <td className="px-2 py-1">100 dernières erreurs Nginx</td>
                    <td className="px-2 py-1">Erreurs upstream, timeouts, connexions</td>
                    <td className="px-2 py-1">Serveur Nginx</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="px-2 py-1 font-mono">tail -n 100 var/log/*.log</td>
                    <td className="px-2 py-1">100 dernières lignes des logs applicatifs</td>
                    <td className="px-2 py-1">Logs Symfony, Laravel, etc.</td>
                    <td className="px-2 py-1">Dans votre projet</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="px-2 py-1 font-mono">journalctl -u php*-fpm -n 50 --no-pager</td>
                    <td className="px-2 py-1">50 derniers logs système PHP-FPM</td>
                    <td className="px-2 py-1">Format systemd avec timestamp</td>
                    <td className="px-2 py-1">Linux moderne (systemd)</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="px-2 py-1 font-mono">journalctl -u nginx -n 80 --no-pager</td>
                    <td className="px-2 py-1">80 derniers logs système Nginx</td>
                    <td className="px-2 py-1">Format systemd avec timestamp</td>
                    <td className="px-2 py-1">Linux moderne (systemd)</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="px-2 py-1 font-mono">journalctl -u apache2 -n 80 --no-pager</td>
                    <td className="px-2 py-1">80 derniers logs système Apache</td>
                    <td className="px-2 py-1">Format systemd avec timestamp</td>
                    <td className="px-2 py-1">Linux moderne (systemd)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-xs mt-2">
              <strong className="text-encre-300">Astuce :</strong> <code>--no-pager</code> empêche l'utilisation d'un paginateur
            </p>
          </div>

          {/* 7.2 Commandes DOCKER */}
          <div className="mb-4">
            <h4 className="text-encre-300 text-xs font-semibold mb-2 border-b border-gray-700 pb-1">
              🐳 7.2. DOCKER - Debug des conteneurs
            </h4>
            <div className="overflow-x-auto">
              <table className="text-xs">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left text-encre-300 px-2 py-1">Commande</th>
                    <th className="text-left text-encre-300 px-2 py-1">À quoi ça sert ?</th>
                    <th className="text-left text-encre-300 px-2 py-1">Résultat</th>
                    <th className="text-left text-encre-300 px-2 py-1">Contexte</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-800/50">
                    <td className="px-2 py-1 font-mono">docker logs --tail 100 nom_conteneur_php</td>
                    <td className="px-2 py-1">100 dernières lignes des logs du conteneur PHP</td>
                    <td className="px-2 py-1">Logs PHP-FPM, erreurs applicatives</td>
                    <td className="px-2 py-1">Environnement Docker</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="px-2 py-1 font-mono">docker logs --tail 100 nom_conteneur_web</td>
                    <td className="px-2 py-1">100 dernières lignes des logs du conteneur web</td>
                    <td className="px-2 py-1">Logs Nginx/Apache</td>
                    <td className="px-2 py-1">Environnement Docker</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="px-2 py-1 font-mono">docker exec -it nom_conteneur bash</td>
                    <td className="px-2 py-1">Ouvre un shell interactif dans le conteneur</td>
                    <td className="px-2 py-1">Accès direct au filesystem, permet d'exécuter des commandes</td>
                    <td className="px-2 py-1">Debug avancé</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-xs mt-2">
              <strong className="text-encre-300">Astuce :</strong> <code>exec -it</code> = execute + interactive + TTY
            </p>
          </div>

          {/* 7.3 Commandes PHP */}
          <div className="mb-4">
            <h4 className="text-encre-300 text-xs font-semibold mb-2 border-b border-gray-700 pb-1">
              🔍 7.3. PHP - Diagnostic du code
            </h4>
            <div className="overflow-x-auto">
              <table className="text-xs">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left text-encre-300 px-2 py-1">Commande</th>
                    <th className="text-left text-encre-300 px-2 py-1">À quoi ça sert ?</th>
                    <th className="text-left text-encre-300 px-2 py-1">Résultat</th>
                    <th className="text-left text-encre-300 px-2 py-1">Contexte</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-800/50">
                    <td className="px-2 py-1 font-mono">php -l fichier_problematique.php</td>
                    <td className="px-2 py-1">Vérifie la syntaxe PHP</td>
                    <td className="px-2 py-1">"No syntax errors detected" ✅ ou "Parse error..." ❌</td>
                    <td className="px-2 py-1">Trouver les erreurs de syntaxe</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="px-2 py-1 font-mono">php -v | head -n 1</td>
                    <td className="px-2 py-1">Affiche la version de PHP</td>
                    <td className="px-2 py-1">Ex: PHP 8.2.12 (cli)</td>
                    <td className="px-2 py-1">Vérifier la compatibilité</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="px-2 py-1 font-mono">php -m</td>
                    <td className="px-2 py-1">Liste toutes les extensions PHP chargées</td>
                    <td className="px-2 py-1">bcmath, curl, gd, mbstring, pdo_mysql...</td>
                    <td className="px-2 py-1">Vérifier qu'une extension est installée</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="px-2 py-1 font-mono">php -r "echo memory_get_usage();"</td>
                    <td className="px-2 py-1">Affiche la mémoire utilisée par PHP</td>
                    <td className="px-2 py-1">Nombre en octets (ex: 12582912)</td>
                    <td className="px-2 py-1">Debug des problèmes de mémoire</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="px-2 py-1 font-mono">find . -name "*.php" -type f -mmin -10</td>
                    <td className="px-2 py-1">Trouve les fichiers PHP modifiés dans les 10 dernières minutes</td>
                    <td className="px-2 py-1">Liste des fichiers récemment modifiés</td>
                    <td className="px-2 py-1">Identifier la cause récente d'une erreur</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-xs mt-2">
              <strong className="text-encre-300">Astuce :</strong> <code>php -r</code> exécute du code PHP directement en ligne de commande
            </p>
          </div>

          {/* 7.4 Commandes de création de test */}
          <div className="mb-4">
            <h4 className="text-encre-300 text-xs font-semibold mb-2 border-b border-gray-700 pb-1">
              📝 7.4. CRÉATION DE TEST - Script de diagnostic
            </h4>
            <div className="overflow-x-auto">
              <table className="text-xs">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left text-encre-300 px-2 py-1">Commande</th>
                    <th className="text-left text-encre-300 px-2 py-1">À quoi ça sert ?</th>
                    <th className="text-left text-encre-300 px-2 py-1">Résultat</th>
                    <th className="text-left text-encre-300 px-2 py-1">Contexte</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-800/50">
                    <td className="px-2 py-1 font-mono">echo "ini_set('display_errors', 1);" > /tmp/test.php</td>
                    <td className="px-2 py-1">Crée fichier test.php</td>
                    <td className="px-2 py-1">Fichier avec ini_set('display_errors', 1);</td>
                    <td className="px-2 py-1">Préparer un script de test</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="px-2 py-1 font-mono">echo "error_reporting(E_ALL);" >> /tmp/test.php</td>
                    <td className="px-2 py-1">Ajoute error_reporting(E_ALL) au fichier</td>
                    <td className="px-2 py-1">test.php contient maintenant 2 lignes</td>
                    <td className="px-2 py-1">Activer le reporting complet</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="px-2 py-1 font-mono">echo "echo \"Test\";" >> /tmp/test.php</td>
                    <td className="px-2 py-1">Ajoute echo "Test"; au fichier</td>
                    <td className="px-2 py-1">test.php a maintenant 3 lignes</td>
                    <td className="px-2 py-1">Test que PHP fonctionne</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="px-2 py-1 font-mono">php /tmp/test.php</td>
                    <td className="px-2 py-1">Exécute le script de test</td>
                    <td className="px-2 py-1">Affiche "Test" si pas d'erreur, sinon affiche l'erreur</td>
                    <td className="px-2 py-1">Vérifier que PHP fonctionne et affiche les erreurs</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-xs mt-2">
              <strong className="text-encre-300">Astuce :</strong> <code>>></code> ajoute à la fin du fichier, <code>></code> écrase le fichier
            </p>
          </div>

          {/* 7.5 Commandes système */}
          <div className="mb-4">
            <h4 className="text-encre-300 text-xs font-semibold mb-2 border-b border-gray-700 pb-1">
              🔧 7.5. SYSTÈME - Permissions et services
            </h4>
            <div className="overflow-x-auto">
              <table className="text-xs">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left text-encre-300 px-2 py-1">Commande</th>
                    <th className="text-left text-encre-300 px-2 py-1">À quoi ça sert ?</th>
                    <th className="text-left text-encre-300 px-2 py-1">Résultat</th>
                    <th className="text-left text-encre-300 px-2 py-1">Contexte</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-800/50">
                    <td className="px-2 py-1 font-mono">sudo systemctl restart php-fpm</td>
                    <td className="px-2 py-1">Redémarre PHP-FPM</td>
                    <td className="px-2 py-1">Recharge la configuration, vide l'OPcache</td>
                    <td className="px-2 py-1">Après modification de php.ini ou du code</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="px-2 py-1 font-mono">sudo systemctl restart nginx</td>
                    <td className="px-2 py-1">Redémarre Nginx</td>
                    <td className="px-2 py-1">Recharge la configuration du serveur web</td>
                    <td className="px-2 py-1">Après modification de nginx.conf</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="px-2 py-1 font-mono">sudo systemctl restart apache2</td>
                    <td className="px-2 py-1">Redémarre Apache</td>
                    <td className="px-2 py-1">Recharge la configuration du serveur web</td>
                    <td className="px-2 py-1">Après modification de apache2.conf</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="px-2 py-1 font-mono">ls -la var/log/ var/cache/</td>
                    <td className="px-2 py-1">Liste les fichiers/dossiers avec leurs permissions</td>
                    <td className="px-2 py-1">Ex: drwxr-xr-x 2 www-data www-data 4096 Jul 5 10:00 logs</td>
                    <td className="px-2 py-1">Vérifier les droits actuels</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="px-2 py-1 font-mono">chmod -R 775 var/log/ var/cache/</td>
                    <td className="px-2 py-1">Change les permissions en 775 récursivement</td>
                    <td className="px-2 py-1">Propriétaire et groupe: rwx, Autres: rx</td>
                    <td className="px-2 py-1">Corriger les erreurs de permissions</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="px-2 py-1 font-mono">whoami</td>
                    <td className="px-2 py-1">Affiche l'utilisateur courant</td>
                    <td className="px-2 py-1">Ex: www-data ou jules</td>
                    <td className="px-2 py-1">Vérifier sous quel utilisateur PHP s'exécute</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-xs mt-2">
              <strong className="text-encre-300">Astuce :</strong> <code>sudo</code> requis pour les commandes systemctl
            </p>
          </div>

          <div className="mt-4 text-blue-300 text-xs bg-blue-900/20 border border-blue-800/50 rounded px-3 py-2">
            💡 <strong>Astuce générale :</strong> <code>php -i | grep -i error</code> affiche TOUTES les directives liées aux erreurs avec leurs valeurs actuelles.
          </div>
        </div>

        {/* Section 8: Liens officiels */}
        <div className="bg-gray-900/40 border border-gray-800/50 rounded-lg px-4 py-3">
          <h3 className="text-encre-400 text-sm font-semibold mb-3">
            🔹 8. Documentation Officielle PHP.net
          </h3>
          
          <div className="space-y-2">
            <a 
              href="https://www.php.net/manual/en/errorfunc.configuration.php"
              className="block text-encre-300 text-xs hover:text-encre-200 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              📖 Error Handling Configuration
            </a>
            <a 
              href="https://www.php.net/manual/en/errorfunc.constants.php"
              className="block text-encre-300 text-xs hover:text-encre-200 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              📖 Predefined Error Constants
            </a>
            <a 
              href="https://www.php.net/manual/en/function.set-error-handler.php"
              className="block text-encre-300 text-xs hover:text-encre-200 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              📖 set_error_handler()
            </a>
            <a 
              href="https://www.php.net/manual/en/function.set-exception-handler.php"
              className="block text-encre-300 text-xs hover:text-encre-200 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              📖 set_exception_handler()
            </a>
            <a 
              href="https://www.php.net/manual/en/function.register-shutdown-function.php"
              className="block text-encre-300 text-xs hover:text-encre-200 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              📖 register_shutdown_function()
            </a>
          </div>
        </div>

        {/* Notice importante */}
        <div className="border border-green-900/30 bg-green-950/10 rounded-lg px-4 py-3">
          <p className="text-green-300 text-xs font-semibold mb-1">
            ✅ Bonnes pratiques PHP.net :
          </p>
          <ul className="text-green-200 text-xs space-y-1">
            <li>✓ Utiliser <code>E_ALL</code> ou <code>-1</code> en développement</li>
            <li>✓ Désactiver <code>display_errors</code> en production</li>
            <li>✓ Activer <code>log_errors</code> avec un fichier dédié en production</li>
            <li>✓ Utiliser <code>set_error_handler()</code> pour un logging personnalisé</li>
            <li>✓ Utiliser <code>set_exception_handler()</code> pour les exceptions non attrapées</li>
            <li>✓ Utiliser <code>register_shutdown_function()</code> pour capturer les erreurs fatales</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
