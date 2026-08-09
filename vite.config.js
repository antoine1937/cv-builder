import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages sert ce projet depuis /cv-builder/ (pas la racine du
  // domaine, contrairement a un site perso) -- sans "base", les fichiers
  // CSS/JS generes par le build chercheraient leurs propres fichiers a la
  // racine et la page resterait blanche en ligne (meme si ca marche en local).
  base: '/cv-builder/',
})
