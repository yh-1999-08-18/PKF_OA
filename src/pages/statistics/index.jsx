import React, { useState } from "react";
import { View, Text, Picker, Image } from "@tarojs/components";
const dropDown = "https://post.pkfeng.net/assets/home/dropDown.png";
const dataIcon = "https://post.pkfeng.net/assets/home/data.png";
const calendar = "https://post.pkfeng.net/assets/home/calendar.png";
import Ring from "../../components/chart/ringChart";
import Line from "../../components/chart/lineChart";
import { formatTimestampToString } from "../../until/untils";
import "./index.scss";

const Statistics = () => {
  const chartData = {
    series: [
      {
        name: "成交量A",
        data: [35, 8, 25, 37, 4, 20],
      },
      {
        name: "成交量B",
        data: [70, 40, 65, 100, 44, 68],
      },
    ],
  };
  const picData = ["个人数据", " 团队数据 "];
  const tabsData = [
    {
      text: "今日进件",
      num: 7,
    },
    {
      text: "今日通过",
      num: 4,
    },
    {
      text: "今日面签",
      num: 2,
    },
    {
      text: "今日放款",
      num: 3,
    },
  ];
  const [time, setTime] = useState("本月");
  const [briefingTime, setBriefingTime] = useState(
    formatTimestampToString(new Date().valueOf(), "yyyy-mm-dd")
  );
  const [data, setData] = useState("个人数据");
  const dataChange = (e) => {
    setData(picData[e.detail.value]);
  };
  const briefingTimeChange = (e) => {
    setBriefingTime(e.detail.value);
  };
  const timeChange = (e) => {
    setTime(e.detail.value);
  };
  return (
    <View className="wrapper">
      <View className="wrapTop"></View>
      <View className="title">数据看板</View>
      <View className="dataSeclect">
        <Picker range={picData} mode="selector" onChange={dataChange}>
          <Image className="dataIcon" src={dataIcon}></Image>
          {data}
          <Image className="down" src={dropDown}></Image>
        </Picker>
        <Picker mode="date" onChange={timeChange}>
          <Image className="calendarIcon" src={calendar}></Image>
          {time}
          <Image className="down" src={dropDown}></Image>
        </Picker>
      </View>
      <View className="chartContent">
        <View className="chartTitle">
          <View className="leftTitle">
            <View className="titleIcon"></View>
            <View className="titleText">指标完成分析</View>
          </View>
          <View className="rightTitle">
            <View className="lenged"></View>
            <View className="lengedTitle">已完成</View>
            <View className="noLenged"></View>
            <View className="lengedTitle">目标额</View>
          </View>
        </View>
        <View className="content">
          <View className="left">
            <View className="bigChart">
              <View className="progress"></View>
            </View>
            <View className="chart">
              <Ring></Ring>
            </View>
          </View>
          <View className="right">
            <View className="top" style={{ marginBottom: "20rpx" }}>
              <View className="topTitle">月放款额(元)</View>
              <View className="dayText">
                <View className="num">1200w</View>
                <View className="elssd">剩余</View>
                <View className="days">5天</View>
              </View>
            </View>
            <View className="bottom">
              <View className="topTitle">实际完成</View>
              <View className="dayText">
                <View className="num">900w</View>
                <View className="elssd">环比</View>
                <View className="days">1.7%</View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View className="briefing">
        <View className="chartTitle">
          <View className="leftTitle">
            <View className="titleIcon"></View>
            <View className="titleText">工作简报</View>
          </View>
          <View className="rightTitle">
            <Picker mode="date" onChange={briefingTimeChange}>
              {briefingTime}
              <Image className="down" src={dropDown}></Image>
            </Picker>
          </View>
        </View>
        <View className="info">
          <View className="todayNum">
            <View className="num">67.30w</View>
            <View className="sub">今日放款额</View>
          </View>
          <View className="tabList">
            {tabsData &&
              tabsData.map((item) => {
                return (
                  <View className="tabItem">
                    <View className="nums">{item.num}</View>
                    <View className="subs">{item.text}</View>
                  </View>
                );
              })}
          </View>
        </View>
      </View>
      <View className="lineChartContent">
        <Line
          legendPosition="top"
          legendFloat="left"
          yTextUnit="w"
          lineType="curve"
          tooltipUnit="万"
          chartData={chartData}
          Color="#ffffff"
          id="curveLine"
        />
      </View>
    </View>
  );
};

export default Statistics;
