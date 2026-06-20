export const phpErrorCategories = [
  { id: 'all', label: 'Toutes' },
  { id: 'syntax', label: 'Syntaxe' },
  { id: 'runtime', label: 'Execution' },
  { id: 'data', label: 'Donnees' },
  { id: 'framework', label: 'Framework' },
];

export const phpErrors = [
  {
    id: 'unexpected-token',
    category: 'syntax',
    title: 'Parse error: unexpected token',
    symptom: 'PHP refuse de charger le fichier et indique une ligne avec "unexpected token", "unexpected end of file" ou "syntax error".',
    causes: [
      'Point-virgule manquant a la ligne precedente.',
      'Parenthese, accolade ou crochet non ferme.',
      'Virgule manquante dans un tableau ou une liste d arguments.',
      'Mauvais melange entre HTML et PHP.',
    ],
    diagnosis: [
      'Lire aussi les 3 a 5 lignes avant la ligne indiquee: l erreur vient souvent d avant.',
      'Verifier les paires (), [], {} et les guillemets.',
      'Lancer php -l fichier.php pour isoler la syntaxe.',
    ],
    fixes: [
      'Ajouter le ; ou le separateur manquant.',
      'Refermer la structure ouverte.',
      'Reformater le bloc pour rendre les niveaux d indentation visibles.',
    ],
    commands: ['php -l app/Controller/UsersController.php'],
  },
  {
    id: 'undefined-variable',
    category: 'runtime',
    title: 'Warning: Undefined variable',
    symptom: 'Une variable est lue avant d avoir ete creee, souvent dans une vue, une condition ou une boucle.',
    causes: [
      'Variable creee seulement dans une branche if.',
      'Mauvais nom de variable: $user au lieu de $users.',
      'Donnee non transmise depuis le controller vers la vue.',
    ],
    diagnosis: [
      'Chercher toutes les affectations de la variable.',
      'Verifier que chaque chemin d execution initialise une valeur.',
      'Inspecter les donnees transmises a la vue ou au template.',
    ],
    fixes: [
      'Initialiser une valeur par defaut avant le if.',
      'Utiliser l operateur ?? pour une valeur de secours.',
      'Corriger le nom ou transmettre explicitement la donnee manquante.',
    ],
    commands: ['rg "\\$user" app/ src/', 'var_dump(array_keys(get_defined_vars()));'],
  },
  {
    id: 'undefined-index',
    category: 'data',
    title: 'Warning: Undefined array key / Undefined index',
    symptom: 'Le code tente de lire une cle inexistante dans $_POST, $_GET, $_SESSION ou un tableau metier.',
    causes: [
      'Champ de formulaire absent ou renomme.',
      'Cle optionnelle non testee avant lecture.',
      'Structure de tableau differente de celle attendue.',
    ],
    diagnosis: [
      'Afficher les cles disponibles avec array_keys().',
      'Verifier le name du champ HTML ou le payload envoye.',
      'Tester l existence de la cle avec isset() ou array_key_exists().',
    ],
    fixes: [
      'Utiliser $value = $_POST["email"] ?? null.',
      'Ajouter une validation de formulaire avant traitement.',
      'Aligner les noms de champs entre le formulaire et le controller.',
    ],
    commands: ['var_dump(array_keys($_POST));', 'rg "name=\\"email\\"" templates app src'],
  },
  {
    id: 'call-member-function-null',
    category: 'runtime',
    title: 'Call to a member function ... on null',
    symptom: 'Le code appelle une methode sur une variable qui vaut null.',
    causes: [
      'Recherche en base qui ne retourne aucun resultat.',
      'Relation non chargee ou objet non initialise.',
      'Service ou dependance non injecte correctement.',
    ],
    diagnosis: [
      'Identifier quelle variable est null dans la ligne indiquee.',
      'Verifier le retour de la requete ou du repository avant l appel de methode.',
      'Ajouter temporairement un dump juste avant la ligne en erreur.',
    ],
    fixes: [
      'Traiter le cas absent avec une condition ou une exception claire.',
      'Verifier l identifiant utilise pour la recherche.',
      'Charger la relation ou corriger l injection du service.',
    ],
    commands: ['var_dump($user);', 'if ($user === null) { throw new RuntimeException("Utilisateur introuvable"); }'],
  },
  {
    id: 'class-not-found',
    category: 'framework',
    title: 'Class not found / Interface not found',
    symptom: 'PHP ne trouve pas une classe, une interface, un trait ou un namespace.',
    causes: [
      'Namespace incorrect dans le fichier.',
      'use manquant ou mauvais chemin de classe.',
      'Autoload Composer pas regenere.',
      'Nom de fichier ou casse differente sur Linux.',
    ],
    diagnosis: [
      'Comparer namespace, chemin du fichier et nom de classe.',
      'Verifier les imports use en haut du fichier.',
      'Regenerer l autoload Composer.',
    ],
    fixes: [
      'Corriger le namespace ou l import.',
      'Renommer le fichier avec la bonne casse.',
      'Executer composer dump-autoload.',
    ],
    commands: ['composer dump-autoload', 'rg "class UserService|namespace App" src app'],
  },
  {
    id: 'headers-already-sent',
    category: 'runtime',
    title: 'Cannot modify header information - headers already sent',
    symptom: 'Une redirection, un cookie ou une session echoue car du contenu a deja ete envoye au navigateur.',
    causes: [
      'echo, var_dump ou HTML avant header(), setcookie() ou session_start().',
      'Espace ou BOM avant la balise <?php.',
      'Warning affiche avant la redirection.',
    ],
    diagnosis: [
      'Lire le chemin "output started at" dans le message.',
      'Chercher les sorties debug avant la ligne qui modifie les headers.',
      'Verifier qu aucun fichier inclus ne produit de sortie involontaire.',
    ],
    fixes: [
      'Supprimer les echo/var_dump avant les headers.',
      'Demarrer la session avant toute sortie.',
      'Eviter la balise fermante ?> dans les fichiers PHP purs.',
    ],
    commands: ['rg "var_dump|echo|print_r|header\\(|session_start" app src'],
  },
  {
    id: 'permission-denied',
    category: 'framework',
    title: 'Permission denied / failed to open stream',
    symptom: 'PHP ne peut pas lire, ecrire ou creer un fichier dans cache, logs, uploads ou tmp.',
    causes: [
      'Droits Unix insuffisants.',
      'Dossier absent.',
      'Utilisateur web different de l utilisateur en ligne de commande.',
    ],
    diagnosis: [
      'Verifier le chemin exact dans l erreur.',
      'Lister les droits du dossier parent.',
      'Identifier l utilisateur qui execute PHP.',
    ],
    fixes: [
      'Creer le dossier attendu.',
      'Corriger proprietaire et permissions avec prudence.',
      'Ne jamais donner 777 en reflexe sur un serveur partage.',
    ],
    commands: ['ls -la var/log var/cache app/tmp 2>/dev/null', 'whoami'],
  },
  {
    id: 'blank-page',
    category: 'runtime',
    title: 'Page blanche / erreur 500 sans detail',
    symptom: 'Le navigateur affiche une page blanche ou une erreur 500 sans message exploitable.',
    causes: [
      'display_errors desactive en environnement serveur.',
      'Erreur fatale masquee par la configuration.',
      'Log applicatif ou serveur non consulte.',
    ],
    diagnosis: [
      'Consulter les logs PHP, serveur web et applicatifs.',
      'Reproduire localement avec les erreurs activees.',
      'Verifier la derniere modification de code ou de configuration.',
    ],
    fixes: [
      'Corriger l erreur racine visible dans les logs.',
      'Ajouter une gestion d erreur applicative propre.',
      'Garder display_errors desactive en production et journaliser les erreurs.',
    ],
    commands: ['tail -n 80 var/log/*.log 2>/dev/null', 'tail -n 80 /var/log/php*-fpm.log 2>/dev/null'],
  },
];
