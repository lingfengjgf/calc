import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  mode:'hash',
  build: {
    chunkSizeWarningLimit:1500,
  },
  plugins: [vue()]
})

