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
                  <View className="title">焦辉平的报销申请 </View>
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
                  <View className="label">所在部门</View>
                  <View className="info">办公室-行政</View>
                </View>
                <View className="item">
                  <View className="label">费用归属</View>
                  <View className="info">邮储-内蒙古</View>
                </View>
                <View className="item">
                  <View className="label">报销金额</View>
                  <View className="info">375.21元</View>
                </View>
                <View className="item">
                  <View className="label">报销类别</View>
                  <View className="info">餐饮费</View>
                </View>
                <View className="item">
                  <View className="label">报销原因</View>
                  <View className="info">用于团队出去活动经费</View>
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
                <View className="name">
                  已抄送2人
                  <Text style={{ color: "#19B56A", marginLeft: "24rpx" }}>
                    全部未读
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RepairDetail;
