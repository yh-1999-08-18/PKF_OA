import React, { useEffect, useState } from "react";
import { View, Image, Map } from "@tarojs/components";
import Navigator from "../../../components/navigationTap";
import { AtTabs, AtTabsPane } from "taro-ui";
const clockBg = "https://post.pkfeng.net/assets/attendance/clockBg.png";
const downBg = "https://post.pkfeng.net/assets/attendance/downBg.png";
const addressIcon = "https://post.pkfeng.net/assets/attendance/addressIcon.png";
const noneIcon = "https://post.pkfeng.net/assets/attendance/noneIcon.png";
const ok = "https://post.pkfeng.net/assets/attendance/ok.png";
const mark = "https://post.pkfeng.net/assets/attendance/mark.png";
import "./index.scss";
import Modal from "../../../components/showModal";
import MarkModal from "../../../components/markModal";
import Taro from "@tarojs/taro";
const icon = "https://post.pkfeng.net/assets/attendance/icon.png";
const Rebate = () => {
  const [work, setWork] = useState({ up: false, down: false });
  const [lineHeight, setLineHeight] = useState("500rpx");
  const [downHeight, setDownHeight] = useState("180rpx");
  const [roundHeight, setRoundHeight] = useState("246rpx");
  const [rangeHeight, setRangeHeight] = useState("308rpx");
  const [rangeLeft, setRangeLeft] = useState("218rpx");
  const [tabCurrent, setTabCurrent] = useState(0);
  const [code, setCode] = useState(null);
  const [markCode, setMarkCode] = useState(null);
  const tabList = [{ title: "上下班打卡" }, { title: "外勤打卡" }];
  const [imageList, setImageList] = useState([]);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const handleClick = (value) => {
    setTabCurrent(value);
  };
  const close = () => {
    setCode(false);
  };
  const markClose = () => {
    setMarkCode(false);
  };
  const clockHandle = () => {
    setWork({ up: true, down: false });
    setLineHeight("120rpx");
    setDownHeight("570rpx");
    setRoundHeight("360rpx");
    setRangeHeight("184rpx");
    setRangeLeft("230rpx");
  };
  const downClockHandle = () => {
    setCode(true);
  };
  const sure = () => {
    setTabCurrent(1);
    close();
  };
  const markSure = () => {
    close();
  };
  const markModal = () => {
    setMarkCode(true);
  };
  const uploadImage = () => {
    if (imageList.length < 3) {
      Taro.chooseImage({
        count: 3,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: function (res) {
          setImageList((s) => [...s, ...res.tempFilePaths]);
        },
      });
    }
  };
  const del = (event) => {
    event.stopPropagation();
    let list = [...imageList];
    list.splice(event.currentTarget.dataset.index, 1);
    setImageList(list);
  };
  const preview = (index) => {
    Taro.previewImage({
      current: index,
      urls: imageList,
    });
  };
  useEffect(() => {
    Taro.getLocation({
      type: "wgs84",
      // isHighAccuracy: true,
      success: function (res) {
        setLat(res.latitude);
        setLng(res.longitude);
      },
    });
  }, []);
  return (
    <View className="wrapper">
      <Navigator title={"考勤打卡"} />
      <View className="listContent">
        <AtTabs current={tabCurrent} tabList={tabList} onClick={handleClick}>
          <AtTabsPane current={tabCurrent} index={0}>
            <View className="tabContent">
              <Image
                className="clockBg"
                src={work.up ? downBg : clockBg}
              ></Image>
              <View className="title">
                <View className="helloText">
                  {work.up ? "下班了，焦辉平。" : "早上好，焦辉平。"}
                </View>
                <View className="subTit">
                  {work.up
                    ? "压力通通消散在下班悠闲的步伐里"
                    : "永远相信美好的事情即将发生"}
                </View>
              </View>
              <View className="localtion">
                <Image className="localtionImg" src={addressIcon}></Image>
                <View className="localtionInfo">
                  <View className="top">
                    地点：陕西省西安市雁塔区丈八巴哈公司客户你的卡规划
                  </View>
                  <View className="bottom">距您50m</View>
                </View>
                <View className="distance">刷新定位</View>
              </View>
              <View className="clockBtn">
                <View className="up">
                  <View className="top">
                    <View className="icon"></View>
                    <View className="text">上班打卡</View>
                    <View className="time">09:00</View>
                  </View>
                  <View className="bottom">
                    <View className="tit">
                      {work.up ? "打卡时间" : "右滑可切换至外勤打卡"}
                    </View>
                    <View className="time">
                      &nbsp;&nbsp;{work.up && "08:55"}
                    </View>
                    {work.up && <View className="update">更新打卡</View>}
                  </View>
                </View>
                <View className="down" style={{ bottom: downHeight }}>
                  <View className="icon"></View>
                  <View className="text">下班打卡</View>
                  <View className="time">18:00</View>
                </View>
                <View className="line" style={{ height: lineHeight }}></View>
                <View
                  className="round"
                  onClick={work.up ? downClockHandle : clockHandle}
                  style={{ top: roundHeight }}
                >
                  <View className="content">
                    <View className="c_title">
                      {work.up ? "下班打卡" : "上班打卡"}
                    </View>
                    <View className="c_time">
                      {work.up ? "16:10:34" : "08:55:17"}
                    </View>
                  </View>
                </View>
                <View
                  className="range"
                  style={{ bottom: rangeHeight, left: rangeLeft }}
                >
                  <Image src={work.up ? noneIcon : ok}></Image>
                  <View className="r_text">
                    {work.up ? "不在打卡范围内" : "已进入考勤打卡范围"}
                  </View>
                </View>
              </View>
            </View>
          </AtTabsPane>
          <AtTabsPane current={tabCurrent} index={1}>
            <View className="tabContent" style={{ position: "relative" }}>
              <Map
                longitude={lng}
                latitude={lat}
                scale={17}
                markers={[
                  {
                    id: 1021548,
                    iconPath: icon, // 用户位置图标路径
                    longitude: lng,
                    latitude: lat,
                    width: 20,
                    height: 20,
                    anchor: { x: 0.5, y: 0.5 },
                  },
                ]}
                circles={[
                  {
                    id: "2032541", // 圆形唯一标识
                    latitude: lat, // 圆心纬度
                    longitude: lng, // 圆心经度
                    radius: 50, // 半径，单位米
                    fillColor: "rgba(25,181,106,0.2)", // 填充颜色
                    zIndex: 10, // 层级
                  },
                ]}
              />
              <View className="localtion" style={{ zIndex: "3" }}>
                <Image className="localtionImg" src={addressIcon}></Image>
                <View className="localtionInfo">
                  <View className="top">
                    地点：西安市高新区环普科技产好噶记事本打开金刚不坏
                  </View>
                  <View className="bottom">距您50m</View>
                </View>
                <View className="distance">刷新定位</View>
              </View>
              <View className="clockBtn" style={{ marginTop: "416rpx" }}>
                <View
                  className="round"
                  onClick={work.up ? downClockHandle : clockHandle}
                  style={{
                    top: "246rpx",
                    background:
                      "linear-gradient( 180deg, #FAB349 0%, #F9940A 100%);",
                    boxShadow: "0rpx 12rpx 32rpx 0rpx rgba(233,140,30,0.4);",
                  }}
                >
                  <View className="content">
                    <View className="c_title">外勤打卡</View>
                    <View className="c_time">08:55:17</View>
                  </View>
                </View>
                <View className="mark" onClick={markModal}>
                  <Image src={mark}></Image>
                  <View className="markText">添加备注 / 上传图片</View>
                </View>
              </View>
            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
      {/* 弹窗组件 */}
      <Modal
        isOpen={code}
        sure={sure}
        closeHandle={() => close()}
        cancel={() => close()}
        type="localtion"
        subTitle="去外勤打卡"
        sureText="确定"
      />
      <MarkModal
        isOpen={markCode}
        sure={markSure}
        closeHandle={() => markClose()}
        cancel={() => markClose()}
        uploadImage={uploadImage}
        imageList={imageList}
        preview={preview}
        del={del}
      />
    </View>
  );
};

export default Rebate;
