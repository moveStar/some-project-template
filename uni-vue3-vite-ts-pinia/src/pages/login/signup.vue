<!--
Author: zusheng
Date: 2022-05-09 17:14:50
LastEditTime: 2022-05-15 14:09:09
Description: 注册页面
FilePath: \uni-preset-vue-vite-ts\src\pages\login\signup.vue
-->
<script lang="ts" setup>
import SetNavBar from "@/components/SetNavBar.vue"; 
import { onLoad } from '@dcloudio/uni-app'
import { useStore } from '@/stores'
import { useStore as useUserStore } from '@/stores/user'
import { useStore as useAuthStore } from '@/stores/auth'

const mainStore = useStore()
const userStore = useUserStore()
const authStore = useAuthStore()
const data = reactive<any>({
  // 输入昵称
  inputNickname: '',

  // 输入密码
  inputPwd: '',

  // 再次输入密码
  inputSecPwd: '',

  // 初始化名字
  initNickname: `天水村民 ${Date.now()}`
})

// 输入验证码
function inputNickname(e: any) {
  data.inputNickname = e.detail.value
}
// 输入密码
function inputPwd(e: any) {
  data.inputPwd = e.detail.value
}

// 再次输入密码
function inputSecPwd(e: any) {
  data.inputSecPwd = e.detail.value
}

//
function toNext() {
  uni.showLoading({ title: '请稍后', mask: true })
  const code = authStore.code
  const phone = authStore.phone
  const password = data.inputPwd
  const nickname = data.inputNickname

  if (
    data.inputPwd &&
    data.inputSecPwd &&
    data.inputPwd === data.inputSecPwd &&
    !!phone &&
    !!password &&
    !!nickname &&
    !!code
  ) {
    if (!data.inputNickname) data.inputNickname = data.initNickname
    authStore.getRegister({phone, password:data.inputPwd, nickname:data.inputNickname, code}).then((res: any) => {
      if (res.code === 200) {
        authStore.toLogin({ phone, password }).then((res: any) => {
          uni.hideLoading()
          if (res.code === 200) {
            // 设置登录状态
            authStore.token = 'jnsadadasdasdadad';
            uni.setStorageSync('cookie', res.cookie)
            uni.reLaunch({ url: `/pages/index/mine` })
          } else {
            uni.hideLoading()
            uni.showToast({ title: '出了点问题', icon: 'none', duration: 2000 })
          }
        })
      }
    })
  } else {
    uni.hideLoading()
    // mock
    authStore.token = 'jnsadadasdasdadad';
    uni.reLaunch({ url: `/pages/index/mine` })
    uni.showToast({ title: '出了什么问题', icon: 'error' })
  }
}
</script>

<template>
   <page-meta :page-style="mainStore.getPageMetaStyle" />
  <!-- #ifndef APP-PLUS -->
  <set-nav-bar title="注册账号" :back="false" :filter="false" :bg="true" />
  <!-- #endif -->

  <view class="login-at-phone">
    <view class="login-at-phone__main">
      <!-- 描述 -->
      <view class="login-at-phone__main-title-h2">
        <text>补充你的信息</text>
      </view>
      <view class="login-at-phone__main-title-p">
        <text>你希望大家怎么称呼你呢？</text>
      </view>

      <!-- 昵称 -->
      <view class="login-at-phone__main-input">
        <input
          @input="inputNickname"
          class="login-at-phone__main-input-content"
          type="text"
          :placeholder="data.initNickname"
          maxlength="15"
          :focus="true"
          :adjust-position="false"
        />
      </view>

      <view style="width: 100%; height: 73rpx"></view>
      <view class="login-at-phone__main-title-p">
        <text>你的密码</text>
      </view>

      <!-- 密码 -->
      <view class="login-at-phone__main-input">
        <input
          @input="inputPwd"
          class="login-at-phone__main-input-content"
          type="password"
          placeholder="输入密码"
          :focus="false"
          :adjust-position="false"
        />
      </view>

      <!-- 密码 -->
      <view class="login-at-phone__main-input">
        <input
          @input="inputSecPwd"
          class="login-at-phone__main-input-content"
          type="password"
          placeholder="再次输入密码"
          :focus="false"
          :adjust-position="false"
        />
      </view>

      <!-- 下一步 -->
      <view class="login-at-phone__main-next">
        <view class="login-at-phone__main-next__verify" @tap="toNext"> 完成注册，开启生活之旅 </view>
      </view>
    </view>
  </view>
</template>

<style lang="less">
.login-at-phone {
  width: 100%;
  overflow: hidden;
  padding: calc(var(--status-bar-height) + var(--nav-tab-height-custom)) 0 0;

  .login-at-phone__main {
    margin-top: 73rpx;
    width: 100%;
    padding: 0 33rpx;
    box-sizing: border-box;

    .login-at-phone__main-title-h2 {
      font-size: 33.3rpx;
      font-weight: 700;
      color: rgb(50, 51, 51);
      line-height: 1;
    }

    .login-at-phone__main-title-p {
      margin-top: 24.4rpx;
      font-size: 25.64rpx;
      color: rgb(153, 153, 153);
      line-height: 1;
    }

    .login-at-phone__main-input {
      height: 83.4rpx;
      width: 100%;
      border-bottom: 1px solid rgb(232, 232, 232);
      display: flex;
      align-items: center;
      margin-top: 16rpx;

      .login-at-phone__main-input-content {
        height: 32rpx;
        width: 100%;
        color: var(--theme-text-title-color) !important;

        /deep/.input-placeholder {
          color: var(--theme-text-sub-color);
        }

        /deep/.uni-input-input {
          color: var(--theme-text-title-color) !important;
        }
      }
    }

    .login-at-phone__main-next {
      margin-top: 77rpx;
      width: 100%;
      line-height: 80rpx;
      text-align: center;
      opacity: 1;

      .login-at-phone__main-next__verify {
        color: #fff;
        width: 100%;
        height: 80rpx;
        border-radius: 80rpx;
        background-color: var(--theme-color);
      }
    }
  }
}
</style>

