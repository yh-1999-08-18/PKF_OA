import React, { useEffect, useState } from "react";
import { View, Image, Input, Picker, Textarea, Text } from "@tarojs/components";
import Navigator from "../../../components/navigationTap";
const down = "https://post.pkfeng.net/assets/home/dropDown.png";
const boy = "https://post.pkfeng.net/assets/repair/boy.png";
const girl = "https://post.pkfeng.net/assets/repair/girl.png";
const addIcon = "https://post.pkfeng.net/assets/repair/addIcon.png";
const addBtn = "https://post.pkfeng.net/assets/repair/addBtn.png";
import { AtTabs, AtTabsPane } from "taro-ui";
import Taro from "@tarojs/taro";
import "./index.scss";

const Repair = () => {
  const [tabCurrent, setTabCurrent] = useState(0);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const tabList = [{ title: "我的日报" }, { title: "团队日报" }];
  const handleClick = (value) => {
    setTabCurrent(value);
  };
  const dateHandle = (e) => {
    setDate(e.detail.value);
  };
  const timeHandle = (e) => {
    setTime(e.detail.value);
  };
  const goInfo = () => {
    Taro.navigateTo({
      url: "/pages/subpack/dailyDetail/index",
    });
  };
  return (
    <View className="wrapper">
      <Navigator title={"日报"} />
      <View className="listContent">
        <AtTabs current={tabCurrent} tabList={tabList} onClick={handleClick}>
          <AtTabsPane current={tabCurrent} index={0}>
            <View className="tabContent" style={{ minHeight: "1364rpx" }}>
              <View className="item" onClick={goInfo}>
                <View className="title">
                  <View className="left">
                    <View className="plan">计划</View>
                    <View className="text">我的日报</View>
                  </View>
                  <View className="right">2024-01-30</View>
                </View>
                <View className="content">
                  <View className="top">
                    <View className="info">
                      <View className="label">今日进件</View>
                      <View className="num">2</View>
                    </View>
                    <View className="info">
                      <View className="label">今日通过</View>
                      <View className="num">1</View>
                    </View>
                    <View className="info">
                      <View className="label">预约面签</View>
                      <View className="num">5</View>
                    </View>
                  </View>
                  <View className="bottom">
                    <View className="info">
                      <View className="label">今日计划放款额</View>
                      <View className="num">400000.00元</View>
                    </View>
                  </View>
                </View>
              </View>
              <View className="item" onClick={goInfo}>
                <View className="title">
                  <View className="left">
                    <View className="summary">总结</View>
                    <View className="text">我的日报</View>
                  </View>
                  <View className="right">2024-01-30</View>
                </View>
                <View className="content">
                  <View className="top">
                    <View className="info">
                      <View className="label">今日进件</View>
                      <View className="num">2</View>
                    </View>
                    <View className="info">
                      <View className="label">今日通过</View>
                      <View className="num">1</View>
                    </View>
                    <View className="info">
                      <View className="label">预约面签</View>
                      <View className="num">5</View>
                    </View>
                  </View>
                  <View className="bottom">
                    <View className="info">
                      <View className="label">今日计划放款额</View>
                      <View className="num">400000.00元</View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </AtTabsPane>
          <AtTabsPane current={tabCurrent} index={1}>
            <View className="tabContent" style={{ minHeight: "1364rpx" }}>
              <View className="item" onClick={goInfo}>
                <View className="title">
                  <View className="left">
                    <View className="plan">计划</View>
                    <View className="text">团队日报</View>
                  </View>
                  <View className="right">2024-01-30</View>
                </View>
                <View className="content">
                  <View className="top">
                    <View className="info">
                      <View className="label">今日进件</View>
                      <View className="num">2</View>
                    </View>
                    <View className="info">
                      <View className="label">今日通过</View>
                      <View className="num">1</View>
                    </View>
                    <View className="info">
                      <View className="label">预约面签</View>
                      <View className="num">5</View>
                    </View>
                  </View>
                  <View className="bottom">
                    <View className="info">
                      <View className="label">今日计划放款额</View>
                      <View className="num">400000.00元</View>
                    </View>
                  </View>
                </View>
              </View>
              <View className="item" onClick={goInfo}>
                <View className="title">
                  <View className="left">
                    <View className="summary">总结</View>
                    <View className="text">团队日报</View>
                  </View>
                  <View className="right">2024-01-30</View>
                </View>
                <View className="content">
                  <View className="top">
                    <View className="info">
                      <View className="label">今日进件</View>
                      <View className="num">2</View>
                    </View>
                    <View className="info">
                      <View className="label">今日通过</View>
                      <View className="num">1</View>
                    </View>
                    <View className="info">
                      <View className="label">预约面签</View>
                      <View className="num">5</View>
                    </View>
                  </View>
                  <View className="bottom">
                    <View className="info">
                      <View className="label">今日计划放款额</View>
                      <View className="num">400000.00元</View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
    </View>
  );
};

export default Repair;
