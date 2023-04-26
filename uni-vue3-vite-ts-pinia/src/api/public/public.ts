/*
 * @Description: 
 * @Author: vivi
 * @Date: 2023-04-04 10:26:40
 * @LastEditTime: 2023-04-04 10:37:53
 */
import { defRequest } from "@/utils/network";
import type { BaseParams } from "./public.model";
enum Api {
  // 公告
  NOTICE = "/backstage/applets/notice/queryDgNoticeByStatus",

}

export const getNotice = (data: BaseParams, mode: ErrorMessageMode= "toast") => 
  defRequest.get({url: Api.NOTICE, data}, { errorMessageMode: mode, ident: false })