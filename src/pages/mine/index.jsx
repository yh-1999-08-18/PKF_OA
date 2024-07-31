import React from "react";
import { View, Image } from "@tarojs/components";
const avatar = "https://post.pkfeng.net/assets/home/avatar.png";
const aboutUs = "https://post.pkfeng.net/assets/home/aboutUs.png";
const enterIcon = "https://post.pkfeng.net/assets/home/enterIcon.png";
const opinionIcon = "https://post.pkfeng.net/assets/home/opinionIcon.png";
const quit = "https://post.pkfeng.net/assets/home/quit.png";
const reviseIcon = "https://post.pkfeng.net/assets/home/reviseIcon.png";
import "./index.scss";
import Taro from "@tarojs/taro";
const Mine = () => {
  const tabList = [
    {
      icon: reviseIcon,
      text: "修改密码",
      path: "forget",
    },
    {
      icon: opinionIcon,
      text: "意见反馈",
      path: "",
    },
    {
      icon: aboutUs,
      text: "关于我们",
      path: "",
    },
    {
      icon: quit,
      text: "退出登录",
      path: "login",
    },
  ];
  const navigate = (path) => {
    if (path === "login") {
      Taro.removeStorageSync("openId");
      Taro.removeStorageSync("Zone");
      Taro.removeStorageSync("phoneNumber");
      Taro.removeStorageSync("salerId");
      Taro.removeStorageSync("salerName");
      Taro.switchTab({
        url: "/pages/index/index",
      });
      Taro.navigateTo({
        url: `/pages/${path}/index`,
      });
    } else {
      Taro.navigateTo({
        url: `/pages/subpack/${path}/index`,
      });
    }
  };
  return (
    <View className="wrapper">
      <View className="top">
        <View className="head">
          <View className="left">
            <Image src={avatar}></Image>
          </View>
          <View className="right">
            {Taro.getStorageSync("openId") ? (
              <View className="name">{Taro.getStorageSync("salerName")}</View>
            ) : (
              <View className="name" onClick={() => navigate("login")}>
                登录/注册
              </View>
            )}
            <View className="department">
              {/* <View>销售部</View>
              <View className="partition"> | </View>
              <View>城市经理</View> */}
              {Taro.getStorageSync("openId") ? (
                <View>{Taro.getStorageSync("Zone")}</View>
              ) : (
                <View>点击登录，查看更多功能</View>
              )}
            </View>
          </View>
        </View>
      </View>
      <View className="middle">
        {tabList &&
          tabList.map((item) => {
            return (
              <View className="itemTab" onClick={() => navigate(item.path)}>
                <View className="left">
                  <Image src={item.icon}></Image>
                  <View className="text">{item.text}</View>
                </View>
                <View className="right">
                  <Image src={enterIcon}></Image>
                </View>
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default Mine;
