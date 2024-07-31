import React from "react";
import { View, Text, Button, Textarea } from "@tarojs/components";
import Navigator from "../../../components/navigationTap";
import Taro from "@tarojs/taro";
import "./index.scss";

const Refuse = () => {
  const agree = () => {
    Taro.redirectTo({ url: "/pages/subpack/application/index" });
  };
  const cancel = () => {
    Taro.navigateBack();
  };

  const dispose = () => {
    data; //接口返回的数据
    let nameList = [];
    let valList = [];

    data.forEach((item) => {
      nameList.push(item.name);
      valList.push(item.value);
    });
    cloums.push(nameList);
    cloums.push(valList);
  };
  return (
    <View className="wrap">
      <Navigator title={"费用审核"} bgColor="none" position="absolute" />
      <View className="infoContent">
        <View className="label">
          <Text style={{ color: "#E54C50" }}>*</Text>驳回原因
        </View>
        <Textarea
          className="textContent"
          placeholderClass="placeHoder"
          placeholder="请输入拒绝的原因"
        ></Textarea>
        <View className="btn">
          <Button className="cancel" onClick={cancel}>
            取消
          </Button>
          <Button className="agree" onClick={agree}>
            同意
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Refuse;
