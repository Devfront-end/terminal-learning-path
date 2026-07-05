import { useState } from 'react';

export default function PHPFundamentals() {
  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="border-b border-gray-800/60 bg-gray-950/40 px-4 py-3 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-purple-300 text-xs font-bold uppercase tracking-wider">
            Fondamentaux PHP
          </span>
          <span className="text-gray-500 text-xs">Les éléments universels de tout projet PHP</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Introduction */}
        <section className="bg-cyan-950/10 border border-cyan-900/30 rounded-lg px-6 py-4">
          <h2 className="text-cyan-400 text-lg font-semibold mb-3">📚 Fondamentaux PHP</h2>
          <p className="text-gray-300 text-sm leading-6">
            Dans n'importe quel projet PHP, on retrouve systématiquement ces éléments de base, 
            quels que soient la taille, le framework ou l'objectif du projet.
          </p>
        </section>

        {/* Structure de fichiers */}
        <section className="bg-gray-900/40 border border-gray-800/50 rounded-lg px-6 py-4">
          <h2 className="text-yellow-400 text-lg font-semibold mb-4 flex items-center gap-2">
            📁 Structure de fichiers minimales
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-cyan-300 text-sm font-semibold mb-2">Fichiers obligatoires :</h3>
              <ul className="space-y-2">
                <li className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-cyan-500 mt-0.5">→</span>
                  <span><code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">index.php</code> : Point d'entrée principal (même vide ou redirigeant).</span>
                </li>
                <li className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-cyan-500 mt-0.5">→</span>
                  <span>Fichiers <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">.php</code> : Contiennent du code PHP (même un seul fichier pour les micro-projets).</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-cyan-300 text-sm font-semibold mb-2">Dossiers classiques (selon la complexité) :</h3>
              <ul className="space-y-2">
                <li className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-cyan-500 mt-0.5">→</span>
                  <span><code className="bg-gray-800 px-2 py-0.5 rounded text-orange-300">/src/</code> ou <code className="bg-gray-800 px-2 py-0.5 rounded text-orange-300">/app/</code> : Logique métier.</span>
                </li>
                <li className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-cyan-500 mt-0.5">→</span>
                  <span><code className="bg-gray-800 px-2 py-0.5 rounded text-orange-300">/vendor/</code> : Dépendances (si Composer est utilisé).</span>
                </li>
                <li className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-cyan-500 mt-0.5">→</span>
                  <span><code className="bg-gray-800 px-2 py-0.5 rounded text-orange-300">/public/</code> : Fichiers accessibles via le navigateur (CSS, JS, images, index.php).</span>
                </li>
                <li className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-cyan-500 mt-0.5">→</span>
                  <span><code className="bg-gray-800 px-2 py-0.5 rounded text-orange-300">/config/</code> : Fichiers de configuration (base de données, routes, etc.).</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Éléments techniques constants */}
        <section className="bg-gray-900/40 border border-gray-800/50 rounded-lg px-6 py-4">
          <h2 className="text-yellow-400 text-lg font-semibold mb-4 flex items-center gap-2">
            🔧 Éléments techniques constants
          </h2>
          
          <div className="space-y-6">
            {/* Balises PHP */}
            <div>
              <h3 className="text-cyan-300 text-sm font-semibold mb-2">1. Balises PHP</h3>
              <p className="text-gray-300 text-sm mb-3">Obligatoire pour délimiter le code PHP dans les fichiers.</p>
              <div className="bg-black/40 border border-gray-700 rounded px-4 py-3">
                <code className="text-green-300 text-sm">
                  {`<?php
// Code PHP ici
?>`}
                </code>
              </div>
            </div>

            {/* Variables et types */}
            <div>
              <h3 className="text-cyan-300 text-sm font-semibold mb-2">2. Variables et types</h3>
              <ul className="space-y-2">
                <li className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-cyan-500 mt-0.5">→</span>
                  <span>Variables préfixées par <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">$</code> (ex: <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">$variable</code>).</span>
                </li>
                <li className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-cyan-500 mt-0.5">→</span>
                  <span>Types de base : <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">string</code>, <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">int</code>, <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">float</code>, <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">bool</code>, <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">array</code>, <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">object</code>, <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">null</code>.</span>
                </li>
              </ul>
            </div>

            {/* Superglobales */}
            <div>
              <h3 className="text-cyan-300 text-sm font-semibold mb-2">3. Superglobales (toujours disponibles)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2">
                  <li className="text-gray-300 text-sm flex items-start gap-2">
                    <span className="text-cyan-500 mt-0.5">→</span>
                    <span><code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">$_GET</code>, <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">$_POST</code>, <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">$_REQUEST</code> : Données HTTP.</span>
                  </li>
                  <li className="text-gray-300 text-sm flex items-start gap-2">
                    <span className="text-cyan-500 mt-0.5">→</span>
                    <span><code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">$_SERVER</code> : Informations sur le serveur (ex: <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">$_SERVER['REQUEST_METHOD']</code>).</span>
                  </li>
                  <li className="text-gray-300 text-sm flex items-start gap-2">
                    <span className="text-cyan-500 mt-0.5">→</span>
                    <span><code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">$_SESSION</code> : Gestion des sessions.</span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="text-gray-300 text-sm flex items-start gap-2">
                    <span className="text-cyan-500 mt-0.5">→</span>
                    <span><code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">$_COOKIE</code> : Cookies.</span>
                  </li>
                  <li className="text-gray-300 text-sm flex items-start gap-2">
                    <span className="text-cyan-500 mt-0.5">→</span>
                    <span><code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">$_FILES</code> : Uploads de fichiers.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Fonctions natives */}
            <div>
              <h3 className="text-cyan-300 text-sm font-semibold mb-2">4. Fonctions natives</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-yellow-300 text-xs font-semibold mb-1.5">Manipulation de chaînes :</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300 text-xs">strlen()</code>
                    <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300 text-xs">str_replace()</code>
                    <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300 text-xs">explode()</code>
                  </div>
                </div>
                <div>
                  <h4 className="text-yellow-300 text-xs font-semibold mb-1.5">Tableaux :</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300 text-xs">array()</code>
                    <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300 text-xs">count()</code>
                    <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300 text-xs">foreach</code>
                  </div>
                </div>
                <div>
                  <h4 className="text-yellow-300 text-xs font-semibold mb-1.5">Entrées/sorties :</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300 text-xs">echo</code>
                    <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300 text-xs">print_r()</code>
                    <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300 text-xs">var_dump()</code>
                  </div>
                </div>
                <div>
                  <h4 className="text-yellow-300 text-xs font-semibold mb-1.5">Fichiers :</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300 text-xs">file_get_contents()</code>
                    <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300 text-xs">fopen()</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Gestion des erreurs */}
            <div>
              <h3 className="text-cyan-300 text-sm font-semibold mb-2">5. Gestion des erreurs</h3>
              <ul className="space-y-2">
                <li className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-cyan-500 mt-0.5">→</span>
                  <span><code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">error_reporting()</code> et <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">ini_set('display_errors', 1)</code> en développement.</span>
                </li>
                <li className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-cyan-500 mt-0.5">→</span>
                  <span><code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">try/catch</code> pour les exceptions.</span>
                </li>
              </ul>
            </div>

            {/* Connexion BD */}
            <div>
              <h3 className="text-cyan-300 text-sm font-semibold mb-2">6. Connexion à une base de données</h3>
              <p className="text-gray-300 text-sm mb-3">Utilisation de PDO ou mysqli pour interagir avec MySQL/MariaDB.</p>
              <div className="bg-black/40 border border-gray-700 rounded px-4 py-3">
                <code className="text-green-300 text-sm">
                  {`$pdo = new PDO('mysql:host=localhost;dbname=test', 'user', 'password');`}
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* Outils et bonnes pratiques */}
        <section className="bg-gray-900/40 border border-gray-800/50 rounded-lg px-6 py-4">
          <h2 className="text-yellow-400 text-lg font-semibold mb-4 flex items-center gap-2">
            🛠 Outils et bonnes pratiques universelles
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-cyan-300 text-sm font-semibold mb-2">Composer :</h3>
              <ul className="space-y-2">
                <li className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-cyan-500 mt-0.5">→</span>
                  <span>Gestion des dépendances (même pour les petits projets).</span>
                </li>
                <li className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-cyan-500 mt-0.5">→</span>
                  <span>Fichier <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">composer.json</code> pour déclarer les bibliothèques (ex: monolog, phpunit).</span>
                </li>
                <li className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-cyan-500 mt-0.5">→</span>
                  <span>Autoloading des classes via <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">autoload.php</code> dans <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">/vendor/</code>.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-cyan-300 text-sm font-semibold mb-2">PSR-4 :</h3>
              <p className="text-gray-300 text-sm">Standard d'autoloading pour les classes (ex: <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">namespace App\Controller;</code>).</p>
            </div>

            <div>
              <h3 className="text-cyan-300 text-sm font-semibold mb-2">Fichier .htaccess (si Apache) :</h3>
              <p className="text-gray-300 text-sm">Pour réécrire les URLs ou activer des modules PHP.</p>
            </div>

            <div>
              <h3 className="text-cyan-300 text-sm font-semibold mb-2">Fichier .env :</h3>
              <p className="text-gray-300 text-sm">Stocke les variables d'environnement (clés API, identifiants DB, etc.).</p>
            </div>
          </div>
        </section>

        {/* Interaction HTTP */}
        <section className="bg-gray-900/40 border border-gray-800/50 rounded-lg px-6 py-4">
          <h2 className="text-yellow-400 text-lg font-semibold mb-4 flex items-center gap-2">
            🌐 Interaction HTTP
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-cyan-300 text-sm font-semibold mb-2">Requêtes/réponses :</h3>
              <ul className="space-y-2">
                <li className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-cyan-500 mt-0.5">→</span>
                  <span>Récupération des paramètres via <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">$_GET</code>/<code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">$_POST</code>.</span>
                </li>
                <li className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-cyan-500 mt-0.5">→</span>
                  <span>Envoi de réponses avec <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">echo</code>, <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">json_encode()</code>, ou des headers (<code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">header('Content-Type: application/json')</code>).</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-cyan-300 text-sm font-semibold mb-2">Formulaires :</h3>
              <p className="text-gray-300 text-sm">Traitement des données soumises (ex: <code className="bg-gray-800 px-2 py-0.5 rounded text-purple-300">if ($_SERVER['REQUEST_METHOD'] === 'POST')</code>).</p>
            </div>
          </div>
        </section>

        {/* Exemple minimal */}
        <section className="bg-gray-900/40 border border-gray-800/50 rounded-lg px-6 py-4">
          <h2 className="text-yellow-400 text-lg font-semibold mb-4 flex items-center gap-2">
            📦 Exemple minimal d'un projet PHP
          </h2>
          
          <p className="text-gray-300 text-sm mb-4">Structure type :</p>
          
          <div className="bg-black/30 border border-gray-700 rounded px-4 py-3">
            <code className="text-green-300 text-sm font-mono">
{`mon-projet/
├── public/
│   └── index.php       # Point d'entrée
├── src/
│   └── utils.php       # Fonctions utilitaires
├── config/
│   └── database.php    # Configuration DB
├── vendor/             # Dépendances Composer
├── .htaccess           # Configuration Apache
├── .env                # Variables d'environnement
└── composer.json       # Dépendances`}
            </code>
          </div>
        </section>

        {/* Ce qui change */}
        <section className="bg-gray-900/40 border border-gray-800/50 rounded-lg px-6 py-4">
          <h2 className="text-yellow-400 text-lg font-semibold mb-4 flex items-center gap-2">
            ⚡ Ce qui change selon les projets
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 text-cyan-300">Éléments variables</th>
                  <th className="text-left py-2 text-cyan-300">Exemples</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800/50">
                  <td className="py-2">Framework</td>
                  <td className="py-2">Symfony, Laravel, Slim, ou aucun</td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="py-2">Architecture</td>
                  <td className="py-2">MVC, Micro-services, ou script unique</td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="py-2">Base de données</td>
                  <td className="py-2">MySQL, PostgreSQL, SQLite, ou aucune</td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="py-2">Frontend</td>
                  <td className="py-2">Intégré (PHP + HTML) ou séparé (API)</td>
                </tr>
                <tr>
                  <td className="py-2">Outils de build</td>
                  <td className="py-2">Webpack, Vite, ou aucun</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Résumé */}
        <section className="bg-cyan-950/10 border border-cyan-900/30 rounded-lg px-6 py-4">
          <h2 className="text-cyan-400 text-lg font-semibold mb-4">En résumé :</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl mt-0.5">✓</span>
              <div>
                <span className="font-semibold text-gray-200">Toujours présents : </span>
                <span className="text-gray-300">Fichiers .php, balises <?php ?>, superglobales, fonctions natives, gestion des erreurs.</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl mt-0.5">✓</span>
              <div>
                <span className="font-semibold text-gray-200">Presque toujours : </span>
                <span className="text-gray-300">Composer, PSR-4, .env, interaction HTTP.</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-400 text-xl mt-0.5">✗</span>
              <div>
                <span className="font-semibold text-gray-200">Variables : </span>
                <span className="text-gray-300">Framework, architecture, base de données, frontend.</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
