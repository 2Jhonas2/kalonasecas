import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig(({ mode }) => {
  // Carga las variables de entorno según el modo (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
    server: {
      host: true,
      port: 5173,
      proxy: {
        '/api': {
          // Usa la variable de entorno VITE_API_URL como target
          target: env.VITE_API_URL || 'http://localhost:3000',
          changeOrigin: true,
          rewrite: p => p.replace(/^\/api/, ''),
        },
        '/uploads': {
          target: env.VITE_API_URL || 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    },
  }
})
  




