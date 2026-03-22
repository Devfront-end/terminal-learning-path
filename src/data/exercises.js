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
};
