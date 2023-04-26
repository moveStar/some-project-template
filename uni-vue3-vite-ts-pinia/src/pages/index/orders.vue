<!--
 * @Description: 
 * @Author: vivi
 * @Date: 2023-03-29 18:11:46
 * @LastEditTime: 2023-04-26 11:40:51
-->
<template>
  <page-meta :page-style="pageStyle" />
  <!-- ↓ 自定义导航 -->
  <set-nav-bar title="订单" :back="false" :filter="false" :bg="true" />

  <!-- 未登录 -->
  <view class="un-login-wrapper fixed-top fixed-bottom" v-if="!isLogin">
    <set-un-login />
  </view>

  <!-- 已登录 -->
  <view class="login-wrapper fixed-top fixed-bottom" v-if="isLogin">
    <!-- <comm-banner :listData="bannerList" /> -->
    orders
  </view>
</template>

<script setup lang="ts">
import { onShow } from "@dcloudio/uni-app";
import SetNavBar from '@/components/SetNavBar.vue'; 
import SetUnLogin from "@/components/SetUnLogin.vue";
import { useStore as useMainStore } from '@/stores';
// import { useStore as useUserStore } from "@/stores/user";
import { useStore as useAuthStore } from "@/stores/auth/index";

const mainStore = useMainStore();
// const userStore = useUserStore();
const authStore = useAuthStore();

onShow(() => mainStore.setTheme('raw'));
const pageStyle = computed(() => mainStore.getPageMetaStyle)
const themeDark = computed(() => mainStore.themeConfig.theme === 'dark');

const isLogin = computed(() => authStore.isLogin);

</script>

<style lang="scss" scoped>

</style>