/*
 * @Description: 
 * @Author: vivi
 * @Date: 2023-03-20 15:48:19
 * @LastEditTime: 2023-04-25 11:25:17
 */
import path from "path";
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/uni_eng/',
  plugins: [
    uni(),
    AutoImport({
      imports: ['vue', 'uni-app'],
      dts: './auto-imports.d.ts',
    })
  ],
  resolve: {
    // alias: {
    //   '@': path.resolve(__dirname, 'src'),
    //   '@img': path.resolve(__dirname, 'src/static/images'), // 安装好依赖后，重新运行编译即可自动在根目录下生成此声明文件
    // }
    alias: [
      {
        find:'@',
        replacement:path.resolve(__dirname,'src'),
      }, 
      {
        find: '@img',
        replacement: path.resolve(__dirname, 'src/static/images')
      },
      {
        find: /\/#\//,
        replacement: path.resolve(__dirname, 'types')
      }
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,
      }
    }
  }
});


