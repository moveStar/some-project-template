/*
 * @Description: 
 * @Author: vivi
 * @Date: 2023-03-20 15:48:19
 * @LastEditTime: 2023-04-25 11:24:54
 */
import { createSSRApp } from "vue";
import App from "./App.vue";
import { createPinia } from 'pinia';
// import i18n from "./language";

export function createApp() {
  const app = createSSRApp(App);
  app.use(createPinia());
  // app.use(i18n);
  return {
    app
  };
}
