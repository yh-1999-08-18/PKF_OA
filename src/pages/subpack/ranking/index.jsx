import React, { useState } from "react";
import { View, Image, Text } from "@tarojs/components";
import Navigator from "../../../components/navigationTap";
const serial1 = "https://post.pkfeng.net/assets/ranking/first.png";
const serial2 = "https://post.pkfeng.net/assets/ranking/second.png";
const serial3 = "https://post.pkfeng.net/assets/ranking/third.png";
import { AtTabs, AtTabsPane } from "taro-ui";
import "./index.scss";

const Rebate = () => {
  const [tabCurrent, setTabCurrent] = useState(0);
  const tabList = [{ title: "今日放款额排行" }, { title: "月度放款额排行" }];
  const serialIcon = [serial1, serial2, serial3];
  const gradesData = [
    {
      serial: 1,
      name: "高启强",
      posts: "西安市城市经理",
      num: "1400000",
    },
    {
      serial: 2,
      name: "高启盛",
      posts: "延安市城市经理",
      num: "1300000",
    },
    {
      serial: 3,
      name: "高启兰",
      posts: "银川市城市经理",
      num: "1200000",
    },
    {
      serial: 4,
      name: "陈书婷",
      posts: "榆林市城市经理",
      num: "1100000",
    },
    {
      serial: 5,
      name: "唐小龙",
      posts: "榆林市城市经理",
      num: "1090000",
    },
    {
      serial: 6,
      name: "唐小虎",
      posts: "榆林市城市经理",
      num: "1080000",
    },
    {
      serial: 7,
      name: "老莫",
      posts: "榆林市城市经理",
      num: "1070000",
    },
    {
      serial: 8,
      name: "安欣",
      posts: "榆林市城市经理",
      num: "1060000",
    },
    {
      serial: 9,
      name: "李有田",
      posts: "榆林市城市经理",
      num: "1050000",
    },
    {
      serial: 10,
      name: "李宏伟",
      posts: "榆林市城市经理",
      num: "1040000",
    },
    {
      serial: 11,
      name: "李响",
      posts: "榆林市城市经理",
      num: "1030000",
    },
    {
      serial: 12,
      name: "徐江",
      posts: "榆林市城市经理",
      num: "1020000",
    },
  ];

  const handleClick = (value) => {
    setTabCurrent(value);
  };

  return (
    <View className="wrapper">
      <Navigator
        bgColor={"rgba(0,0,0,0)"}
        isWhite={true}
        title={"放款额排行"}
      />
      <View className="title">每日10点跟新排名</View>
      <View className="listContent">
        <AtTabs current={tabCurrent} tabList={tabList} onClick={handleClick}>
          <AtTabsPane current={tabCurrent} index={0}>
            <View className="tabContent">
              <View className="listHead">
                <View className="leftHead">
                  <View style={{ marginRight: "60rpx" }}>排名</View>
                  <View>姓名</View>
                </View>
                <View className="rightHead">
                  <View>数额</View>
                </View>
              </View>
              {gradesData &&
                gradesData.map((item) => {
                  return (
                    <View className="listItem">
                      <View className="item_l">
                        {item.serial < 4 ? (
                          <Image src={serialIcon[item.serial - 1]} />
                        ) : (
                          <View className="serial">{item.serial}</View>
                        )}

                        <View className="info">
                          <View className="name">{item.name}</View>
                          <View className="posts">{item.posts}</View>
                        </View>
                      </View>
                      <View className="item_r">
                        <View className="num">
                          {item.num}
                          <Text>万</Text>
                        </View>
                        <View className="tit">放款额</View>
                      </View>
                    </View>
                  );
                })}
            </View>
          </AtTabsPane>
          <AtTabsPane current={tabCurrent} index={1}>
            <View className="tabContent">
              <View className="listHead">
                <View className="leftHead">
                  <View style={{ marginRight: "60rpx" }}>排名</View>
                  <View>姓名</View>
                </View>
                <View className="rightHead">
                  <View>数额</View>
                </View>
              </View>
              {gradesData &&
                gradesData.map((item) => {
                  return (
                    <View className="listItem">
                      <View className="item_l">
                        {item.serial < 4 ? (
                          <Image src={serialIcon[item.serial - 1]} />
                        ) : (
                          <View className="serial">{item.serial}</View>
                        )}

                        <View className="info">
                          <View className="name">{item.name}</View>
                          <View className="posts">{item.posts}</View>
                        </View>
                      </View>
                      <View className="item_r">
                        <View className="num">
                          {item.num}
                          <Text>万</Text>
                        </View>
                        <View className="tit">放款额</View>
                      </View>
                    </View>
                  );
                })}
            </View>
          </AtTabsPane>
        </AtTabs>
        <View className="selfInfo">
          <View className="listItem">
            <View className="item_l">
              <View className="serial">12</View>
              <View className="info">
                <View className="name">徐江</View>
                <View className="posts">榆林市城市经理</View>
              </View>
            </View>
            <View className="item_r">
              <View className="num">
                1020000
                <Text>万</Text>
              </View>
              <View className="tit">放款额</View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Rebate;
