/*
 * @Description: 
 * @Author: vivi
 * @Date: 2023-03-20 15:48:19
 * @LastEditTime: 2023-04-03 14:33:25
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_PORT: number
  readonly VITE_OPEN: boolean
  readonly VITE_APP_TENANT_ENABLE: boolean
  readonly VITE_BASE_URL: string
  readonly VITE_UPLOAD_URL: string
  readonly VITE_API_BASEPATH: string
  readonly VITE_API_URL: string
  readonly VITE_BASE_PATH: string
  readonly VITE_DROP_DEBUGGER: string
  readonly VITE_DROP_CONSOLE: string
  readonly VITE_SOURCEMAP: string
  readonly VITE_OUT_DIR: string
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}