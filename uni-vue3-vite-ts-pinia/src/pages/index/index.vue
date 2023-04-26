<!--
 * @Description: 首页
 * @Author: vivi
 * @Date: 2023-03-20 15:48:19
 * @LastEditTime: 2023-04-26 11:38:29
-->
<script setup lang="ts">
  import { onShow, onLoad } from "@dcloudio/uni-app";
  import SetNavBar from "@/components/SetNavBar.vue"; 
  import SetUnLogin from "@/components/SetUnLogin.vue";
  import CommBanner from "@/components/CommBanner.vue";
  import { useStore as useMainStore } from '@/stores';
  import { useStore as useAuthStore } from "@/stores/auth/index";

  const mainStore = useMainStore();
  const authStore = useAuthStore();
  
  // theme
  const pageStyle = computed(() => mainStore.getPageMetaStyle)
  const themeDark = computed(() => mainStore.themeConfig.theme === 'dark');

  // login
  const isLogin = computed(() => authStore.isLogin);
  
  // 静态
  onShow(() => mainStore.setTheme('raw'));

  onLoad(() => {
    
  })
  
  // banner data
  const bannerList = reactive([{
    id: 1,
    url: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.OqnTDUolGedgdM7pJY9N-AHaE8?pid=ImgDet&rs=1',
    title: 'first img'
  }, {
    id: 2,
    url: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.vDEL8OvKiWOT_Kwuf1cNgAHaFo?pid=ImgDet&w=1200&h=913&rs=1',
    title: 'second img'
  }, {
    id: 3,
    url: 'https://whatintech.com/wp-content/uploads/2020/05/Best-Looking-PC-Case-e1609620460940.jpg',
    title: 'third img'
  }])

</script>


<template>
  <page-meta :page-style="pageStyle" />
  <!-- ↓ 自定义导航 -->
  
  <!-- #ifndef APP-PLUS -->
  <set-nav-bar title="首页" :back="false" :filter="false" :bg="true" />
  <!-- #endif -->
  <!-- 未登录 -->
  <view class="page-wrapper fixed-top fixed-bottom" v-if="!isLogin">
    <set-un-login />
  </view>
  <!-- 已登录 -->
  <view class="page-wrapper fixed-top fixed-bottom" v-if="isLogin">
    <!-- head -->
    <view class="head-wrapper">
      <view class="call-content">章城,早上好</view>
      <view class="msg-content">
        <uni-icons type="chat" size="30" :color="`${themeDark ?'#FFFFFF':'#616d80'}`"></uni-icons>
      </view>
    </view>
    <!-- banner -->
    <comm-banner :listData="bannerList" />
    <!-- todo list -->
    <view class="todo-wrapper">
      
    </view>

    <!-- card-->
    <view class="card-wrapper">
      
    </view>
  </view>
</template>

<style lang="scss" scoped>
  .page-wrapper {
    margin: 0 20upx;
  }
  .head-wrapper {
    height: 100upx;
    line-height: 100upx;
    display: flex;
    justify-content: space-between;
    .call-content {
      font-size: 24px;
      font-weight: 700;
      color: var(--theme-text-title-color);
    }
  }

  .todo-wrapper {
    margin-top: 30upx;
    height: 100upx;
    width: 100%;
    background: var(--theme-background-color-card);
    border-radius: 20upx;
  }

  .card-wrapper {
    margin-top: 30upx;
    height: 408upx;
    width: 100%;
    background: var(--theme-background-color-card);
    border-radius: 20upx;
  }


  .card-wrapper {
    height: 500upx;
    width: 100%;
    background: var(--theme-background-color-card);
    border-radius: 20upx;
  }
</style>
