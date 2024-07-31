import Taro from "@tarojs/taro";
/**
 * 格式化金额
 * @param value
 */
export const formatNumber = (value) => {
  // 判断是否为整数
  if (Number.isInteger(value)) {
    // 整数则添加".00"
    return `${value}.00`;
  } else {
    // 小数则使用toFixed保留两位小数
    return (value * 1).toFixed(2);
  }
};

/**
 * 去除对象空值
 * @param obj
 */
export const removeProperty = (obj) => {
  Object.keys(obj).forEach((item) => {
    if (
      obj[item] === "" ||
      obj[item] === undefined ||
      obj[item] === null ||
      obj[item] === "null"
    )
      delete obj[item];
  });
  return obj;
};
/**
 * @身份证号掩码
 */
export const maskMiddleDigits = (idCard) => {
  if (idCard && idCard.length >= 11) {
    const prefix = idCard.substring(0, 7); // 获取前6位
    const suffix = idCard.substring(12); // 获取后4位
    const masked = "*".repeat(5); // 中间五位转换为星号
    return `${prefix}${masked}${suffix}`;
  }
  return idCard; // 如果身份证号无效或太短，直接返回原字符串
};
/**
 * @文本区域复制到剪切板
 */
export const copyTextToClipboardX = (data) => {
  Taro.setClipboardData({
    data: data,
    success: function () {
      // Taro.showToast({
      //   title: "复制成功",
      //   icon: "success",
      //   duration: 2000,
      // });
    },
    fail: function () {
      // Taro.showToast({
      //   title: "复制失败，请重试",
      //   icon: "none",
      //   duration: 2000,
      // });
    },
  });
};
export const copyTextToClipboard = (event) => {
  console.log(event);
  event.stopPropagation();
  Taro.setClipboardData({
    data: event.currentTarget.dataset.text,
    success: function () {
      Taro.showToast({
        title: "复制成功",
        icon: "success",
        duration: 2000,
      });
    },
    fail: function () {
      Taro.showToast({
        title: "复制失败，请重试",
        icon: "none",
        duration: 2000,
      });
    },
  });
};
/**
 * @文本联系方式快捷拨打
 */
export const callPhone = (event) => {
  console.log(event);
  event.stopPropagation();
  Taro.makePhoneCall({
    phoneNumber: event.currentTarget.dataset.mobile, // 需要拨打的电话号码
    success: function () {
      console.log("拨打电话成功");
    },
    fail: function (err) {
      console.log("拨打电话失败", err);
    },
  });
};
/**
 * @对象数组去重
 */
export const objectArrayDeduplication = (arr, uniId) => {
  const res = new Map();
  return arr.filter((item) => !res.has(item[uniId]) && res.set(item[uniId], 1));
};
/**
 * 时间戳转换为格式化的字符串
 * @param timestamp 时间戳
 * @param formatString 格式化格式
 * @returns {*}
 */
export const formatTimestampToString = (timestamp, formatString) => {
  let type = typeof timestamp;
  let times;
  let formatTimes;
  if (type === "string") {
    times = new Date(timestamp);
  } else if (type === "object" && timestamp instanceof Date) {
    times = timestamp;
  } else {
    times = new Date();
  }
  let year = times.getFullYear();
  let month = times.getMonth() + 1;
  let date = times.getDate();
  let hour = times.getHours();
  let minute = times.getMinutes();
  let second = times.getSeconds();
  if (month < 10) month = "0" + month;
  if (date < 10) date = "0" + date;
  if (hour < 10) hour = "0" + hour;
  if (minute < 10) minute = "0" + minute;
  if (second < 10) second = "0" + second;
  if (formatString === "yyyy-mm-dd") {
    formatTimes = `${year}-${month}-${date}`;
  } else if (formatString === "yyyy-mm-dd hh:mm:ss") {
    formatTimes = `${year}-${month}-${date} ${hour}:${minute}:${second}`;
  } else if (formatString === "yyyy-mm-dd hh:mm") {
    formatTimes = `${year}-${month}-${date} ${hour}:${minute}`;
  } else {
    formatTimes = `${year}-${month}-${date} ${hour}:${minute}:${second}`;
  }
  return formatTimes;
};
/**
 * 身份证号码校验
 * @param idCard 身份证号码
 * @returns {*}
 */
export const validateIdCard = (idCard) => {
  // 身份证号码长度为 18 位
  if (idCard.length !== 18) {
    return false;
  }

  // 前 17 位只能是数字
  const numPart = idCard.slice(0, 17);
  if (!/^\d+$/.test(numPart)) {
    return false;
  }

  // 第 18 位可以是数字或大写 X
  const lastChar = idCard.charAt(17);
  if (!/^\d|[X]$/.test(lastChar)) {
    return false;
  }

  // 校验码计算
  const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const parity = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
  let sum = 0;
  for (let i = 0; i < 17; i++) {
    sum += parseInt(idCard.charAt(i)) * factor[i];
  }
  const remainder = sum % 11;
  if (parity[remainder] !== lastChar.toUpperCase()) {
    return false;
  }

  return true;
};

/**
 * 验证给定的手机号码是否有效
 *
 * @param {string} mobile - 要验证的手机号码字符串
 * @return {boolean} 如果手机号码有效则返回 true，否则返回 false
 */
export const validateMobile = (mobile) => {
  // 手机号码正则表达式
  const reg = /^1[3-9]\d{9}$/;
  return reg.test(mobile);
};
/**
 * 检查给定的值是否为空
 *
 * @param value 要检查的任何值
 * @return 如果值为空（未定义、为空或空字符串），则返回 true，否则返回 false
 */
export const isEmpty = (value) => {
  return (
    typeof value === "undefined" ||
    value === null ||
    (typeof value === "tring" && value.trim() === "")
  );
};
