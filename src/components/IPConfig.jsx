const SECTIONS = [
  {
    title: 'ipconfig — Windows',
    color: 'text-blue-400',
    border: 'border-blue-900/40',
    commands: [
      { cmd: 'ipconfig', desc: 'Affiche les adresses IP de toutes les interfaces' },
      { cmd: 'ipconfig /all', desc: 'Détails complets : MAC, DHCP, DNS, passerelle…' },
      { cmd: 'ipconfig /release', desc: 'Libère le bail DHCP (supprime l\'IP)' },
      { cmd: 'ipconfig /renew', desc: 'Renouvelle le bail DHCP (obtient une nouvelle IP)' },
      { cmd: 'ipconfig /flushdns', desc: 'Vide le cache DNS local' },
      { cmd: 'ipconfig /displaydns', desc: 'Affiche le contenu du cache DNS' },
      { cmd: 'ipconfig /registerdns', desc: 'Réenregistre le nom d\'hôte auprès du serveur DNS' },
    ],
  },
  {
    title: 'ip — Linux (moderne)',
    color: 'text-green-400',
    border: 'border-green-900/40',
    commands: [
      { cmd: 'ip addr', desc: 'Équivalent de ipconfig — liste toutes les interfaces et IPs' },
      { cmd: 'ip addr show eth0', desc: 'Détails d\'une interface spécifique' },
      { cmd: 'ip link', desc: 'État des interfaces réseau (up/down, MAC)' },
      { cmd: 'ip link set eth0 up', desc: 'Active une interface' },
      { cmd: 'ip link set eth0 down', desc: 'Désactive une interface' },
      { cmd: 'ip route', desc: 'Table de routage (équivalent route print)' },
      { cmd: 'ip route add default via 192.168.1.1', desc: 'Ajoute une route par défaut (passerelle)' },
      { cmd: 'ip addr add 192.168.1.50/24 dev eth0', desc: 'Assigne une IP statique temporaire' },
      { cmd: 'ip addr del 192.168.1.50/24 dev eth0', desc: 'Supprime une IP d\'une interface' },
    ],
  },
  {
    title: 'ifconfig — Linux (legacy)',
    color: 'text-yellow-400',
    border: 'border-yellow-900/40',
    commands: [
      { cmd: 'ifconfig', desc: 'Affiche les interfaces actives' },
      { cmd: 'ifconfig -a', desc: 'Toutes les interfaces, y compris inactives' },
      { cmd: 'ifconfig eth0', desc: 'Détails d\'une interface' },
      { cmd: 'ifconfig eth0 up', desc: 'Active l\'interface eth0' },
      { cmd: 'ifconfig eth0 down', desc: 'Désactive l\'interface eth0' },
      { cmd: 'ifconfig eth0 192.168.1.50 netmask 255.255.255.0', desc: 'Assigne une IP statique' },
    ],
  },
  {
    title: 'Diagnostics réseau',
    color: 'text-encre-400',
    border: 'border-encre-900/40',
    commands: [
      { cmd: 'ping 8.8.8.8', desc: 'Test de connectivité (fonctionne sur Windows et Linux)' },
      { cmd: 'ping -c 4 google.com', desc: 'Linux : 4 paquets seulement (Ctrl+C sinon)' },
      { cmd: 'traceroute google.com', desc: 'Linux : trace le chemin réseau jusqu\'à la destination' },
      { cmd: 'tracert google.com', desc: 'Windows : équivalent de traceroute' },
      { cmd: 'nslookup google.com', desc: 'Résolution DNS d\'un nom de domaine' },
      { cmd: 'dig google.com', desc: 'Linux : résolution DNS détaillée' },
      { cmd: 'netstat -tuln', desc: 'Linux : ports en écoute (TCP/UDP)' },
      { cmd: 'ss -tuln', desc: 'Linux (moderne) : équivalent rapide de netstat' },
      { cmd: 'curl ifconfig.me', desc: 'Affiche ton IP publique via internet' },
      { cmd: 'hostname -I', desc: 'Linux : IP locale de la machine' },
    ],
  },
  {
    title: 'DNS — résolution et config',
    color: 'text-purple-400',
    border: 'border-purple-900/40',
    commands: [
      { cmd: 'cat /etc/resolv.conf', desc: 'Linux : serveurs DNS configurés' },
      { cmd: 'cat /etc/hosts', desc: 'Fichier hosts local (résolution statique)' },
      { cmd: 'resolvectl status', desc: 'Linux (systemd) : état détaillé du DNS' },
      { cmd: 'systemd-resolve --status', desc: 'Équivalent sur systèmes systemd anciens' },
      { cmd: 'nslookup -type=MX domain.com', desc: 'Enregistrements MX (mail) d\'un domaine' },
      { cmd: 'dig +short TXT domain.com', desc: 'Enregistrements TXT (SPF, DKIM…)' },
    ],
  },
];

export default function IPConfig() {
  return (
    <div className="h-full overflow-y-auto bg-gray-950 px-6 py-5">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-encre-400 mb-1">Réseau — ipconfig & ip</h2>
          <p className="text-xs text-gray-500">Commandes de configuration et diagnostic réseau sous Windows et Linux.</p>
        </div>

        <div className="space-y-6">
          {SECTIONS.map(section => (
            <div key={section.title} className={`border ${section.border} rounded-lg overflow-hidden`}>
              <div className="px-4 py-2 bg-gray-900/60 border-b border-gray-800">
                <span className={`text-xs font-bold ${section.color}`}>{section.title}</span>
              </div>
              <table className="w-full">
                <tbody>
                  {section.commands.map((c, i) => (
                    <tr key={i} className="border-b border-gray-900 last:border-0 hover:bg-gray-900/40 group">
                      <td className="px-4 py-2 w-72 align-top">
                        <code className="text-green-300 text-xs font-mono whitespace-nowrap select-all">{c.cmd}</code>
                      </td>
                      <td className="px-4 py-2 text-gray-400 text-xs">{c.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 border border-gray-800 rounded-lg bg-gray-900/30">
          <div className="text-xs font-semibold text-gray-400 mb-2">Équivalences rapides</div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs font-mono">
            {[
              ['ipconfig', 'ip addr'],
              ['ipconfig /all', 'ip addr show + ip link'],
              ['ipconfig /flushdns', 'systemd-resolve --flush-caches'],
              ['route print', 'ip route'],
              ['netstat -an', 'ss -an'],
              ['tracert', 'traceroute'],
            ].map(([win, lin]) => (
              <div key={win} className="flex items-center gap-2">
                <span className="text-blue-400 w-44 truncate">{win}</span>
                <span className="text-gray-600">→</span>
                <span className="text-green-400">{lin}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
