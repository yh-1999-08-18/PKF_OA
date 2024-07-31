import React, { useEffect, useState } from "react";
import { View, Image, Map, Text, Input } from "@tarojs/components";
import Navigator from "../../../components/navigationTap";
const addressIcon = "https://post.pkfeng.net/assets/attendance/addressIcon.png";
import "./index.scss";
const add = "https://post.pkfeng.net/assets/attendance/add.png";
import MarkModal from "../../../components/markModal";

import Taro from "@tarojs/taro";
const icon = "https://post.pkfeng.net/assets/attendance/icon.png";
const SignIn = () => {
  const [work, setWork] = useState({ up: false, down: false });
  const [markCode, setMarkCode] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const close = () => {
    setCode(false);
  };
  const markClose = () => {
    setMarkCode(false);
  };
  const clockHandle = () => {
    setWork({ up: true, down: false });
  };
  const downClockHandle = () => {
    setCode(true);
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
  const preview = (index) => {
    Taro.previewImage({
      current: index,
      urls: imageList,
    });
  };
  useEffect(() => {
    Taro.getLocation({
      type: "wgs84",
      isHighAccuracy: true,
      success: function (res) {
        setLat(res.latitude);
        setLng(res.longitude);
      },
    });
  }, []);
  return (
    <View className="wrapper">
      <Navigator title={"签到"} />
      <View className="listContent">
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
          <View className="itemContent">
            <View className="formItem">
              <View className="label">拜访对象</View>
              <Input
                placeholderClass="placeStyle"
                placeholder="请填写拜访对象"
              />
            </View>
            <View className="formItem">
              <View className="label">备注</View>
              <Input
                placeholderClass="placeStyle"
                placeholder="请填写签到备注"
              />
            </View>
            <View className="formItem">
              <View className="label">签到图片</View>
              <Image src={add} onClick={uploadImage} />
            </View>
          </View>
          <View className="clockBtn" style={{ marginTop: "416rpx" }}>
            <View
              className="round"
              onClick={work.up ? downClockHandle : clockHandle}
              style={{
                bottom: "200rpx",
                background:
                  "linear-gradient( 180deg, #FAB349 0%, #F9940A 100%);",
                boxShadow: "0rpx 12rpx 32rpx 0rpx rgba(233,140,30,0.4);",
              }}
            >
              <View className="content">
                <View className="c_title">签到</View>
                <View className="c_time">14:07:26</View>
              </View>
            </View>
            <View className="rangeText">
              今日已签到<Text style={{ color: "#111111" }}>3次</Text>， 查看
              <Text style={{ color: "#19B56A" }}>签到记录</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
