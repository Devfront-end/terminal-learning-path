import { useState, useRef, useEffect } from 'react';
import { exercises } from '../data/exercises.js';
import { cdRows, findRows, grepRows, gitRows, findUsageRows, grepUsageRows } from '../data/reference.js';
import { phpArrayRows, phpStringRows, phpUtilRows } from '../data/reference-php.js';

// Base de connaissances locale
const allCommands = [
  ...cdRows,
  ...findRows,
  ...grepRows,
  ...gitRows,
  ...findUsageRows,
  ...grepUsageRows,
  ...phpArrayRows,
  ...phpStringRows,
  ...phpUtilRows,
];

const exerciseQA = [];
Object.entries(exercises).forEach(([id, ex]) => {
  exerciseQA.push({
    question: ex.challenge,
    answer: ex.explanation || ex.hint || ex.successMessage,
    category: ex.category,
    type: 'exercise',
  });
});

const commandQA = allCommands.map(cmd => ({
  question: `Qu'est-ce que ${cmd.cmd} ?`,
  answer: `${cmd.desc}\n\nExemple: \`${cmd.example || cmd.cmd}\`\n${cmd.note ? `\nNote: ${cmd.note}` : ''}`,
  category: 'command',
  type: 'reference',
}));

const predefinedQA = [
  {
    question: 'Comment lister tous les fichiers dans un dossier ?',
    answer: 'Utilisez la commande `ls` pour lister les fichiers.\n\nVariantes utiles:\n- `ls -l` : affiche les détails (permissions, taille, date)\n- `ls -a` : inclut les fichiers cachés (commencant par .)\n- `ls -la` : combine les deux\n- `ls /chemin/du/dossier` : lister un dossier spécifique',
    category: 'ls',
    type: 'predefined',
  },
  {
    question: 'Comment changer de répertoire ?',
    answer: 'Utilisez `cd` (change directory) :\n\nNavigation de base:\n- `cd nom_du_dossier` : aller dans un sous-dossier\n- `cd ..` : remonter d\'un niveau\n- `cd /` : aller à la racine\n- `cd ~` : retourner dans votre home\n- `cd -` : retourner au répertoire précédent\n\nChemins:\n- Chemin relatif: `cd projets/my_app` (depuis votre position actuelle)\n- Chemin absolu: `cd /home/user/projects` (depuis n\'importe où)',
    category: 'cd',
    type: 'predefined',
  },
  {
    question: 'Comment trouver un fichier ?',
    answer: 'Utilisez `find` pour rechercher des fichiers :\n\nExemples:\n- `find . -name "fichier.txt"` : cherche dans le dossier courant\n- `find /home -name "*.php"` : cherche tous les fichiers PHP depuis /home\n- `find . -type f -name "*.js"` : seulement les fichiers (pas dossiers)\n- `find . -type d -name "config"` : seulement les dossiers\n- `find . -mtime -7` : fichiers modifiés dans les 7 derniers jours\n- `find . -size +10M` : fichiers de plus de 10 Mo',
    category: 'find',
    type: 'predefined',
  },
  {
    question: 'Comment chercher du texte dans un fichier ?',
    answer: 'Utilisez `grep` pour rechercher du texte :\n\nExemples:\n- `grep "erreur" fichier.log` : cherche "erreur" dans fichier.log\n- `grep -i "erreur" fichier.log` : recherche insensitve à la casse\n- `grep -n "TODO" code.php` : affiche aussi le numéro de ligne\n- `grep -r "fonction" .` : recherche récursivement dans tous les fichiers\n- `grep -v "debug" file.txt` : affiche les lignes qui NE contiennent PAS "debug"\n- `cat file.txt | grep "pattern"` : combine avec d\'autres commandes',
    category: 'grep',
    type: 'predefined',
  },
  {
    question: 'Comment voir le contenu d\'un fichier ?',
    answer: 'Plusieurs options selon vos besoins:\n\n- `cat fichier.txt` : affiche tout le contenu\n- `head fichier.txt` : affiche les 10 premières lignes\n- `head -n 20 fichier.txt` : affiche les 20 premières lignes\n- `tail fichier.txt` : affiche les 10 dernières lignes\n- `tail -f fichier.log` : suit le fichier en temps réel (utile pour les logs)\n- `less fichier.txt` : affichage paginé (appuyez sur q pour quitter)\n- `more fichier.txt` : affichage page par page',
    category: 'view',
    type: 'predefined',
  },
  {
    question: 'Quelles sont les commandes Git de base ?',
    answer: 'Commandes Git essentielles:\n\nConfiguration:\n- `git config --global user.name "Votre Nom"`\n- `git config --global user.email "votre@email.com"`\n\nCréation:\n- `git init` : initialiser un dépôt\n- `git clone url` : cloner un dépôt existant\n\nTravail quotidien:\n- `git status` : voir l\'état des modifications\n- `git add fichier` : ajouter un fichier au staging\n- `git add .` : ajouter tous les fichiers\n- `git commit -m "message"` : commiter les modifications\n- `git push origin main` : pousser vers le dépôt distant\n- `git pull origin main` : tirer les modifications\n\nBranches:\n- `git branch` : lister les branches\n- `git checkout nom-branche` : changer de branche\n- `git branch nouvelle-branche` : créer une nouvelle branche\n- `git merge nom-branche` : fusionner une branche',
    category: 'git',
    type: 'predefined',
  },
  {
    question: 'Comment créer un fichier ?',
    answer: 'Vous pouvez créer un fichier de plusieurs manières:\n\n- `touch fichier.txt` : crée un fichier vide\n- `echo "contenu" > fichier.txt` : crée un fichier avec du contenu\n- `echo "ajout" >> fichier.txt` : ajoute du contenu à la fin\n- `nano fichier.txt` ou `vim fichier.txt` : crée/édite avec un éditeur\n\nNote: Utilisez `>` pour écraser, `>>` pour ajouter.',
    category: 'create',
    type: 'predefined',
  },
  {
    question: 'Comment supprimer un fichier ou un dossier ?',
    answer: 'Attention, ces commandes sont irréversibles !\n\n- `rm fichier.txt` : supprime un fichier\n- `rm -f fichier.txt` : force la suppression (sans confirmation)\n- `rm -r dossier/` : supprime un dossier ET son contenu (récursif)\n- `rmdir dossier/` : supprime un dossier VIDE uniquement\n\n⚠️  Pour supprimer définitivement, ajoutez `-f` mais soyez très prudent !',
    category: 'delete',
    type: 'predefined',
  },
  {
    question: 'Comment connaître l\'espace disque utilisé ?',
    answer: 'Commandes pour vérifier l\'espace:\n\n- `df -h` : affiche l\'espace disque disponible sur tous les systèmes de fichiers (h = humain, en Go/Mo)\n- `du -sh dossier/` : affiche la taille totale d\'un dossier (s = summary, h = humain)\n- `du -sh *` : affiche la taille de tous les fichiers/dossiers dans le répertoire courant\n- `free -h` : affiche l\'utilisation de la mémoire RAM',
    category: 'system',
    type: 'predefined',
  },
  {
    question: 'Comment voir les processus en cours ?',
    answer: 'Utilisez `ps` pour voir les processus:\n\n- `ps aux` : affiche tous les processus avec détails\n- `ps aux | grep nom` : filtre pour un nom de processus\n- `top` : affichage interactif des processus (appuyez sur q pour quitter)\n- `htop` : version améliorée de top (si installé)\n- `kill PID` : termine un processus par son ID\n- `kill -9 PID` : force la terminaison (sigkill)',
    category: 'process',
    type: 'predefined',
  },
];

const knowledgeBase = [...predefinedQA, ...exerciseQA, ...commandQA];

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[\u00C0-\u017F]/g, c => c.normalize('NFD').replace(/\u0300-\u036f/g, ''))
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function fuzzyMatch(query, text, threshold = 0.5) {
  const queryWords = normalizeText(query).split(' ');
  const textWords = normalizeText(text).split(' ');
  const matches = queryWords.filter(queryWord =>
    textWords.some(textWord => textWord.includes(queryWord))
  );
  return matches.length / Math.max(queryWords.length, 1) >= threshold;
}

function searchKnowledgeBase(query) {
  const normalizedQuery = normalizeText(query);
  const exactMatches = knowledgeBase.filter(item =>
    normalizeText(item.question).includes(normalizedQuery)
  );
  if (exactMatches.length > 0) return exactMatches.slice(0, 5);
  const answerMatches = knowledgeBase.filter(item =>
    normalizeText(item.answer).includes(normalizedQuery)
  );
  if (answerMatches.length > 0) return answerMatches.slice(0, 5);
  const fuzzyMatches = knowledgeBase.filter(item =>
    fuzzyMatch(query, item.question) || fuzzyMatch(query, item.answer)
  );
  if (fuzzyMatches.length > 0) return fuzzyMatches.slice(0, 5);
  const keywordMatches = knowledgeBase.filter(item => {
    const keywords = [item.category, item.type, ...item.question.split(' '), ...item.answer.split(' ')];
    return keywords.some(kw => normalizeText(kw).includes(normalizedQuery));
  });
  return keywordMatches.slice(0, 5);
}

const exampleQuestions = [
  'Comment lister les fichiers cachés ?',
  'Quelle est la différence entre cd et cd ~ ?',
  'Comment trouver tous les fichiers PHP ?',
  'Comment chercher du texte dans plusieurs fichiers ?',
  'Comment voir les 20 dernières lignes d\'un fichier ?',
  'Comment supprimer un dossier et son contenu ?',
  'Comment créer une nouvelle branche Git ?',
  'Comment voir l\'historique des commits ?',
  'Comment utiliser find avec plusieurs conditions ?',
  'Comment compter le nombre de lignes contenant un mot ?',
];

export default function AskCLI() {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [selectedExample, setSelectedExample] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [answers, loading, showExamples]);

  const handleSearch = () => {
    const q = question.trim();
    if (!q) {
      setAnswers([]);
      setShowExamples(true);
      return;
    }
    setLoading(true);
    setShowExamples(false);
    setTimeout(() => {
      const results = searchKnowledgeBase(q);
      setAnswers(results);
      setLoading(false);
    }, 200);
  };

  const handleExampleClick = (example) => {
    setQuestion(example);
    setSelectedExample(example);
    setShowExamples(false);
    setTimeout(() => handleSearch(), 100);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSearch();
    }
    if (e.key === 'ArrowDown' && showExamples && exampleQuestions.length > 0) {
      e.preventDefault();
      const currentIndex = exampleQuestions.findIndex(q => q === selectedExample);
      const nextIndex = (currentIndex + 1) % exampleQuestions.length;
      setSelectedExample(exampleQuestions[nextIndex]);
      setQuestion(exampleQuestions[nextIndex]);
    }
    if (e.key === 'ArrowUp' && showExamples && exampleQuestions.length > 0) {
      e.preventDefault();
      const currentIndex = exampleQuestions.findIndex(q => q === selectedExample);
      const prevIndex = (currentIndex - 1 + exampleQuestions.length) % exampleQuestions.length;
      setSelectedExample(exampleQuestions[prevIndex]);
      setQuestion(exampleQuestions[prevIndex]);
    }
  };

  return (
    <div className="flex h-full min-h-0 bg-gray-950 text-gray-200 flex-col">
      <div className="border-b border-cyan-900/30 p-4 bg-gray-950/50">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
          <h2 className="text-sm font-semibold text-cyan-400">Assistant CLI Local</h2>
        </div>
        <p className="text-xs text-gray-500">
          🔍 Recherche dans la base de connaissances locale - 100% transparent, sans appel externe
        </p>
      </div>

      <div className="p-4 border-b border-cyan-900/30 bg-gray-950/30">
        <div className="flex gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              if (selectedExample) setSelectedExample(null);
            }}
            onKeyDown={handleKeyDown}
            placeholder={showExamples ? "Tapez votre question ou choisissez un exemple..." : "Poser une question sur CLI, Linux ou Git..."}
            disabled={loading}
            className="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm text-gray-100 outline-none focus:border-cyan-600 font-mono"
            autoFocus
            autoComplete="off"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-4 py-2 rounded bg-cyan-700/30 border border-cyan-600/60 text-cyan-100 text-sm font-semibold hover:bg-cyan-700/40 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? '...' : '🔍'}
          </button>
        </div>
        {!showExamples && question === '' && (
          <button
            onClick={() => {
              setShowExamples(true);
              setSelectedExample(exampleQuestions[0]);
            }}
            className="mt-2 text-xs text-cyan-500 hover:text-cyan-300 cursor-pointer text-left"
          >
            Afficher des exemples de questions
          </button>
        )}
      </div>

      <div className="flex-1 min-h-0 overflow-auto p-4">
        {showExamples && question === '' && (
          <div className="space-y-2">
            <p className="text-xs text-gray-500 mb-3">
              Essayez l'une de ces questions :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {exampleQuestions.map((example, index) => (
                <button
                  key={example}
                  onClick={() => handleExampleClick(example)}
                  className={`w-full text-left px-3 py-2 rounded text-sm text-gray-300 hover:bg-cyan-900/30 border border-transparent hover:border-cyan-800/50 transition-all ${
                    selectedExample === example ? 'bg-cyan-900/40 border-cyan-700/60 text-cyan-100' : ''
                  }`}
                  style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}
        {answers.length > 0 && (
          <div className="space-y-4">
            {answers.map((answer, index) => (
              <div
                key={`${answer.question}-${index}`}
                className="bg-gray-900/50 border border-cyan-900/30 rounded-lg p-4"
              >
                <div className="mb-2">
                  <span className="text-cyan-400 text-sm font-semibold">Q:</span>
                  <span className="ml-2 text-gray-300">{answer.question}</span>
                </div>
                <div className="pl-6">
                  <span className="text-green-400 text-sm font-semibold">A:</span>
                  <div className="ml-2 mt-1 text-gray-200 text-sm leading-6 whitespace-pre-wrap">
                    {answer.answer}
                  </div>
                </div>
                {answer.category && (
                  <div className="mt-2 pl-6">
                    <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                      {answer.category}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {question && answers.length === 0 && !loading && !showExamples && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">
              Aucune réponse trouvée dans la base de connaissances locale.
            </p>
            <p className="text-xs mt-2 text-gray-600">
              Essayez une formulation différente ou consultez les onglets Reference, Exercices ou Arborescence.
            </p>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-cyan-900/30 p-3 bg-gray-950/50">
        <p className="text-xs text-gray-500 text-center">
          Recherche locale uniquement - Aucune donnée n'est envoyée à des serveurs externes
        </p>
      </div>
    </div>
  );
}
