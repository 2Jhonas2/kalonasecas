import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig(({ mode }) => {
  // Carga variables de entorno según el modo (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // 👇 Define correctamente el root relativo a este archivo
    root: __dirname,

    // Plugins
    plugins: [react()],

    // Configuración de resolución de alias
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },

    // Configuración de compilación
    build: {
      outDir: 'dist',       // 👈 Carpeta de salida que espera Azure
      emptyOutDir: true,    // Limpia la carpeta antes de construir
    },

    // Servidor local para desarrollo
    server: {
      host: true,
      port: 5173,
      proxy: {
        '/api': {
          // Usa la variable de entorno o el backend local
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