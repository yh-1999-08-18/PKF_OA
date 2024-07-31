import React, { useEffect, useState } from "react";
import { View, Image, Input, Picker, Textarea } from "@tarojs/components";
import Navigator from "../../../components/navigationTap";
const down = "https://post.pkfeng.net/assets/home/dropDown.png";
const boy = "https://post.pkfeng.net/assets/repair/boy.png";
const girl = "https://post.pkfeng.net/assets/repair/girl.png";
const addIcon = "https://post.pkfeng.net/assets/repair/addIcon.png";
const addBtn = "https://post.pkfeng.net/assets/repair/addBtn.png";
import { AtTabs, AtTabsPane } from "taro-ui";
const add = "https://post.pkfeng.net/assets/attendance/add.png";
import Taro from "@tarojs/taro";
import "./index.scss";

const Repair = () => {
  const [tabCurrent, setTabCurrent] = useState(0);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const tabList = [{ title: "今日日报" }, { title: "今日总结" }];
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
      url: "/pages/subpack/dailyList/index",
    });
  };
  const uploadImage = () => {
    if (imageList.length < 3) {
      Taro.chooseImage({
        count: 3,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: function (res) {},
      });
    }
  };
  const del = (event) => {
    event.stopPropagation();
    let list = [...imageList];
    list.splice(event.currentTarget.dataset.index, 1);
    setImageList(list);
  };
  return (
    <View className="wrapper">
      <Navigator title={"写日报"} />
      <View className="listContent">
        <AtTabs current={tabCurrent} tabList={tabList} onClick={handleClick}>
          <AtTabsPane current={tabCurrent} index={0}>
            <View className="tabContent" style={{ minHeight: "1364rpx" }}>
              <View className="top">
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    今日进件
                  </View>
                  <View className="picker">
                    <Input placeholderClass="placeStyle" placeholder="请选择" />
                  </View>
                </View>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    今日通过
                  </View>
                  <View className="picker">
                    <Input placeholderClass="placeStyle" placeholder="请选择" />
                  </View>
                </View>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    预约面签
                  </View>
                  <View className="picker">
                    <Input placeholderClass="placeStyle" placeholder="请选择" />
                  </View>
                </View>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    今日计划放款(元)
                  </View>
                  <View className="picker">
                    <Input placeholderClass="placeStyle" placeholder="请选择" />
                  </View>
                </View>
              </View>
              <View className="middle">
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    今日计划
                  </View>
                  <Textarea
                    className="textArea"
                    placeholderStyle="placeStyle"
                    placeholder="请输入"
                  />
                </View>
              </View>
              <View className="middle">
                <View className="item">
                  <View className="label">需要的支持</View>
                  <Textarea
                    className="textArea"
                    placeholderStyle="placeStyle"
                    placeholder="请输入"
                  />
                </View>
              </View>
              <View className="update">
                <View className="label">附件上传</View>
                <Image src={add} onClick={uploadImage} />
              </View>
              <View className="update">
                <View className="label">图片上传</View>
                <Image src={add} onClick={uploadImage} />
              </View>
              <View className="update">
                <View className="label">发送给</View>
                <Image src={add} />
              </View>
              {/* <View className="bottom">
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
                      <Image className="headImage" src={addBtn}></Image>
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
              </View> */}
              <View className="subButton" onClick={goInfo}>
                提交日报
              </View>
            </View>
          </AtTabsPane>
          <AtTabsPane current={tabCurrent} index={1}>
            <View className="tabContent" style={{ minHeight: "1364rpx" }}>
              <View className="top">
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    今日进件
                  </View>
                  <View className="picker">
                    <Input placeholderClass="placeStyle" placeholder="请选择" />
                  </View>
                </View>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    今日通过
                  </View>
                  <View className="picker">
                    <Input placeholderClass="placeStyle" placeholder="请选择" />
                  </View>
                </View>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    预约面签
                  </View>
                  <View className="picker">
                    <Input placeholderClass="placeStyle" placeholder="请选择" />
                  </View>
                </View>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    今日计划放款(元)
                  </View>
                  <View className="picker">
                    <Input placeholderClass="placeStyle" placeholder="请选择" />
                  </View>
                </View>
              </View>
              <View className="middle">
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    今日计划
                  </View>
                  <Textarea
                    className="textArea"
                    placeholderStyle="placeStyle"
                    placeholder="请输入"
                  />
                </View>
              </View>
              <View className="middle">
                <View className="item">
                  <View className="label">需要的支持</View>
                  <Textarea
                    className="textArea"
                    placeholderStyle="placeStyle"
                    placeholder="请输入"
                  />
                </View>
              </View>
              <View className="update">
                <View className="label">附件上传</View>
                <Image src={add} onClick={uploadImage} />
              </View>
              <View className="update">
                <View className="label">图片上传</View>
                <Image src={add} onClick={uploadImage} />
              </View>
              <View className="update">
                <View className="label">发送给</View>
                <Image src={add} />
              </View>
              <View className="subButton" onClick={goInfo}>
                提交日报
              </View>
            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
    </View>
  );
};

export default Repair;
