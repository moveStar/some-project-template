<!--
 * @Description: 未登录模板
 * @Author: vivi
 * @Date: 2023-03-31 09:56:29
 * @LastEditTime: 2023-04-24 10:51:04
-->
<template>
  <view class="un-login-wrapper">
    未登录模板
    <view @tap.stop.prevent="toLogin(idx)">to login</view>
  </view>
</template>

<script setup lang="ts">
  const idx = ref()

  function toLogin(data: any) {
    uni.navigateTo({
      url: '/pages/login/index'
    })
  }
</script>

<style lang="less" scoped>
  .un-login-wrapper {
    background: #0984e3;
    font-size: 24px;
  }
</style>