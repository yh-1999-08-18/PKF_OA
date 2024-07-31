import React from "react";
import { View, Text } from "@tarojs/components";
import "./index.scss";
import Navigator from "../../../components/navigationTap";
const More = () => {
  return (
    <View className="wrapper">
      <Navigator title={"更多功能"} />
    </View>
  );
};

export default More;
