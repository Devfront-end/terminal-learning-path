import { useState, useRef, useEffect, useCallback } from 'react';
import Terminal from './components/Terminal.jsx';
import Exercises from './components/Exercises.jsx';
import Reference from './components/Reference.jsx';
import History from './components/History.jsx';
import Tree from './components/Tree.jsx';
import AskCLI from './components/AskCLI.jsx';
import CLIExercises from './components/CLIExercises.jsx';
import AccessAnalyser from './components/AccessAnalyser.jsx';
import CodeVault from './components/CodeVault.jsx';
import Snippets from './components/Snippets.jsx';
import CodeEditor from './components/CodeEditor.jsx';
import IPConfig from './components/IPConfig.jsx';
import StageExercises from './components/StageExercises.jsx';
import { useTerminal } from './hooks/useTerminal.js';

async function deriveVaultToken(password) {
  const enc = new TextEncoder();
  const salt = Uint8Array.from('b7e2a4f1c8d3e6b092a5f4e1d2c3b4a5'.match(/.{2}/g).map(b => parseInt(b, 16)));
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const derived = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, keyMaterial, 256);
  return Array.from(new Uint8Array(derived)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function pbkdf2Verify(password, saltHex, iterations, expectedHex) {
  const enc = new TextEncoder();
  const salt = Uint8Array.from(saltHex.match(/.{2}/g).map(b => parseInt(b, 16)));
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const derived = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    keyMaterial, 256
  );
  const hex = Array.from(new Uint8Array(derived)).map(b => b.toString(16).padStart(2, '0')).join('');
  return hex === expectedHex;
}

const tabs = [
  { id: 'terminal', label: '⚡ Terminal' },
  { id: 'exercises', label: '📚 Exercices' },
  { id: 'stage', label: '🧪 PHP/JS', hidden: true },
  { id: 'reference', label: '📖 Référence' },
  { id: 'snippets', label: '🗂️ Snippets' },
  { id: 'editor', label: '✏️ Éditeur' },
  { id: 'tree', label: '🌲 Arborescence' },
  { id: 'cli', label: '🖥️ Bash Essentials' },
  { id: 'ipconfig', label: '🌐 Réseau' },
];

const DEFAULT_TRACK_URL = 'https://tlp-alert.jules-augustin.workers.dev/track';

function getSessionId() {
  const key = 'tlp_session_id';
  let sessionId = localStorage.getItem(key);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(key, sessionId);
  }
  return sessionId;
}

function getTrackingUrl() {
  return localStorage.getItem('ta_track') || DEFAULT_TRACK_URL;
}

function sendTrackEvent(payload, options = {}) {
  const url = getTrackingUrl();
  if (!url) return;

  const body = JSON.stringify({
    app: 'terminal-learning-path',
    sessionId: getSessionId(),
    path: window.location.pathname,
    href: window.location.href,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    userAgent: navigator.userAgent,
    at: new Date().toISOString(),
    ...payload,
  });

  if (options.beacon && navigator.sendBeacon) {
    const blob = new Blob([body], { type: 'application/json' });
    if (navigator.sendBeacon(url, blob)) return;
  }

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {});
}

function useTabTracking(activeTab) {
  const activeTabRef = useRef(activeTab);
  const startedAtRef = useRef(Date.now());

  useEffect(() => {
    sendTrackEvent({ event: 'session_start', tab: activeTab });
  }, []);

  useEffect(() => {
    const now = Date.now();
    const previousTab = activeTabRef.current;
    const durationMs = now - startedAtRef.current;

    if (previousTab !== activeTab) {
      sendTrackEvent({
        event: 'tab_duration',
        tab: previousTab,
        durationMs,
        startedAt: new Date(startedAtRef.current).toISOString(),
        endedAt: new Date(now).toISOString(),
      });

      sendTrackEvent({ event: 'tab_open', tab: activeTab });
      activeTabRef.current = activeTab;
      startedAtRef.current = now;
    }
  }, [activeTab]);

  useEffect(() => {
    const flushCurrentTab = (event = 'session_end') => {
      const now = Date.now();
      sendTrackEvent({
        event,
        tab: activeTabRef.current,
        durationMs: now - startedAtRef.current,
        startedAt: new Date(startedAtRef.current).toISOString(),
        endedAt: new Date(now).toISOString(),
      }, { beacon: true });
      startedAtRef.current = now;
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') flushCurrentTab('tab_hidden');
      if (document.visibilityState === 'visible') {
        activeTabRef.current = activeTab;
        startedAtRef.current = Date.now();
        sendTrackEvent({ event: 'tab_visible', tab: activeTab });
      }
    };

    const onPageHide = () => flushCurrentTab('session_end');

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('pagehide', onPageHide);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('pagehide', onPageHide);
    };
  }, [activeTab]);
}

function useInspectionGuard(onDetect) {
  useEffect(() => {
    let detected = false;

    const trigger = () => {
      if (!detected) {
        detected = true;
        onDetect();
      }
    };

    const onContextMenu = (e) => {
      e.preventDefault();
      trigger();
    };

    const onKeyDown = (e) => {
      const key = e.key.toLowerCase();
      const blocked =
        e.key === 'F12' ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && ['i', 'j', 'c'].includes(key)) ||
        ((e.ctrlKey || e.metaKey) && ['u', 's'].includes(key)) ||
        (e.metaKey && e.altKey && ['i', 'j', 'c'].includes(key));

      if (blocked) {
        e.preventDefault();
        e.stopPropagation();
        trigger();
      }
    };

    const detectOpenDevtools = () => {
      const sizeThreshold = 170;
      if (
        window.outerWidth - window.innerWidth > sizeThreshold ||
        window.outerHeight - window.innerHeight > sizeThreshold
      ) {
        trigger();
      }

      const started = performance.now();
      debugger;
      if (performance.now() - started > 100) {
        trigger();
      }
    };

    document.addEventListener('contextmenu', onContextMenu);
    window.addEventListener('keydown', onKeyDown, true);
    const interval = window.setInterval(detectOpenDevtools, 1200);
    detectOpenDevtools();

    return () => {
      document.removeEventListener('contextmenu', onContextMenu);
      window.removeEventListener('keydown', onKeyDown, true);
      window.clearInterval(interval);
    };
  }, [onDetect]);
}

export default function App() {
  const [activeTab, setActiveTab] = useState('terminal');
  const [inspectionBlocked, setInspectionBlocked] = useState(false);
  const [hiddenVisible, setHiddenVisible] = useState(false);
  const [stageVisible, setStageVisible] = useState(false);
  const [h2Token, setH2Token] = useState(null);
  const [showH2Modal, setShowH2Modal] = useState(false);
  const [h2Input, setH2Input] = useState('');
  const [h2Error, setH2Error] = useState(false);
  const [vaultToken, setVaultToken] = useState(null);
  const [vaultCreds, setVaultCreds] = useState(null);
  const [showVaultModal, setShowVaultModal] = useState(false);
  const [vaultInput, setVaultInput] = useState('');
  const [vaultError, setVaultError] = useState(false);
  const clickCount = useRef(0);
  const clickTimer = useRef(null);
  const h2Params = useRef(null);
  const vaultParams = useRef(null);
  const {
    command, setCommand,
    output,
    history,
    historyIndex, setHistoryIndex,
    currentDir,
    feedback,
    feedbackType,
    hint,
    executeCommand,
    validateExercise,
    resetTerminal,
  } = useTerminal();

  useTabTracking(activeTab);

  const sendAlert = useCallback((code) => {
    const workerUrl = localStorage.getItem('ta_wk');
    if (!workerUrl) return;
    fetch(workerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    }).catch(() => {});
  }, []);

  const handleInspectionDetected = useCallback(() => {
    sendAlert('EVT_INSPECT');
    setInspectionBlocked(true);
  }, [sendAlert]);

  useInspectionGuard(handleInspectionDetected);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}h2.bin`)
      .then(r => r.json())
      .then(data => { h2Params.current = data; })
      .catch(() => {});
    fetch(`${import.meta.env.BASE_URL}h3.bin`)
      .then(r => r.json())
      .then(data => { vaultParams.current = data; })
      .catch(() => {});

    const key = 'tlp_seen';
    const last = parseInt(localStorage.getItem(key) || '0', 10);
    const now = Date.now();
    if (now - last > 24 * 60 * 60 * 1000) {
      localStorage.setItem(key, String(now));
      fetch('https://tlp-alert.jules-augustin.workers.dev/canary').catch(() => {});
    }
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (!e.ctrlKey || !e.shiftKey) return;
      if (e.key === 'A') {
        e.preventDefault();
        sendAlert('EVT_A');
        setHiddenVisible(v => {
          if (v) setActiveTab('terminal');
          else setActiveTab('audit');
          return !v;
        });
      } else if (e.key === 'H') {
        e.preventDefault();
        if (h2Token) setActiveTab('history');
      } else if (e.key === 'Y') {
        e.preventDefault();
        if (h2Token) setActiveTab('ask');
      } else if (e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setStageVisible(true);
        setActiveTab('stage');
      } else if (e.key === 'V') {
        e.preventDefault();
        sendAlert('EVT_E');
        if (vaultToken) {
          setVaultToken(null);
          setActiveTab('terminal');
        } else {
          setShowVaultModal(true);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [h2Token, vaultToken]);

  const handleTitleClick = () => {
    clickCount.current += 1;
    clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => { clickCount.current = 0; }, 600);
    if (clickCount.current === 5) {
      clickCount.current = 0;
      if (h2Token) {
        setH2Token(null);
        setActiveTab('terminal');
      } else {
        sendAlert('EVT_B');
        setShowH2Modal(true);
      }
    } else if (clickCount.current === 3) {
      sendAlert('EVT_C');
      setHiddenVisible(v => {
        if (v) setActiveTab('terminal');
        else setActiveTab('audit');
        return !v;
      });
    }
  };

  const checkVault = async () => {
    if (!vaultParams.current) return;
    const { salt, iterations, hash } = vaultParams.current;
    const ok = await pbkdf2Verify(vaultInput, salt, iterations, hash);
    if (ok) {
      const token = await deriveVaultToken(vaultInput);
      setVaultToken(crypto.randomUUID());
      setVaultCreds({ password: vaultInput, salt, token });
      setActiveTab('vault');
      setShowVaultModal(false);
      setVaultInput('');
    } else {
      sendAlert('EVT_F');
      setVaultError(true);
      setVaultInput('');
      setTimeout(() => setVaultError(false), 2000);
    }
  };

  const checkH2 = async () => {
    if (!h2Params.current) return;
    const { salt, iterations, hash } = h2Params.current;
    const ok = await pbkdf2Verify(h2Input, salt, iterations, hash);
    if (ok) {
      setH2Token(crypto.randomUUID());
      setActiveTab('history');
      setShowH2Modal(false);
      setH2Input('');
    } else {
      sendAlert('EVT_D');
      setH2Error(true);
      setH2Input('');
      setTimeout(() => setH2Error(false), 2000);
    }
  };

  const getTabClass = (tab) => {
    const base = 'px-4 py-3 text-xs font-semibold border-b-2 transition-all';
    if (activeTab === tab) {
      return base + ' border-cyan-400 text-cyan-400';
    }
    return base + ' border-transparent text-gray-500 hover:text-cyan-300 cursor-pointer';
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex flex-col overflow-hidden">
      {inspectionBlocked && (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-6">
          <div className="max-w-md border border-red-500/50 bg-red-950/20 px-6 py-5 text-center shadow-2xl">
            <div className="text-5xl animate-door">🚪</div>
            <div className="mt-3 text-red-300 text-sm font-semibold tracking-wide">Oups, mauvaise porte !</div>
            <div className="mt-3 text-xs leading-6 text-red-100/80">
              Cette pièce est fermée à clé. Ferme les outils de développement et recharge l'application pour ressortir.
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-cyan-900/30 bg-gray-950/50 px-6 py-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
          <h1 className="text-xl font-bold text-cyan-400 cursor-default select-none" onClick={handleTitleClick}>TERMINAL LEARNING PATH</h1>
        </div>
        <p className="text-xs text-gray-400">CLI Linux et Git</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-cyan-900/30 bg-gray-950/30 px-6">
        {tabs.filter(tab => !tab.hidden || (tab.id === 'stage' && stageVisible)).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={getTabClass(tab.id)}
          >
            {tab.label}
          </button>
        ))}
        {hiddenVisible && (
          <button
            onClick={() => setActiveTab('audit')}
            className={getTabClass('audit')}
          >
            ⚙️
          </button>
        )}
        {h2Token && (
          <>
            <button onClick={() => setActiveTab('history')} className={getTabClass('history')}>✓ Historique</button>
            <button onClick={() => setActiveTab('ask')} className={getTabClass('ask')}>💬 Question</button>
          </>
        )}
        {vaultToken && (
          <button onClick={() => setActiveTab('vault')} className={getTabClass('vault')}>🗄️ Vault</button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'terminal' && (
          <Terminal
            output={output}
            history={history}
            command={command}
            setCommand={setCommand}
            historyIndex={historyIndex}
            setHistoryIndex={setHistoryIndex}
            feedback={feedback}
            feedbackType={feedbackType}
            hint={hint}
            currentDir={currentDir}
            onExecute={executeCommand}
            onReset={resetTerminal}
          />
        )}
        {activeTab === 'exercises' && (
          <Exercises onValidate={validateExercise} />
        )}
        {activeTab === 'stage' && (
          <StageExercises />
        )}
        {activeTab === 'reference' && (
          <Reference />
        )}
        {activeTab === 'history' && h2Token && (
          <History history={history} />
        )}
        {activeTab === 'snippets' && (
          <Snippets />
        )}
        {activeTab === 'editor' && (
          <CodeEditor />
        )}
        {activeTab === 'tree' && (
          <Tree />
        )}
        {activeTab === 'ask' && h2Token && (
          <AskCLI />
        )}
        {activeTab === 'cli' && (
          <CLIExercises />
        )}
        {activeTab === 'ipconfig' && (
          <IPConfig />
        )}
        {activeTab === 'audit' && (
          <AccessAnalyser />
        )}
        {activeTab === 'vault' && vaultToken && (
          <CodeVault creds={vaultCreds} />
        )}
      </div>

      {/* Modal Vault */}
      {showVaultModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-950 border border-cyan-900/50 rounded-lg p-6 flex flex-col gap-4 shadow-xl">
            <div className="text-cyan-400 text-sm font-semibold">🗄️ Code Vault</div>
            <div className="flex gap-2">
              <input
                type="password"
                value={vaultInput}
                onChange={e => setVaultInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') checkVault(); if (e.key === 'Escape') { setShowVaultModal(false); setVaultInput(''); } }}
                placeholder="Mot de passe…"
                autoFocus
                className={`bg-gray-900 border rounded px-3 py-2 text-sm text-gray-200 outline-none font-mono ${vaultError ? 'border-red-500' : 'border-gray-700 focus:border-cyan-600'}`}
              />
              <button onClick={checkVault} className="px-4 py-2 bg-cyan-600/20 border border-cyan-600/40 text-cyan-300 rounded text-sm font-semibold hover:bg-cyan-600/30">→</button>
            </div>
            {vaultError && <div className="text-red-400 text-xs">Mot de passe incorrect</div>}
          </div>
        </div>
      )}

      {/* Modal H2 */}
      {showH2Modal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-950 border border-cyan-900/50 rounded-lg p-6 flex flex-col gap-4 shadow-xl">
            <div className="text-cyan-400 text-sm font-semibold">🔒 Accès restreint</div>
            <div className="flex gap-2">
              <input
                type="password"
                value={h2Input}
                onChange={e => setH2Input(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') checkH2(); if (e.key === 'Escape') { setShowH2Modal(false); setH2Input(''); } }}
                placeholder="Mot de passe…"
                autoFocus
                className={`bg-gray-900 border rounded px-3 py-2 text-sm text-gray-200 outline-none font-mono ${h2Error ? 'border-red-500' : 'border-gray-700 focus:border-cyan-600'}`}
              />
              <button
                onClick={checkH2}
                className="px-4 py-2 bg-cyan-600/20 border border-cyan-600/40 text-cyan-300 rounded text-sm font-semibold hover:bg-cyan-600/30"
              >→</button>
            </div>
            {h2Error && <div className="text-red-400 text-xs">Mot de passe incorrect</div>}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-cyan-900/30 bg-gray-950/50 px-6 py-2 flex items-center justify-between text-xs text-gray-500">
        <span>Répertoire: <span className="text-cyan-400">{currentDir}</span></span>
        <button onClick={resetTerminal} className="text-gray-500 hover:text-gray-300 cursor-pointer">
          ↻ Réinitialiser
        </button>
      </div>
    </div>
  );
}
