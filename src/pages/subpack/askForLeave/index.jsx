import React, { useState } from "react";
import { View, Image, Input, Picker, Textarea } from "@tarojs/components";
import Navigator from "../../../components/navigationTap";
const down = "https://post.pkfeng.net/assets/home/dropDown.png";
const boy = "https://post.pkfeng.net/assets/repair/boy.png";
const girl = "https://post.pkfeng.net/assets/repair/girl.png";
const addIcon = "https://post.pkfeng.net/assets/repair/addIcon.png";
const addBtn = "https://post.pkfeng.net/assets/repair/addBtn.png";
import { AtTabs, AtTabsPane } from "taro-ui";
import Taro from "@tarojs/taro";
import "./index.scss";

const Leave = () => {
  const [tabCurrent, setTabCurrent] = useState(0);
  const [date, setDate] = useState(null);
  const [type, setType] = useState(null);
  const [time, setTime] = useState(null);
  const tabList = [{ title: "请假申请" }, { title: "请假记录" }];
  const typeList = [
    "事假",
    "病假",
    "调休",
    "年假",
    "产假",
    "陪产假",
    "婚假",
    "例假",
    "丧假",
    "哺乳假",
  ];
  const handleClick = (value) => {
    setTabCurrent(value);
  };
  const typeHandle = (e) => {
    setType(typeList[e.detail.value]);
  };
  const dateHandle = (e) => {
    setDate(e.detail.value);
  };
  const timeHandle = (e) => {
    setTime(e.detail.value);
  };
  const goInfo = () => {
    Taro.navigateTo({
      url: "/pages/subpack/askForLeaveDetail/index",
    });
  };
  return (
    <View className="wrapper">
      <Navigator title={"请假"} />
      <View className="listContent">
        <AtTabs current={tabCurrent} tabList={tabList} onClick={handleClick}>
          <AtTabsPane current={tabCurrent} index={0}>
            <View className="tabContent" style={{ minHeight: "1364rpx" }}>
              <View className="top">
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    请假类型
                  </View>
                  <Picker
                    mode="selector"
                    range={typeList}
                    onChange={typeHandle}
                  >
                    <View className="picker">
                      <Input
                        disabled={true}
                        placeholderClass="placeStyle"
                        placeholder="请选择"
                        value={type}
                      />
                      <Image className="search" src={down}></Image>
                    </View>
                  </Picker>
                </View>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    开始时间
                  </View>
                  <Picker mode="date" onChange={dateHandle}>
                    <View className="picker">
                      <Input
                        disabled={true}
                        placeholderClass="placeStyle"
                        placeholder="请选择"
                        value={date}
                      />
                      <Image className="search" src={down}></Image>
                    </View>
                  </Picker>
                </View>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    结束时间
                  </View>
                  <Picker mode="time" onChange={timeHandle}>
                    <View className="picker">
                      <Input
                        disabled={true}
                        placeholderClass="placeStyle"
                        placeholder="请选择"
                        value={time}
                      />
                      <Image className="search" src={down}></Image>
                    </View>
                  </Picker>
                </View>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    时长(小时)
                  </View>
                  <Input
                    placeholderClass="placeStyle"
                    placeholder="请输入时长"
                    style={{ textAlign: "right" }}
                  />
                </View>
              </View>
              <View className="middle">
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    请假原因
                  </View>
                  <Textarea
                    className="textArea"
                    placeholderStyle="placeStyle"
                    placeholder="请输入"
                  />
                </View>
              </View>
              <View className="bottom">
                <View className="line"></View>
                <View className="title">审批流程</View>
                <View className="flow">
                  <View className="left">
                    <View className="round"></View>
                    <View className="processName">审批人</View>
                    <View className="sub">1人审批</View>
                  </View>
                  <View className="right">
                    <Image className="headImage" src={boy}></Image>
                    <View className="name">涛涛</View>
                  </View>
                </View>
                <View className="flow">
                  <View className="left">
                    <View className="round"></View>
                    <View className="processName">抄送人</View>
                    <View className="sub">抄送2人</View>
                  </View>
                  <View className="right">
                    <View
                      className="item"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "240rpx",
                        justifyContent: "space-between",
                      }}
                    >
                      <Image className="headImage" src={girl}></Image>
                      <Image className="icon" src={addIcon}></Image>
                      <Image className="headImage" src={girl}></Image>
                      <Image className="icon" src={addIcon}></Image>
                      <View className="addbtn">
                        <Image className="btnimg" src={addBtn}></Image>
                      </View>
                    </View>
                    <View
                      className="item"
                      style={{
                        display: "flex",
                        width: "240rpx",
                      }}
                    >
                      <View className="name" style={{ marginRight: "42rpx" }}>
                        糖糖
                      </View>
                      <View className="name" style={{ marginRight: "42rpx" }}>
                        关关
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View className="subButton">提交</View>
            </View>
          </AtTabsPane>
          <AtTabsPane current={tabCurrent} index={1}>
            <View className="tabContent" style={{ position: "relative" }}>
              <View className="listwrap">
                <View className="listItem" onClick={goInfo}>
                  <View className="top">
                    <View className="left">
                      <View className="title">请假申请 </View>
                      <View className="pass">已通过</View>
                    </View>
                    <View className="right">
                      <View className="time">2024-01-30</View>
                    </View>
                  </View>
                  <View className="formItem">
                    <View className="item">
                      <View className="label">请假类型</View>
                      <View className="info">事假</View>
                    </View>
                    <View className="item">
                      <View className="label">开始时间</View>
                      <View className="info">2024-01-29 09:00</View>
                    </View>
                    <View className="item">
                      <View className="label">结束时间</View>
                      <View className="info">2024-01-30 09:00</View>
                    </View>
                    <View className="item">
                      <View className="label">请假原因</View>
                      <View className="info">家中有事</View>
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

export default Leave;
