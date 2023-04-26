/*
 * @Description: 
 * @Author: vivi
 * @Date: 2023-03-27 17:39:56
 * @LastEditTime: 2023-04-26 10:21:18
 */
import { defineStore } from 'pinia'
// import moment from 'moment';

type UserInfo = {
  // 等级
  level: number,
  // 用户名
  userName: number,
  // 手机号
  phone: number
}

export const useStore = defineStore('user', {
  state: () => {
    return {
      userId: 0,
    }
  },
  getters: {
    
  },
  actions: {
    // 保存用户信息
    setUserInfo(data: any) {
      Object.assign(this, data);
    },

    // 获取账户信息（登录）
    async getUserAccount(): Promise<any> {
      // const res = await 
    }
  }
})
