/**
 * @description: request method
 */
export enum RequestType {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
  TRACE = "TRACE",
  CONNECT = "CONNECT",
}

/**
 * @description:  contentTyp
 */
export enum ContentType {
  // json GET 请求格式
  JSON = "application/json;charset=UTF-8",
  // form-data qs post请求格式
  FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
  // form-data  upload
  FORM_DATA = "multipart/form-data;charset=UTF-8",
}
