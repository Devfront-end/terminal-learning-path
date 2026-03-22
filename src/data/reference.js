export const cdRows = [
  { cmd: 'pwd', desc: 'Affiche le répertoire courant', example: 'pwd', result: '/home/john_doe/projets' },
  { cmd: 'cd /chemin/absolu', desc: 'Va vers un chemin ABSOLU (commence par /)', example: 'cd /home/john_doe', result: "Vous allez dans /home/john_doe depuis n'importe où" },
  { cmd: 'cd chemin/relatif', desc: 'Va vers un chemin RELATIF (depuis position actuelle)', example: 'cd projets/my_project', result: 'Vous allez dans /home/john_doe/projets/my_project' },
  { cmd: 'cd .', desc: 'Reste dans le répertoire courant', example: 'cd .', result: 'Reste où vous êtes' },
  { cmd: 'cd ..', desc: "Remonte d'UN seul niveau", example: 'cd ..', result: 'De /home/john_doe/projets → /home/john_doe' },
  { cmd: 'cd ../..', desc: 'Remonte de DEUX niveaux', example: 'cd ../..', result: 'De /home/john_doe/projets → /home' },
  { cmd: 'cd ../../..', desc: 'Remonte de TROIS niveaux', example: 'cd ../../..', result: 'De /home/john_doe/projets/my_project → /' },
  { cmd: 'cd ~', desc: 'Retour au répertoire HOME', example: 'cd ~', result: 'Vous allez dans /home/john_doe' },
  { cmd: 'cd -', desc: 'Retour au répertoire PRÉCÉDENT', example: 'cd -', result: "Vous revenez d'où vous veniez" },
  { cmd: 'cd /', desc: 'Va à la racine du système', example: 'cd /', result: 'Vous allez au niveau le plus haut /' },
  { cmd: 'cd ~user', desc: "Va dans le home d'un autre utilisateur", example: 'cd ~root', result: 'Vous allez dans /root' },
];

export const findRows = [
  { cmd: 'find .', desc: 'Cherche TOUS les fichiers et dossiers depuis le répertoire courant', example: 'find .', result: 'Liste tout récursivement', note: 'Peut être très long! À combiner avec -type ou -name' },
  { cmd: 'find /chemin', desc: "Cherche à partir d'une location précise", example: 'find /home/john_doe', result: 'Récursif depuis /home/john_doe', note: 'find / = cherche dans TOUT le système (très lent)' },
  { cmd: '-type f', desc: 'Cherche SEULEMENT les fichiers', example: 'find . -type f', result: 'Liste tous les fichiers', note: 'f = file, d = directory, l = link' },
  { cmd: '-type d', desc: 'Cherche SEULEMENT les dossiers', example: 'find . -type d', result: 'Liste tous les répertoires', note: 'Utile pour cartographier la structure' },
  { cmd: '-name "pattern"', desc: 'Cherche par NOM EXACT ou wildcard', example: 'find . -name "*.php"', result: 'Tous les fichiers .php', note: '"*.php" avec guillemets! * = n\'importe quoi' },
  { cmd: '-iname "pattern"', desc: 'Même chose mais INSENSIBLE à la casse', example: 'find . -iname "*.PHP"', result: 'Trouve .php, .PHP, .Php', note: 'i = insensitive case' },
  { cmd: '-name "*test*"', desc: 'Cherche noms CONTENANT "test"', example: 'find . -name "*test*"', result: 'Trouve test.php, my_test.js...', note: 'Wildcards au début ET fin' },
  { cmd: '-path "*/models/*"', desc: 'Cherche dans un chemin CONTENANT "models"', example: 'find . -path "*/models/*"', result: 'Tous les fichiers dans un dossier "models"', note: 'Utile pour structures profondes' },
  { cmd: '-size +5M', desc: 'Cherche fichiers PLUS GRANDS que 5 MB', example: 'find . -size +5M', result: 'Gros fichiers', note: '+5M (plus grand), -5M (plus petit), 5M (exact)' },
  { cmd: '-mtime -7', desc: 'Cherche fichiers MODIFIÉS depuis 7 jours', example: 'find . -mtime -7', result: 'Fichiers récents', note: '-7 (moins de 7j), +7 (plus de 7j)' },
  { cmd: '-mmin -30', desc: 'Cherche fichiers modifiés dans les 30 DERNIÈRES MINUTES', example: 'find . -mmin -30', result: 'Très récent', note: 'mmin = minutes, mtime = jours' },
  { cmd: '-user username', desc: "Cherche fichiers POSSÉDÉS par un utilisateur", example: 'find . -user john_doe', result: 'Fichiers de john_doe', note: 'Inverse avec ! -user' },
  { cmd: '-perm 755', desc: 'Cherche fichiers avec PERMISSIONS exactes', example: 'find . -perm 755', result: 'Permissions rwxr-xr-x', note: 'Utile pour trouver scripts exécutables' },
  { cmd: '-exec CMD {} \\;', desc: 'EXÉCUTE une commande sur chaque résultat', example: 'find . -name "*.tmp" -exec rm {} \\;', result: 'Supprime tous les .tmp trouvés', note: '{} = fichier trouvé, \\; = fin' },
  { cmd: '-exec CMD {} +', desc: 'Variante plus efficace de -exec', example: 'find . -name "*.php" -exec echo {} +', result: 'Exécute CMD une fois avec TOUS les fichiers', note: 'Meilleur pour la performance' },
];

export const grepRows = [
  { cmd: 'grep "pattern" file', desc: 'Cherche du TEXTE EXACT dans un fichier', example: 'grep "error" log.txt', result: 'Affiche les lignes contenant "error"', note: 'Case-sensitive (majuscules ≠ minuscules)' },
  { cmd: 'grep -i "pattern"', desc: 'Cherche INSENSIBLE À LA CASSE', example: 'grep -i "ERROR" log.txt', result: 'Trouve "error", "Error", "ERROR"...', note: 'i = insensitive' },
  { cmd: 'grep "^pattern"', desc: 'Lignes qui COMMENCENT par le pattern', example: 'grep "^Error:" log.txt', result: 'Seulement lignes débutant par "Error:"', note: '^ = début de ligne (regex)' },
  { cmd: 'grep "pattern$"', desc: 'Lignes qui SE TERMINENT par le pattern', example: 'grep ".php$" list.txt', result: 'Seulement les lignes finissant en .php', note: '$ = fin de ligne (regex)' },
  { cmd: 'grep -n "pattern"', desc: 'Affiche le NUMÉRO DE LIGNE aussi', example: 'grep -n "TODO" code.php', result: '45: TODO - fix this bug', note: 'n = number (très utile!)' },
  { cmd: 'grep -c "pattern"', desc: 'COMPTE combien de lignes correspondent', example: 'grep -c "warning" log.txt', result: '23', note: 'c = count' },
  { cmd: 'grep -v "pattern"', desc: 'Affiche TOUT SAUF les lignes contenant le pattern', example: 'grep -v "^#" config.ini', result: 'Tous les paramètres non-commentés', note: 'v = inverse (exclude)' },
  { cmd: 'grep -E "regex"', desc: 'Utilise les EXPRESSIONS RÉGULIÈRES étendues', example: 'grep -E "^[0-9]+" log.txt', result: 'Lignes commençant par des chiffres', note: 'E = Extended regex' },
  { cmd: 'grep -r "pattern" .', desc: 'Cherche RÉCURSIVEMENT dans tous les fichiers', example: 'grep -r "validateField" .', result: 'Cherche dans tous les fichiers du dossier', note: 'r = recursive' },
  { cmd: 'grep -l "pattern"', desc: 'Affiche SEULEMENT LE NOM DES FICHIERS', example: 'grep -l "TODO" *.php', result: 'Liste des fichiers contenant le pattern', note: 'l = list (just filenames)' },
  { cmd: 'grep -H "pattern"', desc: 'Affiche le nom du fichier + la ligne', example: 'grep -H "error" *.log', result: 'access.log: error occurred here', note: 'H = filename Header' },
  { cmd: 'grep -A 3 "pattern"', desc: 'Pattern + 3 lignes APRÈS', example: 'grep -A 3 "Exception" log.txt', result: "L'erreur + contexte d'après", note: 'A = After' },
  { cmd: 'grep -B 3 "pattern"', desc: 'Pattern + 3 lignes AVANT', example: 'grep -B 3 "Exception" log.txt', result: "3 lignes précédentes + l'erreur", note: 'B = Before' },
  { cmd: 'grep -C 3 "pattern"', desc: 'Pattern + 3 AVANT + 3 APRÈS', example: 'grep -C 3 "Exception" log.txt', result: 'Contexte complet (6 lignes bonus)', note: 'C = Context' },
  { cmd: 'grep "p1\\|p2"', desc: 'Cherche PLUSIEURS patterns (OU logique)', example: 'grep "error\\|warning" log.txt', result: 'Toutes les lignes error ou warning', note: "Avec guillemets pour l'échappement" },
  { cmd: 'grep -E "p1|p2"', desc: 'OU logique avec regex étendu (plus lisible)', example: 'grep -E "error|warning" log.txt', result: 'Même résultat, plus lisible', note: 'Préférer -E pour le OU' },
  { cmd: 'cmd | grep "filter"', desc: "Pipe: filtre la sortie d'une autre commande", example: 'ls -la | grep ".php"', result: 'Seulement les fichiers .php dans ls', note: 'Combinaison très puissante!' },
];

export const findUsageRows = [
  { usage: 'Trouver tous les fichiers PHP du projet', cmd: 'find . -type f -name "*.php"', example: 'find /home/john_doe/projets/my_project -type f -name "*.php"', explain: 'Localise tous les sources PHP', result: '1000+ fichiers .php' },
  { usage: 'Trouver un fichier spécifique par nom', cmd: 'find . -type f -name "exact_filename"', example: 'find . -type f -name "validateField.php"', explain: 'Cherche le fichier contenant validateField()', result: 'Localisation du fichier' },
  { usage: 'Chercher les fichiers MODIFIÉS RÉCEMMENT', cmd: 'find . -type f -mtime -7', example: 'find /home/john_doe/projets/my_project -type f -mtime -7', explain: 'Vos modifications de la semaine', result: 'Fichiers sur lesquels vous travaillez' },
  { usage: 'Trouver les LOGS récents', cmd: 'find /var/log -type f -mtime -1', example: 'find /var/log -type f -mtime -1', explain: "Logs d'aujourd'hui pour debugger", result: 'Erreurs du jour' },
  { usage: 'Localiser les fichiers TEMPORAIRES à nettoyer', cmd: 'find . -name "*.tmp" -o -name "*.bak"', example: 'find /home/john_doe/projets -name "*.tmp"', explain: 'Trouve tous les fichiers temporaires', result: 'Attention avec -exec rm !' },
  { usage: 'Trouver les GROS fichiers (espace disque)', cmd: 'find . -type f -size +10M', example: 'find /home/john_doe/projets -type f -size +50M', explain: 'Identifie les fichiers volumineux', result: "Utile pour optimiser l'espace" },
  { usage: 'Chercher dans UN DOSSIER seulement (pas sous-dossiers)', cmd: 'find /chemin -maxdepth 1 -type f', example: 'find /home/john_doe -maxdepth 1 -type f', explain: 'Fichiers DIRECTS sans descendre', result: 'Évite de descendre trop profond' },
  { usage: 'Chercher EN EXCLUANT certaines extensions', cmd: 'find . -type f ! -name "*.log"', example: 'find . -type f ! -name "*.tmp" ! -name "*.bak"', explain: 'Tous les fichiers SAUF les tmp/bak', result: 'Dépannage ciblé' },
  { usage: 'Chercher et COMPTER les résultats', cmd: 'find . -name "pattern" | wc -l', example: 'find . -name "*.php" | wc -l', explain: 'Combien de fichiers PHP existent?', result: 'Utile pour statistiques' },
  { usage: 'Chercher ET AFFICHER LA TAILLE', cmd: 'find . -name "*.php" -exec ls -lh {} \\;', example: 'find /home/john_doe/projets -name "*.php" -exec ls -lh {} \\;', explain: 'Voit la taille de chaque PHP', result: 'Identifie les gros modules' },
  { usage: "Chercher fichiers PROPRIÉTÉ D'UN UTILISATEUR", cmd: 'find . -type f -user username', example: 'find /home/john_doe/projets -type f -user john_doe', explain: 'Mes fichiers personnels', result: 'Utilisé pour les audits' },
  { usage: 'Chercher fichiers avec PERMISSIONS DANGEREUSES', cmd: 'find . -type f -perm 777', example: 'find /home/john_doe/projets -type f -perm 777', explain: 'Fichiers world-writable (dangereux!)', result: 'Contrôle de sécurité' },
  { usage: 'Chercher et SUPPRIMER (ATTENTION!)', cmd: 'find . -type f -name "*.tmp" -exec rm {} \\;', example: 'find . -name "*.log" -exec rm {} +', explain: "Supprime les fichiers trouvés (IRRÉVERSIBLE!)", result: "Toujours tester d'abord sans -exec" },
  { usage: 'Chercher et COPIER les résultats', cmd: 'find . -name "*.php" -exec cp {} /dest/ \\;', example: 'find . -name "diagnostic_*.txt" -exec cp {} /backup/ +', explain: 'Sauvegarde tous les diagnostics', result: 'Utile pour les sauvegardes sélectives' },
];

export const grepUsageRows = [
  { usage: 'Trouver une FONCTION dans le code', cmd: 'grep -n "function_name" file.php', example: 'grep -n "validateField" models.php', explain: 'Localise où la fonction est définie', result: 'Line 142: function validateField($data)' },
  { usage: "Chercher où une FONCTION est UTILISÉE", cmd: 'grep -r "function_name(" .', example: 'grep -r "validateField(" *.php', explain: 'Tous les appels à la fonction', result: "Voit où c'est appelé (impact analysis)" },
  { usage: 'Déboguer: chercher les ERREURS dans un log', cmd: 'grep -i "error" log.txt', example: 'grep -i "error" /var/log/app.log', explain: "Toutes les lignes d'erreur", result: 'Liste des problèmes du jour' },
  { usage: "Voir le contexte AUTOUR d'une erreur", cmd: 'grep -B 5 -A 5 "error"', example: 'grep -B 5 -A 5 "NullPointerException" app.log', explain: "L'erreur + 5 lignes avant/après", result: "Comprend ce qui l'a causée" },
  { usage: "Compter combien d'erreurs aujourd'hui", cmd: 'grep -i -c "error" log.txt', example: 'grep -i -c "error" /var/log/app.log', explain: "Nombre total d'erreurs", result: '23 erreurs trouvées' },
  { usage: 'Exclure les lignes commentées', cmd: 'grep -v "^//" source.php', example: 'grep -v "^//" models.php', explain: 'Seulement le code actif', result: 'Voir la config sans commentaires' },
  { usage: 'Chercher une VARIABLE ou PARAMÈTRE', cmd: 'grep "\\$variable" code.php', example: 'grep "\\$result" models.php', explain: 'Tous les usages de $result', result: 'Voit comment la variable est utilisée' },
  { usage: 'Trouver les FICHIERS contenant un pattern', cmd: 'grep -l "pattern" *.php', example: 'grep -l "validateField" *.php', explain: 'Liste des fichiers utilisant validateField', result: 'models.php, validation.php, ...' },
  { usage: 'COMBINER find + grep (puissant!)', cmd: 'find . -name "*.php" | xargs grep "pattern"', example: 'find . -name "*.php" | xargs grep "validateField"', explain: 'Cherche dans TOUS les PHP récursivement', result: 'Très efficace pour les gros projets' },
  { usage: 'find avec exec et grep', cmd: 'find . -name "*.php" -exec grep -n "pattern" {} +', example: 'find . -name "*.php" -exec grep -n "TODO" {} +', explain: 'Même résultat, format différent', result: 'Affiche nom fichier + numéro ligne' },
  { usage: 'Voir les DIFFÉRENTS TYPES de messages', cmd: 'grep -E "^(error|warning|info):" log.txt', example: 'grep -E "^(error|warning|fatal):" app.log', explain: 'Classification des logs', result: 'Tous les types de messages' },
  { usage: 'Chercher avec REGEX date', cmd: 'grep -E "^[0-9]{4}-[0-9]{2}-[0-9]{2}" file.txt', example: 'grep -E "^[0-9]{4}-[0-9]{2}-[0-9]{2}" log.txt', explain: 'Lignes commençant par une DATE (YYYY-MM-DD)', result: 'Filtre temporel des logs' },
  { usage: "Compter les TYPES D'ERREURS uniques", cmd: 'grep "pattern" file.txt | sort | uniq -c', example: 'grep "error" app.log | sort | uniq -c', explain: "Compte chaque type d'erreur", result: 'Voit laquelle revient le plus' },
  { usage: 'Ignorer dossiers inutiles dans la recherche', cmd: 'grep -r "pattern" --exclude-dir=.git .', example: 'grep -r "validateField" --exclude="*.log" .', explain: 'Cherche mais ignore les logs/vendor', result: 'Surtout utile avec -r récursif' },
];

export const gitRows = [
  { cmd: 'git branch --list', desc: 'Liste toutes les branches locales', example: 'git branch --list', result: 'Liste des branches locales', note: 'Vérification de l\'état des branches' },
  { cmd: 'git log --oneline -5', desc: 'Affiche les 5 derniers commits en condensé', example: 'git log --oneline -5', result: 'Historique récent', note: 'Consultation des derniers commits' },
  { cmd: 'git log --oneline main | grep "hash"', desc: 'Cherche un commit spécifique dans l\'historique', example: 'git log --oneline main | grep "a1b2c3d"', result: 'Commit critique trouvé', note: 'Combine git log + grep' },
  { cmd: 'git log --oneline --all --graph', desc: 'Visualise toute la structure des branches', example: 'git log --oneline --all --graph', result: 'Historique complet avec branches', note: 'Vue arborescente du dépôt' },
  { cmd: 'git branch -d <branche>', desc: 'Supprime une branche déjà fusionnée', example: 'git branch -d bugfix/XXXX-description', result: 'Branche supprimée', note: 'Sécurisé — échoue si non fusionnée' },
  { cmd: 'git branch -D <branche>', desc: 'Force la suppression d\'une branche', example: 'git branch -D bugfix/XXXX-description', result: 'Force suppression', note: 'Dangereux — même si non fusionnée' },
  { cmd: 'git merge <branche>', desc: 'Fusionne une branche dans la branche courante', example: 'git merge bugfix/XXXX-description', result: 'Fusion effectuée', note: 'Intégration des modifications' },
  { cmd: 'git checkout main', desc: 'Bascule sur la branche principale', example: 'git checkout main', result: 'Branche main active', note: 'Ou git switch main (moderne)' },
  { cmd: 'git add <fichier>', desc: 'Indexe un fichier pour le prochain commit', example: 'git add .gitignore', result: 'Fichier indexé', note: 'Préparation validation' },
  { cmd: 'git commit -m "message"', desc: 'Crée un commit avec les fichiers indexés', example: 'git commit -m "Correction du fichier .gitignore"', result: 'Commit validé', note: 'Résolution conflit' },
  { cmd: 'git commit --allow-empty -m "msg"', desc: 'Commit de documentation sans changement de code', example: 'git commit --allow-empty -m "chore: précision fonctionnelle..."', result: 'Commit documentation', note: 'Utile pour documenter l\'historique' },
  { cmd: 'git push origin main', desc: 'Publie les commits locaux sur le dépôt distant', example: 'git push origin main', result: 'Historique mis à jour sur GitLab', note: 'Publication sur GitLab/GitHub' },
];

export const fileRows = [
  { cmd: 'cat fichier', desc: 'Affiche tout le contenu d\'un fichier', example: 'cat AppController.php', result: 'Contenu complet affiché', note: 'Attention aux gros fichiers' },
  { cmd: 'less fichier', desc: 'Affiche page par page (q pour quitter)', example: 'less error.log', result: 'Navigation interactive', note: 'Idéal pour les longs fichiers' },
  { cmd: 'head -N fichier', desc: 'Affiche les N premières lignes', example: 'head -20 fichier.php', result: '20 premières lignes', note: 'Défaut : 10 lignes' },
  { cmd: 'tail -N fichier', desc: 'Affiche les N dernières lignes', example: 'tail -50 fichier.log', result: '50 dernières lignes', note: 'Défaut : 10 lignes' },
  { cmd: 'tail -f fichier', desc: 'Suit un fichier en temps réel', example: 'tail -f error.log', result: 'Flux en direct (Ctrl+C pour arrêter)', note: 'Indispensable pour les logs serveur' },
];

export const sysRows = [
  { cmd: 'whoami', desc: 'Affiche l\'utilisateur courant', example: 'whoami', result: 'john_doe', note: 'Utile pour vérifier les droits' },
  { cmd: 'df -h', desc: 'Espace disque disponible (human-readable)', example: 'df -h', result: 'Tableau des partitions + espace libre', note: 'h = human-readable (Ko/Mo/Go)' },
  { cmd: 'du -sh dossier', desc: 'Taille totale d\'un dossier', example: 'du -sh my_project/', result: '124M\tmy_project/', note: 's = summary, h = human-readable' },
  { cmd: 'ps aux', desc: 'Liste tous les processus en cours', example: 'ps aux', result: 'USER PID %CPU %MEM COMMAND ...', note: 'Combiner avec grep : ps aux | grep php' },
];

export const permRows = [
  { cmd: 'ls -la', desc: 'Liste avec permissions, propriétaire, taille', example: 'ls -la', result: 'drwxr-xr-x  john_doe john_doe  Budget.php', note: '1er char : d=dossier, -=fichier' },
  { cmd: 'chmod 755 fichier', desc: 'rwxr-xr-x : owner tout, autres lecture+exec', example: 'chmod 755 deploy.sh', result: 'Script exécutable par tous', note: '7=rwx 5=r-x 4=r--' },
  { cmd: 'chmod 644 fichier', desc: 'rw-r--r-- : owner lecture+écriture, autres lecture', example: 'chmod 644 config.php', result: 'Fichier config standard', note: 'Permission la plus courante pour les fichiers' },
  { cmd: 'chmod 600 fichier', desc: 'rw------- : owner seulement', example: 'chmod 600 .env', result: 'Fichier privé (clés, secrets)', note: 'Pour les fichiers sensibles' },
  { cmd: 'chown user fichier', desc: 'Change le propriétaire d\'un fichier', example: 'chown john_doe config.php', result: 'Propriétaire modifié', note: 'Souvent avec sudo sur serveur' },
  { cmd: 'chown user:group fichier', desc: 'Change propriétaire ET groupe', example: 'chown www-data:www-data webroot/', result: 'Apache peut lire le dossier', note: 'Indispensable pour les serveurs web' },
];

export const gitWorkflowRows = [
  {
    desc: 'Fusion branche + résolution conflit .gitignore + push',
    cmds: [
      'git checkout main',
      'git merge bugfix/XXXX-description',
      'echo -e "backup\\nbackup\\napp/tmp/\\napp/tmp/*" > .gitignore',
      'git add .gitignore',
      'git commit -m "Correction du fichier .gitignore"',
      'git push origin main',
    ],
    result: 'Fusion réussie + résolution conflits + mise à jour',
  },
  {
    desc: 'Documenter un commit critique dans l\'historique',
    cmds: [
      'git commit --allow-empty -m "chore: précision fonctionnelle des commits a1b2c3d et e4f5g6h (fusion des branches bugfix/XXXX-description et bugfix/ticket-5678)"',
      'git push origin main',
    ],
    result: 'Historique documenté',
  },
  {
    desc: 'Nettoyer les branches après fusion',
    cmds: [
      'git branch -d bugfix/XXXX-description',
      'git branch -d bugfix/ticket-5678',
    ],
    result: 'Branches nettoyées',
  },
];
