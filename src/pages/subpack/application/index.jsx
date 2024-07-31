import React, { useState, useEffect } from "react";
import { View, Input, Image } from "@tarojs/components";
import Navigator from "../../../components/navigationTap";
const searchIcon =
  "https://post.pkfeng.net/assets/postalsavings/searchIcon.png";
import Card from "../../../components/itemCard";
import Tabs from "../../../components/tabs";
import Taro from "@tarojs/taro";
import "./index.scss";

const application = () => {
  //tab按钮列表
  const [tabList, setTabList] = useState([
    {
      text: "全部申请",
      active: true,
      pageId: 0,
    },
    {
      text: "待审核",
      active: false,
      pageId: 1,
    },
    {
      text: "已通过",
      active: false,
      pageId: 2,
    },
    {
      text: "已驳回",
      active: false,
      pageId: 3,
    },
  ]);
  const data = [
    {
      id: 1,
      name: "张三",
      mobile: "13265487954",
      status: "待审批",
      classify: "新车垫款",
      management: "邮储银行",
      dealer: "西安派克峰汽车服务有限公司",
      vehicleModel: "捷途2023款旅行者2.0T四驱穿越PRO",
      loanAmount: 130000,
      loanNum: 48,
      createBy: "何淼",
      createTime: "2021-01-01 17:21:18",
    },
    {
      id: 2,
      name: "李四",
      mobile: "13265487954",
      status: "已通过",
      classify: "邮储车款",
      management: "邮储银行",
      dealer: "西安派克峰汽车服务有限公司",
      vehicleModel: "捷途2023款旅行者2.0T四驱穿越PRO",
      loanAmount: 130000,
      loanNum: 48,
      createBy: "何淼",
      createTime: "2021-01-01 17:21:18",
    },
    {
      id: 3,
      name: "王麻子",
      mobile: "13265487954",
      status: "已驳回",
      classify: "邮储车款",
      management: "邮储银行",
      dealer: "西安派克峰汽车服务有限公司",
      vehicleModel: "捷途2023款旅行者2.0T四驱穿越PRO",
      loanAmount: 130000,
      loanNum: 48,
      createBy: "何淼",
      createTime: "2021-01-01 17:21:18",
    },
  ];
  //列表数据
  const [list, setList] = useState([]);
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
  //监听改变tab选中状态
  useEffect(() => {
    let list = [...tabList];
    let newList = list.map((item, index) => {
      item.active = false;
      if (index === active) {
        item.active = true;
      }
      return item;
    });
    setTabList(newList);
  }, [active]);
  //监听tab选中状态切花对应状态的数据
  useEffect(() => {
    switch (active) {
      case 0:
        setList(data);
        break;
      case 1:
        setList(data.filter((i) => i.status === "待审批"));
        break;
      case 2:
        setList(data.filter((i) => i.status === "已通过"));
        break;
      case 3:
        setList(data.filter((i) => i.status === "已驳回"));
        break;
    }
  }, [active]);

  const detailInfo = (type) => {
    Taro.navigateTo({
      url: `/pages/subpack/applicationdetail/index?type=${type}`,
    });
  };
  return (
    <View className="wrapper">
      <Navigator title={"我的申请"} />
      <View className="topContent">
        <View className="topInput">
          <Input
            placeholderClass="placeHorderStyle"
            placeholder="输入客户姓名查询"
          />
          <Image src={searchIcon}></Image>
        </View>
        <View className="tab">
          <Tabs
            tabList={tabList}
            tabsHandoff={tabsHandoff}
            tabItemWidth="120rpx"
            tabItemHeight="56rpx"
            spaceType="space-between"
            margin={true}
          />
        </View>
      </View>
      <View className="listContent">
        {list &&
          list.map((item) => {
            return <Card item={item} isAudit={true} detailInfo={detailInfo} />;
          })}
      </View>
    </View>
  );
};

export default application;
