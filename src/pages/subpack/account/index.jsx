import React, { useState } from "react";
import {
  View,
  Image,
  Button,
  RadioGroup,
  Radio,
  Text,
  Input,
} from "@tarojs/components";
import Taro from "@tarojs/taro";
const clear = "https://post.pkfeng.net/assets/login/clear.png";
const show = "https://post.pkfeng.net/assets/login/show.png";
const hide = "https://post.pkfeng.net/assets/login/hide.png";
import "./index.scss";
import instance from "../../../API/request";

const PhoneLogin = () => {
  const [isAgree, setIsAgree] = useState(false);
  const [useName, setUseName] = useState("");
  const [password, setPassword] = useState(null);
  const [isShowPassWord, setIsShowPassWord] = useState(true);
  const handclick = () => {
    setIsAgree(!isAgree);
  };

  const telLogin = () => {
    const phoneVerify =
      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (!isAgree) {
      Taro.showToast({
        title: "请阅读并同意相关协议",
        duration: 3000,
        icon: "none",
      });
      return;
    }
    if (!phoneVerify.test(useName)) {
      Taro.showToast({
        title: "请输入正确的手机号",
        duration: 3000,
        icon: "none",
      });
      return;
    }
    if (password === null) {
      Taro.showToast({
        title: "请输入密码",
        duration: 3000,
        icon: "none",
      });
      return;
    }
    Taro.login({
      success: (res) => {
        const zvCode = res.code;
        instance
          .get("/Auth/getOpenId", { params: { code: zvCode } })
          .then((result) => {
            const openId = result.data.Token;
            Taro.setStorageSync("openId", openId);
            console.log(result);
            instance
              .post("/Auth/loginPhone", {
                phonenumber: useName,
                password: password,
              })
              .then((res) => {
                console.log(res);
                const data = res.data;
                if (data.code === 200) {
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
              .catch((err) => {
                console.log(err);
              });
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
  };
  const handPhone = (e) => {
    setPhone(e.detail.value);
  };

  const navgat = (path) => {
    Taro.navigateTo({
      url: `/pages/subpack/${path}/index`,
    });
  };
  const showPassWord = () => {
    setIsShowPassWord(!isShowPassWord);
  };

  return (
    <View className="wrapper">
      <View className="top"></View>
      <View className="middle">
        <View className="title">欢迎登录派克峰OA小程序</View>
        <View className="telInp">
          <Input
            value={useName}
            placeholder="手机号"
            placeholder-style="color:#b7b7b7;"
            onInput={(e) => setUseName(e.detail.value)}
          />
          {useName !== "" ? (
            <>
              {" "}
              <Image
                onClick={() => setUseName("")}
                className="clears"
                src={clear}
              ></Image>
            </>
          ) : (
            ""
          )}
        </View>
        <View className="telInp">
          <Input
            password={isShowPassWord}
            value={password}
            onInput={(e) => setPassword(e.detail.value)}
            placeholder="请输入密码"
            placeholder-style="color:#b7b7b7;"
          />
          <Image
            onClick={showPassWord}
            className="eye"
            src={isShowPassWord ? show : hide}
          ></Image>
        </View>
        <Button className="codeBtn" type="primary" onClick={telLogin}>
          登录
        </Button>
        <View className="toggle">
          {/* <View onClick={() => navgat("phonelogin")}>短信验证码登录</View> */}
          <View onClick={() => navgat("forget")}>忘记密码？</View>
        </View>
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

export default PhoneLogin;
