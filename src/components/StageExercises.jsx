import { useMemo, useState } from 'react';
import { stageExercises, stageExerciseLanguages } from '../data/stageExercises.js';

const solutions = {
  'php-001': `<?php
echo "hello world";
`,
  'php-002': `<?php
$prenom = "Jules";
echo "Bonjour " . $prenom;
`,
  'php-003': `<form method="post">
  <input name="prenom" placeholder="Prénom">
  <button>Envoyer</button>
</form>

<?php
if (isset($_POST['prenom'])) {
  echo htmlspecialchars($_POST['prenom']);
}
`,
  'php-004': `<?php
$age = 18;

if ($age >= 18) {
  echo "majeur";
} else {
  echo "mineur";
}
`,
  'php-005': `<?php
for ($i = 1; $i <= 10; $i++) {
  echo $i . "<br>";
}
`,
  'php-006': `<?php
function carre($x) {
  return $x * $x;
}

echo carre(5);
`,
  'php-007': `<?php
$utilisateur = [
  "prenom" => "Jules",
  "age" => 22,
  "role" => "stagiaire",
];

echo $utilisateur["prenom"] . " - " . $utilisateur["age"] . " ans";
`,
  'php-008': `<?php
$json = file_get_contents("data.json");
$noms = json_decode($json, true);

foreach ($noms as $nom) {
  echo htmlspecialchars($nom) . "<br>";
}
`,
  'php-009': `<?php
$email = "test@example.com";

if (str_contains($email, "@") && str_ends_with($email, ".com")) {
  echo "Email valide";
} else {
  echo "Email invalide";
}
`,
  'php-010': `<!-- header.php -->
<header>
  <h1>Mon site</h1>
</header>

<!-- index.php -->
<?php include "header.php"; ?>
<main>Contenu principal</main>
`,
  'php-011': `<?php
$json = file_get_contents("users.json");
$users = json_decode($json, true);

foreach ($users as $user) {
  echo htmlspecialchars($user["prenom"]) . "<br>";
}
`,
  'php-012': `<form method="post">
  <input name="message" placeholder="Message">
  <button>Enregistrer</button>
</form>

<?php
if (!empty($_POST["message"])) {
  file_put_contents("messages.txt", $_POST["message"] . PHP_EOL, FILE_APPEND);
  echo "Message enregistré";
}
`,
  'php-013': `<?php
$a = (int) ($_POST["a"] ?? 0);
$b = (int) ($_POST["b"] ?? 0);

echo $a + $b;
`,
  'php-014': `<?php
$date = $_GET["date"] ?? date("Y-m-d");
$jour = new DateTime($date);

echo $jour->format("l");
`,
  'php-015': `<?php
header("Content-Type: application/json");

$data = [
  ["jour" => "lundi", "temperature" => 18],
  ["jour" => "mardi", "temperature" => 21],
];

echo json_encode($data);
`,
  'php-016': `<?php
header("Content-Type: application/json");

$nom = $_POST["nom"] ?? "";

echo json_encode([
  "success" => true,
  "message" => "Bonjour " . $nom,
]);
`,
  'php-017': `<?php
header("Content-Type: application/json");

echo json_encode([
  "nombre" => random_int(1, 100),
]);
`,
  'php-018': `<?php
header("Content-Type: application/json");

$nom = strtolower($_GET["nom"] ?? "");
$users = [
  ["prenom" => "Alice"],
  ["prenom" => "Jules"],
  ["prenom" => "Alex"],
];

$resultats = array_filter($users, function ($user) use ($nom) {
  return str_contains(strtolower($user["prenom"]), $nom);
});

echo json_encode(array_values($resultats));
`,
  'php-019': `<?php
$ligne = date("Y-m-d H:i:s") . " " . $_SERVER["REQUEST_METHOD"] . " " . $_SERVER["REQUEST_URI"] . PHP_EOL;
file_put_contents("log.txt", $ligne, FILE_APPEND);

echo "Requête loggée";
`,
  'php-020': `<?php
session_start();

if (isset($_POST["password"]) && $_POST["password"] === "secret") {
  $_SESSION["auth"] = true;
}

if (empty($_SESSION["auth"])) {
  echo '<form method="post"><input type="password" name="password"><button>Connexion</button></form>';
  exit;
}

echo "Page protégée";
`,
  'js-001': `document.querySelector("#btn").addEventListener("click", () => {
  alert("Bouton cliqué");
});
`,
  'js-002': `document.querySelector("#texte").textContent = "Nouveau texte";
`,
  'js-003': `document.querySelector("#btn").addEventListener("click", () => {
  const valeur = document.querySelector("#champ").value;
  document.querySelector("#resultat").textContent = valeur;
});
`,
  'js-004': `document.querySelector("#btn").addEventListener("click", () => {
  const nombre = Number(document.querySelector("#nombre").value);
  const bloc = document.querySelector("#bloc");

  bloc.style.backgroundColor = nombre >= 10 ? "green" : "red";
});
`,
  'js-005': `const fruits = ["pomme", "banane", "kiwi"];
const ul = document.querySelector("#liste");

fruits.forEach((fruit) => {
  const li = document.createElement("li");
  li.textContent = fruit;
  ul.appendChild(li);
});
`,
  'js-006': `let secondes = 0;
const affichage = document.querySelector("#timer");

const interval = setInterval(() => {
  secondes++;
  affichage.textContent = secondes;

  if (secondes === 10) {
    clearInterval(interval);
  }
}, 1000);
`,
  'js-007': `const users = [
  { nom: "Alice", role: "Admin" },
  { nom: "Jules", role: "Stagiaire" },
  { nom: "Nina", role: "Dev" },
  { nom: "Sam", role: "Support" },
  { nom: "Lina", role: "UX" },
];

document.querySelector("#cards").innerHTML = users.map((user) => \`
  <article class="card">
    <h3>\${user.nom}</h3>
    <p>\${user.role}</p>
  </article>
\`).join("");
`,
  'js-008': `async function chargerUtilisateur() {
  const response = await fetch("https://randomuser.me/api/");
  const data = await response.json();
  const user = data.results[0];

  document.querySelector("#user").textContent = \`\${user.name.first} \${user.name.last}\`;
}

chargerUtilisateur();
`,
  'js-009': `function motDePasseFort(password) {
  return password.length > 8 && /\\d/.test(password);
}

console.log(motDePasseFort("azerty123"));
`,
  'js-010': `document.querySelector("#liste").addEventListener("click", (event) => {
  const bouton = event.target.closest("button");
  if (!bouton) return;

  console.log("Bouton dynamique cliqué", bouton.dataset.id);
});
`,
  'js-011': `document.querySelector("#darkMode").addEventListener("change", (event) => {
  document.body.classList.toggle("dark", event.target.checked);
});
`,
  'js-012': `async function copyToClipboard(text) {
  await navigator.clipboard.writeText(text);
}

document.querySelector("#copy").addEventListener("click", () => {
  copyToClipboard("Texte copié");
});
`,
  'js-013': `function calculer(operation) {
  const a = Number(document.querySelector("#a").value);
  const b = Number(document.querySelector("#b").value);
  let resultat = 0;

  if (operation === "+") resultat = a + b;
  if (operation === "-") resultat = a - b;
  if (operation === "*") resultat = a * b;
  if (operation === "/") resultat = b !== 0 ? a / b : "Division impossible";

  document.querySelector("#resultat").textContent = resultat;
}
`,
  'js-014': `document.querySelector("#date").addEventListener("change", (event) => {
  const date = new Date(event.target.value);
  const jour = date.toLocaleDateString("fr-FR", { weekday: "long" });

  document.querySelector("#jour").textContent = jour;
});
`,
  'js-015': `const canvas = document.querySelector("#graphique");
const ctx = canvas.getContext("2d");
const valeurs = [40, 90, 60, 120];

valeurs.forEach((valeur, index) => {
  ctx.fillStyle = "#06b6d4";
  ctx.fillRect(index * 50 + 20, canvas.height - valeur, 30, valeur);
});
`,
  'js-016': `document.querySelector("#form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const response = await fetch("traitement.php", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  console.log(data);
});
`,
  'js-017': `function couleurAleatoire() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
}

document.querySelector("#bloc").style.backgroundColor = couleurAleatoire();
`,
  'js-018': `const items = ["PHP", "JavaScript", "HTML", "CSS"];

document.querySelector("#search").addEventListener("input", (event) => {
  const q = event.target.value.toLowerCase();
  const resultats = items.filter((item) => item.toLowerCase().includes(q));

  document.querySelector("#resultats").innerHTML = resultats
    .map((item) => \`<li>\${item}</li>\`)
    .join("");
});
`,
  'js-019': `async function notifier() {
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    new Notification("Notification activée");
  }
}

document.querySelector("#notify").addEventListener("click", notifier);
`,
  'js-020': `document.querySelector("#burger").addEventListener("click", () => {
  document.querySelector("#menu").classList.toggle("open");
});
`,
};

const langStyles = {
  php: {
    label: 'PHP',
    text: 'text-indigo-300',
    border: 'border-indigo-800/50',
    bg: 'bg-indigo-950/20',
  },
  js: {
    label: 'JS',
    text: 'text-yellow-300',
    border: 'border-yellow-800/50',
    bg: 'bg-yellow-950/20',
  },
};

function buildStarter(exercise) {
  if (exercise.language === 'php') {
    return `<?php\n// ${exercise.title}\n\n`;
  }
  return `// ${exercise.title}\n\n`;
}

export default function StageExercises() {
  const [activeLang, setActiveLang] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(stageExercises[0]?.id);
  const [showSolution, setShowSolution] = useState(false);
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return stageExercises.filter((exercise) => {
      const langMatch = activeLang === 'all' || exercise.language === activeLang;
      const searchMatch = !q ||
        exercise.title.toLowerCase().includes(q) ||
        exercise.goal.toLowerCase().includes(q) ||
        exercise.concepts.join(' ').toLowerCase().includes(q);
      return langMatch && searchMatch;
    });
  }, [activeLang, search]);

  const selected = stageExercises.find((exercise) => exercise.id === selectedId) || filtered[0] || stageExercises[0];
  const style = langStyles[selected.language];

  const selectLang = (lang) => {
    setActiveLang(lang);
    const next = stageExercises.find((exercise) => lang === 'all' || exercise.language === lang);
    if (next) setSelectedId(next.id);
    setShowSolution(false);
    setCopied(false);
  };

  const selectExercise = (id) => {
    setSelectedId(id);
    setShowSolution(false);
    setCopied(false);
  };

  const copySolution = () => {
    if (!selected) return;
    navigator.clipboard.writeText(solutions[selected.id] || '').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  };

  return (
    <div className="flex-1 overflow-hidden flex bg-gray-950">
      <aside className="w-80 shrink-0 border-r border-gray-800/60 flex flex-col min-w-0">
        <div className="border-b border-gray-800/60 bg-gray-950/70 px-4 py-3 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-cyan-300 text-xs font-bold uppercase tracking-wider">Exercices de stage</div>
              <div className="text-gray-500 text-xs mt-1">{stageExercises.length} sujets PHP/JS</div>
            </div>
          </div>

          <div className="flex rounded border border-gray-800 overflow-hidden">
            {stageExerciseLanguages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => selectLang(lang.id)}
                className={`flex-1 px-3 py-2 text-xs font-semibold transition-colors ${
                  activeLang === lang.id
                    ? 'bg-cyan-600/20 text-cyan-300'
                    : 'bg-gray-900/40 text-gray-500 hover:text-gray-300'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un sujet..."
            className="w-full bg-gray-900/70 border border-gray-800 rounded px-3 py-2 text-xs text-gray-300 outline-none focus:border-cyan-700 placeholder-gray-600"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filtered.map((exercise) => {
            const itemStyle = langStyles[exercise.language];
            const active = selected?.id === exercise.id;
            return (
              <button
                key={exercise.id}
                onClick={() => selectExercise(exercise.id)}
                className={`w-full text-left border rounded p-3 transition-all ${
                  active
                    ? `${itemStyle.bg} ${itemStyle.border}`
                    : 'bg-gray-900/30 border-gray-800/50 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${itemStyle.text} ${itemStyle.border}`}>
                    {itemStyle.label}
                  </span>
                  <span className="text-gray-500 text-[10px] font-mono">{exercise.id.toUpperCase()}</span>
                </div>
                <div className="text-gray-200 text-xs font-semibold leading-5">{exercise.title}</div>
              </button>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-gray-500 text-xs p-3">Aucun exercice trouvé.</div>
          )}
        </div>
      </aside>

      {selected && (
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-6 space-y-5">
            <div className={`border rounded p-5 ${style.bg} ${style.border}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className={`text-xs font-bold uppercase tracking-wider ${style.text}`}>
                    Sujet {style.label} · {selected.id.toUpperCase()}
                  </div>
                  <h2 className="text-cyan-100 text-lg font-bold mt-2">{selected.title}</h2>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-7 mt-4">{selected.goal}</p>
            </div>

            <section className="grid grid-cols-1 xl:grid-cols-[1fr_1.1fr] gap-5">
              <div className="space-y-5">
                <div className="border border-gray-800/60 bg-gray-900/30 rounded p-4">
                  <h3 className="text-gray-200 text-sm font-semibold mb-3">Notions travaillées</h3>
                  <div className="flex flex-wrap gap-2">
                    {selected.concepts.map((concept) => (
                      <span
                        key={concept}
                        className="border border-gray-700 bg-gray-950/60 text-gray-300 text-xs rounded px-2 py-1"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border border-gray-800/60 bg-gray-900/30 rounded p-4">
                  <h3 className="text-gray-200 text-sm font-semibold mb-3">À produire</h3>
                  <ul className="space-y-2 text-gray-400 text-xs leading-6">
                    <li>Créer le fichier ou la page correspondant au sujet.</li>
                    <li>Tester le cas nominal, puis au moins un cas vide ou incorrect.</li>
                    <li>Garder un code lisible avec des noms de variables explicites.</li>
                  </ul>
                </div>
              </div>

              <div className="border border-gray-800/60 bg-[#1e1e1e] rounded overflow-hidden">
                <div className="flex items-center justify-between border-b border-gray-800 bg-gray-950/70 px-4 py-2">
                  <span className="text-gray-400 text-xs font-mono">
                    starter.{selected.language === 'php' ? 'php' : 'js'}
                  </span>
                  <span className={`text-xs font-semibold ${style.text}`}>{style.label}</span>
                </div>
                <pre className="min-h-72 p-4 text-green-300 text-xs leading-6 overflow-auto font-mono whitespace-pre-wrap">
                  {buildStarter(selected)}
                </pre>
              </div>
            </section>

            <section className="border border-gray-800/60 bg-gray-900/30 rounded overflow-hidden">
              <div className="flex items-center justify-between gap-3 border-b border-gray-800/60 bg-gray-950/70 px-4 py-3">
                <div>
                  <h3 className="text-gray-200 text-sm font-semibold">Solution de référence</h3>
                  <p className="text-gray-500 text-xs mt-1">Une correction possible, à adapter selon ton HTML ou tes fichiers.</p>
                </div>
                <div className="flex gap-2">
                  {showSolution && (
                    <button
                      onClick={copySolution}
                      className="px-3 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded text-xs font-semibold hover:text-cyan-300 hover:border-cyan-700"
                    >
                      {copied ? 'Copié' : 'Copier'}
                    </button>
                  )}
                  <button
                    onClick={() => setShowSolution((value) => !value)}
                    className="px-3 py-2 bg-cyan-600/20 border border-cyan-600/40 text-cyan-300 rounded text-xs font-semibold hover:bg-cyan-600/30"
                  >
                    {showSolution ? 'Masquer' : 'Afficher'}
                  </button>
                </div>
              </div>
              {showSolution ? (
                <pre className="p-4 text-xs font-mono text-green-300 overflow-x-auto leading-relaxed whitespace-pre">
                  {solutions[selected.id] || '// Solution à compléter'}
                </pre>
              ) : (
                <div className="p-4 text-gray-500 text-xs">
                  Clique sur Afficher quand tu veux comparer ton approche.
                </div>
              )}
            </section>
          </div>
        </main>
      )}
    </div>
  );
}
