import React from "react";
import { View, Image } from "@tarojs/components";
const back = "https://post.pkfeng.net/assets/postalsavings/back.png";
const White_back = "https://post.pkfeng.net/assets/home/White_back.png";
import "./index.scss";
import Taro from "@tarojs/taro";

const Navigator = (props) => {
  const naviBack = () => {
    console.log("back");
    Taro.navigateBack();
  };
  return (
    <View
      className="wrappers"
      style={{
        backgroundColor: props.bgColor ? props.bgColor : "#ffffff",
        position: props.position ? props.position : "fixed",
      }}
    >
      <View className="content">
        <Image
          style={{ zIndex: "1" }}
          onClick={naviBack}
          src={props.isWhite ? White_back : back}
        ></Image>
        <View
          className="navText"
          style={{ color: props.isWhite ? "#ffffff" : "#000000" }}
        >
          {props.title}
        </View>
      </View>
    </View>
  );
};

export default Navigator;
