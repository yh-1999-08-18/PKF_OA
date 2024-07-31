import React, { useState, useEffect } from "react";
import { View, Input, Image } from "@tarojs/components";
import Navigator from "../../../components/navigationTap";
const searchIcon =
  "https://post.pkfeng.net/assets/postalsavings/searchIcon.png";
const noData = "https://post.pkfeng.net/assets/postalsavings/暂无搜索结果.png";
import Card from "../../../components/itemCard";
import Tabs from "../../../components/tabs";
import Taro from "@tarojs/taro";
import "./index.scss";
import instance from "../../../API/request";
const RebateList = () => {
  //tab按钮列表
  const [tabList, setTabList] = useState([
    {
      text: "全部",
      active: true,
      pageId: 0,
    },
    {
      text: "已申请",
      active: false,
      pageId: 1,
    },
    {
      text: "已转款",
      active: false,
      pageId: 2,
    },
    {
      text: "已退回",
      active: false,
      pageId: 3,
    },
  ]);
  const data = [
    {
      id: 1,
      name: "张三",
      mobile: "13265487954",
      status: "已申请",
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
      status: "已转款",
      dealer: "西安派克峰汽车服务有限公司",
      vehicleModel: "捷途2023款旅行者2.0T四驱穿越PRO",
      loanAmount: 130000,
      loanNum: 48,
      createBy: "何淼",
      createTime: "2021-01-01 17:21:18",
    },
    {
      id: 3,
      name: "王五",
      mobile: "13265487954",
      status: "已退回",
      dealer: "西安派克峰汽车服务有限公司",
      vehicleModel: "捷途2023款旅行者2.0T四驱穿越PRO",
      loanAmount: 130000,
      loanNum: 48,
      createBy: "何淼",
      createTime: "2021-01-01 17:21:18",
    },
  ];
  const [keyWords, setKeyWords] = useState("");
  const openid = "ouZj94p6M-SRcZZKF7LCjGmbJfOg";

  //列表数据
  const [list, setList] = useState([]);
  //被选中的tab
  const [active, setActive] = useState(0);

  useEffect(() => {
    switch (active) {
      case 0:
        getList({ key: keyWords, openId: openid });
        break;
      case 1:
        getList({ key: keyWords, astatus: 2, openId: openid });
        break;
      case 2:
        getList({ key: keyWords, astatus: 4, openId: openid });
        break;
      case 3:
        getList({ key: keyWords, astatus: 1, openId: openid });
        break;
    }
  }, [keyWords]);

  // 列表数据请求
  const getList = (data) => {
    instance
      .get("/RebateOrder/findOrder", { params: data })
      .then((res) => {
        setList(res.data.data);
      })
      .catch((err) => {
        Taro.showToast({
          title: err,
          icon: "none",
          duration: 2000, // 显示时间
        });
      });
  };
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
  //监听页面滚动改变tab选中状态
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
  //监听页面滚动改变tab选中状态切花对应状态的数据
  useEffect(() => {
    switch (active) {
      case 0:
        getList({ openId: openid });
        break;
      case 1:
        getList({ astatus: 2, openId: openid });
        break;
      case 2:
        getList({ astatus: 4, openId: openid });
        break;
      case 3:
        getList({ astatus: 1, openId: openid });
        break;
    }
  }, [active]);
  const detailInfo = (type, name) => {
    if (type === 1) {
      Taro.navigateTo({
        url: `/pages/subpack/rebate/index?name=${name}`,
      });
    } else {
      Taro.navigateTo({
        url: `/pages/subpack/rebatelistdetail/index?type=${type}&name=${name}`,
      });
    }
  };
  return (
    <View className="wrapper">
      <Navigator title={"返利状态"} />
      <View className="topContent">
        <View className="topInput">
          <Input
            placeholderClass="placeHorderStyle"
            placeholder="输入客户姓名/合同编号查询"
            onInput={(e) => setKeyWords(e.detail.value)}
          />
          <Image src={searchIcon}></Image>
        </View>
        <View className="tab">
          <Tabs
            tabList={tabList}
            tabsHandoff={tabsHandoff}
            tabItemWidth="120rpx"
            tabItemHeight="56rpx"
            spaceType="center"
          />
        </View>
      </View>
      <View className="listContent">
        {list &&
          list.map((item) => {
            return <Card type="rebate" item={item} detailInfo={detailInfo} />;
          })}
        {list.length === 0 && (
          <View className="emptyWrap">
            <Image className="empty" src={noData}></Image>
            <View className="emptyText">暂无数据</View>
          </View>
        )}
      </View>
    </View>
  );
};

export default RebateList;
