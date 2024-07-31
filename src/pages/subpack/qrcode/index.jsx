import React, { useEffect, useState } from "react";
import { View, Image, Input, Text, Canvas } from "@tarojs/components";
import Navigator from "../../../components/navigationTap";
import "./index.scss";
import { validateMobile } from "../../../until/untils";
import instance from "../../../API/request";
import Taro from "@tarojs/taro";
const not_bg = "https://post.pkfeng.net/assets/home/not-bg.png";
const show_code = "https://post.pkfeng.net/assets/home/showCode-bg.png";
const first = "https://post.pkfeng.net/assets/home/one.png";
const second = "https://post.pkfeng.net/assets/home/two.png";
const logo = "https://post.pkfeng.net/assets/postalsavings/logo.png";
import drawQrcode from "weapp-qrcode";
import { getCurrentInstance } from "@tarojs/runtime";

const Rebate = () => {
  const { router } = getCurrentInstance();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState(false);
  const [codeData, setCodeData] = useState("");

  const createQrCode = () => {
    if (!validateMobile(phone)) {
      Taro.showToast({
        title: "请输入正确的手机号",
        icon: "none",
        duration: 2000,
      });
    } else {
      instance
        .post("/WePublic/GetQrcode", {
          custTel: phone,
          salerId: Taro.getStorageSync("salerId"),
        })
        .then((res) => {
          console.log(res);
          if (res.data) {
            setCode(true);
            setCodeData(res.data);
            drawQrcode({
              width: 260,
              height: 260,
              canvasId: "myQrcode",
              text: res.data,
              foreground: "#011e45",
            });
          }
        })
        .catch((err) => {
          Taro.showToast({
            title: err,
            icon: "none",
            duration: 2000,
          });
        });
    }
  };
  useEffect(() => {
    console.log(router);
    if (router.params.phone) {
      setPhone(router.params.phone);
    }
  }, [router]);
  useEffect(() => {
    console.log(phone);
    if (phone !== "" && validateMobile(phone)) {
      createQrCode();
    }
  }, [phone]);
  return (
    <View className="wrapper">
      <Navigator bgColor={"#19B56A"} isWhite={true} title={"扫码关注公众号"} />
      <View className="title">扫二维码关注公众号</View>
      <View
        className="contenter"
        style={{
          backgroundImage: code ? `url(${show_code})` : `url(${not_bg})`,
        }}
      >
        <View className="phone">
          <View className="formItem">
            <View className="label">
              <Text className="requerd">*</Text>输入手机号
            </View>
            <Input
              className="inp"
              placeholder="请输入手机号"
              placeholderClass="inp-placeholder"
              type="number"
              value={phone}
              onInput={(e) => {
                const num = Number(e.target.value);
                console.log(num);
                if (
                  (isFinite(num) && num.toString() === e.target.value) ||
                  (isFinite(num) && num.toString() === "0")
                ) {
                  setPhone(e.target.value);
                }
              }}
            />
          </View>
          <View className="formBtn" onClick={createQrCode}>
            生成二维码
          </View>
        </View>
        {!code && (
          <View className="steerText">
            <View className="first">
              <Image src={first}></Image>
              <View className="text">输入客户手机号， 点击生成二维码。</View>
            </View>
            <View className="second">
              <Image src={second}></Image>
              <View className="text">扫描生成后的二维码，即可关注公众号。</View>
            </View>
          </View>
        )}
        {code && (
          <>
            <Canvas
              style={{ width: "520rpx", height: "520rpx", margin: "100rpx" }}
              canvasId="myQrcode"
              id="myQrcode"
            ></Canvas>
            <View className="tolstText">扫码关注小派车主服务公众号</View>
          </>
        )}
      </View>
    </View>
  );
};

export default Rebate;
