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
        const files = readdirSync(dir).filter(f => f.endsWith('.js'))
        files.forEach(file => {
          const path = join(dir, file)
          const code = readFileSync(path, 'utf8')
          const result = JavaScriptObfuscator.obfuscate(code, {
            compact: true,
            controlFlowFlattening: false,
            deadCodeInjection: false,
            stringArray: true,
            stringArrayEncoding: ['base64'],
            stringArrayThreshold: 0.75,
            rotateStringArray: true,
            shuffleStringArray: true,
            splitStrings: true,
            splitStringsChunkLength: 5,
            identifierNamesGenerator: 'hexadecimal',
            renameGlobals: false,
            selfDefending: false,
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
