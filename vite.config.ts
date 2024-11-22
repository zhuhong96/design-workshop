import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteCompression from 'vite-plugin-compression';
import path, { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve('./src'), // 设置别名
    },
  },
  plugins: [
    vue(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
  build: {
    outDir: resolve(__dirname, 'docs'), // 指定输出路径
    chunkSizeWarningLimit: 1500,
    sourcemap: false, // 是否生成 source map
    emptyOutDir: true, //Vite 会在构建时清空该目录
    // 打包时清楚console和debugger
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        compact: true, //压缩代码，删除换行符等
        assetFileNames: '[ext]/[name]-[hash].[ext]', //静态文件输出的文件夹名称
        chunkFileNames: 'js/[name]-[hash].js', //chunk包输出的文件夹名称
        entryFileNames: 'js/[name]-[hash].js', //入口文件输出的文件夹名称
      },
    },
  },
});
