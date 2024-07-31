import React, { useState, useEffect } from "react";
import { View, Input, Image } from "@tarojs/components";
import Navigator from "../../../components/navigationTap";
const searchIcon =
  "https://post.pkfeng.net/assets/postalsavings/searchIcon.png";
import Card from "../../../components/itemCard";
import Tabs from "../../../components/tabs";
import { getCurrentInstance } from "@tarojs/runtime";
import Taro from "@tarojs/taro";
import "./index.scss";
const noData = "https://post.pkfeng.net/assets/postalsavings/暂无搜索结果.png";
import instance from "../../../API/request";

const PostalSavingsList = () => {
  const { router } = getCurrentInstance();
  const [search, setSearch] = useState("");
  //tab按钮列表
  const [tabList, setTabList] = useState([
    {
      text: "全部",
      active: true,
      pageId: 0,
    },
    {
      text: "已提交",
      active: false,
      pageId: 1,
    },
    {
      text: "已拒绝",
      active: false,
      pageId: 2,
    },
    {
      text: "已通过",
      active: false,
      pageId: 3,
    },
    {
      text: "待补充",
      active: false,
      pageId: 4,
    },
    {
      text: "已抵押",
      active: false,
      pageId: 5,
    },
    {
      text: "未抵押",
      active: false,
      pageId: 6,
    },
    {
      text: "已放款",
      active: false,
      pageId: 7,
    },
    {
      text: "已退车",
      active: false,
      pageId: 8,
    },
    {
      text: "已结清",
      active: false,
      pageId: 9,
    },
  ]);
  // const data = [
  //   {
  //     id: 1,
  //     name: "张三",
  //     mobile: "13265487954",
  //     status: "已提交",
  //     dealer: "西安派克峰汽车服务有限公司",
  //     vehicleModel: "捷途2023款旅行者2.0T四驱穿越PRO",
  //     loanAmount: 130000,
  //     loanNum: 48,
  //     createBy: "何淼",
  //     createTime: "2021-01-01 17:21:18",
  //   },
  //   {
  //     id: 2,
  //     name: "李四",
  //     mobile: "13265487954",
  //     status: "已拒绝",
  //     dealer: "西安派克峰汽车服务有限公司",
  //     vehicleModel: "捷途2023款旅行者2.0T四驱穿越PRO",
  //     loanAmount: 130000,
  //     loanNum: 48,
  //     createBy: "何淼",
  //     createTime: "2021-01-01 17:21:18",
  //   },
  //   {
  //     id: 3,
  //     name: "王麻子",
  //     mobile: "13265487954",
  //     status: "已通过",
  //     dealer: "西安派克峰汽车服务有限公司",
  //     vehicleModel: "捷途2023款旅行者2.0T四驱穿越PRO",
  //     loanAmount: 130000,
  //     loanNum: 48,
  //     createBy: "何淼",
  //     createTime: "2021-01-01 17:21:18",
  //   },
  //   {
  //     id: 4,
  //     name: "杨二",
  //     mobile: "13265487954",
  //     status: "待补充",
  //     dealer: "西安派克峰汽车服务有限公司",
  //     vehicleModel: "捷途2023款旅行者2.0T四驱穿越PRO",
  //     loanAmount: 130000,
  //     loanNum: 48,
  //     createBy: "何淼",
  //     createTime: "2021-01-01 17:21:18",
  //   },
  //   {
  //     id: 7,
  //     name: "赵五",
  //     mobile: "13265487954",
  //     status: "已放款",
  //     dealer: "西安派克峰汽车服务有限公司",
  //     vehicleModel: "捷途2023款旅行者2.0T四驱穿越PRO",
  //     loanAmount: 130000,
  //     loanNum: 48,
  //     createBy: "何淼",
  //     createTime: "2021-01-01 17:21:18",
  //   },
  //   {
  //     id: 5,
  //     name: "刘七",
  //     mobile: "13265487954",
  //     status: "已抵押",
  //     dealer: "西安派克峰汽车服务有限公司",
  //     vehicleModel: "捷途2023款旅行者2.0T四驱穿越PRO",
  //     loanAmount: 130000,
  //     loanNum: 48,
  //     createBy: "何淼",
  //     createTime: "2021-01-01 17:21:18",
  //   },
  //   {
  //     id: 6,
  //     name: "刘七",
  //     mobile: "13265487954",
  //     status: "未抵押",
  //     dealer: "西安派克峰汽车服务有限公司",
  //     vehicleModel: "捷途2023款旅行者2.0T四驱穿越PRO",
  //     loanAmount: 130000,
  //     loanNum: 48,
  //     createBy: "何淼",
  //     createTime: "2021-01-01 17:21:18",
  //   },
  //   {
  //     id: 8,
  //     name: "马六",
  //     mobile: "13265487954",
  //     status: "已退车",
  //     dealer: "西安派克峰汽车服务有限公司",
  //     vehicleModel: "捷途2023款旅行者2.0T四驱穿越PRO",
  //     loanAmount: 130000,
  //     loanNum: 48,
  //     createBy: "何淼",
  //     createTime: "2021-01-01 17:21:18",
  //   },
  //   {
  //     id: 9,
  //     name: "刘七",
  //     mobile: "13265487954",
  //     status: "已结清",
  //     dealer: "西安派克峰汽车服务有限公司",
  //     vehicleModel: "捷途2023款旅行者2.0T四驱穿越PRO",
  //     loanAmount: 130000,
  //     loanNum: 48,
  //     createBy: "何淼",
  //     createTime: "2021-01-01 17:21:18",
  //   },
  // ];
  //列表数据
  const [list, setList] = useState([]);
  //被选中的tab
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (router.params.active) {
      switch (router.params.active) {
        case "1":
          tabsHandoff(1);
          break;
        case "3":
          tabsHandoff(3);
          break;
        case "5":
          tabsHandoff(5);
          break;
        case "6":
          tabsHandoff(6);
          break;
      }
    }
  }, [router]);
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
    Taro.showLoading({
      title: "加载中",
    });
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
        getListData();
        break;
      case 1:
        getListData(search, 1);
        break;
      case 2:
        getListData(search, 3);
        break;
      case 3:
        getListData(search, 5);
        break;
      case 4:
        getListData(search, 7);
        break;
      case 5:
        getListData(search, 9, 1);
        break;
      case 6:
        getListData(search, 9, 2);
        break;
      case 7:
        getListData(search, 9);
        break;
      case 8:
        getListData(search, 12);
        break;
      case 9:
        getListData(search, 15);
        break;
    }
  }, [active]);
  const getListData = (key, status, isMortgage) => {
    let data = null;
    if (status === 9) {
      if (isMortgage === 1) {
        data = {
          key: key ? key : "",
          orderStatus: status ? status : "",
          mortgageStatus: 5,
        };
      } else if (isMortgage === 2) {
        data = {
          key: key ? key : "",
          orderStatus: status ? status : "",
          mortgageStatus: 0,
        };
      } else {
        data = {
          key: key ? key : "",
          orderStatus: status ? status : "",
        };
      }
    } else {
      data = {
        key: key ? key : "",
        orderStatus: status ? status : "",
      };
    }
    instance
      .get("/LoanOrder/findOrder", {
        params: data,
      })
      .then((res) => {
        let list = res.data.data;
        if (isMortgage === 2) {
          for (const item of list) {
            console.log(item);
            item.mortgageCode = true;
          }
        }
        if (isMortgage === 1) {
          for (const item of list) {
            item.codes = true;
          }
        }
        if (!isMortgage) {
          for (const item of list) {
            item.code = true;
          }
        }
        console.log(list);
        setList(list);
        Taro.hideLoading();
      })
      .catch((err) => {
        Taro.showToast({
          title: err,
          icon: "none",
          duration: 2000,
        });
        Taro.hideLoading();
      });
  };
  const detailInfo = (id, mortgageCode, code) => {
    Taro.navigateTo({
      url: `/pages/subpack/postalListDetail/index?orderId=${id}&type=${mortgageCode}&code=${code}`,
    });
  };
  return (
    <View className="wrapper">
      <Navigator title={"邮储进件"} />
      <View className="topContent">
        <View className="topInput">
          <Input
            placeholderClass="placeHorderStyle"
            placeholder="输入客户姓名查询"
            onInput={(e) => {
              setSearch(e.detail.value);
              getListData(e.detail.value);
            }}
          />
          <Image src={searchIcon}></Image>
        </View>
        <View className="tab">
          <Tabs
            tabList={tabList}
            tabsHandoff={tabsHandoff}
            tabItemWidth="120rpx"
            tabItemHeight="56rpx"
            spaceType=""
          />
        </View>
      </View>
      <View className="listContent">
        {list &&
          list.map((item) => {
            return <Card item={item} type="postal" detailInfo={detailInfo} />;
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

export default PostalSavingsList;
