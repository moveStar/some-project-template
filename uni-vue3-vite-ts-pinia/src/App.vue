<!--
 * @Description: 入口文件
 * @Author: vivi
 * @Date: 2023-03-20 15:48:19
 * @LastEditTime: 2023-04-26 11:45:45
-->
<script setup lang="ts">
import { useStore as useMainStore } from "./stores";
import { useStore as useAuthStore } from "./stores/auth/index";
import { onLaunch, onShow, onHide, onThemeChange } from "@dcloudio/uni-app";

const mainStore = useMainStore();
const authStore = useAuthStore();
const systemInfo: any = uni.getSystemInfoSync();
onLaunch(() => {
  console.log("App Launch");
  /**
   * 设置主题，用户配置优先
   */
   if (['light', 'dark'].includes(uni.getStorageSync('theme'))) {
    mainStore.setTheme(uni.getStorageSync('theme'))
  } else if (['light', 'dark'].includes(systemInfo.theme)) {
    mainStore.setTheme(systemInfo.theme)
  } else {
    mainStore.setTheme('light')
  }
  initUserAuth();
});

onThemeChange((res: any) => {
  if(['light', 'dark'].includes(res.theme)) {
    mainStore.setTheme(res.theme)
  }
})

function initUserAuth() {
  if (authStore.isLogin) {}
}

onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
  @import '../src/styles/common.scss';
  page,
  html,
  body {
      // 自定义导航栏高度
    --nav-tab-height-custom: 84.6rpx;

    // tabbar高度
    // --tabbar-height-custom: 50px;
    --tabbar-height-custom: 0;

    // 播放器高度
    --player-height-custom: 54px;

    font-family: open sans, Helvetica, Arial, sans-serif;
    -webkit-overflow-scrolling: touch;
    box-sizing: border-box;
  }
  
</style>
