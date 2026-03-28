// ── Array methods ─────────────────────────────────────────
export const jsArrayRows = [
  { cmd: '.map(fn)', desc: 'Transforme chaque élément, retourne un nouveau tableau', example: '[1,2,3].map(x => x*2)', result: '[2,4,6]', note: 'Ne modifie pas l\'original' },
  { cmd: '.filter(fn)', desc: 'Garde les éléments où fn retourne true', example: '[1,2,3,4].filter(x => x>2)', result: '[3,4]', note: '' },
  { cmd: '.reduce(fn, init)', desc: 'Réduit le tableau à une seule valeur', example: '[1,2,3].reduce((acc,x) => acc+x, 0)', result: '6', note: '' },
  { cmd: '.forEach(fn)', desc: 'Itère sans retourner de valeur', example: '[1,2].forEach(x => console.log(x))', result: '1 2', note: 'Pas de return' },
  { cmd: '.find(fn)', desc: 'Retourne le premier élément trouvé', example: '[1,2,3].find(x => x>1)', result: '2', note: '' },
  { cmd: '.findIndex(fn)', desc: 'Retourne l\'index du premier élément trouvé', example: '[1,2,3].findIndex(x => x>1)', result: '1', note: '' },
  { cmd: '.some(fn)', desc: 'True si au moins un élément satisfait fn', example: '[1,2,3].some(x => x>2)', result: 'true', note: '' },
  { cmd: '.every(fn)', desc: 'True si tous les éléments satisfont fn', example: '[1,2,3].every(x => x>0)', result: 'true', note: '' },
  { cmd: '.includes(val)', desc: 'True si la valeur est dans le tableau', example: '[1,2,3].includes(2)', result: 'true', note: '' },
  { cmd: '.push(val)', desc: 'Ajoute à la fin (modifie l\'original)', example: 'arr.push(4)', result: 'nouvelle longueur', note: 'Mutant' },
  { cmd: '.pop()', desc: 'Retire et retourne le dernier élément', example: '[1,2,3].pop()', result: '3', note: 'Mutant' },
  { cmd: '.shift()', desc: 'Retire le premier élément', example: '[1,2,3].shift()', result: '1', note: 'Mutant' },
  { cmd: '.unshift(val)', desc: 'Ajoute au début', example: 'arr.unshift(0)', result: 'nouvelle longueur', note: 'Mutant' },
  { cmd: '.slice(start, end)', desc: 'Extrait une portion (non mutant)', example: '[1,2,3,4].slice(1,3)', result: '[2,3]', note: 'end exclu' },
  { cmd: '.splice(i, n)', desc: 'Retire n éléments à partir de i', example: '[1,2,3].splice(1,1)', result: '[2] retiré', note: 'Mutant' },
  { cmd: '.sort(fn)', desc: 'Trie le tableau', example: '[3,1,2].sort((a,b) => a-b)', result: '[1,2,3]', note: 'Mutant' },
  { cmd: '.reverse()', desc: 'Inverse le tableau', example: '[1,2,3].reverse()', result: '[3,2,1]', note: 'Mutant' },
  { cmd: '.join(sep)', desc: 'Convertit en chaîne avec séparateur', example: '[1,2,3].join(\'-\')', result: '\'1-2-3\'', note: '' },
  { cmd: '.flat(depth)', desc: 'Aplatit les tableaux imbriqués', example: '[[1,2],[3]].flat()', result: '[1,2,3]', note: '' },
  { cmd: '.flatMap(fn)', desc: 'map() puis flat(1)', example: '[1,2].flatMap(x => [x, x*2])', result: '[1,2,2,4]', note: '' },
  { cmd: 'Array.from(iter)', desc: 'Crée un tableau depuis itérable', example: 'Array.from(\'abc\')', result: '[\'a\',\'b\',\'c\']', note: '' },
  { cmd: '[...arr]', desc: 'Copie superficielle (spread)', example: '[...arr1, ...arr2]', result: 'fusion', note: '' },
];

// ── String methods ────────────────────────────────────────
export const jsStringRows = [
  { cmd: '.length', desc: 'Nombre de caractères', example: '\'hello\'.length', result: '5', note: '' },
  { cmd: '.toUpperCase()', desc: 'Convertit en majuscules', example: '\'hello\'.toUpperCase()', result: '\'HELLO\'', note: '' },
  { cmd: '.toLowerCase()', desc: 'Convertit en minuscules', example: '\'HELLO\'.toLowerCase()', result: '\'hello\'', note: '' },
  { cmd: '.trim()', desc: 'Supprime les espaces en début/fin', example: '\' hi \'.trim()', result: '\'hi\'', note: '' },
  { cmd: '.split(sep)', desc: 'Divise en tableau', example: '\'a,b,c\'.split(\',\')', result: '[\'a\',\'b\',\'c\']', note: '' },
  { cmd: '.includes(str)', desc: 'True si contient la sous-chaîne', example: '\'hello\'.includes(\'ell\')', result: 'true', note: '' },
  { cmd: '.startsWith(str)', desc: 'True si commence par str', example: '\'hello\'.startsWith(\'he\')', result: 'true', note: '' },
  { cmd: '.endsWith(str)', desc: 'True si finit par str', example: '\'hello\'.endsWith(\'lo\')', result: 'true', note: '' },
  { cmd: '.indexOf(str)', desc: 'Index de la première occurrence', example: '\'hello\'.indexOf(\'l\')', result: '2', note: '-1 si absent' },
  { cmd: '.replace(a, b)', desc: 'Remplace la première occurrence', example: '\'aaa\'.replace(\'a\',\'b\')', result: '\'baa\'', note: '' },
  { cmd: '.replaceAll(a, b)', desc: 'Remplace toutes les occurrences', example: '\'aaa\'.replaceAll(\'a\',\'b\')', result: '\'bbb\'', note: '' },
  { cmd: '.slice(start, end)', desc: 'Extrait une portion', example: '\'hello\'.slice(1,3)', result: '\'el\'', note: '' },
  { cmd: '.substring(s, e)', desc: 'Extrait une portion', example: '\'hello\'.substring(0,3)', result: '\'hel\'', note: '' },
  { cmd: '.padStart(n, c)', desc: 'Complète à gauche', example: '\'5\'.padStart(3,\'0\')', result: '\'005\'', note: '' },
  { cmd: '.padEnd(n, c)', desc: 'Complète à droite', example: '\'5\'.padEnd(3,\'0\')', result: '\'500\'', note: '' },
  { cmd: '.repeat(n)', desc: 'Répète la chaîne n fois', example: '\'ab\'.repeat(3)', result: '\'ababab\'', note: '' },
  { cmd: '`${var}`', desc: 'Template literal (interpolation)', example: '`Bonjour ${name}!`', result: '\'Bonjour Jules!\'', note: 'Backticks' },
  { cmd: '.match(regex)', desc: 'Cherche une regex', example: '\'hello\'.match(/l+/)', result: '[\'ll\']', note: '' },
];

// ── Object methods ────────────────────────────────────────
export const jsObjectRows = [
  { cmd: 'Object.keys(obj)', desc: 'Tableau des clés', example: 'Object.keys({a:1,b:2})', result: '[\'a\',\'b\']', note: '' },
  { cmd: 'Object.values(obj)', desc: 'Tableau des valeurs', example: 'Object.values({a:1,b:2})', result: '[1,2]', note: '' },
  { cmd: 'Object.entries(obj)', desc: 'Tableau de [clé, valeur]', example: 'Object.entries({a:1})', result: '[[\'a\',1]]', note: '' },
  { cmd: 'Object.assign(t, s)', desc: 'Copie les propriétés de s dans t', example: 'Object.assign({}, a, b)', result: 'fusion', note: 'Mutant sur t' },
  { cmd: '{...obj}', desc: 'Spread — copie superficielle', example: '{...obj, newKey: val}', result: 'nouveau objet', note: '' },
  { cmd: 'Object.freeze(obj)', desc: 'Rend l\'objet immuable', example: 'Object.freeze(config)', result: 'objet figé', note: '' },
  { cmd: 'Object.fromEntries()', desc: 'Crée un objet depuis des entrées', example: 'Object.fromEntries([[\'a\',1]])', result: '{a:1}', note: '' },
  { cmd: '?.', desc: 'Optional chaining — évite les erreurs null', example: 'obj?.user?.name', result: 'undefined si null', note: 'ES2020' },
  { cmd: '??', desc: 'Nullish coalescing — valeur par défaut', example: 'null ?? \'défaut\'', result: '\'défaut\'', note: 'null/undefined seulement' },
];

// ── Async / Promise ───────────────────────────────────────
export const jsAsyncRows = [
  { cmd: 'new Promise((res,rej))', desc: 'Crée une promesse', example: 'new Promise((res) => res(42))', result: 'Promise<42>', note: '' },
  { cmd: '.then(fn)', desc: 'Callback en cas de succès', example: 'fetch(url).then(r => r.json())', result: 'données JSON', note: '' },
  { cmd: '.catch(fn)', desc: 'Callback en cas d\'erreur', example: 'fetch(url).catch(err => ...)', result: 'gère l\'erreur', note: '' },
  { cmd: '.finally(fn)', desc: 'Toujours exécuté', example: '.finally(() => setLoading(false))', result: '-', note: '' },
  { cmd: 'async function', desc: 'Fonction asynchrone (retourne une Promise)', example: 'async function getData() {}', result: 'Promise', note: '' },
  { cmd: 'await', desc: 'Attend la résolution d\'une Promise', example: 'const data = await fetch(url)', result: 'Response', note: 'Dans async seulement' },
  { cmd: 'Promise.all([])', desc: 'Attend toutes les promesses', example: 'await Promise.all([p1, p2])', result: '[res1, res2]', note: 'Échoue si une échoue' },
  { cmd: 'Promise.allSettled([])', desc: 'Attend toutes (succès ou échec)', example: 'await Promise.allSettled([p1,p2])', result: '[{status,value}]', note: '' },
  { cmd: 'fetch(url, opts)', desc: 'Requête HTTP', example: 'await fetch(\'/api\', {method:\'POST\'})', result: 'Response', note: '' },
  { cmd: 'try { } catch(e)', desc: 'Gestion d\'erreur avec async/await', example: 'try { await fn() } catch(e) {}', result: '-', note: 'Préféré à .catch()' },
];
