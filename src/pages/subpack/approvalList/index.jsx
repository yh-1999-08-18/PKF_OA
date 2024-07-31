import React, { useState, useEffect } from "react";
import { View, Input, Image } from "@tarojs/components";
import Navigator from "../../../components/navigationTap";
const searchIcon =
  "https://post.pkfeng.net/assets/postalsavings/searchIcon.png";
import Card from "../../../components/itemCard";
import Tabs from "../../../components/tabs";
import Taro from "@tarojs/taro";
import "./index.scss";

const PostalSavingsList = () => {
  //tab按钮列表
  const [tabList, setTabList] = useState([
    {
      text: "已发起",
      active: true,
      pageId: 0,
    },
    {
      text: "待处理",
      active: false,
      pageId: 1,
    },
    {
      text: "已处理",
      active: false,
      pageId: 2,
    },
    {
      text: "抄送我",
      active: false,
      pageId: 3,
    },
  ]);
  //被选中的tab
  const [active, setActive] = useState(0);
  //tab点击事件
  const tabsHandoff = (inx) => {
    let list = [...tabList];
    let newList = list.map((item, index) => {
      item.active = false;
      if (index === inx) {
        item.active = true;
        setActive(index);
      }
      return item;
    });
    setTabList(newList);
  };

  const detailInfo = (path) => {
    Taro.navigateTo({
      url: `/pages/subpack/${path}/index`,
    });
  };
  return (
    <View className="wrapper">
      <Navigator title={"全部审批"} />
      <View className="topContent">
        <View className="topInput">
          <Input placeholderClass="placeHorderStyle" placeholder="搜索查询" />
          <Image src={searchIcon}></Image>
        </View>
        <View className="tab">
          <Tabs
            tabList={tabList}
            tabsHandoff={tabsHandoff}
            spaceType="space-between"
            marginRight
          />
        </View>
      </View>
      <View className="listContent">
        {active === 3 && (
          <View className="itemCard" onClick={() => detailInfo("repairDetail")}>
            <View className="title">
              <View className="left">
                <View className="text">补卡申请</View>
                <View className="type">已通过</View>
              </View>
              <View className="time">2024-01-20</View>
            </View>
            <View className="content">
              <View className="item">
                <View className="label">补卡时间</View>
                <View className="value">2024-01-29 09:00</View>
              </View>
              <View className="item">
                <View className="label">补卡原因</View>
                <View className="value">
                  打不上卡，显示打卡成功，后面发下未打上
                </View>
              </View>
            </View>
          </View>
        )}
        {active === 0 && (
          <View className="itemCard" onClick={() => detailInfo("repairDetail")}>
            <View className="title">
              <View className="left">
                <View className="text">补卡申请</View>
                <View className="type">已通过</View>
              </View>
              <View className="time">2024-01-20</View>
            </View>
            <View className="content">
              <View className="item">
                <View className="label">补卡时间</View>
                <View className="value">2024-01-29 09:00</View>
              </View>
              <View className="item">
                <View className="label">补卡原因</View>
                <View className="value">
                  打不上卡，显示打卡成功，后面发下未打上
                </View>
              </View>
            </View>
          </View>
        )}
        {active <= 1 && (
          <View
            className="itemCard"
            onClick={() => detailInfo("applicationdetail")}
          >
            <View className="title">
              <View className="left">
                <View className="text">新车贷款申请</View>
                <View className="types">待审核</View>
              </View>
              <View className="time">2024-01-20</View>
            </View>
            <View className="content">
              <View className="item">
                <View className="label">资方</View>
                <View className="value">邮储银行</View>
              </View>
              <View className="item">
                <View className="label">经销商</View>
                <View className="value">西安派克峰汽车服务有限公司</View>
              </View>
              <View className="item">
                <View className="label">贷款总额</View>
                <View className="value">一拾柒万叁仟陆佰元整</View>
              </View>
            </View>
          </View>
        )}
        {active <= 1 && (
          <View
            className="itemCard"
            onClick={() => detailInfo("reimbursementDetail")}
          >
            <View className="title">
              <View className="left">
                <View className="text">报销申请</View>
                <View className="types">待审核</View>
              </View>
              <View className="time">2024-01-20</View>
            </View>
            <View className="content">
              <View className="item">
                <View className="label">费用归属</View>
                <View className="value">2024-01-29 09:00</View>
              </View>
              <View className="item">
                <View className="label">报销金额</View>
                <View className="value">375.21元</View>
              </View>
              <View className="item">
                <View className="label">报销类别</View>
                <View className="value">餐饮费</View>
              </View>
              <View className="item">
                <View className="label">费用详情</View>
                <View className="value">用于团队出去活动经费</View>
              </View>
            </View>
          </View>
        )}
        {active === 0 && (
          <View
            className="itemCard"
            onClick={() => detailInfo("businessDetail")}
          >
            <View className="title">
              <View className="left">
                <View className="text">商务政策申请</View>
                <View className="type">已通过</View>
              </View>
              <View className="time">2024-01-20</View>
            </View>
            <View className="content">
              <View className="item">
                <View className="label">车商名称</View>
                <View className="value">西安派克峰汽车服务有限公司</View>
              </View>
              <View className="item">
                <View className="label">车辆品牌</View>
                <View className="value">比亚迪</View>
              </View>
              <View className="item">
                <View className="label">提交人</View>
                <View className="value">王建东</View>
              </View>
            </View>
          </View>
        )}
        {active === 2 && (
          <View
            className="itemCard"
            onClick={() => detailInfo("businessDetail")}
          >
            <View className="title">
              <View className="left">
                <View className="text">商务政策申请</View>
                <View className="type">已通过</View>
              </View>
              <View className="time">2024-01-20</View>
            </View>
            <View className="content">
              <View className="item">
                <View className="label">车商名称</View>
                <View className="value">西安派克峰汽车服务有限公司</View>
              </View>
              <View className="item">
                <View className="label">车辆品牌</View>
                <View className="value">比亚迪</View>
              </View>
              <View className="item">
                <View className="label">提交人</View>
                <View className="value">王建东</View>
              </View>
            </View>
          </View>
        )}
        {/* {list &&
          list.map((item) => {
            return <Card item={item} detailInfo={detailInfo} />;
          })} */}
      </View>
    </View>
  );
};

export default PostalSavingsList;
