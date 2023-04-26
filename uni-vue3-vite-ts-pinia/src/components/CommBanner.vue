<!--
 * @Description: banner list
 * @Author: vivi
 * @Date: 2023-03-31 10:05:13
 * @LastEditTime: 2023-03-31 16:46:04
-->
<template>
  <view class="banner-wrapper">
    <swiper class="screen-swiper" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
      <swiper-item class="screen-swiper-item" v-for="(item,index) in props.listData" :key="index">
        <image :src="item.url" mode="aspectFill"></image>
      </swiper-item>
    </swiper>
  </view>
</template>
<script setup lang="ts">
  type BannerList = {
    id: number,
    url: string,
    title: string
  }
  const props = defineProps<{
    // banner data
    listData: Array<BannerList>
  }>();
  
  function changeSwiper() {

  }

</script>
<style lang="less" scoped>
  .banner-wrapper {
    border-radius: 10upx;
    .screen-swiper {
      height: 280upx;
      width: 100%;
      border-radius: 10upx;
      .screen-swiper-item {
        width: 100%;
        height: 100%;
        border-radius: 10upx;
        image {
          width: 100%;
          height: 100%;
          border-radius: 10upx;
        }
      }
    }
  }
</style>