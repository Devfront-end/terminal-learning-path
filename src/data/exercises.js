export const exercises = {
  // ── cd ──────────────────────────────────────────────────
  cd_abs: {
    category: 'cd', title: 'cd — chemin absolu',
    challenge: 'Allez dans /home/john_doe/projets/my_project/app/Model (chemin absolu)',
    hint: 'cd /home/john_doe/projets/my_project/app/Model',
    expectedPatterns: ['cd', '/home/john_doe/projets/my_project/app/Model'],
    successMessage: '✓ Navigation absolue réussie!',
    explanation: "Un chemin absolu commence toujours par /. Il fonctionne quel que soit le dossier courant. Utile quand on veut aller n'importe où sans se soucier de sa position actuelle."
  },
  cd_relative: {
    category: 'cd', title: 'cd — chemin relatif',
    challenge: 'Depuis /home/john_doe/projets, allez dans my_project/app (chemin relatif)',
    hint: 'cd my_project/app',
    expectedPatterns: ['cd', 'my_project'],
    successMessage: '✓ Chemin relatif maîtrisé!',
    explanation: "Un chemin relatif part de votre position actuelle. \"cd my_project/app\" depuis /home/john_doe/projets vous amène dans /home/john_doe/projets/my_project/app. Plus court à taper quand vous êtes déjà dans le bon secteur."
  },
  cd_parent: {
    category: 'cd', title: 'cd — remonter un niveau (cd ..)',
    challenge: 'Depuis /home/john_doe/projets, remontez d\'un niveau vers /home/john_doe',
    hint: 'cd ..',
    expectedPatterns: ['cd', '..'],
    successMessage: '✓ cd .. maîtrisé!',
    explanation: ".. désigne toujours le dossier parent. cd .. remonte d'un seul niveau. C'est l'une des commandes les plus utilisées en navigation Linux."
  },
  cd_parent2: {
    category: 'cd', title: 'cd — remonter deux niveaux (cd ../..)',
    challenge: 'Depuis /home/john_doe/projets/my_project, remontez de DEUX niveaux vers /home/john_doe',
    hint: 'cd ../..',
    expectedPatterns: ['cd', '../..'],
    successMessage: '✓ Deux niveaux remontés!',
    explanation: "../.. combine deux remontées: d'abord vers /home/john_doe/projets, puis vers /home/john_doe. On peut enchaîner autant de .. que nécessaire (../../.., etc.)."
  },
  cd_home: {
    category: 'cd', title: 'cd ~ — retour au home',
    challenge: 'Peu importe où vous êtes, revenez dans votre home /home/john_doe',
    hint: 'cd ~',
    expectedPatterns: ['cd', '~'],
    successMessage: '✓ cd ~ vous ramène toujours chez vous!',
    explanation: "~ est un raccourci qui représente votre répertoire personnel. cd ~ est équivalent à cd /home/john_doe. Fonctionne depuis n'importe où dans le système."
  },
  cd_prev: {
    category: 'cd', title: 'cd - — répertoire précédent',
    challenge: 'Vous étiez dans /home/john_doe/projets, puis vous avez navigué ailleurs. Revenez-y avec cd -',
    hint: 'cd -',
    expectedPatterns: ['cd', '-'],
    successMessage: '✓ cd - est parfait pour alterner entre 2 dossiers!',
    explanation: "cd - revient dans le DERNIER dossier visité. C'est comme le bouton \"précédent\" d'un navigateur. Très utile pour alterner entre deux répertoires distants sans retaper les chemins."
  },
  cd_root: {
    category: 'cd', title: 'cd / — racine du système',
    challenge: 'Allez à la racine du système de fichiers',
    hint: 'cd /',
    expectedPatterns: ['cd', '/'],
    successMessage: '✓ Vous êtes à la racine /!',
    explanation: "/ est la racine absolue du système Linux. Tout le système de fichiers part de là: /home, /var, /etc, /usr... En tapant cd / vous pouvez ensuite explorer toute l'arborescence."
  },
  cd_dot: {
    category: 'cd', title: 'pwd — afficher le répertoire courant',
    challenge: 'Affichez le chemin complet du répertoire où vous êtes actuellement',
    hint: 'pwd',
    expectedPatterns: ['pwd'],
    successMessage: '✓ pwd = Print Working Directory!',
    explanation: "pwd affiche le chemin absolu complet de votre position actuelle. Utile quand vous vous perdez dans l'arborescence ou avant de créer un fichier pour confirmer où vous êtes."
  },

  // ── find ─────────────────────────────────────────────────
  find_php: {
    category: 'find', title: 'find — tous les fichiers .php',
    challenge: 'Trouvez tous les fichiers .php dans /home/john_doe/projets/my_project',
    hint: 'find /home/john_doe/projets/my_project -type f -name "*.php"',
    expectedPatterns: ['find', '.php', '-name'],
    successMessage: '✓ Tous les PHP trouvés!',
    explanation: "-type f limite aux fichiers (exclut les dossiers). -name \"*.php\" filtre par extension. Le * est un wildcard qui remplace n'importe quelle séquence de caractères. Sans les guillemets, le shell interpréterait le * avant find."
  },
  find_type_d: {
    category: 'find', title: 'find — lister seulement les dossiers',
    challenge: 'Listez tous les DOSSIERS (pas les fichiers) dans /home/john_doe/projets/my_project',
    hint: 'find /home/john_doe/projets/my_project -type d',
    expectedPatterns: ['find', '-type', 'd'],
    successMessage: '✓ Structure de dossiers affichée!',
    explanation: "-type d sélectionne uniquement les répertoires (d = directory). Parfait pour cartographier la structure d'un projet sans être noyé par les fichiers. f = file, d = directory, l = symlink."
  },
  find_mtime: {
    category: 'find', title: 'find — fichiers modifiés récemment',
    challenge: 'Trouvez tous les fichiers modifiés dans les 7 derniers jours dans /home/john_doe/projets',
    hint: 'find /home/john_doe/projets -type f -mtime -7',
    expectedPatterns: ['find', '-mtime', '-7'],
    successMessage: '✓ Fichiers récents trouvés!',
    explanation: "-mtime -7 signifie \"modifié il y a MOINS de 7 jours\". Le - devant 7 est important: -7 (moins de 7j), +7 (plus de 7j), 7 (exactement 7j). Très utile pour retrouver sur quoi vous travailliez."
  },
  find_size: {
    category: 'find', title: 'find — gros fichiers',
    challenge: 'Trouvez tous les fichiers de plus de 10 MB dans /home/john_doe',
    hint: 'find /home/john_doe -type f -size +10M',
    expectedPatterns: ['find', '-size', '+10M'],
    successMessage: '✓ Gros fichiers identifiés!',
    explanation: "-size +10M cherche les fichiers de plus de 10 mégaoctets. +10M = plus grand, -10M = plus petit, 10M = exactement. Unités: c (bytes), k (KB), M (MB), G (GB). Utile pour libérer de l'espace disque."
  },
  find_iname: {
    category: 'find', title: 'find — insensible à la casse (-iname)',
    challenge: 'Trouvez tous les fichiers README (peu importe majuscules/minuscules) dans /home/john_doe/projets',
    hint: 'find /home/john_doe/projets -type f -iname "readme*"',
    expectedPatterns: ['find', '-iname'],
    successMessage: '✓ -iname ignore la casse!',
    explanation: "-iname est comme -name mais insensible à la casse. Trouve README.md, readme.md, Readme.txt, etc. Le i = insensitive. Très utile dans des projets mixant Linux/Windows où les conventions de nommage varient."
  },
  find_maxdepth: {
    category: 'find', title: 'find — limiter la profondeur (-maxdepth)',
    challenge: 'Listez seulement les fichiers DIRECTEMENT dans /home/john_doe/projets (sans descendre dans les sous-dossiers)',
    hint: 'find /home/john_doe/projets -maxdepth 1 -type f',
    expectedPatterns: ['find', '-maxdepth'],
    successMessage: '✓ -maxdepth évite de trop descendre!',
    explanation: "-maxdepth 1 limite find au dossier lui-même sans rentrer dans les sous-dossiers. -maxdepth 2 descendrait d'un niveau. Sans cette option, find est récursif à l'infini, ce qui peut être très lent sur de gros projets."
  },
  find_exclude: {
    category: 'find', title: 'find — exclure des fichiers (! -name)',
    challenge: 'Listez tous les fichiers de /home/john_doe/projets/my_project SAUF les fichiers .log',
    hint: 'find /home/john_doe/projets/my_project -type f ! -name "*.log"',
    expectedPatterns: ['find', '!', '-name'],
    successMessage: '✓ Exclusion maîtrisée!',
    explanation: "Le ! devant une condition signifie NOT (inverse). \"! -name '*.log'\" = tous sauf les .log. On peut chaîner plusieurs exclusions: ! -name \"*.log\" ! -name \"*.tmp\". Très utile pour ignorer les fichiers générés automatiquement."
  },
  find_count: {
    category: 'find', title: 'find — compter les résultats (| wc -l)',
    challenge: 'Comptez combien de fichiers .php existent dans /home/john_doe/projets/my_project',
    hint: 'find /home/john_doe/projets/my_project -name "*.php" | wc -l',
    expectedPatterns: ['find', '.php', 'wc'],
    successMessage: '✓ Pipe + wc -l = comptage!',
    explanation: "Le pipe | envoie la sortie de find vers wc -l. wc = word count, -l = lines (lignes). Chaque fichier trouvé = une ligne = un résultat compté. Technique essentielle: combiner des commandes avec des pipes pour créer des outils puissants."
  },
  find_exec: {
    category: 'find', title: 'find — exécuter une action (-exec)',
    challenge: 'Trouvez tous les fichiers .tmp dans /home/john_doe/projets et affichez leur taille avec ls -lh',
    hint: 'find /home/john_doe/projets -name "*.tmp" -exec ls -lh {} \\;',
    expectedPatterns: ['find', '-exec', 'ls'],
    successMessage: '✓ -exec est très puissant!',
    explanation: "-exec permet d'exécuter une commande sur chaque fichier trouvé. {} est remplacé par le nom du fichier. \\; termine la commande (-exec ... {} \\;). Alternative: {} + regroupe tous les fichiers en un seul appel (plus efficace)."
  },

  // ── grep ─────────────────────────────────────────────────
  grep_r: {
    category: 'grep', title: 'grep -r — chercher récursivement',
    challenge: 'Cherchez le mot "validateField" dans TOUS les fichiers de /home/john_doe/projets/my_project',
    hint: 'grep -r "validateField" /home/john_doe/projets/my_project',
    expectedPatterns: ['grep', '-r', 'validateField'],
    successMessage: '✓ Recherche récursive réussie!',
    explanation: "-r (recursive) parcourt tous les sous-dossiers. Sans -r, grep ne cherche que dans les fichiers directement listés. C'est la commande idéale pour faire une \"recherche dans tout le projet\" comme dans un IDE."
  },
  grep_n: {
    category: 'grep', title: 'grep -n — afficher les numéros de lignes',
    challenge: 'Cherchez "function" dans models.php et affichez les numéros de lignes',
    hint: 'grep -n "function" models.php',
    expectedPatterns: ['grep', '-n', 'function'],
    successMessage: '✓ -n affiche les numéros de ligne!',
    explanation: "-n préfixe chaque résultat avec son numéro de ligne (ex: 42: function validateField()). Indispensable en débogage pour savoir exactement où aller dans le fichier. Combine parfaitement avec -r: grep -rn \"pattern\" ."
  },
  grep_i: {
    category: 'grep', title: 'grep -i — insensible à la casse',
    challenge: 'Cherchez "error" dans app.log sans tenir compte des majuscules (Error, ERROR, error...)',
    hint: 'grep -i "error" app.log',
    expectedPatterns: ['grep', '-i', 'error'],
    successMessage: '✓ -i ignore majuscules/minuscules!',
    explanation: '-i = insensitive. Trouve "error", "Error", "ERROR", "eRrOr"... Essentiel pour chercher dans des logs qui mélangent les conventions. Peut se combiner: grep -ri "error" . (récursif + insensible).'
  },
  grep_v: {
    category: 'grep', title: 'grep -v — inverser (exclure)',
    challenge: 'Affichez toutes les lignes de config.php SAUF les commentaires (qui commencent par //)',
    hint: 'grep -v "^//" config.php',
    expectedPatterns: ['grep', '-v'],
    successMessage: '✓ -v inverse la sélection!',
    explanation: '-v (invert) affiche les lignes qui NE correspondent PAS au pattern. "^//" signifie "commence par //". Utile pour filtrer les commentaires, les lignes vides (grep -v "^$"), ou exclure des résultats parasites.'
  },
  grep_c: {
    category: 'grep', title: 'grep -c — compter les occurrences',
    challenge: 'Comptez combien de lignes contiennent "error" dans app.log (insensible à la casse)',
    hint: 'grep -ic "error" app.log',
    expectedPatterns: ['grep', '-c'],
    successMessage: '✓ -c compte au lieu d\'afficher!',
    explanation: "-c (count) retourne juste le NOMBRE de lignes correspondantes, pas les lignes elles-mêmes. Parfait pour des statistiques rapides: \"combien d'erreurs aujourd'hui?\". Avec -r, affiche le compte par fichier."
  },
  grep_l: {
    category: 'grep', title: 'grep -l — lister les fichiers correspondants',
    challenge: 'Trouvez quels fichiers .php contiennent le mot "validateField" (afficher seulement les noms)',
    hint: 'grep -l "validateField" *.php',
    expectedPatterns: ['grep', '-l', 'validateField'],
    successMessage: '✓ -l = liste des fichiers seulement!',
    explanation: "-l (list) n'affiche que les NOMS DES FICHIERS qui contiennent le pattern, pas les lignes. Très utile pour savoir \"dans quels fichiers dois-je chercher?\" avant de faire une analyse plus fine. Inverse: -L = fichiers qui ne contiennent PAS le pattern."
  },
  grep_context: {
    category: 'grep', title: 'grep -C — afficher le contexte',
    challenge: 'Cherchez "Exception" dans app.log et affichez 3 lignes de contexte avant ET après chaque occurrence',
    hint: 'grep -C 3 "Exception" app.log',
    expectedPatterns: ['grep', '-C'],
    successMessage: '✓ -C affiche le contexte autour des résultats!',
    explanation: "-C 3 (Context) affiche 3 lignes avant ET après chaque match. -A 3 = After (après seulement). -B 3 = Before (avant seulement). Essentiel pour comprendre POURQUOI une erreur s'est produite — le contexte révèle la cause."
  },
  grep_pipe: {
    category: 'grep', title: 'grep avec pipe — filtrer une commande',
    challenge: 'Listez les fichiers du dossier courant et filtrez pour n\'afficher que ceux se terminant par .php',
    hint: 'ls -la | grep "\\.php"',
    expectedPatterns: ['ls', '|', 'grep'],
    successMessage: '✓ Pipe + grep = filtrage puissant!',
    explanation: 'Le pipe | envoie la sortie d\'une commande comme entrée de grep. Ici ls -la liste tout, grep filtre les .php. Cette technique fonctionne avec n\'importe quelle commande: ps aux | grep nginx, cat log.txt | grep error, etc.'
  },
  grep_find: {
    category: 'grep', title: 'find + grep — recherche combinée',
    challenge: 'Cherchez "validateField" dans TOUS les fichiers .php du projet (combinaison find + xargs + grep)',
    hint: 'find /home/john_doe/projets/my_project -name "*.php" | xargs grep "validateField"',
    expectedPatterns: ['find', 'xargs', 'grep'],
    successMessage: '✓ find + xargs + grep = combo ultime!',
    explanation: "find liste les fichiers PHP, xargs passe cette liste à grep. C'est plus flexible que grep -r car find peut filtrer par date, taille, permissions AVANT que grep cherche dans les résultats. xargs optimise aussi les appels en les regroupant."
  },

  // ── git ──────────────────────────────────────────────────
  git_init: {
    category: 'git', title: 'git init — initialiser un dépôt',
    challenge: 'Initialisez un nouveau dépôt Git dans le dossier courant',
    hint: 'git init',
    expectedPatterns: ['git', 'init'],
    successMessage: '✓ Dépôt Git initialisé !',
    explanation: "git init crée un dossier caché .git qui contient toute l'histoire du projet. À faire une seule fois au démarrage. Sans git init, aucune commande git ne fonctionnera dans ce dossier."
  },
  git_status: {
    category: 'git', title: 'git status — voir l\'état',
    challenge: 'Affichez l\'état actuel du dépôt (fichiers modifiés, en attente de commit...)',
    hint: 'git status',
    expectedPatterns: ['git', 'status'],
    successMessage: '✓ git status, votre meilleur ami !',
    explanation: "git status montre : les fichiers modifiés non stagés (rouge), les fichiers stagés prêts à commiter (vert), et les fichiers non suivis. À utiliser constamment pour savoir où on en est avant de commiter."
  },
  git_add_file: {
    category: 'git', title: 'git add — ajouter un fichier',
    challenge: 'Ajoutez le fichier index.php à la zone de préparation (préparation au commit)',
    hint: 'git add index.php',
    expectedPatterns: ['git', 'add', 'index.php'],
    successMessage: '✓ Fichier ajouté !',
    explanation: "git add place un fichier dans la zone de préparation (index). C'est une étape intermédiaire entre la modification et le commit. Cela vous permet de choisir précisément quels changements inclure dans le prochain commit."
  },
  git_add_all: {
    category: 'git', title: 'git add . — ajouter tous les fichiers',
    challenge: 'Ajoutez TOUS les fichiers modifiés à la préparation d\'un seul coup',
    hint: 'git add .',
    expectedPatterns: ['git', 'add', '.'],
    successMessage: '✓ Tout ajouté !',
    explanation: "git add . ajoute tous les fichiers modifiés et nouveaux du dossier courant. Le . désigne le répertoire courant. Pratique pour commiter tout d'un coup, mais attention à ne pas inclure des fichiers sensibles (.env, secrets)."
  },
  git_commit: {
    category: 'git', title: 'git commit — créer un commit',
    challenge: 'Créez un commit avec le message "feat: ajout page accueil"',
    hint: 'git commit -m "feat: ajout page accueil"',
    expectedPatterns: ['git', 'commit', '-m'],
    successMessage: '✓ Commit créé !',
    explanation: "git commit -m enregistre un snapshot de vos changements stagés. Le message doit être court et descriptif. Convention courante : feat: (nouvelle feature), fix: (bug), refactor: (refactoring), docs: (documentation). Chaque commit est identifié par un hash unique."
  },
  git_log: {
    category: 'git', title: 'git log — voir l\'historique',
    challenge: 'Affichez l\'historique complet des commits du dépôt',
    hint: 'git log',
    expectedPatterns: ['git', 'log'],
    successMessage: '✓ Historique affiché !',
    explanation: "git log affiche tous les commits avec leur hash, auteur, date et message. Tapez q pour quitter. Options utiles : --oneline (compact), --graph (visualiser les branches), -5 (5 derniers commits), --author=\"nom\" (filtrer par auteur)."
  },
  git_log_oneline: {
    category: 'git', title: 'git log --oneline — historique compact',
    challenge: 'Affichez l\'historique en mode compact (un commit par ligne)',
    hint: 'git log --oneline',
    expectedPatterns: ['git', 'log', '--oneline'],
    successMessage: '✓ Vue compacte très pratique !',
    explanation: "--oneline affiche chaque commit sur une seule ligne : hash court + message. Bien plus lisible que git log classique quand l'historique est long. Combine avec --graph pour visualiser les branches : git log --oneline --graph."
  },
  git_diff: {
    category: 'git', title: 'git diff — voir les modifications',
    challenge: 'Affichez les différences entre vos fichiers modifiés et le dernier commit',
    hint: 'git diff',
    expectedPatterns: ['git', 'diff'],
    successMessage: '✓ Diff affiché !',
    explanation: "git diff montre les lignes ajoutées (+, en vert) et supprimées (-, en rouge) depuis le dernier commit. Ne montre que les fichiers NON ajoutés. Pour voir les fichiers ajoutés : git diff --cached. Pour comparer deux branches : git diff main..feature."
  },
  git_branch: {
    category: 'git', title: 'git branch — créer une branche',
    challenge: 'Créez une nouvelle branche appelée "feature/login"',
    hint: 'git branch feature/login',
    expectedPatterns: ['git', 'branch', 'feature/login'],
    successMessage: '✓ Branche créée !',
    explanation: "git branch crée une branche mais ne bascule pas dessus. Une branche est un pointeur vers un commit — elle permet de travailler en parallèle sans affecter main. Convention : feature/ (nouvelle fonctionnalité), fix/ (correction), hotfix/ (urgence)."
  },
  git_checkout_b: {
    category: 'git', title: 'git checkout -b — créer et basculer',
    challenge: 'Créez la branche "fix/navbar" ET basculez dessus en une seule commande',
    hint: 'git checkout -b fix/navbar',
    expectedPatterns: ['git', 'checkout', '-b', 'fix/navbar'],
    successMessage: '✓ Branche créée et activée !',
    explanation: "git checkout -b = git branch + git checkout en une seule commande. C'est la façon la plus rapide de démarrer une nouvelle branche. Équivalent moderne : git switch -c fix/navbar. Vérifiez avec git branch que vous êtes bien sur la bonne branche."
  },
  git_checkout: {
    category: 'git', title: 'git checkout — changer de branche',
    challenge: 'Basculez sur la branche "main"',
    hint: 'git checkout main',
    expectedPatterns: ['git', 'checkout', 'main'],
    successMessage: '✓ Branche changée !',
    explanation: "git checkout main bascule vers la branche main. Avant de changer de branche, assurez-vous d'avoir commité ou stagé vos changements (git stash si besoin). Équivalent moderne : git switch main."
  },
  git_merge: {
    category: 'git', title: 'git merge — fusionner une branche',
    challenge: 'Fusionnez la branche "feature/login" dans la branche courante',
    hint: 'git merge feature/login',
    expectedPatterns: ['git', 'merge', 'feature/login'],
    successMessage: '✓ Fusion réussie !',
    explanation: "git merge intègre les commits d'une branche dans la branche courante. Si les modifications ne se chevauchent pas, c'est un fast-forward (pas de commit de merge). En cas de conflit, Git marque les fichiers et vous devez les résoudre manuellement, puis git add + git commit."
  },
  git_pull: {
    category: 'git', title: 'git pull — récupérer les modifications',
    challenge: 'Récupérez et intégrez les derniers commits du dépôt distant (origin/main)',
    hint: 'git pull origin main',
    expectedPatterns: ['git', 'pull'],
    successMessage: '✓ Synchronisé avec le distant !',
    explanation: "git pull = git fetch + git merge. Il télécharge les nouveaux commits du serveur distant ET les intègre dans votre branche locale. À faire avant de commencer à travailler pour partir d'une base à jour. git pull --rebase est souvent préféré pour éviter les commits de merge inutiles."
  },
  git_push: {
    category: 'git', title: 'git push — envoyer ses commits',
    challenge: 'Envoyez vos commits locaux vers le dépôt distant (origin main)',
    hint: 'git push origin main',
    expectedPatterns: ['git', 'push'],
    successMessage: '✓ Commits envoyés !',
    explanation: "git push envoie vos commits locaux vers le serveur distant (GitHub, GitLab...). Si la branche n'existe pas encore en remote, utilisez --set-upstream (ou -u) : git push -u origin ma-branche. Ne jamais force-pusher (--force) sur main sans coordination avec l'équipe."
  },
  git_clone: {
    category: 'git', title: 'git clone — cloner un dépôt',
    challenge: 'Clonez le dépôt https://github.com/user/projet.git dans le dossier courant',
    hint: 'git clone https://github.com/user/projet.git',
    expectedPatterns: ['git', 'clone', 'github.com'],
    successMessage: '✓ Dépôt cloné !',
    explanation: "git clone télécharge un dépôt entier (code + historique complet). Crée automatiquement le dossier et configure origin (pointeur vers le dépôt distant). Après le clone, vous avez une copie locale complète et pouvez travailler hors ligne."
  },
  git_stash: {
    category: 'git', title: 'git stash — mettre de côté',
    challenge: 'Mettez vos modifications en cours de côté sans les commiter (pour changer de branche)',
    hint: 'git stash',
    expectedPatterns: ['git', 'stash'],
    successMessage: '✓ Modifications mises de côté !',
    explanation: "git stash sauvegarde vos modifications non commitées dans une pile temporaire et nettoie votre working directory. Pratique pour switcher de branche en urgence. Pour récupérer : git stash pop (restaure et supprime) ou git stash apply (restaure sans supprimer). git stash list montre tous les stashs."
  },
  git_reset: {
    category: 'git', title: 'git reset HEAD -- — déstaguer un fichier',
    challenge: 'Retirez index.php de la zone de staging (sans supprimer vos modifications)',
    hint: 'git reset HEAD -- index.php',
    expectedPatterns: ['git', 'reset', 'index.php'],
    successMessage: '✓ Fichier déstagé !',
    explanation: "git reset HEAD -- fichier retire un fichier du staging sans toucher aux modifications dans le fichier. C'est l'inverse de git add. Utile si vous avez accidentellement stagé un fichier que vous ne voulez pas inclure dans ce commit."
  },
  git_revert: {
    category: 'git', title: 'git revert — annuler un commit',
    challenge: 'Annulez le dernier commit en créant un nouveau commit d\'annulation (HEAD)',
    hint: 'git revert HEAD',
    expectedPatterns: ['git', 'revert', 'HEAD'],
    successMessage: '✓ Commit annulé proprement !',
    explanation: "git revert crée un NOUVEAU commit qui annule les changements d'un commit précédent. C'est la méthode sûre pour annuler en gardant l'historique intact — indispensable sur une branche partagée. Différent de git reset qui réécrit l'historique (dangereux en équipe)."
  },

  // ── git remote ───────────────────────────────────────────
  git_remote_v: {
    category: 'git-remote', title: 'git remote -v — voir les dépôts distants',
    challenge: 'Affichez la liste de tous les dépôts distants configurés avec leurs URLs',
    hint: 'git remote -v',
    expectedPatterns: ['git', 'remote', '-v'],
    successMessage: '✓ Dépôts distants listés !',
    explanation: "git remote -v liste tous les remotes avec leurs URLs (fetch et push). Par défaut, un clone crée un remote nommé \"origin\". Vous pouvez avoir plusieurs remotes : upstream (le projet original), origin (votre fork), etc."
  },
  git_remote_add: {
    category: 'git-remote', title: 'git remote add — ajouter un dépôt distant',
    challenge: 'Ajoutez un dépôt distant nommé "origin" pointant vers https://github.com/user/projet.git',
    hint: 'git remote add origin https://github.com/user/projet.git',
    expectedPatterns: ['git', 'remote', 'add', 'origin'],
    successMessage: '✓ Remote ajouté !',
    explanation: "git remote add crée un raccourci (alias) vers un dépôt distant. \"origin\" est la convention pour le dépôt principal. Après git init + git remote add, vous pouvez faire git push origin main pour envoyer vos commits."
  },
  git_fetch: {
    category: 'git-remote', title: 'git fetch — récupérer sans merger',
    challenge: 'Téléchargez les nouveaux commits d\'origin sans les intégrer dans votre branche locale',
    hint: 'git fetch origin',
    expectedPatterns: ['git', 'fetch'],
    successMessage: '✓ Commits téléchargés (sans merge) !',
    explanation: "git fetch télécharge les nouveaux commits du distant SANS modifier votre branche locale. Contrairement à git pull, vous pouvez inspecter les changements avant de les intégrer : git diff main origin/main. C'est la commande la plus sûre pour voir ce qui a changé."
  },
  git_push_u: {
    category: 'git-remote', title: 'git push -u — pousser et configurer l\'upstream',
    challenge: 'Poussez la branche "feature/login" vers origin ET configurez le tracking automatique',
    hint: 'git push -u origin feature/login',
    expectedPatterns: ['git', 'push', '-u', 'origin'],
    successMessage: '✓ Branche poussée et tracking configuré !',
    explanation: "-u (ou --set-upstream) configure la branche distante comme référence par défaut. Après ça, git push et git pull sans arguments fonctionneront automatiquement sur cette branche. À faire une seule fois par branche lors du premier push."
  },
  git_remote_remove: {
    category: 'git-remote', title: 'git remote remove — supprimer un remote',
    challenge: 'Supprimez le dépôt distant nommé "old-origin"',
    hint: 'git remote remove old-origin',
    expectedPatterns: ['git', 'remote', 'remove'],
    successMessage: '✓ Remote supprimé !',
    explanation: "git remote remove (ou git remote rm) supprime la référence au dépôt distant — il ne supprime pas le dépôt lui-même, seulement le lien local. Utile quand vous déplacez votre repo vers un autre service (GitHub → GitLab par ex)."
  },
  git_remote_rename: {
    category: 'git-remote', title: 'git remote rename — renommer un remote',
    challenge: 'Renommez le remote "origin" en "github"',
    hint: 'git remote rename origin github',
    expectedPatterns: ['git', 'remote', 'rename', 'origin'],
    successMessage: '✓ Remote renommé !',
    explanation: "git remote rename change l'alias local d'un dépôt distant. Pratique quand on travaille avec plusieurs remotes (GitHub + GitLab) pour avoir des noms plus explicites que \"origin\"."
  },
  git_remote_set_url: {
    category: 'git-remote', title: 'git remote set-url — changer l\'URL',
    challenge: 'Changez l\'URL du remote "origin" vers https://github.com/new-user/projet.git',
    hint: 'git remote set-url origin https://github.com/new-user/projet.git',
    expectedPatterns: ['git', 'remote', 'set-url', 'origin'],
    successMessage: '✓ URL mise à jour !',
    explanation: "git remote set-url modifie l'URL d'un remote existant sans le supprimer/recréer. Utile lors d'un transfert de repo, d'un renommage de compte, ou pour passer de HTTPS à SSH (git remote set-url origin git@github.com:user/projet.git)."
  },
  git_pull_rebase: {
    category: 'git-remote', title: 'git pull --rebase — synchroniser sans commit de merge',
    challenge: 'Récupérez les derniers commits d\'origin/main en rebasant votre travail par-dessus',
    hint: 'git pull --rebase origin main',
    expectedPatterns: ['git', 'pull', '--rebase'],
    successMessage: '✓ Rebase au lieu de merge !',
    explanation: "git pull --rebase rejoue vos commits locaux par-dessus les commits distants au lieu de créer un commit de merge. L'historique reste linéaire et plus lisible. Recommandé quand vous travaillez en équipe pour éviter les \"Merge branch main into main\" parasites."
  },

  // ── JavaScript ───────────────────────────────────────────
  js_map: {
    category: 'js', title: 'Array.map() — transformer un tableau',
    challenge: 'Utilisez .map() pour doubler chaque nombre du tableau [1, 2, 3]',
    hint: '[1, 2, 3].map(x => x * 2)',
    expectedPatterns: ['.map(', '=>'],
    successMessage: '✓ .map() retourne un nouveau tableau !',
    explanation: ".map() applique une fonction à chaque élément et retourne un NOUVEAU tableau de même longueur. L'original n'est pas modifié. C'est l'une des méthodes les plus utilisées en JavaScript moderne."
  },
  js_filter: {
    category: 'js', title: 'Array.filter() — filtrer un tableau',
    challenge: 'Filtrez le tableau [1, 2, 3, 4, 5] pour ne garder que les nombres supérieurs à 2',
    hint: '[1, 2, 3, 4, 5].filter(x => x > 2)',
    expectedPatterns: ['.filter(', '=>'],
    successMessage: '✓ .filter() garde les éléments qui satisfont la condition !',
    explanation: ".filter() retourne un nouveau tableau contenant seulement les éléments pour lesquels la fonction retourne true. Si aucun élément ne correspond, retourne un tableau vide []."
  },
  js_reduce: {
    category: 'js', title: 'Array.reduce() — réduire un tableau',
    challenge: 'Utilisez .reduce() pour sommer tous les éléments de [1, 2, 3, 4]',
    hint: '[1, 2, 3, 4].reduce((acc, x) => acc + x, 0)',
    expectedPatterns: ['.reduce(', 'acc', '=>'],
    successMessage: '✓ .reduce() accumule une valeur à partir du tableau !',
    explanation: ".reduce() prend une fonction (accumulateur, valeur) et une valeur initiale. Idéal pour sommer, construire un objet, ou aplatir des données. Plus puissant que .map() ou .filter()."
  },
  js_find: {
    category: 'js', title: 'Array.find() — trouver un élément',
    challenge: 'Trouvez le premier nombre supérieur à 3 dans [1, 2, 3, 4, 5]',
    hint: '[1, 2, 3, 4, 5].find(x => x > 3)',
    expectedPatterns: ['.find(', '=>'],
    successMessage: '✓ .find() retourne le premier élément trouvé !',
    explanation: ".find() retourne le PREMIER élément qui satisfait la condition, ou undefined si aucun. Différent de .filter() qui retourne tous les éléments correspondants. Utilisez .findIndex() pour obtenir l'index."
  },
  js_arrow: {
    category: 'js', title: 'Fonction fléchée — arrow function',
    challenge: 'Écrivez une fonction fléchée nommée "double" qui prend x et retourne x * 2',
    hint: 'const double = x => x * 2',
    expectedPatterns: ['const', '=>', '* 2'],
    successMessage: '✓ Syntaxe concise des fonctions fléchées !',
    explanation: "Les fonctions fléchées (=>) sont une syntaxe raccourcie. Si le corps est une expression, le return est implicite. (x, y) => x + y pour plusieurs paramètres. Elles ne lient pas leur propre 'this', ce qui les rend idéales pour les callbacks."
  },
  js_spread: {
    category: 'js', title: 'Spread operator — fusionner des tableaux',
    challenge: 'Fusionnez les tableaux [1, 2] et [3, 4] en un seul avec le spread operator',
    hint: '[...[1, 2], ...[3, 4]]',
    expectedPatterns: ['...'],
    successMessage: '✓ Le spread (...) copie et fusionne sans muter !',
    explanation: "L'opérateur spread (...) étale les éléments d'un itérable. Pour les objets : {...obj1, ...obj2} fusionne les propriétés. C'est la façon moderne de copier sans muter l'original."
  },
  js_destructuring: {
    category: 'js', title: 'Destructuring — extraire des valeurs',
    challenge: 'Extrayez les propriétés "nom" et "age" de l\'objet { nom: "Jules", age: 25 }',
    hint: 'const { nom, age } = { nom: "Jules", age: 25 }',
    expectedPatterns: ['const', '{', 'nom', 'age', '}', '='],
    successMessage: '✓ Le destructuring simplifie l\'accès aux propriétés !',
    explanation: "Le destructuring extrait des valeurs d'objets ou tableaux en variables. Pour un tableau : const [a, b] = [1, 2]. On peut aussi renommer : const { nom: name } = obj, ou donner une valeur par défaut : const { age = 0 } = obj."
  },
  js_async_await: {
    category: 'js', title: 'async/await — appel asynchrone',
    challenge: 'Écrivez une fonction async "getData" qui utilise await pour appeler fetch(url)',
    hint: 'async function getData(url) { const res = await fetch(url); return res.json(); }',
    expectedPatterns: ['async', 'await', 'fetch'],
    successMessage: '✓ async/await rend le code asynchrone lisible !',
    explanation: "async/await est du sucre syntaxique sur les Promises. Une fonction async retourne toujours une Promise. await attend la résolution avant de continuer. Utilisez try/catch pour gérer les erreurs."
  },
  js_template_literal: {
    category: 'js', title: 'Template literals — interpolation de chaîne',
    challenge: 'Créez la chaîne "Bonjour Jules, vous avez 25 ans" avec des template literals',
    hint: 'const msg = `Bonjour ${nom}, vous avez ${age} ans`',
    expectedPatterns: ['`', '${'],
    successMessage: '✓ Les backticks permettent d\'interpoler des variables !',
    explanation: "Les template literals (backticks `) permettent d'insérer des expressions avec ${expr}. Ils supportent aussi le multi-ligne sans \\n. Bien plus lisible que la concaténation avec +."
  },
  js_optional_chaining: {
    category: 'js', title: 'Optional chaining — accès sécurisé',
    challenge: 'Accédez à user?.address?.city sans erreur si user ou address est null',
    hint: 'const city = user?.address?.city',
    expectedPatterns: ['?.'],
    successMessage: '✓ ?. évite les "Cannot read properties of null" !',
    explanation: "L'optional chaining (?.) retourne undefined si la valeur à gauche est null ou undefined, au lieu de lever une erreur. Très utile pour les données d'API potentiellement incomplètes. Combine bien avec ?? pour une valeur par défaut : user?.name ?? 'Anonyme'."
  },

  // ── PHP ──────────────────────────────────────────────────
  php_array_map: {
    category: 'php', title: 'array_map() — transformer un tableau',
    challenge: 'Utilisez array_map() pour doubler chaque nombre de [1, 2, 3]',
    hint: 'array_map(fn($x) => $x * 2, [1, 2, 3])',
    expectedPatterns: ['array_map(', '=>', '* 2'],
    successMessage: '✓ array_map() retourne un nouveau tableau !',
    explanation: "array_map() applique une fonction à chaque élément. Contrairement à JS, la fonction vient EN PREMIER, le tableau EN SECOND. Avec PHP 7.4+, utilisez les fonctions fléchées fn($x) => $x * 2."
  },
  php_array_filter: {
    category: 'php', title: 'array_filter() — filtrer un tableau',
    challenge: 'Filtrez [1, 2, 3, 4, 5] pour ne garder que les nombres supérieurs à 2',
    hint: 'array_filter([1, 2, 3, 4, 5], fn($x) => $x > 2)',
    expectedPatterns: ['array_filter(', '=>', '> 2'],
    successMessage: '✓ array_filter() garde les éléments vrais !',
    explanation: "array_filter() retourne un tableau avec les éléments pour lesquels la fonction retourne true. Attention : les clés sont préservées (pas réindexées). Utilisez array_values() après si vous avez besoin d'index consécutifs."
  },
  php_implode: {
    category: 'php', title: 'implode() — tableau en chaîne',
    challenge: 'Convertissez ["a", "b", "c"] en chaîne "a,b,c" avec implode()',
    hint: 'implode(",", ["a", "b", "c"])',
    expectedPatterns: ['implode(', ','],
    successMessage: '✓ implode() joint les éléments avec un séparateur !',
    explanation: "implode() (alias join()) concatène les éléments d'un tableau avec un séparateur. L'inverse est explode() qui divise une chaîne en tableau. Très utilisé pour construire des requêtes SQL ou des CSV."
  },
  php_str_contains: {
    category: 'php', title: 'str_contains() — chercher dans une chaîne',
    challenge: 'Vérifiez si la chaîne "bonjour monde" contient "monde" (PHP 8+)',
    hint: 'str_contains("bonjour monde", "monde")',
    expectedPatterns: ['str_contains(', 'monde'],
    successMessage: '✓ str_contains() est plus lisible que strpos() !',
    explanation: "str_contains() retourne true/false selon que la sous-chaîne est présente. Disponible depuis PHP 8.0. Avant PHP 8, utilisez strpos($str, $sub) !== false. Voir aussi str_starts_with() et str_ends_with()."
  },
  php_json: {
    category: 'php', title: 'json_encode() / json_decode() — conversion JSON',
    challenge: 'Convertissez le tableau ["nom" => "Jules", "age" => 25] en JSON',
    hint: 'json_encode(["nom" => "Jules", "age" => 25])',
    expectedPatterns: ['json_encode(', '=>'],
    successMessage: '✓ json_encode() convertit PHP en JSON !',
    explanation: "json_encode() convertit une valeur PHP en chaîne JSON. json_decode($json, true) fait l'inverse en retournant un tableau associatif (le 2ème argument true est important). Essentiel pour les API REST en PHP."
  },
  php_isset: {
    category: 'php', title: 'isset() — vérifier une variable',
    challenge: 'Vérifiez si $_GET["id"] existe et n\'est pas null avant de l\'utiliser',
    hint: 'if (isset($_GET["id"])) { $id = $_GET["id"]; }',
    expectedPatterns: ['isset(', '$_GET'],
    successMessage: '✓ isset() évite les erreurs "Undefined index" !',
    explanation: "isset() retourne true si la variable est définie ET n'est pas null. Indispensable pour accéder à $_GET, $_POST, $_SESSION sans déclencher d'avertissement. empty() va plus loin : true si vide, 0, '', null, [], false."
  },
  php_session: {
    category: 'php', title: '$_SESSION — variables de session',
    challenge: 'Démarrez la session et stockez l\'id utilisateur 42 dans $_SESSION["user_id"]',
    hint: 'session_start(); $_SESSION["user_id"] = 42;',
    expectedPatterns: ['session_start()', '$_SESSION'],
    successMessage: '✓ Les sessions persistent entre les requêtes !',
    explanation: "session_start() doit être appelé avant tout output HTML. $_SESSION est un tableau superglobal qui persiste entre les pages pour un même visiteur. Pour déconnecter : session_destroy(). Les données sont stockées côté serveur."
  },
  php_sprintf: {
    category: 'php', title: 'sprintf() — formater une chaîne',
    challenge: 'Formatez "Jules a 25 ans" avec sprintf() en utilisant des variables',
    hint: 'sprintf("%s a %d ans", "Jules", 25)',
    expectedPatterns: ['sprintf(', '%s', '%d'],
    successMessage: '✓ sprintf() formate proprement les chaînes !',
    explanation: "sprintf() retourne une chaîne formatée. %s = chaîne, %d = entier, %f = flottant, %.2f = 2 décimales. Plus sûr que la concaténation pour construire des messages complexes. printf() fait la même chose mais affiche directement."
  },
};
