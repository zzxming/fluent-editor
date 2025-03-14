import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const fluentEditorRoot = path.resolve(__dirname, '../fluent-editor')
export default defineConfig({
  base: '/tiny-editor/projects/',
  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: [
      {
        find: '@opentiny/fluent-editor/style.css',
        replacement: path.resolve(fluentEditorRoot, 'dist/style.css'),
      },
    ],
  },
  build: {
    outDir: '../docs/fluent-editor/.vitepress/dist/projects',
  },
})
