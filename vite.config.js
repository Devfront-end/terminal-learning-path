import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import JavaScriptObfuscator from 'javascript-obfuscator'
import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join } from 'path'

function obfuscatorPlugin() {
  return {
    name: 'obfuscator',
    closeBundle() {
      const dir = 'dist/assets'
      try {
        const files = readdirSync(dir).filter(f => f.endsWith('.js') && !f.startsWith('CodeVault-'))
        files.forEach(file => {
          const path = join(dir, file)
          const code = readFileSync(path, 'utf8')
          const result = JavaScriptObfuscator.obfuscate(code, {
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 0.4,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 0.3,
            stringArray: true,
            stringArrayEncoding: ['base64', 'rc4'],
            stringArrayThreshold: 0.85,
            stringArrayWrappersCount: 3,
            stringArrayWrappersType: 'function',
            rotateStringArray: true,
            shuffleStringArray: true,
            splitStrings: true,
            splitStringsChunkLength: 4,
            numbersToExpressions: true,
            transformObjectKeys: true,
            identifierNamesGenerator: 'hexadecimal',
            identifiersPrefix: '_0x',
            renameGlobals: false,
            selfDefending: true,
            debugProtection: true,
            debugProtectionInterval: 1000,
            disableConsoleOutput: false,
          })
          writeFileSync(path, result.getObfuscatedCode())
          console.log(`✓ Obfusqué : ${file}`)
        })
      } catch (e) {
        console.warn('Obfuscation skipped:', e.message)
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), obfuscatorPlugin()],
  base: '/terminal-learning-path/',
})
