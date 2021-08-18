/**
 * 检查是否是数字
 * 整数或小数
 *
 * @param {string|number} value
 */
export function isNumber(value: any): any {
  if (value === "" || value === null || isNaN(value)) {
    return false;
  }
  return !isNaN(+value);
}

/**
 * 邮箱校验
 * https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.js
 * @param {string} email 邮箱
 */
export const validateEmail = (email: string): any => {
  // eslint-disable-next-line max-len
  return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
    email
  );
};

/**
 * 手机号校验
 * @param {string} phone  手机号
 */
export const validatePhone = (phone: string): any => {
  // eslint-disable-next-line max-len
  return /^1[34578][0-9]{9}$/.test(phone);
};
