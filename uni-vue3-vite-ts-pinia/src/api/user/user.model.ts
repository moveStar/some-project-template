/*
 * @Description: 
 * @Author: vivi
 * @Date: 2023-04-03 16:04:12
 * @LastEditTime: 2023-04-26 10:06:03
 */
export type SmsLoginResult = {
  token: string; //token
};
export interface LoginParams {
  // code: string; //微信code
  // appId: string; //小程序appId（小程序登录必填）
  phone: number,
  password?: string,
  code?: string
}

export interface LoginModel {
  token: string
}

export type LoginResult = SmsLoginResult & {
  openIdMd5: string; //openIdMd5-微信登录且微信openId未绑定
};

// 登录验证码
export interface SmsLoginParams {
  phone: number, // phonenumber
  code?: string,
  captcha?: string
}

export interface SmsLoginModel {
  imgUrl: string // base64
}


export interface RegisterParams {
  phone: number, 
  password: any, 
  nickname: string, 
  code: string
}

export interface RegisterModel {

}