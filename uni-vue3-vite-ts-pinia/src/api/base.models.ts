/*
 * @Description: 
 * @Author: vivi
 * @Date: 2023-04-03 15:42:33
 * @LastEditTime: 2023-04-03 16:03:31
 */
export interface BasicPageParams {
  pageNum: number;
  pageSize: number;
}
export interface BasicFetchResult<T> {
  payload: T[];
  totalCount?: number;
  message: string;
  code: number;
}
