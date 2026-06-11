import { useState, useEffect, useRef } from 'react';

const ATT_KEY  = 'ta_att';
const LOCK_KEY = 'ta_lock';

function b64ToBytes(b64) {
  return Uint8Array.from(atob(b64), c => c.charCodeAt(0));
}

async function decrypt(password, enc) {
  const keyMaterial = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']
  );
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: b64ToBytes(enc.salt), iterations: 200000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );
  const plain = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: b64ToBytes(enc.iv) },
    key,
    b64ToBytes(enc.data)
  );
  return new TextDecoder().decode(plain);
}

function getLockState() {
  const attempts  = parseInt(localStorage.getItem(ATT_KEY)  || '0');
  const lockUntil = parseInt(localStorage.getItem(LOCK_KEY) || '0');
  return { attempts, lockUntil };
}

function getLockDuration(attempts) {
  if (attempts >= 7) return 3600;
  if (attempts >= 5) return 300;
  if (attempts >= 3) return 30;
  return 0;
}

function formatCountdown(seconds) {
  if (seconds >= 3600) return `${Math.ceil(seconds / 3600)}h`;
  if (seconds >= 60)   return `${Math.ceil(seconds / 60)}min`;
  return `${seconds}s`;
}

async function notifyWebhook(attempts) {
  const url = localStorage.getItem('ta_wh');
  if (!url) return;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `🚨 **Tentative d'intrusion — Analyseur d'accès**\n> ${attempts} tentative(s) échouée(s)\n> ${new Date().toLocaleString('fr-FR')}\n> URL : ${window.location.href}`,
      }),
    });
  } catch (_) {}
}

export default function AccessAnalyser() {
  const [input, setInput]         = useState('');
  const [blobUrl, setBlobUrl]     = useState(null);
  const [error, setError]         = useState(false);
  const [loading, setLoading]     = useState(false);
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef(null);
  const prevUrl  = useRef(null);

  useEffect(() => {
    const pwd = sessionStorage.getItem('ta_pwd');
    if (pwd) tryUnlock(pwd, true);
  }, []);

  useEffect(() => {
    const { lockUntil } = getLockState();
    const remaining = Math.ceil((lockUntil - Date.now()) / 1000);
    if (remaining > 0) startCountdown(remaining);
  }, []);

  useEffect(() => () => {
    if (prevUrl.current) URL.revokeObjectURL(prevUrl.current);
    clearInterval(timerRef.current);
  }, []);

  function startCountdown(seconds) {
    setCountdown(seconds);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { clearInterval(timerRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
  }

  const tryUnlock = async (pwd, silent = false) => {
    const { lockUntil } = getLockState();
    if (Date.now() < lockUntil) return;

    setLoading(true);
    try {
      const res  = await fetch(`${import.meta.env.BASE_URL}f8c2a1.bin`);
      const enc  = await res.json();
      const html = await decrypt(pwd, enc);
      const blob = new Blob([html], { type: 'text/html' });
      const url  = URL.createObjectURL(blob);
      if (prevUrl.current) URL.revokeObjectURL(prevUrl.current);
      prevUrl.current = url;
      setBlobUrl(url);
      sessionStorage.setItem('ta_pwd', pwd);
      localStorage.removeItem(ATT_KEY);
      localStorage.removeItem(LOCK_KEY);
    } catch {
      if (!silent) {
        const attempts = parseInt(localStorage.getItem(ATT_KEY) || '0') + 1;
        localStorage.setItem(ATT_KEY, attempts);
        const duration = getLockDuration(attempts);
        if (duration > 0) {
          const until = Date.now() + duration * 1000;
          localStorage.setItem(LOCK_KEY, until);
          startCountdown(duration);
        }
        if (attempts >= 3) notifyWebhook(attempts);
        setError(true);
        setInput('');
        sessionStorage.removeItem('ta_pwd');
        setTimeout(() => setError(false), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const check = () => {
    if (countdown > 0) return;
    tryUnlock(input);
  };

  if (blobUrl) {
    return (
      <iframe
        src={blobUrl}
        className="flex-1 w-full border-0"
        title="Analyseur d'accès"
      />
    );
  }

  const { attempts } = getLockState();

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gray-950 gap-4">
      <div className="text-cyan-400 text-sm font-semibold">🔒 Accès restreint</div>
      <div className="flex gap-2">
        <input
          type="password"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && check()}
          placeholder="Mot de passe…"
          disabled={loading || countdown > 0}
          className={`bg-gray-900 border rounded px-3 py-2 text-sm text-gray-200 outline-none font-mono ${
            error ? 'border-red-500' : 'border-gray-700 focus:border-cyan-600'
          }`}
          autoFocus
        />
        <button
          onClick={check}
          disabled={loading || countdown > 0}
          className="px-4 py-2 bg-cyan-600/20 border border-cyan-600/40 text-cyan-300 rounded text-sm font-semibold hover:bg-cyan-600/30 disabled:opacity-40"
        >
          {loading ? '…' : countdown > 0 ? formatCountdown(countdown) : '→'}
        </button>
      </div>
      {error && <div className="text-red-400 text-xs">Mot de passe incorrect</div>}
      {countdown > 0 && (
        <div className="text-orange-400 text-xs">
          Accès verrouillé — réessayez dans {formatCountdown(countdown)}
          {attempts >= 3 && ' · Activité suspecte détectée'}
        </div>
      )}
    </div>
  );
}
