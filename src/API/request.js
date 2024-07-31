import Taro from "@tarojs/taro";
import axiosAdapterUniApp from "axios-miniprogram-adapter";
import axios from "axios";

// 公共提示函数
const showErrorToast = (msg) => {
  Taro.showToast({
    title: msg,
    icon: "none",
  });
};
// 请求根路径（请根据实际情况修改）
const instance = axios.create({
  timeout: 10000,
  adapter: axiosAdapterUniApp,
  baseURL: "http://test.pkfeng.net/wxapi", //测试
  // baseURL: "http://192.168.0.129:5000/wxapi",
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // Taro.showLoading({
    //   title: "加载中",
    //   mask: true, // 使用蒙层
    // });
    let token = Taro.getStorageSync("openId");
    console.log(token, "token");
    if (typeof token === "undefined") {
      token = "";
    }
    config.headers = {
      "content-type": "application/json;charset=utf-8",
      AccessToken: token,
    };
    if (config.url === "/WePublic/GetQrcode") {
      console.log("二维码");
      config.baseURL = "https://post.pkfeng.net/wxapi";
    }
    // console.log(config, "config");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // Taro.hideLoading();
    if (response.data.isError) {
      showErrorToast(response.data.error.message);
    } else {
      return response;
    }
  },
  (error) => {
    if (error.response) {
      // Taro.hideLoading();
      console.log("err", error);
      let res = error.response.data;
      switch (res.code) {
        case 400:
          showErrorToast(res.message || "非法请求");
          break;
        case 401:
          showErrorToast("登录过期");
          // 可以尝试无感登陆或者跳转到登陆页
          break;
        case 403:
          showErrorToast(res.message || "非法请求");
          break;
        case 404:
          showErrorToast(res.message || "非法请求");
          break;
        case 500:
          console.log(res, "500");
        case 502:
          showErrorToast(res.message || "服务器开小差啦");
          break;
        default:
          showErrorToast(res.message || res.statusText);
      }
    } else {
      console.log(error);
      showErrorToast("请检查网络连接状态");
    }
    return Promise.reject(error);
  }
);

export default instance;
