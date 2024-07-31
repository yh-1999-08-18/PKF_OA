import React, { useState } from "react";
import { View, Picker, Image } from "@tarojs/components";
import Navigator from "../../../components/navigationTap";
const dropDown = "https://post.pkfeng.net/assets/home/dropDown.png";
import Line from "../../../components/chart/lineChart";
import "./index.scss";

const Grades = () => {
  const [isNew, setIsNew] = useState(true);
  const picData = ["个人数据", " 团队数据 "];
  const [time, setTime] = useState("时间");
  const [data, setData] = useState("个人数据");
  // 1. 准备图表配置项与数据
  const chartData = {
    categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    series: [
      {
        name: "2023年放款额",
        data: [35, 8, 25, 37, 4, 20, 40, 58, 19, 14, 6],
      },
      {
        name: "2024年放款额",
        data: [70, 40, 65, 100, 44, 68, 50, 30, 20, 10, 8],
      },
    ],
  };
  const dataChange = (e) => {
    setData(picData[e.detail.value]);
  };
  const timeChange = (e) => {
    setTime(e.detail.value);
  };
  return (
    <View className="wrapper">
      <Navigator title={"业绩分析"} />
      <View className="dataSeclect">
        <Picker range={picData} mode="selector" onChange={dataChange}>
          {data}
          <Image src={dropDown}></Image>
        </Picker>
        <Picker mode="date" onChange={timeChange}>
          {time}
          <Image src={dropDown}></Image>
        </Picker>
      </View>
      <View className="chartContent">
        <View className="top">
          <View className="topBtn">
            <View
              className={`cumulative ${isNew ? "new" : ""}`}
              onClick={() => setIsNew(true)}
            >
              新增
            </View>
            <View
              className={`cumulative ${!isNew ? "new" : ""}`}
              onClick={() => setIsNew(false)}
            >
              累计
            </View>
          </View>
          <View className="topTime">更新时间：2024-04-04 16:40:21</View>
        </View>
        <View className="chart">
          <Line
            id="line"
            yTextUnit="w"
            tooltipUnit="万"
            chartData={chartData}
          />
        </View>
      </View>
      <View className="infoContent">
        <View className="tit">放款额明细</View>
        <View className="title">
          <View className="item">产品名称</View>
          <View className="item midel">放款额(元)</View>
          <View className="item">放款时间</View>
        </View>
        <View className="content">
          <View className="row">
            <View className="item">别克</View>
            <View className="item">87000.00</View>
            <View className="item">2024-04-04</View>
          </View>
          <View className="row">
            <View className="item">别克</View>
            <View className="item">87000.00</View>
            <View className="item">2024-04-04</View>
          </View>
          <View className="row">
            <View className="item">别克</View>
            <View className="item">87000.00</View>
            <View className="item">2024-04-04</View>
          </View>
          <View className="row">
            <View className="item">别克</View>
            <View className="item">87000.00</View>
            <View className="item">2024-04-04</View>
          </View>
        </View>
      </View>
      <View className="iperformance">
        <View className="tit">业绩明细</View>
        <View className="title">
          <View className="item">时间</View>
          <View className="item">进件</View>
          <View className="item">通过</View>
          <View className="item">面签</View>
          <View className="item">放款</View>
        </View>
        <View className="content">
          <View className="row">
            <View className="item">2024-04-04</View>
            <View className="item">5</View>
            <View className="item">3</View>
            <View className="item">1</View>
            <View className="item">2</View>
          </View>
          <View className="row">
            <View className="item">2024-04-04</View>
            <View className="item">5</View>
            <View className="item">3</View>
            <View className="item">1</View>
            <View className="item">2</View>
          </View>
          <View className="row">
            <View className="item">2024-04-04</View>
            <View className="item">5</View>
            <View className="item">3</View>
            <View className="item">1</View>
            <View className="item">2</View>
          </View>
          <View className="row">
            <View className="item">2024-04-04</View>
            <View className="item">5</View>
            <View className="item">3</View>
            <View className="item">1</View>
            <View className="item">2</View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Grades;
