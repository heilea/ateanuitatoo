import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base './' : le dossier dist fonctionne depuis n'importe quel hébergement statique
export default defineConfig({
  base: './',
  plugins: [react()],
})
