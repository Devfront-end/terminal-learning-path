import { useState } from 'react';
import { cdRows, findRows, grepRows, findUsageRows, grepUsageRows, gitRows, gitWorkflowRows, fileRows, sysRows, permRows } from '../data/reference.js';

function SyntaxTable({ rows, hasNote }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="border-b border-cyan-900/30">
            <th className="text-left text-cyan-400 py-2 pr-4 font-semibold">Option/Syntaxe</th>
            <th className="text-left text-cyan-400 py-2 pr-4 font-semibold">Description</th>
            <th className="text-left text-cyan-400 py-2 pr-4 font-semibold">Exemple</th>
            <th className="text-left text-cyan-400 py-2 pr-4 font-semibold">Résultat</th>
            {hasNote && <th className="text-left text-cyan-400 py-2 font-semibold">Notes</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={`border-b border-gray-800/40 ${i % 2 === 0 ? 'bg-gray-900/20' : ''}`}>
              <td className="py-2 pr-4 font-mono text-green-300 whitespace-nowrap">{r.cmd}</td>
              <td className="py-2 pr-4 text-gray-300">{r.desc}</td>
              <td className="py-2 pr-4 font-mono text-yellow-300 whitespace-nowrap">{r.example}</td>
              <td className="py-2 pr-4 text-gray-400">{r.result}</td>
              {hasNote && <td className="py-2 text-gray-500 italic">{r.note || ''}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UsageTable({ rows, columns }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="border-b border-cyan-900/30">
            {columns.map((col, i) => (
              <th key={i} className="text-left text-cyan-400 py-2 pr-4 font-semibold">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={`border-b border-gray-800/40 ${i % 2 === 0 ? 'bg-gray-900/20' : ''}`}>
              {columns.map((col, j) => (
                <td key={j} className={`py-2 pr-4 ${col.className || 'text-gray-300'}`}>
                  {r[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const usageCols = [
  { key: 'usage', label: "Cas d'usage", className: 'text-cyan-300 font-medium' },
  { key: 'cmd', label: 'Commande', className: 'font-mono text-green-300 whitespace-nowrap' },
  { key: 'example', label: 'Exemple concret', className: 'font-mono text-yellow-300' },
  { key: 'explain', label: 'Explication', className: 'text-gray-300' },
  { key: 'result', label: 'Résultat attendu', className: 'text-gray-400 italic' },
];

const TABS = [
  { id: 'cd',   label: 'cd & pwd',   color: 'text-blue-400' },
  { id: 'find', label: 'find',        color: 'text-orange-400' },
  { id: 'grep', label: 'grep',        color: 'text-purple-400' },
  { id: 'git',  label: 'git',         color: 'text-green-400' },
  { id: 'sys',  label: 'Système',     color: 'text-cyan-400' },
];

export default function Reference() {
  const [active, setActive] = useState('cd');

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      {/* Onglets */}
      <div className="flex border-b border-gray-800/60 bg-gray-950/40 px-4 shrink-0">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-4 py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-all ${
              active === tab.id
                ? `${tab.color} border-current`
                : 'text-gray-500 border-transparent hover:text-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenu */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {active === 'cd' && (
          <div>
            <h2 className="text-blue-400 font-semibold text-sm mb-3">Navigation — pwd &amp; cd</h2>
            <SyntaxTable rows={cdRows} hasNote={false} />
          </div>
        )}

        {active === 'find' && (
          <>
            <div>
              <h2 className="text-orange-400 font-semibold text-sm mb-3">find — syntaxe</h2>
              <SyntaxTable rows={findRows} hasNote={true} />
            </div>
            <div>
              <h2 className="text-orange-400 font-semibold text-sm mb-3">find — cas d'usage</h2>
              <UsageTable rows={findUsageRows} columns={usageCols} />
            </div>
          </>
        )}

        {active === 'grep' && (
          <>
            <div>
              <h2 className="text-purple-400 font-semibold text-sm mb-3">grep — syntaxe</h2>
              <SyntaxTable rows={grepRows} hasNote={true} />
            </div>
            <div>
              <h2 className="text-purple-400 font-semibold text-sm mb-3">grep — cas d'usage</h2>
              <UsageTable rows={grepUsageRows} columns={usageCols} />
            </div>
          </>
        )}

        {active === 'git' && (
          <>
            <div>
              <h2 className="text-green-400 font-semibold text-sm mb-3">Git — commandes essentielles</h2>
              <SyntaxTable rows={gitRows} hasNote={true} />
            </div>
            <div>
              <h2 className="text-green-400 font-semibold text-sm mb-3">Git — workflows complets</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-cyan-900/30">
                      <th className="text-left text-cyan-400 py-2 pr-4 font-semibold">Opération</th>
                      <th className="text-left text-cyan-400 py-2 pr-4 font-semibold">Commandes</th>
                      <th className="text-left text-cyan-400 py-2 font-semibold">Résultat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gitWorkflowRows.map((r, i) => (
                      <tr key={i} className={`border-b border-gray-800/40 ${i % 2 === 0 ? 'bg-gray-900/20' : ''}`}>
                        <td className="py-2 pr-4 text-cyan-300 font-medium align-top">{r.desc}</td>
                        <td className="py-2 pr-4 align-top">
                          {r.cmds.map((cmd, j) => (
                            <div key={j} className="font-mono text-green-300 whitespace-nowrap">{cmd}</div>
                          ))}
                        </td>
                        <td className="py-2 text-gray-400 italic align-top">{r.result}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {active === 'sys' && (
          <>
            <div>
              <h2 className="text-cyan-400 font-semibold text-sm mb-3">Lecture de fichiers — cat, head, tail, less</h2>
              <SyntaxTable rows={fileRows} hasNote={true} />
            </div>
            <div>
              <h2 className="text-cyan-400 font-semibold text-sm mb-3">Informations système — whoami, df, du, ps</h2>
              <SyntaxTable rows={sysRows} hasNote={true} />
            </div>
            <div>
              <h2 className="text-cyan-400 font-semibold text-sm mb-3">Permissions — ls -la, chmod, chown</h2>
              <SyntaxTable rows={permRows} hasNote={true} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
