import { useState, useRef, useEffect } from 'react';
import Anthropic from '@anthropic-ai/sdk';

const STORAGE_KEY = 'tlp_anthropic_key';

// claude-haiku-4-5 pricing : $1/1M input, $5/1M output
const PRICE_IN  = 1 / 1_000_000;
const PRICE_OUT = 5 / 1_000_000;

const SYSTEM_PROMPT = `Tu es un assistant expert et pédagogue. Réponds en français, de façon claire et concise.
Quand la question porte sur une commande ou du code, utilise des blocs de code avec des exemples concrets.`;

export default function AskCLI() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem(STORAGE_KEY) || '');
  const [keyInput, setKeyInput] = useState('');
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [usage, setUsage] = useState({ requests: 0, tokensIn: 0, tokensOut: 0 });
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const saveKey = () => {
    const k = keyInput.trim();
    if (!k.startsWith('sk-ant-')) {
      setError('Clé invalide — elle doit commencer par sk-ant-');
      return;
    }
    localStorage.setItem(STORAGE_KEY, k);
    setApiKey(k);
    setKeyInput('');
    setError('');
  };

  const removeKey = () => {
    localStorage.removeItem(STORAGE_KEY);
    setApiKey('');
  };

  const ask = async () => {
    const q = question.trim();
    if (!q || loading) return;
    setQuestion('');
    setError('');
    const newMessages = [...messages, { role: 'user', content: q }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
      const response = await client.messages.create({
        model: 'claude-haiku-4-5',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: newMessages,
      });
      const answer = response.content.find(b => b.type === 'text')?.text || '';
      setMessages(prev => [...prev, { role: 'assistant', content: answer }]);
      setUsage(prev => ({
        requests: prev.requests + 1,
        tokensIn: prev.tokensIn + (response.usage?.input_tokens || 0),
        tokensOut: prev.tokensOut + (response.usage?.output_tokens || 0),
      }));
    } catch (e) {
      setError(e.message || 'Erreur API');
    } finally {
      setLoading(false);
    }
  };

  if (!apiKey) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-4">
          <h2 className="text-cyan-400 font-semibold text-sm">💬 Poser une question CLI</h2>
          <p className="text-gray-400 text-xs">
            Cette fonctionnalité utilise l'API Anthropic. Entrez votre clé API — elle est stockée uniquement dans votre navigateur et n'est jamais envoyée ailleurs que chez Anthropic.
          </p>
          <a
            href="https://console.anthropic.com/keys"
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 text-xs underline"
          >
            Obtenir une clé API →
          </a>
          <input
            autoFocus
            type="password"
            value={keyInput}
            onChange={e => setKeyInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && saveKey()}
            placeholder="sk-ant-..."
            className="w-full bg-gray-950 border border-gray-700 rounded px-3 py-2 text-green-300 font-mono text-sm outline-none focus:border-cyan-600 placeholder-gray-600"
          />
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button
            onClick={saveKey}
            className="w-full px-3 py-2 text-xs bg-cyan-900/40 border border-cyan-700 text-cyan-300 rounded hover:bg-cyan-900/60 font-semibold"
          >
            Enregistrer la clé
          </button>
        </div>
      </div>
    );
  }

  const totalTokens = usage.tokensIn + usage.tokensOut;
  const cost = (usage.tokensIn * PRICE_IN + usage.tokensOut * PRICE_OUT);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Barre d'usage */}
      {usage.requests > 0 && (
        <div className="px-6 py-2 bg-gray-950/60 border-b border-cyan-900/20 flex gap-6 text-xs font-mono shrink-0">
          <span className="text-gray-500">Requêtes <span className="text-cyan-300">{usage.requests}</span></span>
          <span className="text-gray-500">Tokens in <span className="text-green-300">{usage.tokensIn.toLocaleString()}</span></span>
          <span className="text-gray-500">Tokens out <span className="text-green-300">{usage.tokensOut.toLocaleString()}</span></span>
          <span className="text-gray-500">Total <span className="text-yellow-300">{totalTokens.toLocaleString()}</span></span>
          <span className="text-gray-500">Coût <span className="text-orange-300">${cost.toFixed(5)}</span></span>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-gray-500 text-xs">
            Posez n'importe quelle question…
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-2xl text-xs rounded-lg px-4 py-3 whitespace-pre-wrap font-mono ${
              m.role === 'user'
                ? 'bg-cyan-900/30 text-cyan-200 border border-cyan-800/40'
                : 'bg-gray-900/60 text-gray-200 border border-gray-700/40'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-900/60 border border-gray-700/40 rounded-lg px-4 py-3 text-xs text-gray-400 font-mono animate-pulse">
              ···
            </div>
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
        <button
          onClick={ask}
          disabled={loading || !question.trim()}
          className="px-3 py-2 text-xs bg-cyan-900/40 border border-cyan-700 text-cyan-300 rounded hover:bg-cyan-900/60 disabled:opacity-40 font-semibold"
        >
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
