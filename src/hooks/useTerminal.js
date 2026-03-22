import { useState, useCallback } from 'react';
import { vfs, allFiles, allDirs } from '../data/vfs.js';
import { exercises } from '../data/exercises.js';

// ── Contenu simulé des fichiers ───────────────────────────────────────────
const fileContents = {
  'AppController.php': [
    'class AppController extends Controller {',
    "    public $helpers = ['Form', 'Html'];",
    '    public function beforeFilter() {',
    '        parent::beforeFilter();',
    "        $this->Auth->allow(['index', 'view']);",
    '    }',
    '}',
  ],
  'UsersController.php': [
    'class UsersController extends AppController {',
    '    public function login() {',
    "        if ($this->request->is('post')) {",
    '            $user = $this->Auth->identify();',
    '            if ($user) { $this->Auth->setUser($user); }',
    '        }',
    '    }',
    '    public function register() {',
    "        $this->set('title_for_layout', 'Inscription');",
    '    }',
    '}',
  ],
  'Budget.php': [
    'class Budget extends AppModel {',
    "    public $belongsTo = ['User', 'Category'];",
    "    public $hasMany = ['Transaction'];",
    '    public function getMontantTotal($userId) {',
    "        return $this->find('sum', ['conditions' => ['user_id' => $userId]]);",
    '    }',
    '}',
  ],
  'Transaction.php': [
    'class Transaction extends AppModel {',
    "    public $belongsTo = ['Budget', 'Category'];",
    '    public function getByPeriod($start, $end) {',
    "        return $this->find('all', ['conditions' => [",
    "            'date >=' => $start,",
    "            'date <=' => $end",
    '        ]]);',
    '    }',
    '}',
  ],
  'wishlist.php': [
    '<?php',
    'require_once "config/database.php";',
    '$userId = $_SESSION["user_id"];',
    '$items = $db->query("SELECT * FROM wishlist WHERE user_id = $userId");',
    'foreach ($items as $item) {',
    '    echo "<li>" . htmlspecialchars($item["name"]) . "</li>";',
    '}',
  ],
  'error.log': [
    '[2026-03-10 08:12:34] ERROR: Database connection failed',
    '[2026-03-10 09:45:11] ERROR: Undefined variable $userId in Budget.php line 42',
    '[2026-03-11 10:22:03] WARNING: Deprecated function used in Transaction.php',
    '[2026-03-11 14:33:17] ERROR: Permission denied on /tmp/cache',
    '[2026-03-12 07:01:55] ERROR: Failed to send email in verify-email.php',
  ],
  'access.log': [
    '[2026-03-12 07:00:01] GET /index.php 200',
    '[2026-03-12 07:00:42] POST /users/login 302',
    '[2026-03-12 07:01:10] GET /budgets/view/3 200',
    '[2026-03-12 07:01:55] GET /verify-email.php?token=abc123 500',
    '[2026-03-12 07:02:30] GET /wishlist.php 200',
  ],
  'debug.log': [
    '[2026-03-12 06:58:00] DEBUG: App bootstrap start',
    '[2026-03-12 06:58:01] DEBUG: Database connected',
    '[2026-03-12 06:58:02] DEBUG: Cache initialized',
    '[2026-03-12 07:01:55] DEBUG: Request to /verify-email.php',
    '[2026-03-12 07:01:56] DEBUG: Token validation failed',
  ],
  '.gitignore': [
    '# Dépendances',
    '/vendor/',
    '',
    '# Fichiers temporaires',
    '/tmp/',
    '*.log',
    '',
    '# Configuration sensible',
    '/config/database.php',
    '.env',
    '.env.local',
    '',
    '# IDE',
    '.idea/',
    '.vscode/',
    '*.swp',
    '',
    '# OS',
    '.DS_Store',
    'Thumbs.db',
  ],
  'database.php': [
    "<?php",
    "class DATABASE_CONFIG {",
    "    public $default = [",
    "        'datasource' => 'Database/Mysql',",
    "        'host' => 'localhost',",
    "        'login' => 'john_doe',",
    "        'password' => '***',",
    "        'database' => 'my_project_db',",
    "    ];",
    "}",
  ],
  'core.php': [
    "<?php",
    "Configure::write('debug', 0);",
    "Configure::write('App.encoding', 'UTF-8');",
    "Configure::write('Security.salt', 'RANDOM_SALT_HERE');",
    "Configure::write('Cache.default', ['engine' => 'File']);",
  ],
};

function buildTree(dirPath, prefix = '', dirsOnly = false, maxDepth = Infinity, currentDepth = 0) {
  const items = vfs[dirPath] || [];
  const filtered = dirsOnly ? items.filter(i => i.endsWith('/')) : items;
  const lines = [];
  filtered.forEach((item, idx) => {
    const isLast = idx === filtered.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    const name = item.endsWith('/') ? item.slice(0, -1) : item;
    lines.push(prefix + connector + name);
    if (item.endsWith('/') && currentDepth < maxDepth) {
      const childPath = dirPath === '/' ? '/' + name : dirPath + '/' + name;
      const childPrefix = prefix + (isLast ? '    ' : '│   ');
      lines.push(...buildTree(childPath, childPrefix, dirsOnly, maxDepth, currentDepth + 1));
    }
  });
  return lines;
}

// ── Interpréteur de langage naturel ──────────────────────────────────────

const INTENT_TRIGGERS = [
  /^je (veux|voudrais|souhaite|cherche)/i,
  /^(où|ou) (est|se trouve|trouver|aller)/i,
  /^comment (aller|accéder|trouver|naviguer|ouvrir|voir)/i,
  /^(aller|accéder|ouvrir|voir|afficher|trouver|positionner)\s/i,
  /^(go to|show me|where is|find me|navigate to|open)\s/i,
];

const FR_STOP = new Set([
  'je','veux','voudrais','souhaite','aller','me','positionner','dans','le','la','les',
  'un','une','du','des','au','aux','répertoire','dossier','fichier','fichiers',
  'où','ou','est','se','trouve','comment','naviguer','accéder','ouvrir','voir',
  'afficher','chercher','trouver','et','à','de','sur','par','pour','avec','en',
  'qui','que','quoi','quel','quelle','mon','ma','mes','son','sa','ses','ce','cet',
  'cette','ces','the','to','go','show','navigate','where','is','in','at','of',
  'and','or','find','want','how','get','open','display','a','an',
]);

function isNaturalLanguage(input) {
  const firstWord = input.trim().split(/\s+/)[0].toLowerCase();
  const knownCmds = ['cat','cd','chmod','chown','clear','df','du','find','grep','head',
    'less','ls','man','ps','pwd','tail','tree','whoami','git'];
  if (knownCmds.includes(firstWord)) return false;
  return INTENT_TRIGGERS.some(p => p.test(input.trim()));
}

function extractKeywords(input) {
  return input
    .toLowerCase()
    .replace(/[;,!?:]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !FR_STOP.has(w));
}

function searchVFSForKeywords(keywords) {
  const dirs = Object.keys(vfs).filter(p =>
    keywords.some(kw => p.toLowerCase().includes(kw))
  );
  const files = allFiles.filter(p =>
    keywords.some(kw => p.toLowerCase().includes(kw))
  );
  // Déduplique et limite
  const uniqueDirs = [...new Set(dirs)].slice(0, 5);
  const uniqueFiles = [...new Set(files)].slice(0, 5);
  return { dirs: uniqueDirs, files: uniqueFiles };
}

function resolveFile(arg) {
  const basename = arg.split('/').pop();
  if (fileContents[basename]) return fileContents[basename];
  const found = Object.keys(fileContents).find(k => k.toLowerCase() === basename.toLowerCase());
  return found ? fileContents[found] : null;
}

export function useTerminal() {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDir, setCurrentDir] = useState('/home/john_doe/projets');
  const [prevDir, setPrevDir] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [hint, setHint] = useState(null);

  const executeCommand = useCallback((cmd) => {
    setIsRunning(true);
    setFeedback('');
    setHint(null);

    setTimeout(() => {
      const trimmed = cmd.trim();
      let result = '';
      let newDir = currentDir;
      let success = false;
      let newFeedback = '';
      let newFeedbackType = '';
      let newHint = null;

      if (isNaturalLanguage(trimmed)) {
        const keywords = extractKeywords(trimmed);
        const { dirs, files } = searchVFSForKeywords(keywords);
        result = '';
        if (dirs.length === 0 && files.length === 0) {
          newFeedbackType = 'info';
          newFeedback = `ℹ Aucun résultat pour : ${keywords.join(', ')}`;
        } else {
          newFeedbackType = 'info';
          newFeedback = `🔍 ${dirs.length + files.length} résultat(s) pour : ${keywords.join(', ')}`;
          newHint = { type: 'natural_language', keywords, dirs, files };
        }
      }
      else if (trimmed === 'pwd') {
        result = currentDir;
        success = true;
        newFeedbackType = 'success';
        newFeedback = '✓ Commande correcte';
      }
      else if (trimmed.startsWith('ls')) {
        const parts = trimmed.split(/\s+/);
        const flags = parts.filter(p => p.startsWith('-')).join('');
        const pathArg = parts.find(p => !p.startsWith('-') && p !== 'ls');
        const targetDir = pathArg
          ? (pathArg.startsWith('/') ? pathArg : currentDir + '/' + pathArg).replace(/\/+/g, '/').replace(/\/$/, '')
          : currentDir;
        const items = vfs[targetDir] || vfs[targetDir + '/'];
        if (items) {
          if (flags.includes('l')) {
            result = 'total ' + items.length + '\n' + items.map(f => {
              const isDir = f.endsWith('/');
              const name = isDir ? f.slice(0, -1) : f;
              return (isDir ? 'drwxr-xr-x' : '-rw-r--r--') + '  john_doe john_doe  Mar 11 2026  ' + name;
            }).join('\n');
          } else {
            result = items.join('  ');
          }
          success = true;
          newFeedbackType = 'success';
          newFeedback = '✓ ' + items.length + ' élément(s) dans ' + targetDir;
        } else {
          result = "ls: impossible d'accéder à '" + targetDir + "': No such file or directory";
          newFeedbackType = 'error';
          newFeedback = '❌ Dossier introuvable';
        }
      }
      else if (trimmed === 'cd' || trimmed.startsWith('cd ')) {
        const dest = trimmed === 'cd' ? '~' : trimmed.slice(3).trim();
        let newDest;
        const oldDir = currentDir;

        if (dest === '~' || dest === '') {
          newDest = '/home/john_doe';
        } else if (dest === '-') {
          newDest = prevDir || currentDir;
        } else if (dest === '/') {
          newDest = '/';
        } else if (dest === '.') {
          newDest = currentDir;
        } else if (!dest.startsWith('/')) {
          newDest = currentDir + '/' + dest;
        } else {
          newDest = dest;
        }

        // Resolve .. in path
        const parts = newDest.split('/').filter(Boolean);
        const resolved = [];
        for (const p of parts) {
          if (p === '..') resolved.pop();
          else if (p !== '.') resolved.push(p);
        }
        newDest = '/' + resolved.join('/') || '/';

        if (newDest !== '/' && !vfs[newDest]) {
          result = `cd: no such file or directory: ${dest}`;
          newFeedbackType = 'error';
          newFeedback = '❌ Dossier introuvable';
          // Calcule les dossiers disponibles et une éventuelle suggestion proche
          const availableDirs = (vfs[currentDir] || []).filter(item => item.endsWith('/'));
          const destLower = dest.toLowerCase().replace(/^~\//, '');
          const closest = availableDirs.find(d =>
            d.replace('/', '').toLowerCase().includes(destLower) ||
            destLower.includes(d.replace('/', '').toLowerCase())
          );
          newHint = {
            type: 'cd_not_found',
            attempted: dest,
            availableDirs,
            closest: closest ? closest.replace('/', '') : null,
            currentDir,
          };
        } else {
          setPrevDir(oldDir);
          newDir = newDest;
          setCurrentDir(newDest);
          result = dest === '-' ? newDest : '';
          success = true;
          newFeedbackType = 'success';
          newFeedback = `✓ Vous êtes maintenant dans ${newDest}`;
        }
      }
      else if (trimmed.startsWith('find')) {
        const allItems = [...allFiles, ...allDirs];
        const findParts = trimmed.split(/\s+/);
        let basePath = findParts[1] || '.';
        if (basePath === '.') basePath = currentDir;
        else if (!basePath.startsWith('/')) basePath = currentDir + '/' + basePath;

        const typeF = trimmed.includes('-type f');
        const typeD = trimmed.includes('-type d');
        const nameMatch = trimmed.match(/-i?name\s+["']?([^"'\s]+)["']?/);
        const maxdepthMatch = trimmed.match(/-maxdepth\s+(\d+)/);
        const userMatch = trimmed.match(/-user\s+(\w+)/);
        const excludeName = trimmed.match(/!\s*-name\s+["']?([^"'\s]+)["']?/);

        let pool = typeD ? allDirs : (typeF ? allFiles : allItems);
        pool = pool.filter(p => p.startsWith(basePath));

        if (maxdepthMatch) {
          const maxd = parseInt(maxdepthMatch[1]);
          const baseDepth = basePath.split('/').filter(Boolean).length;
          pool = pool.filter(p => p.split('/').filter(Boolean).length - baseDepth <= maxd);
        }

        if (nameMatch) {
          const pattern = nameMatch[1].replace(/\./g, '\\.').replace(/\*/g, '.*').replace(/\?/g, '.');
          const rx = new RegExp(pattern, trimmed.includes('-iname') ? 'i' : '');
          pool = pool.filter(p => rx.test(p.split('/').pop()));
        }

        if (excludeName) {
          const pattern = excludeName[1].replace(/\./g, '\\.').replace(/\*/g, '.*');
          const rx = new RegExp(pattern);
          pool = pool.filter(p => !rx.test(p.split('/').pop()));
        }

        if (userMatch && userMatch[1] !== 'john_doe') pool = [];

        if (trimmed.includes('| wc -l') || trimmed.includes('|wc -l')) {
          result = String(pool.length);
        } else if (trimmed.includes('-exec ls')) {
          result = pool.map(p => '-rw-r--r--  1 john_doe john_doe  4096 Mar 11 2026  ' + p).join('\n');
        } else {
          result = pool.length > 0 ? pool.join('\n') : '(aucun résultat)';
        }

        success = true;
        newFeedbackType = pool.length > 0 ? 'success' : 'info';
        newFeedback = pool.length > 0
          ? '✓ ' + pool.length + ' résultat(s)'
          : 'ℹ Aucun fichier correspondant';
      }
      else if (trimmed.startsWith('grep')) {
        const grepParts = trimmed.split(/\s+/);
        const flags_g = grepParts.filter(p => p.startsWith('-')).join('');
        const patternMatch = trimmed.match(/grep(?:\s+-\w+)*\s+["']?([^"'\s]+)["']?/);
        const pattern = patternMatch ? patternMatch[1] : '';
        const isRecursive = flags_g.includes('r') || flags_g.includes('R');
        const showLineNum = flags_g.includes('n');
        const caseInsensitive = flags_g.includes('i');
        const onlyNames = flags_g.includes('l');
        const countOnly = flags_g.includes('c');

        let searchFiles = Object.keys(fileContents);
        if (!isRecursive) {
          const lastArg = grepParts[grepParts.length - 1];
          if (lastArg && !lastArg.startsWith('-') && lastArg !== pattern) {
            searchFiles = searchFiles.filter(f => f === lastArg || f.endsWith(lastArg));
          } else if (lastArg && lastArg.includes('*.')) {
            const ext = lastArg.split('.').pop();
            searchFiles = searchFiles.filter(f => f.endsWith('.' + ext));
          }
        }

        const rx = new RegExp(pattern.replace(/\$/g, '\\$'), caseInsensitive ? 'i' : '');
        const matches = [];

        for (const fname of searchFiles) {
          const lines = fileContents[fname] || [];
          const fileMatches = [];
          lines.forEach((line, idx) => {
            if (rx.test(line)) {
              fileMatches.push({ idx, line });
            }
          });
          if (fileMatches.length > 0) {
            if (onlyNames) {
              matches.push(fname);
            } else if (countOnly) {
              matches.push(fname + ': ' + fileMatches.length);
            } else {
              fileMatches.forEach(({ idx, line }) => {
                const prefix = isRecursive ? fname + ':' : '';
                const lineNum = showLineNum ? (idx + 1) + ':' : '';
                matches.push(prefix + lineNum + line);
              });
            }
          }
        }

        if (pattern === '') {
          result = 'Usage: grep [OPTIONS] PATTERN [FILE...]';
          newFeedbackType = 'error';
          newFeedback = '❌ Manque le pattern à chercher';
        } else if (matches.length > 0) {
          result = matches.join('\n');
          success = true;
          newFeedbackType = 'success';
          newFeedback = '✓ ' + (countOnly ? matches.length + ' fichier(s)' : matches.length + ' ligne(s)') + ' trouvée(s)';
        } else {
          result = '';
          newFeedbackType = 'info';
          newFeedback = 'ℹ Aucune correspondance pour "' + pattern + '"';
        }
      }
      else if (trimmed.startsWith('cat ') || trimmed.startsWith('less ')) {
        const arg = trimmed.replace(/^(cat|less)\s+/, '').trim();
        const lines = resolveFile(arg);
        if (lines) {
          result = lines.join('\n');
          success = true;
          newFeedbackType = 'success';
          newFeedback = `✓ ${lines.length} ligne(s) — ${arg}`;
        } else {
          result = `cat: ${arg}: No such file or directory`;
          newFeedbackType = 'error';
          newFeedback = `❌ Fichier introuvable : ${arg}`;
        }
      }
      else if (trimmed.startsWith('head') || trimmed.startsWith('tail')) {
        const isTail = trimmed.startsWith('tail');
        const followMode = trimmed.includes('-f');
        const nMatch = trimmed.match(/-(\d+)/);
        const n = nMatch ? parseInt(nMatch[1]) : 10;
        const arg = trimmed.split(/\s+/).find(p => !p.startsWith('-') && p !== (isTail ? 'tail' : 'head'));
        const lines = arg ? resolveFile(arg) : null;
        if (lines) {
          const slice = isTail ? lines.slice(-n) : lines.slice(0, n);
          result = slice.join('\n') + (followMode ? '\n\n[tail -f actif — Ctrl+C pour arrêter]' : '');
          success = true;
          newFeedbackType = 'success';
          newFeedback = `✓ ${slice.length} ligne(s) — ${arg}`;
        } else {
          result = `${isTail ? 'tail' : 'head'}: ${arg || '?'}: No such file or directory`;
          newFeedbackType = 'error';
          newFeedback = `❌ Fichier introuvable`;
        }
      }
      else if (trimmed === 'tree' || trimmed.startsWith('tree ')) {
        const parts = trimmed.split(/\s+/);
        const dirsOnly = parts.includes('-d');
        const depthMatch = trimmed.match(/-L\s*(\d+)/);
        const maxDepth = depthMatch ? parseInt(depthMatch[1]) - 1 : Infinity;
        const pathArg = parts.find(p => !p.startsWith('-') && p !== 'tree' && !/^\d+$/.test(p));
        let basePath = pathArg
          ? (pathArg === '.' ? currentDir : pathArg.startsWith('/') ? pathArg : currentDir + '/' + pathArg)
          : currentDir;
        const dirName = basePath.split('/').pop() || '/';
        const treeLines = buildTree(basePath, '', dirsOnly, maxDepth);
        const fileCount = treeLines.filter(l => !l.includes('/')).length;
        const dirCount = treeLines.filter(l => /\/$|[^.]\w+\s*$/.test(l) && vfs[basePath + '/' + l.replace(/.*── /, '')]).length;
        result = dirName + '\n' + (treeLines.length > 0 ? treeLines.join('\n') : '(vide)') + `\n\n${dirCount} répertoire(s), ${fileCount} fichier(s)`;
        success = true;
        newFeedbackType = 'success';
        newFeedback = `✓ Arborescence de ${basePath}`;
      }
      else if (trimmed === 'whoami') {
        result = 'john_doe';
        success = true;
        newFeedbackType = 'success';
        newFeedback = '✓ Utilisateur courant : john_doe';
      }
      else if (trimmed.startsWith('df')) {
        result = [
          'Système de fichiers  Taille Utilisé Dispo  %  Monté sur',
          '/dev/sda1              50G    18G   30G  38% /',
          '/dev/sda2             200G    94G  106G  47% /home',
          'tmpfs                   2G     0G    2G   0% /tmp',
        ].join('\n');
        success = true;
        newFeedbackType = 'success';
        newFeedback = '✓ Espace disque affiché';
      }
      else if (trimmed.startsWith('du ')) {
        const arg = trimmed.split(/\s+/).find(p => !p.startsWith('-') && p !== 'du') || '.';
        result = `124M\t${arg}`;
        success = true;
        newFeedbackType = 'success';
        newFeedback = `✓ Taille de ${arg}`;
      }
      else if (trimmed.startsWith('ps')) {
        result = [
          'USER       PID %CPU %MEM    VSZ   RSS TTY      STAT  COMMAND',
          'john_doe    1042  0.0  0.1  12340  2048 pts/0    Ss    bash',
          'www-data  2301  0.3  1.2 345678 24576 ?        S     apache2',
          'mysql     2450  0.8  4.5 623456 91234 ?        Sl    mysqld',
          'john_doe    3812  0.0  0.0   9832   816 pts/0    R+    ps aux',
        ].join('\n');
        success = true;
        newFeedbackType = 'success';
        newFeedback = '✓ Processus listés';
      }
      else if (trimmed.startsWith('chmod ')) {
        const parts = trimmed.split(/\s+/);
        const mode = parts[1];
        const target = parts.slice(2).join(' ') || '?';
        const readable = { '755': 'rwxr-xr-x', '644': 'rw-r--r--', '600': 'rw-------', '777': 'rwxrwxrwx', '400': 'r--------' };
        result = readable[mode] ? `Permissions de ${target} → ${mode} (${readable[mode]})` : `Permissions de ${target} → ${mode}`;
        success = true;
        newFeedbackType = 'success';
        newFeedback = `✓ chmod ${mode} appliqué sur ${target}`;
      }
      else if (trimmed.startsWith('chown ')) {
        const parts = trimmed.split(/\s+/);
        const owner = parts[1];
        const target = parts.slice(2).join(' ') || '?';
        result = `Propriétaire de ${target} → ${owner}`;
        success = true;
        newFeedbackType = 'success';
        newFeedback = `✓ Propriétaire modifié : ${owner}`;
      }
      else if (trimmed.startsWith('man ')) {
        const cmd_name = trimmed.slice(4).trim();
        const manPages = {
          'find': 'FIND(1) - search for files in a directory hierarchy\nSYNTAX: find [-H] [-L] [-P] [starting-point...] [expression]',
          'grep': 'GREP(1) - print lines that match patterns\nSYNTAX: grep [OPTION...] PATTERN [FILE...]\nOptions: -i (insensitive), -r (recursive), -n (line numbers)',
          'ls': 'LS(1) - list directory contents\nSYNTAX: ls [OPTION...] [FILE...]\nOptions: -l (long), -a (all), -R (recursive)',
          'cd': 'CD - change directory (shell builtin)\nSYNTAX: cd [dir]\nExamples: cd .., cd ~, cd /'
        };
        result = manPages[cmd_name] || `No manual entry for ${cmd_name}`;
        newFeedbackType = 'info';
        newFeedback = '📖 Page de manuel';
      }
      else if (trimmed === 'clear') {
        setOutput('');
        setHistory([]);
        setIsRunning(false);
        return;
      }
      else if (trimmed.length > 0) {
        const badToken = trimmed.split(' ')[0];
        result = `bash: ${badToken}: command not found`;
        newFeedbackType = 'error';
        newFeedback = '❌ Commande non reconnue';
        // Détecte les préfixes parasites fréquents (: ou $ copiés depuis un terminal)
        const knownCmds = ['cat','cd','chmod','chown','clear','df','du','find','grep','head','less','ls','man','ps','pwd','tail','tree','whoami','git'];
        const stripped = trimmed.replace(/^[:$]\s*/, '');
        const strippedCmd = stripped.split(' ')[0];
        if ((trimmed.startsWith(':') || trimmed.startsWith('$')) && knownCmds.includes(strippedCmd)) {
          newHint = { type: 'bad_prefix', prefix: badToken, corrected: stripped };
        }
      }

      setOutput(result);
      if (trimmed) {
        setHistory(prev => [...prev, { cmd: trimmed, result, dir: newDir, success }]);
      }
      setFeedback(newFeedback);
      setFeedbackType(newFeedbackType);
      setHint(newHint);
      setIsRunning(false);
    }, 400);
  }, [currentDir, prevDir]);

  const validateExercise = useCallback((exerciseId, cmd) => {
    const ex = exercises[exerciseId];
    if (!ex) return { success: false, message: '❌ Exercice introuvable', explanation: '' };
    const hasAllPatterns = ex.expectedPatterns.every(p => cmd.includes(p));
    if (hasAllPatterns) {
      return {
        success: true,
        message: ex.successMessage,
        explanation: ex.explanation || ''
      };
    } else {
      return {
        success: false,
        message: `❌ Pas tout à fait. Solution: ${ex.hint}`,
        explanation: ex.explanation || ''
      };
    }
  }, []);

  const resetTerminal = useCallback(() => {
    setCommand('');
    setOutput('');
    setHistory([]);
    setFeedback('');
    setHint(null);
    setCurrentDir('/home/john_doe/projets');
  }, []);

  return {
    command, setCommand,
    output,
    history,
    historyIndex, setHistoryIndex,
    currentDir,
    feedback,
    feedbackType,
    hint,
    isRunning,
    executeCommand,
    validateExercise,
    resetTerminal,
  };
}
