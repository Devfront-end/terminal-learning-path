import { useState, useRef, useEffect } from 'react';
import Anthropic from '@anthropic-ai/sdk';

const STORAGE_KEY = 'tlp_anthropic_key';
const SAVED_KEY   = 'tlp_saved_qa';

const PRICE_IN  = 1 / 1_000_000;
const PRICE_OUT = 5 / 1_000_000;

const SYSTEM_PROMPT = `Tu es un assistant expert et pédagogue. Réponds en français, de façon claire et concise.
Quand la question porte sur une commande ou du code, utilise des blocs de code avec des exemples concrets.`;

function loadSaved() {
  try { return JSON.parse(localStorage.getItem(SAVED_KEY)) || []; }
  catch { return []; }
}

export default function AskCLI() {
  const [apiKey, setApiKey]     = useState(() => localStorage.getItem(STORAGE_KEY) || '');
  const [keyInput, setKeyInput] = useState('');
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [usage, setUsage] = useState(() => {
    try { return JSON.parse(localStorage.getItem('tlp_usage')) || { requests: 0, tokensIn: 0, tokensOut: 0 }; }
    catch { return { requests: 0, tokensIn: 0, tokensOut: 0 }; }
  });
  const [saved, setSaved]           = useState(loadSaved);
  const [showSaved, setShowSaved]   = useState(false);
  const [savedIdx, setSavedIdx]     = useState(new Set());
  const [editingIdx, setEditingIdx] = useState(null);
  const [editText, setEditText]     = useState('');
  const bottomRef = useRef(null);
  const editRef   = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (editingIdx !== null) editRef.current?.focus();
  }, [editingIdx]);

  const saveKey = () => {
    const k = keyInput.trim();
    if (!k.startsWith('sk-ant-')) { setError('Clé invalide — elle doit commencer par sk-ant-'); return; }
    localStorage.setItem(STORAGE_KEY, k);
    setApiKey(k); setKeyInput(''); setError('');
  };

  const removeKey = () => { localStorage.removeItem(STORAGE_KEY); setApiKey(''); };

  const callAPI = async (msgs) => {
    const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
    const response = await client.messages.create({
      model: 'claude-haiku-4-5', max_tokens: 1024,
      system: SYSTEM_PROMPT, messages: msgs,
    });
    const answer = response.content.find(b => b.type === 'text')?.text || '';
    setUsage(prev => {
      const next = {
        requests: prev.requests + 1,
        tokensIn: prev.tokensIn + (response.usage?.input_tokens || 0),
        tokensOut: prev.tokensOut + (response.usage?.output_tokens || 0),
      };
      localStorage.setItem('tlp_usage', JSON.stringify(next));
      return next;
    });
    return answer;
  };

  const ask = async () => {
    const q = question.trim();
    if (!q || loading) return;
    setQuestion(''); setError('');
    const newMessages = [...messages, { role: 'user', content: q }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const answer = await callAPI(newMessages);
      setMessages(prev => [...prev, { role: 'assistant', content: answer }]);
    } catch (e) {
      setError(e.message || 'Erreur API');
    } finally {
      setLoading(false);
    }
  };

  // Supprimer une paire question/réponse (index de la question)
  const deletePair = (i) => {
    setMessages(prev => {
      const next = [...prev];
      // supprimer la réponse si elle suit
      if (next[i + 1]?.role === 'assistant') next.splice(i, 2);
      else next.splice(i, 1);
      return next;
    });
    setSavedIdx(prev => {
      const next = new Set(prev);
      next.delete(i + 1);
      return next;
    });
  };

  // Démarrer l'édition d'un message utilisateur
  const startEdit = (i) => {
    setEditingIdx(i);
    setEditText(messages[i].content);
  };

  // Confirmer l'édition : remplace le message et regénère la réponse
  const confirmEdit = async () => {
    const q = editText.trim();
    if (!q || loading) return;
    setEditingIdx(null);
    setError('');
    // Tronquer l'historique jusqu'à ce message (inclus) et relancer
    const truncated = [...messages.slice(0, editingIdx), { role: 'user', content: q }];
    setMessages(truncated);
    setLoading(true);
    try {
      const answer = await callAPI(truncated);
      setMessages([...truncated, { role: 'assistant', content: answer }]);
    } catch (e) {
      setError(e.message || 'Erreur API');
    } finally {
      setLoading(false);
    }
  };

  const saveQA = (i) => {
    const q = messages[i - 1]?.content || '';
    const a = messages[i]?.content || '';
    const entry = { id: Date.now(), date: new Date().toLocaleDateString('fr-FR'), question: q, answer: a };
    const next = [entry, ...saved];
    setSaved(next);
    localStorage.setItem(SAVED_KEY, JSON.stringify(next));
    setSavedIdx(prev => new Set([...prev, i]));
  };

  const deleteSaved = (id) => {
    const next = saved.filter(s => s.id !== id);
    setSaved(next);
    localStorage.setItem(SAVED_KEY, JSON.stringify(next));
  };

  if (!apiKey) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-4">
          <h2 className="text-cyan-400 font-semibold text-sm">💬 Poser une question</h2>
          <p className="text-gray-400 text-xs">Clé API Anthropic — stockée uniquement dans votre navigateur.</p>
          <a href="https://console.anthropic.com/keys" target="_blank" rel="noreferrer" className="text-cyan-400 text-xs underline">
            Obtenir une clé API →
          </a>
          <input autoFocus type="password" value={keyInput}
            onChange={e => setKeyInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && saveKey()}
            placeholder="sk-ant-..."
            className="w-full bg-gray-950 border border-gray-700 rounded px-3 py-2 text-green-300 font-mono text-sm outline-none focus:border-cyan-600 placeholder-gray-600"
          />
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button onClick={saveKey} className="w-full px-3 py-2 text-xs bg-cyan-900/40 border border-cyan-700 text-cyan-300 rounded hover:bg-cyan-900/60 font-semibold">
            Enregistrer la clé
          </button>
        </div>
      </div>
    );
  }

  const totalTokens = usage.tokensIn + usage.tokensOut;
  const cost = usage.tokensIn * PRICE_IN + usage.tokensOut * PRICE_OUT;

  if (showSaved) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-6 py-3 border-b border-cyan-900/20 bg-gray-950/40 flex items-center gap-3 shrink-0">
          <button onClick={() => setShowSaved(false)} className="text-cyan-400 text-xs hover:text-cyan-300">← Retour</button>
          <span className="text-xs text-gray-500">Réponses sauvegardées ({saved.length})</span>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {saved.length === 0 && <p className="text-gray-500 text-xs">Aucune sauvegarde.</p>}
          {saved.map(s => (
            <div key={s.id} className="bg-gray-900/40 border border-gray-800/40 rounded p-4 space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-cyan-300 text-xs font-semibold">{s.question}</span>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span className="text-gray-600 text-xs">{s.date}</span>
                  <button onClick={() => deleteSaved(s.id)} className="text-gray-600 hover:text-red-400 text-xs">✕</button>
                </div>
              </div>
              <p className="text-gray-300 text-xs font-mono whitespace-pre-wrap">{s.answer}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Barre d'usage */}
      <div className="px-6 py-2 bg-gray-950/60 border-b border-cyan-900/20 flex gap-6 text-xs font-mono shrink-0">
        <span className="text-gray-500">Requêtes <span className="text-cyan-300">{usage.requests}</span></span>
        <span className="text-gray-500">Tokens in <span className="text-green-300">{usage.tokensIn.toLocaleString()}</span></span>
        <span className="text-gray-500">Tokens out <span className="text-green-300">{usage.tokensOut.toLocaleString()}</span></span>
        <span className="text-gray-500">Total <span className="text-yellow-300">{totalTokens.toLocaleString()}</span></span>
        <span className="text-gray-500">Coût <span className="text-orange-300">${cost.toFixed(5)}</span></span>
        <button onClick={() => { const z = { requests: 0, tokensIn: 0, tokensOut: 0 }; setUsage(z); localStorage.setItem('tlp_usage', JSON.stringify(z)); }} className="text-gray-700 hover:text-gray-400">reset</button>
        <button onClick={() => setShowSaved(true)} className="ml-auto text-cyan-700 hover:text-cyan-400">
          📌 Sauvegardées ({saved.length})
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && <div className="text-gray-500 text-xs">Posez n'importe quelle question…</div>}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'user' ? (
              <div className="relative group max-w-2xl">
                {editingIdx === i ? (
                  <div className="space-y-2">
                    <textarea
                      ref={editRef}
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); confirmEdit(); } if (e.key === 'Escape') setEditingIdx(null); }}
                      rows={3}
                      className="w-full bg-cyan-950/40 border border-cyan-600 rounded px-3 py-2 text-cyan-200 font-mono text-xs outline-none resize-none"
                    />
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => setEditingIdx(null)} className="px-3 py-1 text-xs bg-gray-800 border border-gray-700 text-gray-300 rounded hover:bg-gray-700">Annuler</button>
                      <button onClick={confirmEdit} disabled={loading} className="px-3 py-1 text-xs bg-cyan-900/60 border border-cyan-700 text-cyan-300 rounded hover:bg-cyan-900 disabled:opacity-40">Envoyer</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="bg-cyan-900/30 text-cyan-200 border border-cyan-800/40 text-xs rounded-lg px-4 py-3 whitespace-pre-wrap font-mono">
                      {m.content}
                    </div>
                    <div className="absolute -bottom-5 right-0 hidden group-hover:flex gap-2">
                      <button onClick={() => startEdit(i)} className="text-gray-500 hover:text-cyan-400 text-xs">✏️ Modifier</button>
                      <button onClick={() => deletePair(i)} className="text-gray-500 hover:text-red-400 text-xs">🗑️ Supprimer</button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="relative group max-w-2xl">
                <div className="bg-gray-900/60 text-gray-200 border border-gray-700/40 text-xs rounded-lg px-4 py-3 whitespace-pre-wrap font-mono">
                  {m.content}
                </div>
                <button
                  onClick={() => saveQA(i)}
                  disabled={savedIdx.has(i)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-xs px-2 py-0.5 rounded bg-gray-800 border border-gray-700 text-gray-400 hover:text-cyan-300 hover:border-cyan-700 disabled:opacity-30 transition-opacity"
                >
                  {savedIdx.has(i) ? '✓' : '📌'}
                </button>
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-900/60 border border-gray-700/40 rounded-lg px-4 py-3 text-xs text-gray-400 font-mono animate-pulse">···</div>
          </div>
        )}
        {error && <p className="text-red-400 text-xs">{error}</p>}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-cyan-900/20 px-6 py-4 bg-gray-950/40 flex gap-2 items-end">
        <textarea
          value={question}
          onChange={e => setQuestion(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ask(); } }}
          placeholder="Posez n'importe quelle question… (Entrée pour envoyer)"
          rows={2}
          className="flex-1 bg-gray-900/60 border border-gray-700 rounded px-3 py-2 text-green-300 font-mono text-xs outline-none focus:border-cyan-600 placeholder-gray-600 resize-none"
        />
        <button onClick={ask} disabled={loading || !question.trim()}
          className="px-3 py-2 text-xs bg-cyan-900/40 border border-cyan-700 text-cyan-300 rounded hover:bg-cyan-900/60 disabled:opacity-40 font-semibold">
          ▶
        </button>
      </div>

      {/* Footer */}
      <div className="px-6 py-1 border-t border-gray-800/40 text-xs text-gray-600 flex justify-between">
        <span>claude-haiku-4-5 · $1/1M in · $5/1M out</span>
        <button onClick={removeKey} className="hover:text-gray-400">Changer de clé</button>
      </div>
    </div>
  );
}
