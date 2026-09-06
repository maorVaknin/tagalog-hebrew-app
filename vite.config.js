import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // נתיבים יחסיים המבטיחים טעינת קבצי JS/CSS ללא מסך לבן
  server: {
    host: true,
    port: 5174,
    allowedHosts: true
  },
  preview: {
    host: true,
    port: 5174,
    allowedHosts: true
  }
})
