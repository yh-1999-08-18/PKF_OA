import React from "react";
import { View, Image, Text } from "@tarojs/components";
import Navigator from "../../../components/navigationTap";
const boy = "https://post.pkfeng.net/assets/repair/boy.png";
const girl = "https://post.pkfeng.net/assets/repair/girl.png";
import "./index.scss";
const RepairDetail = () => {
  return (
    <View className="wrapper">
      <Navigator title={"详情"} />
      <View className="listContent">
        <View className="tabContent" style={{ position: "relative" }}>
          <View className="listwrap">
            <View className="listItem">
              <View className="top">
                <View className="left">
                  <View className="icons"></View>
                  <View className="title">焦辉平的日报计划 </View>
                  <View className="plan">计划</View>
                </View>
              </View>
              <View className="formItem">
                <View className="left">
                  <View className="topText">67.30w</View>
                  <View className="bottomText">今日放款额</View>
                </View>
                <View className="right">
                  <View className="info">
                    <View className="num">7</View>
                    <View className="label">今日进件</View>
                  </View>
                  <View className="info">
                    <View className="num">4</View>
                    <View className="label">今日通过</View>
                  </View>
                  <View className="info">
                    <View className="num">2</View>
                    <View className="label">今日面签</View>
                  </View>
                  <View className="info">
                    <View className="num">3</View>
                    <View className="label">今日放款</View>
                  </View>
                </View>
              </View>
              <View className="subtitle">今日计划</View>
              <View className="planContent">
                1.拜访客户（与赵总拜访店内高总，针对基础政策的调整，其店内与我行长期合作的意向较高，目前夏总与高总需要在商量后给出答复是否调整；
                2.收集贷后/经销商入网资料：尽快抵押3月产权证； 3.驻店：凯迪拉克
              </View>
              <View className="item">
                <View className="label">需要支持</View>
                <View className="text">暂无</View>
              </View>
              <View className="item">
                <View className="label">发送给</View>
                <View className="head">
                  <Image src={girl}></Image>
                  <View className="name">糖糖</View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RepairDetail;
