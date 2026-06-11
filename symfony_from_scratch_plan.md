# Création Symfony From Scratch

## Objectif

Garder l'application React/Vite actuelle intacte dans :

```text
/Users/jules/terminal_learning_path
```

Puis créer une nouvelle application Symfony dans un dossier séparé, comme une page blanche :

```text
/Users/jules/terminal-learning-path-symfony
```

L'idée est de repartir proprement avec Symfony, sans casser ni modifier l'application existante.

## État Actuel

Les outils Symfony ne sont pas encore installés sur la machine :

```text
composer: command not found
symfony: command not found
```

Il faut donc installer Composer, puis éventuellement Symfony CLI.

## Installation Des Outils

Sur macOS avec Homebrew :

```bash
brew install composer symfony-cli/tap/symfony-cli
```

Symfony CLI est pratique, mais Composer suffit aussi.

## Création Du Nouveau Projet

Option recommandée avec Symfony CLI :

```bash
cd /Users/jules
symfony new terminal-learning-path-symfony --webapp
```

Option sans Symfony CLI :

```bash
cd /Users/jules
composer create-project symfony/skeleton terminal-learning-path-symfony
cd terminal-learning-path-symfony
composer require webapp
```

## Structure Cible

```text
terminal-learning-path-symfony/
  assets/
  config/
  migrations/
  public/
    index.php
  src/
    Controller/
    Entity/
    Repository/
    Service/
  templates/
    base.html.twig
  var/
  .env
  composer.json
```

## Feuille De Route

1. Créer le projet Symfony vide dans un dossier séparé.
2. Configurer SQLite au début pour rester simple.
3. Créer un layout Twig sombre inspiré de l'app actuelle.
4. Ajouter toutes les routes principales :

```text
/terminal
/exercices
/reference
/snippets
/suivi
/cli
/reseau
/arborescence
/editeur
/assistant
/historique
/audit
/vault
/admin
```

5. Créer d'abord le layout global et la navigation.
6. Créer la page Référence.
7. Créer la page Exercices.
8. Créer le terminal simulé.
9. Créer les outils complémentaires.
10. Ajouter l'authentification Symfony.
11. Mettre les contenus sensibles côté serveur.
12. Ajouter les protections et journaux de sécurité.
13. Recréer progressivement les fonctionnalités utiles observées dans l'app React.
14. Déployer seulement quand la version Symfony est stable.

## Fonctionnalités À Créer Sans Exception

### Interface Générale

- Layout sombre type terminal.
- En-tête `TERMINAL LEARNING PATH`.
- Navigation par onglets ou menu latéral.
- Footer avec répertoire courant.
- Style monospace.
- Design responsive.
- Messages d'erreur et états de chargement.
- Modales de mot de passe.
- Onglets publics et onglets protégés.

### Onglets Publics

#### Terminal

- Terminal simulé.
- Commande courante.
- Historique de commandes.
- Répertoire courant.
- Répertoire précédent avec `cd -`.
- Exécution de commandes pédagogiques.
- Feedback visuel succès/erreur.
- Indices.
- Suggestions de commandes.
- Réinitialisation.
- Support des commandes Linux/Git simulées.
- Délai d'exécution simulé.
- Prompt avec utilisateur, machine et chemin raccourci `~`.
- Navigation clavier dans l'historique avec flèche haut/bas.
- Autocomplétion avec `Tab`.
- Popup de suggestions avec flèche haut/bas, `Tab`, `Enter`, `Escape`.
- Suggestions de chemins pour `cd`, `ls`, `find`.
- Suggestions de sous-commandes Git.
- Détection de langage naturel en français et anglais.
- Recherche par mots-clés dans le système de fichiers virtuel.
- Panneau de résultats langage naturel avec boutons `cd`, `ls`, `cat`, `find`.
- Détection de préfixes copiés par erreur comme `:` ou `$`.
- Suggestion de correction quand `cd` vise un dossier inexistant.
- Popup de définition quand l'utilisateur sélectionne une commande dans la sortie.
- Bouton d'exécution visuel.

Commandes simulées à recréer :

```text
pwd
ls
ls -l
cd
cd ~
cd -
cd /
cd .
find
find -type f
find -type d
find -name
find -iname
find -maxdepth
find -user
find ! -name
find -exec ls
find | wc -l
grep
grep -r
grep -n
grep -i
grep -l
grep -c
cat
less
head
tail
tail -f
tree
tree -d
tree -L
whoami
df
du
ps
chmod
chown
man
clear
```

Fichiers simulés à prévoir :

```text
AppController.php
UsersController.php
Budget.php
Transaction.php
wishlist.php
error.log
access.log
debug.log
.gitignore
database.php
core.php
```

Route Symfony cible :

```text
/terminal
```

Contrôleur :

```text
TerminalController
```

Services possibles :

```text
TerminalSimulator
VirtualFileSystemService
CommandValidator
```

#### Exercices

- Liste d'exercices.
- Progression.
- Validation de commande.
- Navigation exercice précédent/suivant.
- Feedback.
- Catégories actuelles : cd, find, grep, git, git remote, JavaScript, PHP.
- Onglets de catégories avec compte d'exercices.
- Vue liste par catégorie.
- Bouton commencer.
- Bouton solution qui remplit la commande attendue.
- Validation avec `Enter`.
- Explication affichée après validation.
- Navigation globale entre exercices par index.
- Retour à la liste.

Route Symfony cible :

```text
/exercices
```

Entités possibles :

```text
Exercise
ExerciseAttempt
ExerciseCategory
```

#### Référence

- Référence des commandes.
- Sections actuelles :

```text
cd & pwd
find
grep
git
système
JavaScript
PHP
```

- Tables avec commande, usage, exemple, explication, résultat attendu.
- Recherche/lecture rapide par section.
- Données séparées pour Linux/Git, JavaScript et PHP.
- Sections JavaScript : Array, String, Object, Async/Promise/fetch.
- Sections PHP : Array, String, utilitaires/session.
- Les lignes de référence alimentent aussi les wizards et la popup de définition du terminal.

Route Symfony cible :

```text
/reference
```

Entités possibles :

```text
ReferenceSection
ReferenceCommand
```

#### Snippets

- Bibliothèque de snippets.
- Filtres par langage.
- Recherche.
- Langages actuels :

```text
JavaScript
PHP
Python
```

- Snippets actuels : fetch, POST JSON, localStorage, debounce, groupBy, deep clone, Promise.all, IntersectionObserver, PDO, JSON API, upload sécurisé, session, pagination SQL, cURL, Python requests, dataclass, context manager.
- Copie dans le presse-papier.
- État `copié`.
- Recherche par titre et description.
- Affichage en grille responsive.
- Badge langage.

Route Symfony cible :

```text
/snippets
```

Entités possibles :

```text
Snippet
SnippetLanguage
SnippetTag
```

#### Éditeur

- Éditeur de code.
- Langages :

```text
JavaScript
PHP
Python
HTML
CSS
```

- Exécution/simulation selon langage.
- Sortie console.
- Templates de départ.
- Monaco Editor.
- Thème `vs-dark`.
- Numéros de lignes.
- Word wrap.
- Minimap désactivée.
- Exécution JavaScript uniquement.
- Capture de `console.log`.
- Capture de `console.error`.
- Affichage des erreurs d'exécution.
- Split éditeur/sortie quand il y a un output.
- Bouton fermer output.
- Message indiquant que les autres langages ne sont pas exécutables.

Route Symfony cible :

```text
/editeur
```

Important :

```text
Ne jamais exécuter du code arbitraire côté serveur sans sandbox.
```

#### Arborescence

- Coller une sortie `tree`.
- Parser l'arborescence.
- Affichage visuel des dossiers/fichiers.
- Gestion indentation/profondeur.
- Exemple par défaut.
- Mode édition/collage.
- Bouton appliquer.
- Sélection de fichier/dossier.
- Panneau chemin complet.
- Génération de commandes utiles selon la sélection.
- Copie des commandes dans le presse-papier.
- État `copié`.
- Ouverture d'un dossier local avec File System Access API quand disponible.
- Message navigateur non compatible si `showDirectoryPicker` absent.
- Lecture récursive limitée en profondeur.
- Tri dossiers avant fichiers.

Route Symfony cible :

```text
/arborescence
```

#### Bash Essentials

- Exercices CLI autonomes.
- Catégories :

```text
Navigation
Listing
Créer
Gérer
Voir le contenu
Recherche
Permissions
Processus
Réseau
Git
```

- Champ de commande.
- Indices.
- Solution.
- Reset.
- Module chargé en iframe depuis `public/cli-exercises.html`.
- Application autonome à recréer côté Symfony ou à garder comme page HTML statique séparée.

Route Symfony cible :

```text
/cli
```

#### Réseau

- Références `ipconfig`, `ip`, `ifconfig`.
- Diagnostics réseau.
- DNS.
- Exemples et explications.
- Tables par section.
- Commandes sélectionnables.
- Équivalences rapides Windows/Linux.
- Sections :

```text
ipconfig — Windows
ip — Linux moderne
ifconfig — Linux legacy
Diagnostics réseau
DNS — résolution et config
```

Commandes réseau à inclure :

```text
ipconfig
ipconfig /all
ipconfig /release
ipconfig /renew
ipconfig /flushdns
ipconfig /displaydns
ipconfig /registerdns
ip addr
ip addr show eth0
ip link
ip link set eth0 up
ip link set eth0 down
ip route
ping
traceroute
tracert
nslookup
dig
netstat -tuln
ss -tuln
curl ifconfig.me
hostname -I
cat /etc/resolv.conf
cat /etc/hosts
resolvectl status
systemd-resolve --status
```

### Wizards De Commande

À créer dans le terminal :

```text
grep wizard
find wizard
git wizard
cd wizard
```

Déclenchement :

```text
grep
grep 
find
find 
git
git 
cd
cd 
```

Grep wizard :

- Étape texte à chercher.
- Étape chemin.
- Étape options.
- Options : `-n`, `-i`, `-r`, `-l`, `-c`, `-v`, `-E`.
- Exemples rapides.
- Prévisualisation de la commande.
- Insertion dans le terminal.

Find wizard :

- Étape dossier.
- Étape type : fichier, dossier, les deux.
- Étape filtre nom optionnel.
- Étape options.
- Options : `-mtime -7`, `-mmin -30`, `-size +1M`, `| wc -l`.
- Suggestions de dossiers depuis le VFS.
- Prévisualisation et insertion.

Git wizard :

- Liste des sous-commandes Git issues de la référence.
- Description et note.
- Insertion directe.

Cd wizard :

- Chemins absolus, relatifs, `~`, `..`, `-`.
- Suggestions de dossiers.
- Prévisualisation.
- Insertion directe.

Route Symfony cible :

```text
/reseau
```

### Onglets Cachés Ou Protégés

#### Historique

- Historique des commandes.
- Accès protégé.
- Déverrouillage par mot de passe.
- En version Symfony : accès via rôle ou session sécurisée, pas via token frontend.

Route Symfony cible :

```text
/historique
```

Sécurité :

```text
ROLE_PRIVATE
```

#### Assistant Question

- Interface de question/réponse.
- Stockage clé API actuellement en localStorage.
- Suivi usage.
- Questions sauvegardées.
- Édition/suppression/sauvegarde de réponses.
- Modèle actuel : `claude-haiku-4-5`.
- SDK actuel : `@anthropic-ai/sdk`.
- Prompt système pédagogique en français.
- Lien vers console de création de clé.
- Validation du préfixe de clé `sk-ant-`.
- Conversation multi-message.
- Scroll automatique en bas.
- Édition d'une question utilisateur puis régénération de la réponse.
- Suppression d'une paire question/réponse.
- Sauvegarde d'une paire question/réponse.
- Vue des réponses sauvegardées.
- Suppression d'une réponse sauvegardée.
- Compteurs d'usage :

```text
requêtes
tokens in
tokens out
total tokens
coût estimé
reset usage
```

- Tarifs affichés actuellement :

```text
$1 / 1M tokens input
$5 / 1M tokens output
```

Route Symfony cible :

```text
/assistant
```

Important en Symfony :

```text
La clé API ne doit plus être stockée dans localStorage.
Elle doit rester côté serveur dans .env.local ou dans un coffre applicatif.
```

#### Analyseur D'Accès

- Ancien onglet caché d'analyse.
- Déverrouillage par mot de passe.
- Fichier HTML chiffré.
- Tentatives échouées.
- Verrouillage progressif :

```text
3 tentatives : 30s
5 tentatives : 5min
7 tentatives : 1h
```

- Alerte webhook si trop d'échecs.
- Session temporaire après déverrouillage.
- Déchiffrement AES-GCM via PBKDF2.
- Chargement d'un HTML chiffré.
- Affichage dans iframe après déverrouillage.
- Stockage temporaire du mot de passe en sessionStorage dans l'app actuelle.
- Nettoyage des URLs blob.
- En version Symfony from scratch, créer une vraie page serveur protégée au lieu d'un blob client.

Route Symfony cible :

```text
/audit
```

En Symfony :

```text
Remplacer le HTML chiffré côté client par une vraie page serveur protégée.
```

#### Vault

- Espace de fichiers/code protégé.
- Mot de passe.
- Token.
- Liste de fichiers.
- Création.
- Lecture.
- Modification.
- Suppression.
- Recherche.
- Upload/import.
- Détection langage.
- Stockage via worker/proxy actuel.
- Monaco Editor.
- Arborescence type VS Code.
- Sidebar redimensionnable.
- Sidebar affichable/masquable.
- Plein écran, sortie avec `Escape`.
- Création de fichier avec chemin.
- Création depuis presse-papier.
- Import multi-fichiers.
- Support fichiers texte et binaires.
- Détection binaire :

```text
pdf
png
jpg
jpeg
gif
webp
ico
zip
gz
woff
woff2
ttf
eot
mp4
mp3
docx
xlsx
pptx
```

- Détection de langage :

```text
JavaScript
TypeScript
PHP
Python
HTML
CSS/SCSS
SQL
Shell
JSON
XML
Markdown
YAML
INI
plaintext
binary
```

- Icônes/couleurs par extension.
- Cache local du contenu chargé.
- Indicateur de modifications non sauvegardées.
- Confirmation avant perte de modifications.
- Sauvegarde avec `Ctrl+S`.
- Historique de versions par fichier.
- Limite actuelle : 50 versions.
- Panneau versions.
- Diff entre version et contenu actuel.
- Restauration d'une version.
- Téléchargement du fichier.
- Suppression avec confirmation.
- Suppression de l'historique associé.
- Recherche plein texte dans tous les fichiers.
- Résultats avec fichier, ligne et extrait.
- États `chargement`, `aucun fichier`, erreur KV, retry.

Stockage actuel à remplacer :

```text
Cloudflare Worker
KV namespace FILES_KV
clés f::path pour fichiers
clés v::path pour versions
X-Vault-Token
AES-GCM côté client
```

En Symfony from scratch :

```text
Stockage serveur contrôlé
chiffrement serveur
Doctrine ou stockage fichier privé hors public/
aucun token vault exposé au navigateur
```

Route Symfony cible :

```text
/vault
```

Entités possibles :

```text
VaultFile
VaultFolder
VaultAuditLog
```

Sécurité :

```text
ROLE_VAULT
chiffrement côté serveur
journalisation des accès
protection CSRF
limitation de débit
```

### Suivi Stagiaire

Fonctionnalités du module PHP actuel à conserver :

- Saisie quotidienne.
- Semaine.
- Date.
- Jour.
- Type.
- Référence ID.
- Application neutre.
- Problème.
- Recherches.
- Hypothèses.
- Solution.
- Source.
- Aide demandée.
- Temps de recherche.
- Statut.
- Résolu seul.
- Critères C1, C2, C3, C4.
- Notes.
- Historique.
- Registre de compétences.
- Dashboard.
- Export/rapport hebdomadaire.
- SQLite.

Routes Symfony cibles :

```text
/suivi
/suivi/new
/suivi/{id}/edit
/suivi/historique
/suivi/competences
/suivi/dashboard
/suivi/export
```

Entités possibles :

```text
LearningEntry
Competence
WeeklyReport
```

### Alertes Et Monitoring

À créer :

- Événements d'accès cachés.
- Détection inspection.
- Tentatives mot de passe échouées.
- Tentatives vault échouées.
- Première visite quotidienne.
- Envoi d'alerte vers un endpoint serveur.
- Canary public.
- Route canary avec géolocalisation Cloudflare.
- Enregistrement IP, pays, ville, région, organisation réseau, User-Agent, referer.
- Proxy d'alertes vers Discord ou autre canal serveur.
- CORS strict par origine autorisée.
- Secrets stockés hors code.

Événements actuels à remplacer par des événements serveur :

```text
EVT_INSPECT
EVT_A
EVT_B
EVT_C
EVT_D
EVT_E
EVT_F
```

En Symfony :

```text
SecurityEvent
AuditLog
Monolog
RateLimiter
Notifier
```

Canary actuel à recréer côté serveur :

```text
public/canary.html
public/canary.txt
/canary
```

Objectif :

```text
détecter l'accès direct à un fichier de surveillance
journaliser l'accès
notifier si nécessaire
```

### Protections Anti-Inspection

Protections actuelles côté frontend :

- Blocage clic droit.
- Blocage F12.
- Blocage Ctrl/Cmd+Shift+I.
- Blocage Ctrl/Cmd+Shift+J.
- Blocage Ctrl/Cmd+Shift+C.
- Blocage Ctrl/Cmd+U.
- Blocage Ctrl/Cmd+S.
- Détection DevTools par différence de taille fenêtre.
- Détection via `debugger`.
- Écran "Inspection bloquée".
- Obfuscation JavaScript.
- `selfDefending`.
- `debugProtection`.

À garder comme couche dissuasive seulement.

En Symfony, la vraie sécurité doit être serveur :

```text
authentification
autorisation par rôles
sessions sécurisées
CSRF
rate limiting
logs d'audit
contenus privés jamais envoyés au client sans autorisation
variables sensibles dans .env.local
pas de sourcemaps en production
headers HTTP de sécurité
```

### Headers HTTP De Sécurité

À ajouter en production :

```text
Content-Security-Policy
X-Frame-Options
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
Strict-Transport-Security
```

Exemple d'objectif :

```text
interdire l'iframe externe
limiter les scripts aux assets de l'app
interdire les sources inconnues
forcer HTTPS
réduire les informations de referrer
```

### Worker, Proxy Et API

Fonctionnalités actuelles à recréer côté Symfony ou remplacer :

- Worker Cloudflare `tlp-alert`.
- Route `/canary`.
- Routes `/vault/list`, `/vault/get`, `/vault/put`, `/vault/delete`.
- CORS limité à :

```text
https://dev-front.github.io ou équivalent public
http://localhost:5173
```

- Secret `DISCORD_WEBHOOK`.
- Secret `VAULT_TOKEN`.
- KV namespace `FILES_KV`.
- Proxy PHP `vault-proxy.php` vers le worker.
- Gestion OPTIONS.
- Statuts HTTP cohérents :

```text
204
400
401
404
405
502
```

En Symfony from scratch :

```text
remplacer le Worker par des Controller Symfony
remplacer le token frontend par Security voter / rôles
remplacer KV par Doctrine, filesystem privé ou stockage chiffré
conserver une API JSON uniquement si nécessaire
```

### Scripts Et Génération

Scripts actuels à recréer ou remplacer :

```text
encrypt-tab.mjs
hash-h2.mjs
gen-h2.mjs
update.sh
vault-proxy.php
```

Fonctions associées :

- Chiffrement AES-GCM d'un HTML.
- PBKDF2 SHA-256.
- 200 000 itérations pour certains secrets.
- Génération de fichiers `.bin`.
- Rechiffrement et déploiement.
- Proxy vers worker.

En Symfony :

```text
ne pas dépendre de fichiers HTML chiffrés côté client
utiliser password_hash/password_verify pour les mots de passe
utiliser sodium ou OpenSSL pour chiffrement serveur si nécessaire
utiliser Symfony Secrets ou variables d'environnement
créer des commandes console Symfony pour maintenance
```

Commandes Symfony possibles :

```text
app:create-user
app:rotate-secret
app:vault:reindex
app:audit:cleanup
app:seed-reference-data
```

### Authentification Et Rôles Symfony

Rôles recommandés :

```text
ROLE_USER
ROLE_PRIVATE
ROLE_ADMIN
ROLE_VAULT
ROLE_AUDIT
```

Pages publiques :

```text
/login
/terminal
/exercices
/reference
/snippets
/cli
/reseau
/arborescence
```

Pages protégées :

```text
/historique
/assistant
/audit
/vault
/admin
/suivi
```

### Données À Recréer

Depuis l'app actuelle :

```text
src/data/exercises.js
src/data/reference.js
src/data/reference-js.js
src/data/reference-php.js
src/data/snippets.js
src/data/vfs.js
public/cli-exercises.html
suivi_stage/suivi.php
demande-analyser.html
```

Format cible recommandé :

```text
fixtures Doctrine
ou fichiers YAML/JSON lus par des services Symfony
```

Pour commencer :

```text
JSON/YAML pour la référence et les snippets
Doctrine SQLite pour les utilisateurs, suivi, historique, vault
```

Système de fichiers virtuel à recréer :

```text
/
/home
/home/user
/home/user/projects
/home/user/projects/my_app
/home/user/projects/my_app/app
/home/user/projects/my_app/app/Controller
/home/user/projects/my_app/app/Model
/home/user/projects/my_app/app/View
/home/user/projects/my_app/config
/home/user/projects/my_app/logs
/home/user/projects/my_app/vendor
/home/user/projects/my_app/webroot
/var/log
```

Données de référence JS à recréer :

```text
Array methods
String methods
Object methods
Async / Promise / fetch
```

Données de référence PHP à recréer :

```text
Array functions
String functions
Utilitaires
Sessions
JSON
debug
date
headers
sécurité XSS
```

Fichiers publics ou contenus spéciaux à décider :

```text
cli-exercises.html
canary.html
canary.txt
fichiers .bin existants
```

Décision recommandée :

```text
recréer les pages et contenus en Symfony
ne pas reconduire les .bin comme mécanisme principal
ne garder un fichier statique que si son rôle est explicitement utile
```

### Entités Symfony Recommandées

```text
User
Exercise
ExerciseAttempt
ReferenceSection
ReferenceCommand
Snippet
VirtualFile
CommandHistory
LearningEntry
Competence
VaultFile
AuditLog
SecurityEvent
SavedQuestion
AssistantUsage
```

### Services Symfony Recommandés

```text
TerminalSimulator
CommandValidator
VirtualFileSystemService
ReferenceProvider
SnippetProvider
ExerciseProvider
SecurityLogger
VaultStorage
VaultEncryption
AssistantClient
RateLimitService
WeeklyReportBuilder
```

Services additionnels recommandés après audit :

```text
CommandWizardBuilder
DefinitionLookupService
ClipboardCommandBuilder
CanaryLogger
SecurityHeaderSubscriber
CorsPolicyService
VaultVersionService
FileLanguageDetector
NetworkReferenceProvider
AssistantUsageTracker
CostEstimator
```

## Stratégie De Création Complète

### Phase 1 - Squelette

- Créer Symfony from scratch.
- Installer Doctrine, Twig, Security.
- Configurer SQLite.
- Créer layout principal.
- Créer navigation.
- Créer CSS sombre.

### Phase 2 - Pages Publiques

- Référence.
- Snippets.
- Exercices.
- Bash Essentials.
- Réseau.
- Arborescence.

### Phase 3 - Terminal

- Porter le système de commandes.
- Porter le système de répertoire courant.
- Porter le feedback.
- Porter l'historique.
- Porter les indices.

### Phase 4 - Sécurité

- Login/logout.
- User entity.
- Rôles.
- CSRF.
- Rate limiter.
- Audit logs.
- Headers de sécurité.
- Pages protégées.

### Phase 5 - Modules Sensibles

- Historique protégé.
- Assistant question.
- Analyseur d'accès.
- Vault.
- Suivi stagiaire.

### Phase 6 - Nettoyage

- Supprimer toute donnée sensible côté frontend.
- Supprimer les secrets des assets.
- Vérifier les textes visibles.
- Vérifier le build de production.
- Vérifier les logs.

### Phase 7 - Déploiement

- Choisir hébergeur Symfony.
- Configurer HTTPS.
- Configurer base de données.
- Configurer `.env.local`.
- Désactiver debug.
- Mettre `APP_ENV=prod`.
- Lancer migrations.
- Vérifier les pages protégées.

## Sécurité

Avec Symfony, les données sensibles ne doivent plus être dans le JavaScript public.

À garder côté serveur :

```text
mots de passe
contenus privés
logique de validation
données internes
tokens
configuration sensible
```

À laisser côté navigateur uniquement :

```text
HTML rendu
CSS
JavaScript d'interaction non sensible
formulaires
navigation
animations
```

## Prompt Pour Codex

```text
Je veux créer une nouvelle application Symfony 7 from scratch, dans un dossier séparé, sans modifier l'application React/Vite actuelle.

Objectif:
- Créer une app Symfony 7 propre avec Twig.
- Garder l'application React actuelle intacte.
- Créer toutes les fonctionnalités équivalentes à l'app actuelle, sans exception.
- Utiliser SQLite au début.
- Ajouter une authentification Symfony.
- Garder les données sensibles côté serveur.
- Créer une interface sombre type terminal.
- Créer tous les onglets publics et protégés.
- Créer les fonctionnalités de sécurité, alertes, verrouillage et audit.

Contraintes:
- PHP 8.2+
- Symfony 7
- Twig
- Doctrine ORM
- SQLite
- Architecture claire et maintenable
- Pas de secrets en JavaScript
- création progressive, page par page
- CSRF sur tous les formulaires
- Rate limiting sur login et pages sensibles
- Logs d'audit
- Rôles Symfony pour les sections privées
- Headers HTTP de sécurité en production

Première étape:
1. Vérifier Composer et Symfony CLI.
2. Créer le projet dans /Users/jules/terminal-learning-path-symfony.
3. Créer un layout Twig principal.
4. Créer la navigation avec tous les onglets prévus.
5. Créer une page Référence fonctionnelle.
6. Ajouter l'authentification.
7. Ajouter une base SQLite.
8. Ajouter les commandes pour lancer et tester l'application.

Fonctionnalités à créer:
- Terminal simulé
- Langage naturel dans le terminal
- Autocomplétion terminal
- Wizards grep/find/git/cd
- Popup de définition par sélection
- Exercices
- Référence
- Snippets
- Éditeur
- Arborescence
- Bash Essentials
- Réseau
- Historique protégé
- Assistant question
- Suivi usage assistant et coût estimé
- Sauvegarde de questions/réponses
- Analyseur d'accès
- Vault
- Versioning et diff du vault
- Import/export de fichiers du vault
- Suivi stagiaire
- Dashboard
- Registre de compétences
- Export hebdomadaire
- Alertes
- Canary
- Worker/proxy remplacés par contrôleurs Symfony
- Anti-inspection côté client comme couche dissuasive
- Vraie sécurité côté serveur
```

## Commandes De Lancement

Avec Symfony CLI :

```bash
cd /Users/jules/terminal-learning-path-symfony
symfony serve
```

Sans Symfony CLI :

```bash
cd /Users/jules/terminal-learning-path-symfony
php -S localhost:8000 -t public
```

Puis ouvrir :

```text
http://localhost:8000
```

## Règle Importante

Ne pas recréer directement le projet React actuel.

Il faut garder :

```text
/Users/jules/terminal_learning_path
```

comme version actuelle stable, et construire Symfony dans :

```text
/Users/jules/terminal-learning-path-symfony
```

comme nouvelle version indépendante.
