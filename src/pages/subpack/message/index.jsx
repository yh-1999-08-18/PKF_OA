import React from "react";
import { View, Text, Image } from "@tarojs/components";
import "./index.scss";
import Navigator from "../../../components/navigationTap";
const mess = "https://post.pkfeng.net/assets/postalsavings/message.png";
const brll = "https://post.pkfeng.net/assets/postalsavings/bell.png";
const letter = "https://post.pkfeng.net/assets/postalsavings/letter.png";
import Taro from "@tarojs/taro";
const Message = () => {
  const navTo = (path) => {
    if (path === "postalListDetail") {
      Taro.navigateTo({
        url: `/pages/subpack/${path}/index?type=已通过`,
      });
    }
    if (path === "rebatelistdetail") {
      Taro.navigateTo({
        url: `/pages/subpack/${path}/index?type=已转款`,
      });
    }
    Taro.navigateTo({
      url: `/pages/subpack/${path}/index`,
    });
  };
  return (
    <View className="wrapper">
      <Navigator title={"消息通知"} bgColor="none" position="absolute" />
      <View className="top"></View>
      <View className="messageContent">
        <View className="item" onClick={() => navTo("postalListDetail")}>
          <View className="left">
            <Image src={letter} />
          </View>
          <View className="right">
            <View className="title">
              <View className="label">台账状态</View>
              <View className="time">04-27 10:18</View>
            </View>
            <View className="content">
              <Text style={{ color: "#00331A", marginRight: "10rpx" }}>
                [邮储台账]
              </Text>
              您的邮储订单已通过审核
            </View>
          </View>
        </View>
        <View className="item" onClick={() => navTo("askForLeaveDetail")}>
          <View className="left">
            <Image src={brll} />
          </View>
          <View className="right">
            <View className="title">
              <View className="label">审批状态</View>
              <View className="time">04-29 16:30</View>
            </View>
            <View className="content">
              <Text style={{ color: "#00331A", marginRight: "10rpx" }}>
                [OA审批]
              </Text>
              您的请假申请已通过
            </View>
          </View>
        </View>
        <View className="item" onClick={() => navTo("rebatelistdetail")}>
          <View className="left">
            <Image src={mess} />
          </View>
          <View className="right">
            <View className="title">
              <View className="label">返利状态</View>
              <View className="time">05-03 18:05</View>
            </View>
            <View className="content">
              <Text style={{ color: "#00331A", marginRight: "10rpx" }}>
                [返利申请]
              </Text>
              您的返利订单已转款
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Message;
