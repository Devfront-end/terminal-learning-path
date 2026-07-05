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
            <strong className="text-cyan-300">Action :</strong> Identifiez l'erreur racine dans les logs et corrigez-la !
          </p>
          <p className="text-gray-500 text-xs leading-5 mt-1">
            <strong className="text-cyan-300">Source :</strong> Bonnes pratiques PHP.net + expérience terrain
          </p>
        </div>

        {/* Section 1: Types d'erreurs */}
        <div className="bg-gray-900/40 border border-gray-800/50 rounded-lg px-4 py-3">
          <h3 className="text-cyan-400 text-sm font-semibold mb-3">
            🔹 1. Types d'erreurs PHP (Constantes prédéfinies)
          </h3>
          <p className="text-gray-400 text-xs mb-3">
            Niveaux d'erreurs définis par PHP. Utilisés avec <code>error_reporting()</code>.
          </p>
          
          <div className="overflow-x-auto">
            <table className="text-xs">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-cyan-300 px-2 py-1">Constante</th>
                  <th className="text-left text-cyan-300 px-2 py-1">Valeur</th>
                  <th className="text-left text-cyan-300 px-2 py-1">Description</th>
                  <th className="text-left text-cyan-300 px-2 py-1">Gérable ?</th>
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
                <tr><td className="px-2 py-1 font-semibold text-cyan-300">E_ALL</td><td className="px-2 py-1 font-semibold text-cyan-300">32767</td><td className="px-2 py-1 font-semibold text-cyan-300">Toutes les erreurs</td><td className="px-2 py-1 text-green-300">✅ Oui</td></tr>
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
          <h3 className="text-cyan-400 text-sm font-semibold mb-3">
            🔹 2. Directives de Reporting (error_reporting)
          </h3>
          
          <div className="overflow-x-auto">
            <table className="text-xs">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-cyan-300 px-2 py-1">Directive</th>
                  <th className="text-left text-cyan-300 px-2 py-1">Description</th>
                  <th className="text-left text-cyan-300 px-2 py-1">Valeurs</th>
                  <th className="text-left text-cyan-300 px-2 py-1">Défaut</th>
                  <th className="text-left text-cyan-300 px-2 py-1">Runtime</th>
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
            <strong className="text-cyan-300">Exemple de configuration :</strong>
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
          <h3 className="text-cyan-400 text-sm font-semibold mb-3">
            🔹 3. Directives d'Affichage
          </h3>
          
          <div className="overflow-x-auto">
            <table className="text-xs">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-cyan-300 px-2 py-1">Directive</th>
                  <th className="text-left text-cyan-300 px-2 py-1">Description</th>
                  <th className="text-left text-cyan-300 px-2 py-1">Valeurs</th>
                  <th className="text-left text-cyan-300 px-2 py-1">Défaut</th>
                  <th className="text-left text-cyan-300 px-2 py-1">Runtime</th>
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
          <h3 className="text-cyan-400 text-sm font-semibold mb-3">
            🔹 4. Directives de Journalisation
          </h3>
          
          <div className="overflow-x-auto">
            <table className="text-xs">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-cyan-300 px-2 py-1">Directive</th>
                  <th className="text-left text-cyan-300 px-2 py-1">Description</th>
                  <th className="text-left text-cyan-300 px-2 py-1">Valeurs</th>
                  <th className="text-left text-cyan-300 px-2 py-1">Défaut</th>
                  <th className="text-left text-cyan-300 px-2 py-1">Runtime</th>
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
                <strong className="text-cyan-300">set_error_handler() - Gestionnaire d'erreurs personnalisé :</strong>
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
                <strong className="text-cyan-300">set_exception_handler() - Gestionnaire d'exceptions :</strong>
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
                <strong className="text-cyan-300">register_shutdown_function() - Capturer les erreurs fatales :</strong>
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

        {/* Section 7: Commandes utiles */}
        <div className="bg-gray-900/40 border border-blue-800/50 rounded-lg px-4 py-3">
          <h3 className="text-blue-400 text-sm font-semibold mb-3">
            🔹 7. Commandes pour Vérifier la Configuration
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <code className="block bg-black/40 border border-blue-800 rounded px-3 py-2 text-blue-300 text-xs">
              php -i | grep -i error
            </code>
            <code className="block bg-black/40 border border-blue-800 rounded px-3 py-2 text-blue-300 text-xs">
              php -r "ini_get('error_reporting');"
            </code>
            <code className="block bg-black/40 border border-blue-800 rounded px-3 py-2 text-blue-300 text-xs">
              php -r "ini_get('display_errors');"
            </code>
            <code className="block bg-black/40 border border-blue-800 rounded px-3 py-2 text-blue-300 text-xs">
              phpinfo();  // Dans un script PHP
            </code>
          </div>
          
          <p className="text-gray-400 text-xs mt-3">
            <strong className="text-cyan-300">Astuce :</strong> <code>php -i | grep -i error</code> affiche TOUTES les directives liées aux erreurs avec leurs valeurs actuelles.
          </p>
        </div>

        {/* Section 8: Liens officiels */}
        <div className="bg-gray-900/40 border border-gray-800/50 rounded-lg px-4 py-3">
          <h3 className="text-cyan-400 text-sm font-semibold mb-3">
            🔹 8. Documentation Officielle PHP.net
          </h3>
          
          <div className="space-y-2">
            <a 
              href="https://www.php.net/manual/en/errorfunc.configuration.php"
              className="block text-cyan-300 text-xs hover:text-cyan-200 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              📖 Error Handling Configuration
            </a>
            <a 
              href="https://www.php.net/manual/en/errorfunc.constants.php"
              className="block text-cyan-300 text-xs hover:text-cyan-200 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              📖 Predefined Error Constants
            </a>
            <a 
              href="https://www.php.net/manual/en/function.set-error-handler.php"
              className="block text-cyan-300 text-xs hover:text-cyan-200 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              📖 set_error_handler()
            </a>
            <a 
              href="https://www.php.net/manual/en/function.set-exception-handler.php"
              className="block text-cyan-300 text-xs hover:text-cyan-200 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              📖 set_exception_handler()
            </a>
            <a 
              href="https://www.php.net/manual/en/function.register-shutdown-function.php"
              className="block text-cyan-300 text-xs hover:text-cyan-200 underline"
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
