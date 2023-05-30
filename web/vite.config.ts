import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
// https://vitejs.dev/config/
export default defineConfig({
  base: '/acg/',
  plugins: [
    vue(),
    visualizer({
      filename: 'stats.html'
    })
  ],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src/') },
      { find: '@views', replacement: resolve(__dirname, 'src/views') },
      {
        find: '@components',
        replacement: resolve(__dirname, 'src/components')
      },
      { find: '@routes', replacement: resolve(__dirname, 'src/routes') },
      { find: '@stores', replacement: resolve(__dirname, 'src/stores') },
      {
        find: '@interfaces',
        replacement: resolve(__dirname, 'src/interfaces')
      },
      { find: '@utils', replacement: resolve(__dirname, 'src/utils') },
      { find: '@api', replacement: resolve(__dirname, 'src/api') },
      { find: '@hooks', replacement: resolve(__dirname, 'src/hooks') },
      { find: '@icons', replacement: resolve(__dirname, 'src/icons') }
    ]
  },

  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      }
    }
  },
  // config proxy
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5100',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
