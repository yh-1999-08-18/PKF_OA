import React, { useEffect, useState } from "react";
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
import "./index.scss";

const PhoneLogin = () => {
  const [isAgree, setIsAgree] = useState(false);
  const [phone, setPhone] = useState(null);
  const [isMobil, setIsMobil] = useState(true);
  const handclick = (e) => {
    setIsAgree(!isAgree);
  };
  useEffect(() => {
    if (isAgree && verify(phone)) {
      setIsMobil(false);
    } else {
      setIsMobil(true);
    }
  }, [isAgree, phone]);
  const verify = (mobil) => {
    const phoneVerify =
      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (!phoneVerify.test(mobil)) {
      return false;
    } else {
      return true;
    }
  };
  const telLogin = () => {
    if (!verify(phone)) {
      Taro.showToast({
        title: "请输入正确的手机号",
        duration: 3000,
        icon: "none",
      });
      return;
    }
    Taro.navigateTo({
      url: `/pages/subpack/captcha_login/index?mobil=${phone}`,
    });
  };
  const handPhone = (e) => {
    setPhone(e.detail.value);
  };
  const clearPhone = () => {
    setPhone("");
  };
  const navgat = (path) => {
    Taro.navigateTo({
      url: `/pages/subpack/${path}/index`,
    });
  };

  return (
    <View className="wrapper">
      <View className="top">
        <View className="title">欢迎登录金融小程序</View>
        <View className="subTitle">未注册的手机号验证后将自动创建新账号</View>
        <View className="telInp">
          <Input
            maxlength={11}
            type="number"
            value={phone}
            onInput={handPhone}
            placeholder="请输入手机号"
          />
          <Image onClick={clearPhone} className="clear" src={clear}></Image>
        </View>
      </View>
      <View className="middle">
        <Button
          className="codeBtn"
          type="primary"
          onClick={telLogin}
          style={{ backgroundColor: isMobil ? "rgba(25,181,106,0.4)" : "" }}
        >
          获取验证码
        </Button>
        <View className="toggle" onClick={() => navgat("account")}>
          账号密码登录
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
