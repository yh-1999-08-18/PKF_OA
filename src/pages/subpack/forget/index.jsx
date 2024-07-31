import React, { useEffect, useState } from "react";
import { View, Image, Button, Input, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
const clear = "https://post.pkfeng.net/assets/login/clear.png";
const show = "https://post.pkfeng.net/assets/login/show.png";
const hide = "https://post.pkfeng.net/assets/login/hide.png";
import "./index.scss";

const Forget = () => {
  const [mobile, setMobile] = useState(null);
  const [code, setCode] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [isShowPassWord, setIsShowPassWord] = useState(true);
  const [isShowConfirm, setIsShowConfirm] = useState(true);
  const [fetchCodeText, setFetchCodeText] = useState("获取验证码");
  const [verify, setVerify] = useState(true);

  const showPassWord = () => {
    setIsShowPassWord(!isShowPassWord);
  };
  const fetchCode = () => {
    let num = 10;
    const timer = setInterval(() => {
      if (num === 0) {
        clearInterval(timer);
        setFetchCodeText("获取验证码");
        return;
      }
      setFetchCodeText(`${num}秒后重新获取`);
      num--;
    }, 1000);
  };
  useEffect(() => {
    if (mobile && code && password && confirmPassword) {
      setVerify(false);
    } else {
      setVerify(true);
    }
  }, [mobile, code, password, confirmPassword]);
  const codeLogin = () => {
    if (!verify) {
      Taro.switchTab({
        url: "/pages/index/index",
      });
    }
  };
  return (
    <View className="wrapper">
      <View className="middle">
        <View className="telInp">
          <Input
            type="number"
            maxlength={11}
            value={mobile}
            placeholder="输入手机号"
            placeholder-style="color:#b7b7b7;"
            onInput={(e) => setMobile(e.detail.value)}
          />
          <Image
            onClick={() => setMobile("")}
            className="clears"
            src={clear}
          ></Image>
        </View>
        <View className="telInp">
          <Input
            value={code}
            type="number"
            placeholder="输入验证码"
            placeholder-style="color:#b7b7b7;"
            onInput={(e) => setCode(e.detail.value)}
          />
          <Text className="fetchCode" onClick={fetchCode}>
            {fetchCodeText}
          </Text>
        </View>
        <View className="telInp">
          <Input
            password={isShowPassWord}
            value={password}
            onInput={(e) => setPassword(e.detail.value)}
            placeholder="输入新密码"
            placeholder-style="color:#b7b7b7;"
          />
          <Image
            onClick={() => setPassword("")}
            className="clear"
            src={clear}
          ></Image>
          <Image
            onClick={showPassWord}
            className="eye"
            src={isShowPassWord ? show : hide}
          ></Image>
        </View>
        <View className="telInp">
          <Input
            password={isShowConfirm}
            value={confirmPassword}
            onInput={(e) => setConfirmPassword(e.detail.value)}
            placeholder="确认新密码"
            placeholder-style="color:#b7b7b7;"
          />
          <Image
            onClick={() => setConfirmPassword("")}
            className="clear"
            src={clear}
          ></Image>
          <Image
            onClick={() => setIsShowConfirm(!isShowConfirm)}
            className="eye"
            src={isShowConfirm ? show : hide}
          ></Image>
        </View>
        <Button
          disabled={verify}
          style={{ backgroundColor: verify ? "rgba(25,181,106,0.4)" : "" }}
          className="codeBtn"
          type="primary"
          onClick={codeLogin}
        >
          确认并登录
        </Button>
      </View>
    </View>
  );
};

export default Forget;
