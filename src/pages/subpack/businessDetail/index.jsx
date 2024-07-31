import React from "react";
import { View, Image, Text } from "@tarojs/components";
import Navigator from "../../../components/navigationTap";
const boy = "https://post.pkfeng.net/assets/repair/boy.png";
const girl = "https://post.pkfeng.net/assets/repair/girl.png";
import "./index.scss";
const RepairDetail = () => {
  return (
    <View className="wrapper">
      <Navigator title={"详情"} />
      <View className="listContent">
        <View className="tabContent" style={{ position: "relative" }}>
          <View className="listwrap">
            <View className="listItem">
              <View className="top">
                <View className="left">
                  <View className="icons"></View>
                  <View className="title">商务政策申请 </View>
                </View>
                <View className="right">
                  <View className="pass">已通过</View>
                </View>
              </View>
              <View className="formItem">
                <View className="item">
                  <View className="label">审批编号</View>
                  <View className="info">202401290124014007 </View>
                </View>
                <View className="item">
                  <View className="label">车商名称</View>
                  <View className="info">西安派克峰汽车服务有限公司</View>
                </View>
                <View className="item">
                  <View className="label">政策时间</View>
                  <View className="info">2024-01-29</View>
                </View>
                <View className="item">
                  <View className="label">期数</View>
                  <View className="info">期数</View>
                </View>
                <View className="item">
                  <View className="label">费率区间</View>
                  <View className="info">26.17%-29.54%</View>
                </View>
                <View className="item">
                  <View className="label">对公激励</View>
                  <View className="info">15%</View>
                </View>
                <View className="item">
                  <View className="label">额外激励</View>
                  <View className="info">7%</View>
                </View>
                <View className="item">
                  <View className="label">是否扣费</View>
                  <View className="info">否</View>
                </View>
                <View className="item">
                  <View className="label">特殊激励</View>
                  <View className="info">247.6元</View>
                </View>
              </View>
            </View>
          </View>
          <View className="repairWrap">
            <View className="title">审批流程</View>
            {/* 申请人 */}
            <View className="flow">
              <Image className="head" src={boy} />
              <View className="line"></View>
              <View className="left">
                <View className="sub">发起申请</View>
                <View className="name">我</View>
              </View>
              <View className="right">
                <View className="time">01-30 09:10</View>
              </View>
            </View>
            {/* 审批人 */}
            <View className="flow">
              <Image className="head" src={boy} />
              <View className="line"></View>
              <View className="left">
                <View className="sub">审批人</View>
                <View className="name">涛涛(已同意)</View>
              </View>
              <View className="right">
                <View className="time">02-01 16:24</View>
              </View>
            </View>
            {/* 抄送人 */}
            <View className="flow_copyIn">
              <Image className="head" src={girl} />
              <View className="left">
                <View className="sub">抄送人</View>
                <View className="name">已抄送2人</View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RepairDetail;
