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

const findUsageCols = [
  { key: 'usage', label: "Cas d'usage", className: 'text-cyan-300 font-medium' },
  { key: 'cmd', label: 'Commande', className: 'font-mono text-green-300 whitespace-nowrap' },
  { key: 'example', label: 'Exemple concret', className: 'font-mono text-yellow-300' },
  { key: 'explain', label: 'Explication', className: 'text-gray-300' },
  { key: 'result', label: 'Résultat attendu', className: 'text-gray-400 italic' },
];

const grepUsageCols = [
  { key: 'usage', label: "Cas d'usage", className: 'text-cyan-300 font-medium' },
  { key: 'cmd', label: 'Commande', className: 'font-mono text-green-300 whitespace-nowrap' },
  { key: 'example', label: 'Exemple concret', className: 'font-mono text-yellow-300' },
  { key: 'explain', label: 'Explication', className: 'text-gray-300' },
  { key: 'result', label: 'Résultat attendu', className: 'text-gray-400 italic' },
];

export default function Reference() {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-8">
      <div>
        <h2 className="text-cyan-400 font-semibold text-sm mb-3">Navigation — pwd &amp; cd</h2>
        <SyntaxTable rows={cdRows} hasNote={false} />
      </div>
      <div>
        <h2 className="text-cyan-400 font-semibold text-sm mb-3">Recherche — find (syntaxe)</h2>
        <SyntaxTable rows={findRows} hasNote={true} />
      </div>
      <div>
        <h2 className="text-cyan-400 font-semibold text-sm mb-3">find en pratique — cas d'usage</h2>
        <UsageTable rows={findUsageRows} columns={findUsageCols} />
      </div>
      <div>
        <h2 className="text-cyan-400 font-semibold text-sm mb-3">Recherche de texte — grep (syntaxe)</h2>
        <SyntaxTable rows={grepRows} hasNote={true} />
      </div>
      <div>
        <h2 className="text-cyan-400 font-semibold text-sm mb-3">grep en pratique — cas d'usage</h2>
        <UsageTable rows={grepUsageRows} columns={grepUsageCols} />
      </div>

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
      <div>
        <h2 className="text-cyan-400 font-semibold text-sm mb-3">Git — commandes essentielles</h2>
        <SyntaxTable rows={gitRows} hasNote={true} />
      </div>

      <div>
        <h2 className="text-cyan-400 font-semibold text-sm mb-3">Git — workflows complets</h2>
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
    </div>
  );
}
