import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'   // 需安装此模块
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()
  , // ...
  AutoImport({
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  }),],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server:{
    open:false,
    proxy:{
      '/api':{
        target:"http://47.88.24.60:8000",
        changeOrigin:true,
        rewrite(path){
          
          return path.replace(/^\/api/,'')
        }
      }
    }
  }
})
