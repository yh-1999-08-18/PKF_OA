import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Input,
  Picker,
  Textarea,
  RadioGroup,
  Radio,
  Text,
} from "@tarojs/components";
import Navigator from "../../../components/navigationTap";
import Card from "../../../components/itemCard";
import Tabs from "../../../components/tabs";
const down = "https://post.pkfeng.net/assets/home/dropDown.png";
const searchIcon =
  "https://post.pkfeng.net/assets/postalsavings/searchIcon.png";
import { AtTabs, AtTabsPane } from "taro-ui";
import Taro from "@tarojs/taro";
import "./index.scss";

const Repair = () => {
  const [tabCurrent, setTabCurrent] = useState(1);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const tabList = [{ title: "车商入网" }, { title: "入网状态" }];
  //tab按钮列表
  const [tabLists, setTabList] = useState([
    {
      text: "全部",
      active: true,
      pageId: 0,
    },
    {
      text: "待审核",
      active: false,
      pageId: 1,
    },
    {
      text: "已启用",
      active: false,
      pageId: 2,
    },
    {
      text: "已停用",
      active: false,
      pageId: 3,
    },
  ]);
  //列表数据
  const data = [
    {
      id: 1,
      mobile: "13265487954",
      status: "待审核",
      brand: "比亚迪",
      attribute: "一面",
      dealer: "西安派克峰汽车服务有限公司",
      createBy: "何淼",
      createTime: "2021-01-01",
    },
    {
      id: 2,
      mobile: "13265487954",
      status: "已启用",
      dealer: "西安派克峰汽车服务有限公司",
      brand: "比亚迪",
      attribute: "一面",
      createBy: "何淼",
      createTime: "2021-01-01",
    },
    {
      id: 3,
      status: "已停用",
      brand: "比亚迪",
      attribute: "一面",
      dealer: "西安派克峰汽车服务有限公司",
      createBy: "何淼",
      createTime: "2021-01-01",
    },
  ];
  //列表数据
  const [list, setList] = useState([]);
  //被选中的tab
  const [active, setActive] = useState(0);
  const handleClick = (value) => {
    setTabCurrent(value);
  };
  const dateHandle = (e) => {
    setDate(e.detail.value);
  };
  const timeHandle = (e) => {
    setTime(e.detail.value);
  };
  useEffect(() => {
    switch (active) {
      case 0:
        setList(data);
        break;
      case 1:
        setList(data.filter((i) => i.status === "待审核"));
        break;
      case 2:
        setList(data.filter((i) => i.status === "已启用"));
        break;
      case 3:
        setList(data.filter((i) => i.status === "已停用"));
        break;
    }
  }, [active]);
  //tab点击事件
  const tabsHandoff = (inx) => {
    let list = [...tabLists];
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
  const detailInfo = (type) => {
    Taro.navigateTo({
      url: `/pages/subpack/dealerDetail/index?type=${type}`,
    });
  };
  return (
    <View className="wrapper">
      <Navigator title={"车商入网"} />
      <View className="listContent">
        <AtTabs current={tabCurrent} tabList={tabList} onClick={handleClick}>
          <AtTabsPane current={tabCurrent} index={0}>
            <View className="tabContent" style={{ minHeight: "1364rpx" }}>
              <View className="top">
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    省份
                  </View>
                  <Picker mode="date" onChange={dateHandle}>
                    <View className="picker">
                      <Input
                        disabled={true}
                        placeholderClass="placeStyle"
                        placeholder="请选择省份"
                        value={date}
                      />
                      <Image className="search" src={down}></Image>
                    </View>
                  </Picker>
                </View>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    城市
                  </View>
                  <Picker mode="time" onChange={timeHandle}>
                    <View className="picker">
                      <Input
                        disabled={true}
                        placeholderClass="placeStyle"
                        placeholder="请选择所属城市"
                        value={time}
                      />
                      <Image className="search" src={down}></Image>
                    </View>
                  </Picker>
                </View>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    系统经销商
                  </View>
                  <View className="picker">
                    <Input
                      placeholderClass="placeStyle"
                      placeholder="请填写"
                      style={{ margin: 0, padding: 0, textAlign: "right" }}
                    />
                  </View>
                </View>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    实际经销商
                  </View>
                  <View className="picker">
                    <Input
                      placeholderClass="placeStyle"
                      placeholder="请填写"
                      style={{ margin: 0, padding: 0, textAlign: "right" }}
                    />
                  </View>
                </View>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    品牌
                  </View>
                  <View className="picker">
                    <Input
                      placeholderClass="placeStyle"
                      placeholder="请填写车型品牌"
                      style={{ margin: 0, padding: 0, textAlign: "right" }}
                    />
                  </View>
                </View>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    店面属性
                  </View>
                  <Picker mode="date" onChange={dateHandle}>
                    <View className="picker">
                      <Input
                        disabled={true}
                        placeholderClass="placeStyle"
                        placeholder="请选择店面属性"
                        value={date}
                      />
                      <Image className="search" src={down}></Image>
                    </View>
                  </Picker>
                </View>
                <View className="item">
                  <View className="label">业务类型</View>
                  <View className="picker">
                    <Input
                      placeholderClass="placeStyle"
                      placeholder="请填写业务类型"
                      style={{ margin: 0, padding: 0, textAlign: "right" }}
                    />
                  </View>
                </View>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    签约方式
                  </View>
                  <RadioGroup style={{ marginLeft: "auto" }} name="sstd">
                    <Radio
                      color="#19B56A"
                      checked
                      style={{
                        transform: "scale(0.8)",
                        margin: "0 16rpx 0 0",
                      }}
                    />
                    <Text className="radioLabel">新增</Text>
                    <Radio
                      color="#19B56A"
                      style={{
                        transform: "scale(0.8)",
                        margin: "0 16rpx 0 40rpx",
                      }}
                    />
                    <Text className="radioLabel">平移</Text>
                  </RadioGroup>
                </View>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    入网日期
                  </View>
                  <View className="picker">
                    <Input
                      placeholderClass="placeStyle"
                      placeholder=""
                      style={{ margin: 0, padding: 0, textAlign: "right" }}
                    />
                  </View>
                </View>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    所属销售
                  </View>
                  <Picker mode="date" onChange={dateHandle}>
                    <View className="picker">
                      <Input
                        disabled={true}
                        placeholderClass="placeStyle"
                        placeholder="请选择"
                        value={date}
                      />
                      <Image className="search" src={down}></Image>
                    </View>
                  </Picker>
                </View>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    销售主管
                  </View>
                  <Picker mode="date" onChange={dateHandle}>
                    <View className="picker">
                      <Input
                        disabled={true}
                        placeholderClass="placeStyle"
                        placeholder="请选择"
                        value={date}
                      />
                      <Image className="search" src={down}></Image>
                    </View>
                  </Picker>
                </View>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    返利申请
                  </View>
                  <RadioGroup style={{ marginLeft: "auto" }} name="sstd">
                    <Radio
                      color="#19B56A"
                      checked
                      style={{
                        transform: "scale(0.8)",
                        margin: "0 16rpx 0 0",
                      }}
                    />
                    <Text className="radioLabel">个人申请</Text>
                    <Radio
                      color="#19B56A"
                      style={{
                        transform: "scale(0.8)",
                        margin: "0 16rpx 0 40rpx",
                      }}
                    />
                    <Text className="radioLabel">销售主管</Text>
                  </RadioGroup>
                </View>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    支付方式
                  </View>
                  <RadioGroup style={{ marginLeft: "auto" }} name="sstd">
                    <Radio
                      color="#19B56A"
                      checked
                      style={{
                        transform: "scale(0.8)",
                        margin: "0 16rpx 0 0",
                      }}
                    />
                    <Text className="radioLabel">自主支付</Text>
                    <Radio
                      color="#19B56A"
                      style={{
                        transform: "scale(0.8)",
                        margin: "0 16rpx 0 40rpx",
                      }}
                    />
                    <Text className="radioLabel">邮储支付</Text>
                  </RadioGroup>
                </View>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    账户类型
                  </View>
                  <Picker mode="date" onChange={dateHandle}>
                    <View className="picker">
                      <Input
                        disabled={true}
                        placeholderClass="placeStyle"
                        placeholder="请选择"
                        value={date}
                      />
                      <Image className="search" src={down}></Image>
                    </View>
                  </Picker>
                </View>
              </View>
              <View className="middle">
                <View className="item">
                  <View className="label">备注</View>
                  <Textarea
                    className="textArea"
                    placeholderStyle="placeStyle"
                    placeholder="请输入"
                  />
                </View>
              </View>
              <View className="subButton">信息提交</View>
            </View>
          </AtTabsPane>
          <AtTabsPane current={tabCurrent} index={1}>
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
                  tabList={tabLists}
                  tabsHandoff={tabsHandoff}
                  tabItemWidth="120rpx"
                  tabItemHeight="56rpx"
                  spaceType=""
                />
              </View>
            </View>
            <View className="listContents">
              {list &&
                list.map((item) => {
                  return <Card item={item} detailInfo={detailInfo} />;
                })}
            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
    </View>
  );
};

export default Repair;
