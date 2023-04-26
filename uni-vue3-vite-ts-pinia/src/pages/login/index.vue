

<script setup lang="ts">
import SetNavBar from "@/components/SetNavBar.vue"; 
import { onShow } from '@dcloudio/uni-app'
import { useStore as useMainStore } from '@/stores'
import { useStore as useAuthStore } from '@/stores/auth/index'

const mainStore = useMainStore()
const authStore = useAuthStore()
const data = reactive<any>({
  // input content
  inputPhone: '',

  // input password
  inputPassword: '',

  // use verifycode/password  to login
  type: 'code',
})
// set theme
onShow(() => mainStore.setTheme('raw'))


// 输入手机号
function inputPhone(e: any) {
  data.inputPhone = e.detail.value
}

// 输入密码
function inputPassword(e: any) {
  data.inputPassword = e.detail.value
}

// 更改登录方式
function changeType(type: string) {
  data.type = type
}

// 下一步
function nextStep() {
  uni.showLoading({ title: '发送中' })
  if (data.type === 'code') {
    // 使用验证码登录

    authStore.phone = data.inputPhone
    authStore
      .getSendCode(data.inputPhone)
      .then((res: any) => {
        uni.hideLoading()
        if (res.data) {
          authStore.phone = data.inputPhone
          authStore.password = data.inputPassword
          authStore.type = data.type
          // 前往校验页面
          uni.navigateTo({ url: `/pages/login/verify` })
        } else {
          uni.showToast({
            title: '发送失败',
            icon: 'error',
            duration: 5000
          })
        }
      })
      .catch((error: any) => {
        uni.navigateTo({ url: `/pages/login/verify` })
        console.error(error)
        uni.hideLoading()
        uni.showToast({
          title: '发送失败',
          icon: 'error',
          duration: 5000
        })
      })
  } else if (data.type === 'password') {
    authStore
      .toLogin({ phone: data.inputPhone, password: data.inputPassword })
      .then((res: any) => {
        uni.hideLoading()
        if (res.code === 200) {
          // 设置登录状态
          // authStore.auth = true
          authStore.token = res.token
          uni.setStorageSync('cookie', res.cookie)
          uni.reLaunch({ url: `/pages/index/mine` })
        } else {
          uni.showToast({ title: '出了点问题', icon: 'none', duration: 2000 })
        }
      }).catch(err => {
          authStore.token = "axmsdjaidhdqiqe2131ni3e9q2qemakwme2112e1e"

          uni.reLaunch({ url: `/pages/index/mine` })
        uni.hideLoading()
        uni.showToast({ title: '出了点问题', icon: 'none', duration: 2000 })
      })
  }
}

</script>
<template>
  <page-meta :page-style="mainStore.getPageMetaStyle" />
  <!-- #ifndef APP-PLUS -->
  <set-nav-bar title="手机号登陆" :back="false" :filter="false" :bg="true" />
  <!-- #endif -->

  <view class="login-at-phone">
    <view class="login-at-phone__main">
      <!-- 描述 -->
      <view class="login-at-phone__main-title-h2">
        <text>登陆后体验更多精彩</text>
      </view>
      <view class="login-at-phone__main-title-p">
        <text>未注册手机号登陆后将自动创建账号</text>
      </view>

      <!-- 手机号输入框 -->
      <view class="login-at-phone__main-input">
        <input
          @input="inputPhone"
          class="login-at-phone__main-input-content"
          type="number"
          placeholder="输入手机号"
          maxlength="11"
          :focus="true"
          :adjust-position="false"
        />
      </view>

      <!-- 密码输入框 -->
      <view class="login-at-phone__main-input" v-if="data.type === 'password'">
        <input
          @input="inputPassword"
          class="login-at-phone__main-input-content"
          type="password"
          placeholder="输入密码"
          :focus="false"
          :adjust-position="false"
        />
      </view>

      <!-- 下一步 -->
      <view class="login-at-phone__main-next">
        <view
          v-if="data.type === 'code'"
          @tap.stop.prevent="changeType('password')"
          class="login-at-phone__main-next__pwd"
        >
          使用密码登录
        </view>
        <view v-else @tap.stop.prevent="changeType('code')" class="login-at-phone__main-next__code">
          使用验证码登录
        </view>

        <view
          @tap.stop.prevent="nextStep"
          class="login-at-phone__main-next__verify"
          :class="{ 'next-disabled': data.inputPhone.length !== 11 }"
        >
          {{ data.type === 'code' ? '发送验证码' : '下一步' }}
        </view>
      </view>
    </view>
  </view>
 </template>

<style lang="less">
.login-at-phone {
  overflow: hidden;
  width: 100%;
  height: calc(100vh - var(--status-bar-height) - var(--nav-tab-height-custom));
  padding: calc(var(--status-bar-height) + var(--nav-tab-height-custom)) 0 0;

  .login-at-phone__main {
    margin-top: 73rpx;
    width: 100%;
    padding: 0 33rpx;
    box-sizing: border-box;

    .login-at-phone__main-title-h2 {
      font-size: 33.3rpx;
      font-weight: 700;
      color: var(--theme-text-title-color);
      line-height: 1;
    }

    .login-at-phone__main-title-p {
      margin-top: 24.4rpx;
      font-size: 25.64rpx;
      color: var(--theme-text-sub-color);
      line-height: 1;
    }

    // 输入框容器
    .login-at-phone__main-input {
      height: 83.4rpx;
      width: 100%;
      border-bottom: 1px solid var(--theme-border-color);
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

    .next-disabled {
      opacity: 0.3 !important;
    }

    .login-at-phone__main-next {
      margin-top: 77rpx;
      width: 100%;
      line-height: 80rpx;
      text-align: center;
      opacity: 1;

      .login-at-phone__main-next__pwd,
      .login-at-phone__main-next__code {
        width: 100%;
        height: 80rpx;
        border-radius: 80rpx;
        margin-bottom: 12px;
        color: #000;
        border: 1px solid var(--theme-border-color);
        background-color: #fff;
      }

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

