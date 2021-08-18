/**
 * 获取浏览器语言
 */
export function getBowserLanguage(): any {
  return navigator.languages ? navigator.languages[0] : navigator.language;
}
