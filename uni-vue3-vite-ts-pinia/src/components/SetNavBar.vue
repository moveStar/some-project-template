<!--
 * @Description: 自定义导航栏
 * @Author: vivi
 * @Date: 2023-03-30 10:04:11
 * @LastEditTime: 2023-03-30 14:04:09
-->
<template>
  <view :class="`nav-bar ${filter ? 'nav-bar-filter' : ''}`" :style="{ background: themeColor }">
    <view
      class="nav-bar-spacing"
      :style="{ 'justify-content': backBtn ? 'space-between' : 'center' }"
    >
      <view
        v-if="backBtn"
        class="nav-bar__back"
        :style="{ 'background-color': titleColor }"
        @click="back"
      />
      
      <text class="nav-bar__title text-ellipsis-single" :style="{ color: titleColor || 'black' }">
        {{ props.title }}
      </text>

      <view v-if="props.back" class="nav-bar__search"></view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { useStore } from '@/stores';
  const store = useStore();
  const props = defineProps<{
    // 是否显示返回按钮
    back: boolean

    // 导航标题
    title: string

    // 背景是否开启滤镜
    filter: boolean

    // 背景是否显示
    bg: boolean
  }>()


  const filter = computed(() => {
    return props.filter;
  });

  const titleColor = computed(() => {
    return store.getCurTheme.navigationBarColor;
  })

  const themeColor = computed(() => {
    return props.bg ? store.getCurTheme.backgroundColorCard : 'transparent';
  })

  const backBtn = computed(() => {
    return typeof props.back === 'boolean' ? props.back : true;
  })

  function back() {
    const curPages = getCurrentPages()
    // 没有上一页时直接返回主页
    if(curPages.length === 1) {
      uni.switchTab({
        url: '../index/index'
      });
    } else {
      uni.navigateBack({ delta: 1 });
    }
  }
</script>
<style lang="less" scoped>
.nav-bar {
  z-index: 1001;
  position: fixed;
  top: -10px;
  left: 0;
  width: 100%;
  padding-top: calc(var(--status-bar-height) + 10px);
  height: var(--nav-tab-height-custom);
  overflow: hidden;

  .nav-bar-spacing {
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--nav-tab-height-custom);
    box-sizing: border-box;
    position: relative;
    z-index: 1003;

    .nav-bar__title {
      z-index: 1003;
      color: var(--nav-title-color);
      font-weight: 700;
      font-size: 33.33rpx;
      line-height: 1.5;
      padding: 0 64rpx 0 32rpx;
      box-sizing: border-box;
    }

    .nav-bar__back,
    .nav-bar__search {
      flex-shrink: 0;
      z-index: 1003;
      height: 100%;
      width: 44.8rpx;
      padding: 0 30rpx;
      position: relative;
    }

    .nav-bar__back {
      mask-position: center;
      mask-repeat: no-repeat;
      mask-image: url('@/static/images/icon-arrow-left.png');
      mask-size: auto 44.8rpx;
    }
  }
}

.nav-bar-filter {
  backdrop-filter: saturate(200%) blur(20px) !important;
  /* #ifdef H5 */
  backdrop-filter: none !important;
  background: var(--theme-background-color-card) !important;
  /* #endif */
}
</style>
