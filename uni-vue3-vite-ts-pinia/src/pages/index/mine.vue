<!--
 * @Description: 个人中心
 * @Author: vivi
 * @Date: 2023-03-29 18:11:21
 * @LastEditTime: 2023-04-26 11:40:20
-->
<template>
  <page-meta :page-style="pageStyle" />
  <!-- #ifndef APP-PLUS -->
  <set-nav-bar title="首页" :back="false" :filter="false" :bg="true" />
  <!-- #endif -->
  <view class="setting-wrap fixed-top fixed-bottom">
    <!-- 设置列表 -->
    <view class="setting-list">
      <view class="setting-list-item">
        <view class="setting-list-item-title">夜间模式</view>
        <switch
          class="setting-switch-btn"
          :color="curThemeColor"
          @change="themeChange"
          :checked="themeDark"
        />
      </view>
    </view>
    
    <!-- 退出登录 -->
    <view class="setting-login">
      <view v-if="isLogin" class="setting-exit-btn" @tap="exit">退出登录</view>
      <view v-else class="setting-login-btn" @tap="login">未登录</view>
    </view>
  </view>
</template>
<script setup lang="ts">
  import { onShow } from "@dcloudio/uni-app";
  import SetNavBar from '@/components/SetNavBar.vue'; 
  import { useStore as useMainStore } from '@/stores';
  import { useStore as useAuthStore } from "@/stores/auth/index";


  const mainStore = useMainStore();
  const authStore = useAuthStore();
  onShow(() => {
    mainStore.setTheme('raw')
  });
  const pageStyle = computed(() => mainStore.getPageMetaStyle)
  const themeDark = computed(() => mainStore.themeConfig.theme === 'dark');
  const curThemeColor = computed(() => mainStore.getCurTheme.themeColor);
  console.log('sssssss', mainStore.getCurTheme.themeColor);
  
  function themeChange(e: any) {
    if(e.detail.value) {
      mainStore.setTheme('dark');
    } else {
      mainStore.setTheme('light');
    }
  }

  // const userStore = useUserStore();
  const isLogin = computed(() => authStore.isLogin);
  console.log('loginStatus', isLogin.value);
  

  // 退出登录
  function exit() {
    uni.showLoading({title: '发送中'})
    authStore.loginOut().then((res: any) => {
      uni.hideLoading()
      if(res.code == 0) {
        uni.reLaunch({
          url: '/pages/index/index'
        })
      } else {
        uni.showToast({
          title: '退出失败，请重新再试！',
          icon: 'error',
          duration: 5000
        })
      }
    })
  }

  // 登录
  function login() {

  }
</script>
<style lang="less" scoped>
  .setting-wrap {
    width: 100%;
    min-height: calc(100vh - var(--window-bottom));
    box-sizing: border-box;
    position: relative;

    .setting-list {
      overflow: hidden;
      margin: 32rpx;
      background-color: var(--theme-background-color-card);
      border-radius: 12rpx;

      .setting-list-item {
        width: 100%;
        height: 96rpx;
        padding: 0 32rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--theme-text-title-color);

        .setting-switch-btn {
          transform: scale(0.8);
        }
      }
    } 
  }

  .setting-login {
    width: 100%;
    height: 96rpx;
    padding: 0 32rpx;
    box-sizing: border-box;

    .setting-login-btn,
    .setting-exit-btn {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12rpx;
    }

    .setting-login-btn {
      color: var(--theme-text-title-color);
      background-color: var(--theme-background-color-card);
    }

    .setting-exit-btn {
      color: #fff;
      background-color: var(--theme-color);
    }
  }
</style>