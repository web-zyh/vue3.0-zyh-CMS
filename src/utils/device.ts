/**
 * 设备类型
 */
export const DEVICES = {
  /**
   * 桌面
   */
  DESKTOP: "pc",
  PC: "pc",
  /**
   * 平板
   */
  TABLET: "tablet",
  /**
   * 移动端/手机
   */
  MOBILE: "mobile",
};

/**
 * 根据媒体查询获取当前匹配的设备类型
 */
export function getDevice(): any {
  const tablet = "(min-width: 768px) and (max-width: 1024px)";
  const mobile = "(max-width: 767px)";

  if (window.matchMedia(mobile).matches) {
    return DEVICES.MOBILE;
  } else if (window.matchMedia(tablet).matches) {
    return DEVICES.TABLET;
  }

  return DEVICES.PC;
}

export const deviceFilter = (): any => {
  const ua = navigator.userAgent,
    isWindowsPhone = /(?:Windows Phone)/.test(ua),
    isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
    isAndroid = /(?:Android)/.test(ua),
    isFireFox = /(?:Firefox)/.test(ua),
    isTablet =
      /(?:iPad|PlayBook)/.test(ua) ||
      (isAndroid && !/(?:Mobile)/.test(ua)) ||
      (isFireFox && /(?:Tablet)/.test(ua)),
    isWeChat = /(?:MicroMessenger)/.test(ua),
    isiPhone = /(?:iPhone)/.test(ua) && !isTablet,
    isPc = !isiPhone && !isAndroid && !isSymbian && !isTablet,
    isMobile = !isPc;
  return {
    isTablet,
    isIphone: isiPhone,
    isAndroid,
    isPc,
    isMobile,
    /**
     * 是微信
     */
    isWeChat,
  };
};

export default getDevice;
