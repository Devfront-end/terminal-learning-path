import { useEffect, useMemo, useState } from 'react';

const WORKER_URL = 'https://tlp-alert.julesaugustin.workers.dev';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function hexToBytes(hex) {
  if (!hex || typeof hex !== 'string' || hex.length % 2 !== 0) {
    throw new Error('Sel de chiffrement invalide.');
  }
  return new Uint8Array(hex.match(/.{2}/g).map((byte) => parseInt(byte, 16)));
}

function bytesToBase64(bytes) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function base64ToBytes(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function deriveKey(password, saltHex) {
  const material = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveKey'],
  );

  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: hexToBytes(saltHex), iterations: 100000, hash: 'SHA-256' },
    material,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

async function encryptText(key, text) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(text),
  );

  return {
    iv: bytesToBase64(iv),
    data: bytesToBase64(new Uint8Array(encrypted)),
  };
}

async function decryptText(key, entry) {
  const data = entry.data || entry.content || entry.encryptedData || entry.ciphertext || entry.cipherText;
  const iv = entry.iv || entry.nonce;
  if (!data || !iv) return '';

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: base64ToBytes(iv) },
    key,
    base64ToBytes(data),
  );
  return decoder.decode(decrypted);
}

async function vaultRequest(path, token, payload = {}) {
  const response = await fetch(`${WORKER_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Vault-Token': token,
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  let data = {};
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!response.ok) {
    throw new Error(data.message || data.error || `Erreur Vault (${response.status})`);
  }

  return data;
}

function normalizeFiles(data) {
  const files = data.files || data.items || data.entries || data || [];
  if (!Array.isArray(files)) return [];

  return files
    .map((file) => {
      if (typeof file === 'string') return { path: file, name: file };
      const path = file.path || file.name || file.key || file.id;
      return path ? { ...file, path, name: file.name || path } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.path.localeCompare(b.path));
}

export default function CodeVault({ creds }) {
  const [files, setFiles] = useState([]);
  const [selectedPath, setSelectedPath] = useState('');
  const [draftPath, setDraftPath] = useState('');
  const [content, setContent] = useState('');
  const [savedContent, setSavedContent] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  const keyPromise = useMemo(() => {
    if (!creds?.password || !creds?.salt) return null;
    return deriveKey(creds.password, creds.salt);
  }, [creds?.password, creds?.salt]);

  const hasChanges = content !== savedContent || (selectedPath && draftPath && selectedPath !== draftPath);

  async function loadFiles() {
    setLoading(true);
    setError('');
    try {
      const data = await vaultRequest('/vault/list', creds.token);
      setFiles(normalizeFiles(data));
    } catch (err) {
      setError(err.message || 'Impossible de charger le Vault.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFiles();
  }, []);

  async function openFile(path) {
    if (!path) return;
    if (hasChanges && !window.confirm('Des modifications non sauvegardées seront perdues. Continuer ?')) return;

    setLoading(true);
    setError('');
    setStatus('');
    try {
      const key = await keyPromise;
      const data = await vaultRequest('/vault/get', creds.token, { path, name: path });
      const text = await decryptText(key, data.file || data.entry || data);
      setSelectedPath(path);
      setDraftPath(path);
      setContent(text);
      setSavedContent(text);
      setCreating(false);
      setStatus(`Fichier ouvert : ${path}`);
    } catch (err) {
      setError(err.message || 'Impossible d’ouvrir le fichier.');
    } finally {
      setLoading(false);
    }
  }

  function newFile() {
    if (hasChanges && !window.confirm('Des modifications non sauvegardées seront perdues. Continuer ?')) return;
    setSelectedPath('');
    setDraftPath('nouveau-fichier.txt');
    setContent('');
    setSavedContent('');
    setCreating(true);
    setError('');
    setStatus('Nouveau fichier prêt.');
  }

  async function saveFile() {
    const path = draftPath.trim();
    if (!path) {
      setError('Nom de fichier requis.');
      return;
    }

    setLoading(true);
    setError('');
    setStatus('');
    try {
      const key = await keyPromise;
      const encrypted = await encryptText(key, content);
      await vaultRequest('/vault/put', creds.token, {
        path,
        name: path,
        data: encrypted.data,
        content: encrypted.data,
        encryptedData: encrypted.data,
        iv: encrypted.iv,
      });

      if (selectedPath && selectedPath !== path) {
        await vaultRequest('/vault/delete', creds.token, { path: selectedPath, name: selectedPath }).catch(() => {});
      }

      setSelectedPath(path);
      setDraftPath(path);
      setSavedContent(content);
      setCreating(false);
      setStatus(`Fichier sauvegardé : ${path}`);
      await loadFiles();
    } catch (err) {
      setError(err.message || 'Impossible de sauvegarder le fichier.');
    } finally {
      setLoading(false);
    }
  }

  async function deleteFile() {
    if (!selectedPath) return;
    if (!window.confirm(`Supprimer ${selectedPath} ?`)) return;

    setLoading(true);
    setError('');
    setStatus('');
    try {
      await vaultRequest('/vault/delete', creds.token, { path: selectedPath, name: selectedPath });
      setSelectedPath('');
      setDraftPath('');
      setContent('');
      setSavedContent('');
      setStatus('Fichier supprimé.');
      await loadFiles();
    } catch (err) {
      setError(err.message || 'Impossible de supprimer le fichier.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full min-h-0 bg-gray-950 text-gray-200">
      <aside className="w-80 border-r border-cyan-900/30 bg-gray-950/80 flex flex-col min-h-0">
        <div className="p-4 border-b border-cyan-900/30 flex items-center justify-between gap-3">
          <div>
            <div className="text-cyan-300 text-sm font-semibold">Code Vault</div>
            <div className="text-gray-500 text-xs">Fichiers chiffrés</div>
          </div>
          <button
            type="button"
            onClick={newFile}
            className="px-3 py-1.5 rounded border border-cyan-700/60 text-cyan-200 text-xs hover:bg-cyan-900/30"
          >
            Nouveau
          </button>
        </div>

        <div className="flex-1 overflow-auto p-2">
          {loading && files.length === 0 && <div className="p-3 text-xs text-gray-500">Chargement…</div>}
          {!loading && files.length === 0 && <div className="p-3 text-xs text-gray-500">Aucun fichier</div>}
          {files.map((file) => (
            <button
              key={file.path}
              type="button"
              onClick={() => openFile(file.path)}
              className={`w-full text-left px-3 py-2 rounded text-sm truncate ${
                selectedPath === file.path
                  ? 'bg-cyan-950/60 text-cyan-100 border border-cyan-800/60'
                  : 'text-gray-300 hover:bg-gray-900 border border-transparent'
              }`}
            >
              {file.name}
            </button>
          ))}
        </div>
      </aside>

      <section className="flex-1 min-w-0 min-h-0 flex flex-col">
        <div className="p-4 border-b border-cyan-900/30 flex items-center gap-3">
          <input
            value={draftPath}
            onChange={(event) => setDraftPath(event.target.value)}
            placeholder="nom-du-fichier.txt"
            className="flex-1 bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm text-gray-100 outline-none focus:border-cyan-700 font-mono"
          />
          <button
            type="button"
            onClick={saveFile}
            disabled={loading || (!selectedPath && !creating && !draftPath)}
            className="px-4 py-2 rounded bg-cyan-700/30 border border-cyan-600/60 text-cyan-100 text-sm font-semibold disabled:opacity-40"
          >
            Sauvegarder
          </button>
          <button
            type="button"
            onClick={deleteFile}
            disabled={loading || !selectedPath}
            className="px-4 py-2 rounded bg-red-950/40 border border-red-900/70 text-red-200 text-sm font-semibold disabled:opacity-40"
          >
            Supprimer
          </button>
        </div>

        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          spellCheck="false"
          placeholder="Sélectionnez ou créez un fichier."
          className="flex-1 min-h-0 resize-none bg-gray-950 p-4 text-sm leading-6 text-gray-100 outline-none font-mono"
        />

        {(status || error || hasChanges) && (
          <div className="border-t border-cyan-900/30 px-4 py-2 text-xs">
            {error && <span className="text-red-300">{error}</span>}
            {!error && status && <span className="text-cyan-300">{status}</span>}
            {!error && !status && hasChanges && <span className="text-amber-300">Modifications non sauvegardées</span>}
          </div>
        )}
      </section>
    </div>
  );
}
