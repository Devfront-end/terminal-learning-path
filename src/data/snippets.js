export const snippets = [
  // ── JavaScript ───────────────────────────────────────────
  {
    id: 'js_fetch',
    lang: 'js',
    title: 'fetch avec async/await',
    description: 'Appel API REST avec gestion d\'erreur',
    code: `async function getData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Erreur:', err.message);
  }
}`,
  },
  {
    id: 'js_fetch_post',
    lang: 'js',
    title: 'fetch POST (envoi JSON)',
    description: 'Envoyer des données en POST avec fetch',
    code: `const res = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nom: 'Jules', age: 25 }),
});
const data = await res.json();`,
  },
  {
    id: 'js_localstorage',
    lang: 'js',
    title: 'localStorage — lire/écrire',
    description: 'Persister des données dans le navigateur',
    code: `// Écrire
localStorage.setItem('user', JSON.stringify({ nom: 'Jules' }));

// Lire
const user = JSON.parse(localStorage.getItem('user'));

// Supprimer
localStorage.removeItem('user');`,
  },
  {
    id: 'js_debounce',
    lang: 'js',
    title: 'debounce — limiter les appels',
    description: 'N\'exécuter une fonction qu\'après un délai sans appel',
    code: `function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Usage
const onSearch = debounce(value => fetchResults(value), 500);`,
  },
  {
    id: 'js_groupby',
    lang: 'js',
    title: 'Grouper un tableau par propriété',
    description: 'Regrouper des objets par une clé',
    code: `const users = [
  { nom: 'Jules', role: 'admin' },
  { nom: 'Marie', role: 'user' },
  { nom: 'Paul', role: 'admin' },
];

const byRole = users.reduce((acc, u) => {
  (acc[u.role] ??= []).push(u);
  return acc;
}, {});
// { admin: [...], user: [...] }`,
  },
  {
    id: 'js_deep_clone',
    lang: 'js',
    title: 'Cloner un objet profondément',
    description: 'Copie profonde sans référence partagée',
    code: `// Moderne (navigateurs récents)
const clone = structuredClone(obj);

// Avec JSON (ne copie pas les fonctions/Date)
const clone2 = JSON.parse(JSON.stringify(obj));`,
  },
  {
    id: 'js_promise_all',
    lang: 'js',
    title: 'Promise.all — requêtes parallèles',
    description: 'Lancer plusieurs requêtes en même temps',
    code: `const [users, posts, comments] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
  fetch('/api/comments').then(r => r.json()),
]);`,
  },
  {
    id: 'js_observer',
    lang: 'js',
    title: 'IntersectionObserver — lazy loading',
    description: 'Détecter quand un élément entre dans le viewport',
    code: `const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.lazy').forEach(el => observer.observe(el));`,
  },

  // ── PHP ──────────────────────────────────────────────────
  {
    id: 'php_pdo',
    lang: 'php',
    title: 'Connexion PDO + requête préparée',
    description: 'Connexion MySQL sécurisée avec PDO',
    code: `<?php
$pdo = new PDO(
  'mysql:host=localhost;dbname=mydb;charset=utf8',
  'user',
  'password',
  [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);

$stmt = $pdo->prepare('SELECT * FROM users WHERE id = :id');
$stmt->execute([':id' => $id]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);`,
  },
  {
    id: 'php_api_json',
    lang: 'php',
    title: 'Retourner du JSON (API)',
    description: 'Endpoint API qui retourne du JSON',
    code: `<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$data = ['status' => 'ok', 'users' => $users];
echo json_encode($data);`,
  },
  {
    id: 'php_upload',
    lang: 'php',
    title: 'Upload de fichier sécurisé',
    description: 'Gérer un upload avec validation',
    code: `<?php
$allowed = ['image/jpeg', 'image/png', 'image/webp'];
$maxSize = 5 * 1024 * 1024; // 5 MB

if ($_FILES['photo']['error'] === UPLOAD_ERR_OK) {
  $type = mime_content_type($_FILES['photo']['tmp_name']);
  $size = $_FILES['photo']['size'];

  if (!in_array($type, $allowed)) die('Type non autorisé');
  if ($size > $maxSize) die('Fichier trop volumineux');

  $dest = 'uploads/' . uniqid() . '.jpg';
  move_uploaded_file($_FILES['photo']['tmp_name'], $dest);
}`,
  },
  {
    id: 'php_session_auth',
    lang: 'php',
    title: 'Authentification par session',
    description: 'Login simple avec session PHP',
    code: `<?php
session_start();

// Connexion
function login($pdo, $email, $password) {
  $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');
  $stmt->execute([$email]);
  $user = $stmt->fetch();

  if ($user && password_verify($password, $user['password'])) {
    $_SESSION['user_id'] = $user['id'];
    return true;
  }
  return false;
}

// Vérification
if (!isset($_SESSION['user_id'])) {
  header('Location: /login');
  exit;
}`,
  },
  {
    id: 'php_pagination',
    lang: 'php',
    title: 'Pagination SQL',
    description: 'Paginer des résultats avec LIMIT/OFFSET',
    code: `<?php
$page    = max(1, (int)($_GET['page'] ?? 1));
$perPage = 20;
$offset  = ($page - 1) * $perPage;

$stmt = $pdo->prepare('SELECT * FROM articles ORDER BY created_at DESC LIMIT ? OFFSET ?');
$stmt->execute([$perPage, $offset]);
$articles = $stmt->fetchAll(PDO::FETCH_ASSOC);

$total = $pdo->query('SELECT COUNT(*) FROM articles')->fetchColumn();
$pages = ceil($total / $perPage);`,
  },
  {
    id: 'php_curl',
    lang: 'php',
    title: 'cURL — appel API externe',
    description: 'Faire une requête HTTP depuis PHP',
    code: `<?php
function apiGet(string $url, array $headers = []): array {
  $ch = curl_init($url);
  curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER     => $headers,
    CURLOPT_TIMEOUT        => 10,
  ]);
  $body = curl_exec($ch);
  curl_close($ch);
  return json_decode($body, true);
}

$data = apiGet('https://api.example.com/users', [
  'Authorization: Bearer ' . $token,
]);`,
  },

  // ── Python ───────────────────────────────────────────────
  {
    id: 'py_list_comprehension',
    lang: 'python',
    title: 'List comprehension',
    description: 'Créer une liste de façon concise',
    code: `# Doubler les nombres pairs
result = [x * 2 for x in range(10) if x % 2 == 0]
# [0, 4, 8, 12, 16]

# Dict comprehension
squares = {x: x**2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}`,
  },
  {
    id: 'py_requests',
    lang: 'python',
    title: 'requests — appel API',
    description: 'Appel HTTP avec la bibliothèque requests',
    code: `import requests

# GET
res = requests.get('https://api.example.com/users', headers={
    'Authorization': f'Bearer {token}'
})
data = res.json()

# POST
res = requests.post('/api/users', json={'nom': 'Jules', 'age': 25})
print(res.status_code)`,
  },
  {
    id: 'py_dataclass',
    lang: 'python',
    title: 'dataclass — classe de données',
    description: 'Définir une structure de données simplement',
    code: `from dataclasses import dataclass, field
from typing import List

@dataclass
class User:
    nom: str
    age: int
    roles: List[str] = field(default_factory=list)

    def is_admin(self) -> bool:
        return 'admin' in self.roles

user = User('Jules', 25, ['admin', 'user'])
print(user.is_admin())  # True`,
  },
  {
    id: 'py_context_manager',
    lang: 'python',
    title: 'Context manager — with',
    description: 'Gérer des ressources avec with',
    code: `# Lecture de fichier (fermeture automatique)
with open('data.txt', 'r', encoding='utf-8') as f:
    content = f.read()

# Écriture
with open('output.txt', 'w') as f:
    f.write('Hello World')

# Plusieurs en même temps
with open('a.txt') as a, open('b.txt') as b:
    data = a.read() + b.read()`,
  },
];
