import React, { useEffect, useState } from "react";
import { View, Image, Input, Picker, Textarea } from "@tarojs/components";
import Navigator from "../../../components/navigationTap";
const down = "https://post.pkfeng.net/assets/home/dropDown.png";
const boy = "https://post.pkfeng.net/assets/repair/boy.png";
const girl = "https://post.pkfeng.net/assets/repair/girl.png";
const addIcon = "https://post.pkfeng.net/assets/repair/addIcon.png";
const addBtn = "https://post.pkfeng.net/assets/repair/addBtn.png";
import { AtTabs, AtTabsPane } from "taro-ui";
import Taro from "@tarojs/taro";
import "./index.scss";

const Repair = () => {
  const [tabCurrent, setTabCurrent] = useState(0);
  const tabList = [{ title: "出差申请" }, { title: "出差记录" }];
  const [type, setType] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [itineraryList, setItineraryList] = useState([{ id: 1 }]);
  const [isOneText, setIsOneText] = useState("单程");
  const [isOne, setIsOne] = useState(true);
  const handleClick = (value) => {
    setTabCurrent(value);
  };
  const typeList = [
    "事假",
    "病假",
    "调休",
    "年假",
    "产假",
    "陪产假",
    "婚假",
    "例假",
    "丧假",
    "哺乳假",
  ];
  const typeHandle = (e) => {
    setType(typeList[e.detail.value]);
  };
  const goInfo = () => {
    Taro.navigateTo({
      url: "/pages/subpack/tripDetail/index",
    });
  };
  const dateHandle = (e) => {
    setDate(e.detail.value);
  };
  const timeHandle = (e) => {
    setTime(e.detail.value);
  };
  const clectCheck = () => {
    setIsOne(!isOne);
    if (isOneText === "单程") {
      setIsOneText("往返");
    } else {
      setIsOneText("单程");
    }
  };
  const addItinerary = () => {
    if (itineraryList.length < 4) {
      let list = [...itineraryList];
      list.push({ id: list.length + 1 });
      setItineraryList(list);
    }
  };
  return (
    <View className="wrapper">
      <Navigator title={"出差"} />
      <View className="listContent">
        <AtTabs current={tabCurrent} tabList={tabList} onClick={handleClick}>
          <AtTabsPane current={tabCurrent} index={0}>
            <View className="tabContent" style={{ minHeight: "1364rpx" }}>
              <View className="top">
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    出差事由
                  </View>
                  <Textarea
                    className="textArea"
                    placeholderStyle="placeStyle"
                    placeholder="请输入出差事由"
                  />
                </View>
              </View>
              {itineraryList &&
                itineraryList.map((item) => {
                  return (
                    <>
                      <View className="partition">行程{item.id}</View>
                      <View className="middle">
                        <View className="item">
                          <View className="label">
                            <View className="requred">*</View>
                            出发地
                          </View>
                          <Picker
                            mode="selector"
                            range={typeList}
                            onChange={typeHandle}
                          >
                            <View className="picker">
                              <Input
                                disabled={true}
                                placeholderClass="placeStyle"
                                placeholder="请选择"
                                value={type}
                              />
                              <Image className="search" src={down}></Image>
                            </View>
                          </Picker>
                        </View>
                        <View className="item">
                          <View className="label">
                            <View className="requred">*</View>
                            目的地
                          </View>
                          <View className="switch">
                            <View
                              className="oneWay"
                              style={{ float: isOne ? "left" : "right" }}
                              onClick={clectCheck}
                            >
                              {isOneText}
                            </View>
                          </View>
                        </View>
                        <View className="item">
                          <View className="label">
                            <View className="requred">*</View>
                            开始时间
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
                            结束时间
                          </View>
                          <Picker mode="time" onChange={timeHandle}>
                            <View className="picker">
                              <Input
                                disabled={true}
                                placeholderClass="placeStyle"
                                placeholder="请选择"
                                value={time}
                              />
                              <Image className="search" src={down}></Image>
                            </View>
                          </Picker>
                        </View>
                        <View className="item">
                          <View className="label">
                            <View className="requred">*</View>
                            时长(小时)
                          </View>
                          <Input
                            placeholderClass="placeStyle"
                            placeholder="请输入时长"
                            style={{ textAlign: "right" }}
                          />
                        </View>
                      </View>
                    </>
                  );
                })}
              <View className="btn" onClick={addItinerary}>
                +增加行程
              </View>
              <View className="textAre">
                <View className="item">
                  <View className="label">出差备注</View>
                  <Textarea
                    className="textArea"
                    placeholderStyle="placeStyle"
                    placeholder="请输入具体的出差备注"
                  />
                </View>
              </View>
              <View className="peer">
                <View className="item">
                  <View className="label">同行人</View>
                  <Picker
                    mode="selector"
                    range={typeList}
                    onChange={typeHandle}
                  >
                    <View className="picker">
                      <Input
                        disabled={true}
                        placeholderClass="placeStyle"
                        placeholder="请选择"
                        value={type}
                      />
                      <Image className="search" src={down}></Image>
                    </View>
                  </Picker>
                </View>
              </View>
              <View className="bottom">
                <View className="line"></View>
                <View className="title">审批流程</View>
                <View className="flow">
                  <View className="left">
                    <View className="round"></View>
                    <View className="processName">审批人</View>
                    <View className="sub">1人审批</View>
                  </View>
                  <View className="right">
                    <Image className="headImage" src={boy}></Image>
                    <View className="name">涛涛</View>
                  </View>
                </View>
                <View className="flow">
                  <View className="left">
                    <View className="round"></View>
                    <View className="processName">抄送人</View>
                    <View className="sub">抄送2人</View>
                  </View>
                  <View className="right">
                    <View
                      className="item"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "240rpx",
                        justifyContent: "space-between",
                      }}
                    >
                      <Image className="headImage" src={girl}></Image>
                      <Image className="icon" src={addIcon}></Image>
                      <Image className="headImage" src={girl}></Image>
                      <Image className="icon" src={addIcon}></Image>
                      <View className="addbtn">
                        <Image className="btnimg" src={addBtn}></Image>
                      </View>
                    </View>
                    <View
                      className="item"
                      style={{
                        display: "flex",
                        width: "240rpx",
                      }}
                    >
                      <View className="name" style={{ marginRight: "42rpx" }}>
                        糖糖
                      </View>
                      <View className="name" style={{ marginRight: "42rpx" }}>
                        关关
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View className="subButton">提交</View>
            </View>
          </AtTabsPane>
          <AtTabsPane current={tabCurrent} index={1}>
            <View className="tabContent" style={{ position: "relative" }}>
              <View className="listwrap">
                <View className="listItem" onClick={goInfo}>
                  <View className="top">
                    <View className="left">
                      <View className="title">出差申请 </View>
                      <View className="pass">已通过</View>
                    </View>
                    <View className="right">
                      <View className="time">2024-01-30</View>
                    </View>
                  </View>
                  <View className="formItem">
                    <View className="item">
                      <View className="label">出差事由</View>
                      <View className="info">出差参加公司活动</View>
                    </View>
                    <View className="item">
                      <View className="label">目的地</View>
                      <View className="info">西安</View>
                    </View>
                    <View className="item">
                      <View className="label">开始时间</View>
                      <View className="info">2024-01-29 09:00</View>
                    </View>
                    <View className="item">
                      <View className="label">结束时间</View>
                      <View className="info">2024-01-29 18:00</View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
    </View>
  );
};

export default Repair;
