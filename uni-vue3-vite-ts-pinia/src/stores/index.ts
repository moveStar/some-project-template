/*
 * @Description: 主题等公共部分管理
 * @Author: vivi
 * @Date: 2023-03-27 17:33:14
 * @LastEditTime: 2023-04-25 11:40:20
 */
import { defineStore } from 'pinia';

type Theme = {
  // 状态栏字体颜色
  navigationBarColor: '#ffffff' | '#000000',
  // 主题色
  themeColor: string,
  // 页面背景色
  backgroundColor: string,
  // 内容卡片背景色
  backgroundColorCard: string,
  // 稍微强调色
  backgroundColorClear: string,
  // 标题色
  textTitleColor: string,
  // 副标题色
  textSubColor: string,
  // 边框颜色
  borderColor: string,
  // 半透滤镜色
  filterColor: string,
  // 阴影颜色
  shadowColor: string
}

const dark: Theme = {
  navigationBarColor: '#ffffff',
  themeColor: '#6c5ce7',
  backgroundColor: '#0E0E0E',
  backgroundColorCard: '#151515',
  backgroundColorClear: '#212121',
  textTitleColor: '#FFFFFF',
  textSubColor: '#626262',
  borderColor: '#2A2A2A',
  filterColor: 'rgba(19, 19, 20, 0.7)',
  shadowColor: '#131313'
}

const light: Theme = {
  navigationBarColor: '#000000',
  themeColor: '#0984e3',
  backgroundColor: '#F8F8F8',
  backgroundColorCard: '#FFFFFF',
  backgroundColorClear: '#f8f8f8',
  textTitleColor: '#333333',
  textSubColor: '#969696',
  borderColor: '#E7E7E7',
  filterColor: 'rgba(252, 252, 253, 0.7)',
  shadowColor: '#F8F9FA'
}

// Object.freeze() 冻结一个对象，使其不能再修改
Object.freeze(dark);
Object.freeze(light);

export const useStore = defineStore('main', {
  state: () => {
    return {
      // 是否防止滚动穿透
      overflow: false,

      /**
       * time 为了触发getPageMetaStyle更新，否则主题不会及时改变
       */
      time: Date.now(),

      /**
       * 主题颜色配置
       */
      themeConfig: {
        theme: 'light' as 'dark' | 'light',
        dark: {
          navigationBarColor: '#ffffff',
          themeColor: '#D1403C',
          backgroundColor: '#0E0E0E',
          backgroundColorCard: '#151515',
          backgroundColorClear: '#212121',
          textTitleColor: '#ffffff',
          textSubColor: '#626262',
          borderColor: '#2A2A2A',
          filterColor: 'rgba(19, 19, 20, 0.7)',
          shadowColor: '#131313'
        },
        light: {
          navigationBarColor: '#000000',
          themeColor: '#f9343d',
          backgroundColor: '#F8F8F8',
          backgroundColorCard: '#FFFFFF',
          backgroundColorClear: '#f8f8f8',
          textTitleColor: '#333333',
          textSubColor: '#969696',
          borderColor: '#E7E7E7',
          filterColor: 'rgba(252, 252, 253, 0.7)',
          shadowColor: '#F8F9FA'
        }
      } as any
    }
  },
  getters: {
    getPageMetaStyle(): string {
      const systemInfo = uni.getSystemInfoSync();
      // 获取系统状态栏高度
      const statusBarHeight = systemInfo.statusBarHeight === 0 ? 10 : systemInfo.statusBarHeight;
      const volume = `--status-bar-height: ${statusBarHeight}px;`;

      const overflow: string = this.overflow ? 'overflow: hidden;' : 'overflow: visible;';

      const curTheme: any = this.themeConfig[this.themeConfig.theme];
      const themeColor: string = `--theme-background-color-clear: ${curTheme.backgroundColorClear}; background-color: ${curTheme.backgroundColor}; --theme-shadow-color: ${curTheme.shadowColor}; --theme-filter-color: ${curTheme.filterColor}; --theme-color: ${curTheme.themeColor}; --theme-background-color: ${curTheme.backgroundColor}; --theme-background-color-card: ${curTheme.backgroundColorCard}; --theme-text-title-color: ${curTheme.textTitleColor}; --theme-text-sub-color: ${curTheme.textSubColor}; --theme-border-color: ${curTheme.borderColor};`
      
      return `--update-time: ${this.time};` + overflow + volume + themeColor;
    },
    getCurTheme(): Theme {
      return this.themeConfig[this.themeConfig.theme];
    },
  },
  actions: {
    /**
     * @param theme raw表示主题不变，但是重新执行以下setTabBarStyle、setBackgroundColor....
     * @param options 
     */
    setTheme(theme: 'dark' | 'light' | 'raw', options?: Theme | Object): void {
      this.time = Date.now();
      if(theme !== 'raw') {
        this.themeConfig.theme = theme;
        uni.setStorageSync('theme', theme);
      }

      if(!!options) {
        // 将所有可枚举的自有属性从一个或多个源对象复制到目标对象，返回修改后的对象
        Object.assign(this.themeConfig[this.themeConfig.theme], options);
      } else {
        this.themeConfig.dark = Object.assign({}, dark);
        this.themeConfig.light = Object.assign({}, light);
      }
      const mergeOptions = this.getCurTheme;

      if(typeof uni.setTabBarStyle === 'function') {
        uni.setTabBarStyle({
          color: mergeOptions.textSubColor,
          selectedColor: mergeOptions.themeColor,
          backgroundColor: mergeOptions.backgroundColorCard,
          fail: () => {}
        })
      }
      if (typeof uni.setBackgroundColor === 'function') {
        uni.setBackgroundColor({
          backgroundColor: mergeOptions.backgroundColor,
          backgroundColorTop: mergeOptions.backgroundColor,
          backgroundColorBottom: mergeOptions.backgroundColor,
          fail: () => {}
        })
      }

      if (typeof uni.setNavigationBarColor === 'function') {
        uni.setNavigationBarColor({
          frontColor: mergeOptions.navigationBarColor,
          backgroundColor: '#fff',
          fail: () => {}
        })
      }
    },

    setPageMetaOverflow(status: boolean) {
      this.overflow = status;
    }
  }
})