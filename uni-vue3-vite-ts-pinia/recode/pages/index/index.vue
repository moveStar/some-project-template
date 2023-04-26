<!--
 * @Description: 首页
 * @Author: vivi
 * @Date: 2023-03-20 15:48:19
 * @LastEditTime: 2023-04-03 10:39:30
-->
<script setup lang="ts">
  import $mAssetsPath from '@/config/assets.config';
  import { onShow } from "@dcloudio/uni-app";
  import SetNavBar from "@/components/SetNavBar.vue"; 
  import SetUnLogin from "@/components/SetUnLogin.vue";
  import CommBanner from "@/components/CommBanner.vue";
  import { useStore } from '@/stores';
  import { useStore as useUserStore } from "@/stores/user";
  import { useAuthStore } from "@/stores/auth";

  const store = useStore();
  const userStore = useUserStore();
  const authStore = useAuthStore();
  
  // theme
  const pageStyle = computed(() => store.getPageMetaStyle)
  const themeDark = computed(() => store.themeConfig.theme === 'dark');
  console.log('themee----', themeDark.value);

  // login
  const isLogin = computed(() => authStore.isLogin) ;
  const filterChecked = ref();
  const databoard = ref({});
  const todoTaskList = ref([]);

  // 静态
  
  onShow(() => store.setTheme('raw'));

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

  function changeFilter(num: Number) {

  }

  function toOrderPage() {num: Number} {
  
  }

</script>


<template>
  <page-meta :page-style="pageStyle" />
  <!-- ↓ 自定义导航 -->
  
  <!-- #ifndef APP-PLUS -->
  <set-nav-bar title="首页" :back="false" :filter="false" :bg="true" />
  <!-- #endif -->
  <!-- 未登录 -->
  <view class="page-wrapper fixed-top fixed-bottom" v-if="isLogin">
    <set-un-login />
  </view>
  <!-- 已登录 -->
  <view class="page-wrapper fixed-top fixed-bottom" v-if="!isLogin">
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
      <swiper-item class="swiper-item" v-for="(item, index) in todoTaskList" :key="index">
        <!-- type: 1等级  2积分 -->
        <view class="healthy-row"> 
          <view class="new-title">
            <image
              v-if="item.type == 1"
              class="msg-icon"
              :src="`${task_class_icon}`"
              mode="scaleToFill"
            />
            <image
              v-if="item.type == 2"
              class="msg-icon"
              :src="`${task_finishorder_icon}`"
              mode="scaleToFill"
            />
            <view class="msg-info">{{item.taskName}},完成+{{item.num}}
              <span v-if="item.type == 1">成长值</span>
              <span v-if="item.type == 2">积分</span>
            </view>
          </view>
          <view
            v-if="item.type == 1"
            class="heal-action"
            @tap="navToLogin(`/pagesB/level/index`)"
          >
            去完成
          </view>
          <view
            v-if="item.type == 2"
            class="heal-action"
            @tap="navToLogin(`/pagesB/score/index`)"
          >
            去完成
          </view>
        </view>
      </swiper-item>
    </view>

    <!-- statistics -->
    <view class="statistics-wrapper">
      <view class="filter-wrapper">
        <view class="filter-item" :class="`${filterChecked == 1 ? 'active' : ''}`" @click="changeFilter(1)">当日</view>
        <view class="filter-item" :class="`${filterChecked == 2 ? 'active' : ''}`" @click="changeFilter(2)">本周</view>
        <view class="filter-item" :class="`${filterChecked == 3 ? 'active' : ''}`" @click="changeFilter(3)">本月</view>
        <view class="filter-item" v-if="filterChecked !== 5" :class="`${filterChecked == 4 ? 'active' : ''}`" @click="changeFilter(4)">自定义</view>
        <view class="filter-item" v-if="filterChecked == 5">
          <!-- <uni-datetime-picker v-model="range" type="daterange" @maskClick="maskClick" :clearIcon="false" /> -->
        </view>
      </view>
      <view class="notice-board">
        <view class="firstRow">
          <view class="n-item">
            <view class="number">{{databoard.orderReceived || 0}}</view>
            <view class="title">已接单</view>
          </view>
          <view class="n-item">
            <view class="number">{{databoard.service || 0}}</view>
            <view class="title">服务中</view>
          </view>
          <view class="n-item" @click="toOrderPage(1)">
            <view class="number" style="color: #E23838">{{databoard.timeout || 0}}</view>
            <view class="title">已超时</view>
          </view>
        </view> 
        <view class="secondRow">
          <view class="n-item" @click="toOrderPage(2)">
            <view class="number" style="color: #E23838">{{databoard.completed || 0}}</view>
            <view class="title">已完工</view>
          </view>
          <view class="n-item" @click="toOrderPage(2)">
            <view class="number" style="color: #FF8330">{{databoard.confirmed || 0}}</view>
            <view class="title">已确认</view>
          </view><view class="n-item" @click="toOrderPage(2)">
            <view class="number" style="color: #03E1A0">{{databoard.pushConfirmed || 0}}</view>
            <view class="title">已回单</view>
          </view>
        </view>
      </view>
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

  .statistics-wrapper {
    margin-top: 30upx;
    height: 408upx;
    width: 100%;
    background: var(--theme-background-color-card);
    border-radius: 20upx;
  }


  .statistics-wrapper {
    height: 500upx;
    width: 100%;
    background: var(--theme-background-color-card);
    border-radius: 20upx;
    .filter-wrapper {
      height: 100upx;
      padding: 0 20upx;
      display: flex;
      align-items: center;
      .filter-item {
        min-width: 65upx;
        margin-right: 10upx;
        color: var(--theme-text-title-color);
      }
      .active {
        font-size: 16px;
        font-weight: 700;
        border-bottom: 2px solid #03e1a0;
      }
    }
    .notice-board {
      display: flex;
      flex-direction: column;
      padding: 40upx 40upx;
      .firstRow {
        display: flex;
        flex-direction: row;
      }
      .secondRow {
        margin-top: 60upx;
        display: flex;
        flex-direction: row;
      }
      .n-item {
        text-align: center;
        width: 33.3%;
        height: 138upx;
        .number {
          font-size: 24px;
          font-family: AlibabaPuHuiTiMr;
          font-weight: 700;
          color: var(--theme-text-title-color);
        }
        .title {
          font-size: 14px;
          font-family:  AlibabaPuHuiTiMr;
          font-weight: 400;
          color: var(--theme-text-title-color);
        }
      }
    }
  }
</style>
