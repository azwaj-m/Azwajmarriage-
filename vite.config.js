import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import terminal from 'vite-plugin-terminal'

export default defineConfig({
  plugins: [
    react(),
    terminal({
      // یہ براؤزر کے تمام Console.error اور پوشیدہ بگز کو ٹرمکس ٹرمینل میں لائیو دکھائے گا
      console: 'terminal'
    })
  ],
  server: {
    host: true,
    port: 5173
  }
})
