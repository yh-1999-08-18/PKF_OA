import React, { useState } from "react";
import { View, Image } from "@tarojs/components";
const address = "https://post.pkfeng.net/assets/home/address.png";
const Attendance = "https://post.pkfeng.net/assets/home/Attendance.png";
const carbonCopy = "https://post.pkfeng.net/assets/home/carbonCopy.png";
const card = "https://post.pkfeng.net/assets/home/card.png";
const goOut = "https://post.pkfeng.net/assets/home/goOut.png";
const Initiated = "https://post.pkfeng.net/assets/home/Initiated.png";
const leave = "https://post.pkfeng.net/assets/home/leave.png";
const moreBg = "https://post.pkfeng.net/assets/home/moreBg.png";
const Pending = "https://post.pkfeng.net/assets/home/Pending.png";
const plan = "https://post.pkfeng.net/assets/home/plan.png";
const Processed = "https://post.pkfeng.net/assets/home/Processed.png";
const signIn = "https://post.pkfeng.net/assets/home/signIn.png";
const trip = "https://post.pkfeng.net/assets/home/trip.png";
const policy = "https://post.pkfeng.net/assets/home/policy.png";
const target = "https://post.pkfeng.net/assets/home/target.png";
import { AtTabs, AtTabsPane } from "taro-ui";
import "./index.scss";
import Taro from "@tarojs/taro";

const Workbench = () => {
  const [tabCurrent, setTabCurrent] = useState(0);
  const tabList = [
    { title: "人事" },
    { title: "财务" },
    { title: "销售" },
    { title: "审批" },
  ];
  const approvalList = [
    {
      text: "已发起",
      icon: Initiated,
      path: "",
    },
    {
      text: "待处理",
      icon: Pending,
    },
    {
      text: "已处理",
      icon: Processed,
    },
    {
      text: "抄送我",
      icon: carbonCopy,
    },
  ];
  const workTabList = [
    {
      icon: address,
      text: "考勤",
      path: "attendance",
    },
    {
      icon: signIn,
      text: "签到",
      path: "signin",
    },
    {
      icon: leave,
      text: "请假",
      path: "askForLeave",
    },
    {
      icon: card,
      text: "补卡",
      path: "repair",
    },
    {
      icon: goOut,
      text: "外出",
      path: "out",
    },
    {
      icon: trip,
      text: "出差",
      path: "trip",
    },
    {
      icon: policy,
      text: "政策",
      path: "business",
    },
    {
      icon: target,
      text: "目标",
      path: "declaration",
    },
  ];
  const handleClick = (value) => {
    setTabCurrent(value);
  };
  const goNav = (path) => {
    Taro.navigateTo({
      url: `/pages/subpack/${path}/index`,
    });
  };
  return (
    <View className="wrapper">
      <View className="topBg"></View>
      <View className="title">快捷高效工作台</View>
      <View className="subTitle">FAST AND EDDICIENT OFFICE</View>
      <View className="contentTop">
        <View className="clock" onClick={() => goNav("attendance")}>
          <View className="clockLeft">
            <View className="leftTit">考勤打卡</View>
            <View className="leftSub">一键极速打卡</View>
          </View>
          <View className="clockRight">
            <Image src={Attendance} />
          </View>
        </View>
        <View className="daily" onClick={() => goNav("daily")}>
          <View className="clockLeft">
            <View className="leftTit">日报计划</View>
            <View className="leftSub">每日计划总结</View>
          </View>
          <View className="clockRight">
            <Image src={plan} />
          </View>
        </View>
      </View>
      <View className="approval">
        <View className="approvalTitle">
          <View className="text">全部审批</View>
          <View className="more" onClick={() => goNav("approvalList")}>
            查看更多
          </View>
          <Image src={moreBg} />
        </View>
        <View className="itemlist">
          {approvalList &&
            approvalList.map((item) => {
              return (
                <View className="item" onClick={() => goNav("approvalList")}>
                  <Image src={item.icon} />
                  <View className="text">{item.text}</View>
                </View>
              );
            })}
        </View>
      </View>
      <View className="workTab">
        <AtTabs current={tabCurrent} tabList={tabList} onClick={handleClick}>
          <AtTabsPane current={tabCurrent} index={0}>
            <View className="tabContent">
              {workTabList &&
                workTabList.map((item) => {
                  return (
                    <View className="tabItem" onClick={() => goNav(item.path)}>
                      <Image src={item.icon} />
                      <View className="tabText">{item.text}</View>
                    </View>
                  );
                })}
            </View>
          </AtTabsPane>
          <AtTabsPane current={tabCurrent} index={1}>
            <View className="tabContent">财务</View>
          </AtTabsPane>
          <AtTabsPane current={tabCurrent} index={2}>
            <View className="tabContent">销售</View>
          </AtTabsPane>
          <AtTabsPane current={tabCurrent} index={3}>
            <View className="tabContent">审批</View>
          </AtTabsPane>
        </AtTabs>
        <View className="prompt">
          <View className={tabCurrent === 0 ? "pointActive" : "point"}></View>
          <View className={tabCurrent === 1 ? "pointActive" : "point"}></View>
          <View className={tabCurrent === 2 ? "pointActive" : "point"}></View>
          <View className={tabCurrent === 3 ? "pointActive" : "point"}></View>
        </View>
      </View>
    </View>
  );
};

export default Workbench;
