import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  
  plugins: [react()],
  build: {
    sourcemap: mode === 'development', // Activa source maps solo en desarrollo
  },
  base: '/supabase-auth-crud/',
}));