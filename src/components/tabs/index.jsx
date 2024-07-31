import React from "react";
import { View, ScrollView } from "@tarojs/components";
import "./index.scss";

const Tabs = (props) => {
  return (
    <ScrollView
      className="tabs"
      scrollX
      enableFlex
      style={{ justifyContent: props.spaceType }}
    >
      {props.tabList &&
        props.tabList.map((item, index) => {
          return (
            <View
              style={{
                color: item.active ? "#19B56A" : "#676767",
                fontWeight: item.active ? "bold" : "400",
                width: props.tabItemWidth,
                height: props.tabItemHeight,
                marginRight: props.margin ? "0rpx" : "54rpx",
              }}
              className="item"
              onClick={() => props.tabsHandoff(index)}
            >
              {item.text}
              {item.active && <View className="botMark"></View>}
            </View>
          );
        })}
    </ScrollView>
  );
};

export default Tabs;
