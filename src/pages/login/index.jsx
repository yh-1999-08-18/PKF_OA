import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Button,
  RadioGroup,
  Radio,
  Text,
} from "@tarojs/components";
const icon = "https://post.pkfeng.net/assets/login/tel.png";
import Taro from "@tarojs/taro";
import "./index.scss";
import instance from "../../API/request";

const Login = () => {
  const [isAgree, setIsAgree] = useState(false);

  const handclick = (e) => {
    setIsAgree(!isAgree);
    console.log(isAgree);
  };

  const telLogin = (e) => {
    if (e.detail.code) {
      Taro.login({
        success: (res) => {
          const zvCode = res.code;
          instance
            .get("/Auth/getOpenId", { params: { code: zvCode } })
            .then((result) => {
              const openId = result.data.Token;
              Taro.setStorageSync("openId", openId);
              console.log(result);
              if (result.data.code === 200) {
                //获取手机号
                instance
                  .post("/Auth/getPhoneNumber", {
                    code: e.detail.code,
                  })
                  .then((res) => {
                    const data = res.data;
                    if (res.data.code === 200) {
                      Taro.setStorageSync("Zone", data.Zone);
                      Taro.setStorageSync("phoneNumber", data.phoneNumber);
                      Taro.setStorageSync("salerId", data.salerId);
                      Taro.setStorageSync("salerName", data.salerName);
                      Taro.switchTab({
                        url: "/pages/index/index",
                      });
                    } else {
                      Taro.showToast({
                        title: data.message,
                        duration: 3000,
                        icon: "none",
                      });
                    }
                  })
                  .catch((error) => {
                    Taro.showToast({
                      title: error,
                      duration: 3000,
                      icon: "none",
                    });
                    console.log(error);
                  });
              } else {
                Taro.showToast({
                  title: result.data.data.message,
                  duration: 3000,
                  icon: "none",
                });
              }
            })
            .catch((error) => {
              Taro.showToast({
                title: error,
                duration: 3000,
                icon: "none",
              });
              console.log(error);
            });
        },
      });
    } else {
      console.log(e);
      return false;
    }
  };
  const navgat = (path) => {
    Taro.navigateTo({
      url: `/pages/subpack/${path}/index`,
    });
  };
  useEffect(() => {
    if (Taro.getStorageSync("openId") && Taro.getStorageSync("phoneNumber")) {
      Taro.switchTab({
        url: "/pages/index/index",
      });
    }
  }, []);
  return (
    <View className="wrapper">
      <View className="top">
        <Image className="icon" src={icon}></Image>
        <View className="subTitle">登录发现更多精彩</View>
      </View>
      <View className="middle">
        <Button
          className="telLogin"
          openType={!isAgree ? "" : "getPhoneNumber|agreePrivacyAuthorization"}
          onGetPhoneNumber={telLogin}
          onClick={
            !isAgree
              ? () => {
                  Taro.showToast({
                    title: "请先阅读并同意隐私授权",
                    icon: "none",
                    duration: 3000,
                  });
                }
              : ""
          }
        >
          本机号码一键登录
        </Button>
        <Button className="auth" onClick={() => navgat("account")}>
          用户名密码登录
        </Button>
      </View>
      <View className="bottom">
        <RadioGroup
          style={{
            width: "50rpx",
            position: "absolute",
            top: "-4rpx",
            left: "-20rpx",
          }}
        >
          <Radio
            style={{ transform: "scale(0.7)" }}
            checked={isAgree}
            onClick={handclick}
            color="#19B56A"
          ></Radio>
        </RadioGroup>
        <Text className="ruler">
          登录即代表您已阅读并同意
          <Text className="rote" onClick={() => navgat("authentication")}>
            《认证服务条款》
          </Text>
          和
          <Text className="rote" onClick={() => navgat("useragreement")}>
            《用户协议》
          </Text>
          以及
          <Text className="rote" onClick={() => navgat("privacypolicy")}>
            《隐私政策》
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;
