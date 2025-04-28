import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  base: '/new-portfolio-v4/',
  plugins: [
    react({
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
        ],
        presets: [
          ['@babel/preset-env', {
            targets: { browsers: ['>0.25%', 'not ie 11', 'not op_mini all'] },
            modules: false,
            loose: true,
            bugfixes: true
          }]
        ]
      },
      jsxRuntime: 'automatic',
      fastRefresh: true
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Enes Portfolio',
        short_name: 'Portfolio',
        description: 'Enes\'in Kişisel Portfolyo Sitesi',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/icons/icon.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: '/icons/icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      },
      workbox: {
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/api/, /^\/admin\/api/],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-files',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          },
          {
            urlPattern: /\.(?:js|css)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
              }
            }
          },
          {
            urlPattern: /^https:\/\/api\.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              },
              networkTimeoutSeconds: 10
            }
          }
        ],
        inlineWorkboxRuntime: true,
        skipWaiting: true,
        clientsClaim: true
      }
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') || 
              id.includes('node_modules/scheduler/') ||
              id.includes('node_modules/react-router-dom/')) {
            return 'react-vendor';
          }
          
          if (id.includes('node_modules/@mui/') || 
              id.includes('node_modules/@emotion/')) {
            return 'ui-vendor';
          }
          
          if (id.includes('node_modules/framer-motion')) {
            return 'animations';
          }
          
          if (id.includes('node_modules/react-icons')) {
            return 'icons';
          }
          
          if (id.includes('node_modules/axios') || 
              id.includes('node_modules/express') ||
              id.includes('node_modules/mongoose')) {
            return 'api-vendor';
          }
          
          if (id.includes('node_modules/')) {
            return 'vendor';
          }
          
          if (id.includes('/src/components/')) {
            if (id.includes('/animations/')) {
              return 'components-animations';
            }
            if (id.includes('/admin/')) {
              return 'components-admin';
            }
            return 'components-main';
          }
          
          if (id.includes('/src/utils/') || id.includes('/src/hooks/')) {
            return 'utils';
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      }
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
        passes: 2,
        ecma: 2020
      },
      format: {
        comments: false
      },
      ecma: 2020,
      safari10: false
    },
    sourcemap: false,
    target: 'esnext',
    assetsInlineLimit: 4096,
    modulePreload: true,
    outDir: 'dist',
    emptyOutDir: true,
    reportCompressedSize: false,
    cssMinify: true
  },
  server: {
    open: true,
    cors: true,
    host: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'framer-motion',
      '@mui/material',
      '@emotion/react',
      '@emotion/styled'
    ],
    esbuildOptions: {
      target: 'esnext',
      supported: { bigint: true }
    }
  },
  esbuild: {
    legalComments: 'none',
    target: 'esnext'
  },
  preview: {
    port: 5000,
    open: true
  },
  json: {
    stringify: true
  }
})
