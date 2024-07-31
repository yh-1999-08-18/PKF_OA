import React, { useCallback, useEffect, useState } from "react";
import { View } from "@tarojs/components";
import OptInput from "../../../components/inputComponent/OPTinput";
import "./index.scss";
import { getCurrentInstance } from "@tarojs/runtime";

const Captcha = () => {
  const { router } = getCurrentInstance();
  const [mobil, setMobil] = useState("17719739059");
  const [fetchCodeText, setFetchCodeText] = useState("重新获取验证码");
  const getFetchCode = useCallback(() => {
    let num = 60;
    const timer = setInterval(() => {
      if (num === 0) {
        clearInterval(timer);
        setFetchCodeText("重新获取验证码");
        return;
      }
      setFetchCodeText(`${num}秒后重新获取`);
      num--;
    }, 1000);
  });
  useEffect(() => {
    if (router.params.mobil) {
      setMobil(
        router.params.mobil?.replace(/^(.{3})(?:\d+)(.{4})$/, "$1****$2")
      );
    }
  }, [router]);

  return (
    <View className="wrapper">
      <View className="top">
        <View className="placeTitle">输入验证码</View>
        <View className="subTitle">验证码已发送至手机</View>
        <View className="phoneNumber">{mobil}</View>
        <OptInput />
      </View>
      <View className="fetchCode" onClick={getFetchCode}>
        {fetchCodeText}
      </View>
    </View>
  );
};

export default Captcha;
