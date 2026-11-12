import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relatif agar jalan di domain custom maupun di /namarepo/
  base: './'
})
