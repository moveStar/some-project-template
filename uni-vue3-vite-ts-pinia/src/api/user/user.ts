/*
 * @Description: 
 * @Author: vivi
 * @Date: 2023-04-03 16:04:12
 * @LastEditTime: 2023-04-26 10:00:34
 */
import { defRequest } from "@/utils/network/index";
import type { LoginParams, LoginResult, SmsLoginParams } from "./user.model";

enum Api {
  // 登录 
  LOGIN = '/login',
  // 刷新token
  REFRESH_TOKEN= '/refresh/token',
  // 获取手机短信
  CAPTCHA = "/getCaptcha",
  // 校验验证码
  GET_VERIFY_CODE= "/getVerifyCode",
  // 验证码登录
  LOGIN_BY_CODE = "/loginByCode",
  // 注册
  REGISTER = "/register",
  // 微信小程序登录V2
  WECHAT = "/wechat",
  // 退出
  LOGOUT = "logout",
}

export const login = (data: LoginParams, mode: ErrorMessageMode = "toast") => 
  defRequest.post<LoginResult>({ url: Api.LOGIN, data }, { errorMessageMode: mode, ident: false });

export const loginByCode = (data: LoginParams, mode: ErrorMessageMode = "toast") =>
  defRequest.post<LoginResult>({ url: Api.LOGIN_BY_CODE, data }, { errorMessageMode: mode, ident: false });

export const getVerifyCode = (data: SmsLoginParams, mode: ErrorMessageMode = "toast") =>
  defRequest.post<LoginResult>({ url: Api.GET_VERIFY_CODE, data }, { errorMessageMode: mode, ident: false });

export const refreshToken = (data: { token: string }, mode: ErrorMessageMode = "toast") =>
defRequest.post({ url: Api.CAPTCHA, data }, { errorMessageMode: mode, ident: false });

export const getCaptcha = (data: { phone: number }, mode: ErrorMessageMode = "toast") =>
  defRequest.post({ url: Api.CAPTCHA, data }, { errorMessageMode: mode, ident: false });

export const wechatLogin = (data: LoginParams, mode: ErrorMessageMode = "toast") =>
  defRequest.post<LoginResult>({ url: Api.WECHAT, data }, { errorMessageMode: mode, ident: false });

export const logout = (data: {}, mode: ErrorMessageMode = "toast") =>
  defRequest.post({ url: Api.LOGOUT, data }, { errorMessageMode: mode, ident: false });

export const register = (data: {}, mode: ErrorMessageMode = "toast") =>
  defRequest.post({ url: Api.REGISTER, data }, { errorMessageMode: mode, ident: false });