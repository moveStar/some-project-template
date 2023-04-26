/*
 * @Description: 
 * @Author: vivi
 * @Date: 2023-03-31 14:34:44
 * @LastEditTime: 2023-04-26 10:38:02
 */

import { getCache, removeCache, setCache } from "@/utils/cache";
import { defineStore } from "pinia";
import { TOKEN_KEY } from "@/enums/cacheEnum";
import { login, logout, getCaptcha, loginByCode, getVerifyCode, register, refreshToken } from "@/api/user/user";
import type { LoginModel, LoginParams, SmsLoginParams, SmsLoginModel, SmsLoginResult, RegisterParams, RegisterModel } from "@/api/user/user.model";

interface AuthStore {
  token?: string,

  phone: number,
  // 密码
  password: string,
  // 验证码
  code?: string,
  // 登录方式 code为验证码
  type: string
}

export const useStore = defineStore({
  id: 'auth',
  state: (): AuthStore => ({
    token: undefined,

    phone: 0,
    // 密码
    password: '',
    // 验证码
    code: '',
    // 登录方式 code为验证码
    type: ''
  }),
  getters: {
    getToken: state => state.token,
    isLogin: (state): boolean => !!state.token
  },
  actions: {
    initToken() {
      this.token = getCache<string>(TOKEN_KEY) || undefined;
    },
    setToken(token: string | undefined) {
      setCache(TOKEN_KEY, token);
      this.token = token;
    },

    /**
     * 登录
     * @param params 
     */
    async toLogin(params: LoginParams): Promise<LoginModel> {
      try {
        const { data } = await login(params);
        this.setToken(data.token);
        return Promise.resolve(data);
      } catch (err: any) {
        return Promise.reject(err?? { msg: 'request err' })
      }
    },

    /**
     * 手机获取验证码
     * @param params 
     */
    async getSendCode(params: SmsLoginParams): Promise<any> {
      try {
        uni.setStorageSync('codeLastTime', Date.now().toString())
        const res = await getCaptcha(params);
        return Promise.resolve(res)
      } catch(err: any) {
        return Promise.reject(err?? { msg: 'request error' })
      }
    },

    /**
     * 校验验证码
     * @param params 
     */
    async getVerifyCode(params: SmsLoginParams): Promise<any> {
      try {
        uni.setStorageSync('codeLastTime', Date.now().toString())
        const res = await getVerifyCode(params);
        return Promise.resolve(res)
      } catch(err: any) {
        return Promise.reject(err?? { msg: 'request error' })
      }
    },

    /**
     * 验证码登录
     * @param params 
     */
    async loginByCode(params: SmsLoginParams): Promise<any> {
      try {
        const res = await loginByCode(params);
        return Promise.resolve(res)
      } catch (err: any) {
        return Promise.reject(err?? { msg: 'request error' })
      }
    },

    /**
     * 注册
     * @param params 
     */
    async getRegister(params: RegisterParams): Promise<RegisterModel> {
      try {
        const { data } = await register(params);
        // this.setToken(data.token);
        return Promise.resolve(data);
      } catch (err: any) {
        return Promise.reject(err?? { msg: 'request err' })
      }
    },
    /**
     * loginout 
     */
    async loginOut(): Promise<any> {
      try {
        const res = await logout({});
        removeCache(TOKEN_KEY);
        this.setToken(undefined);
        return Promise.resolve(res);
      } catch (err: any) {
        return Promise.reject(err?? { msg: 'request error' })
      }
    },

    /**
     * refresh token
     */
    // async refreshToken(): Promise<LoginModel> {
    //   try {
    //     const { data } = await refreshToken();
    //     this.setToken(data.token);
    //     return Promise.resolve(data);
    //   } catch (err: any) {
    //     return Promise.reject(err?? { msg: 'request error' });
    //   }
    // }
  }
})