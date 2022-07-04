import { join } from 'path'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import inspectPlugin from 'vite-plugin-inspect'
import comlink from 'vite-plugin-comlink'
import icons from 'unplugin-icons/vite'

export default defineConfig({
  plugins: [
    inspectPlugin(),
    solidPlugin(),
    icons({ compiler: 'solid', autoInstall: true }),
    comlink(),
  ],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
  resolve: {
    alias: {
      '~': join(__dirname, './src'),
    },
  },
})
