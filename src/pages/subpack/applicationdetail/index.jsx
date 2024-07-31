import React, { useEffect, useState } from "react";
import { View, Image, Text, Button } from "@tarojs/components";
import Navigator from "../../../components/navigationTap";
import Tabs from "../../../components/tabs";
const call = "https://post.pkfeng.net/assets/postalsavings/call.png";
import { getCurrentInstance } from "@tarojs/runtime";
import { callPhone } from "../../../until/untils";
import Taro from "@tarojs/taro";
import "./index.scss";

const applicationdetail = () => {
  const { router } = getCurrentInstance();
  const [typeColor, setTypeColor] = useState("");
  useEffect(() => {
    if (router.params.type) {
      switch (router.params.type) {
        case "已通过":
          setTypeColor("#19B56A");
          break;
        case "待审批":
          setTypeColor("#F9940A");
          break;
        case "已驳回":
          setTypeColor("#EC2525");
          break;
      }
    }
  }, [router]);

  const imgList = [
    "https://img.zcool.cn/community/01e0205d541556a8012187f4c253a0.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100",
  ];

  //tab按钮列表
  const [tabList, setTabList] = useState([
    {
      text: "申请信息",
      active: true,
      pageId: 0,
    },
    {
      text: "进度信息",
      active: false,
      pageId: 1,
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

  const preview = (index) => {
    Taro.previewImage({
      current: index,
      urls: imgList,
    });
  };

  const agree = () => {
    Taro.showToast({ title: "通过申请", icon: "none" });
  };

  const cancel = () => {
    Taro.navigateTo({
      url: "/pages/subpack/refuse/index",
    });
  };

  return (
    <View className="wrap">
      <Navigator title={"审批详情"} bgColor="none" position="absolute" />
      <View className="tab">
        <Tabs
          tabList={tabList}
          tabsHandoff={tabsHandoff}
          tabItemWidth="120rpx"
          tabItemHeight="56rpx"
          spaceType="space-evenly"
          margin={true}
        />
      </View>
      <View className="infoContent">
        {active === 0 && (
          <View className="info">
            <View className="title">
              <View className="left">
                <View className="icon"></View>
                <View className="text">焦辉平 - 新车垫款申请</View>
              </View>
              {router.params.type && (
                <View className="right" style={{ color: typeColor }}>
                  {router.params.type}
                </View>
              )}
            </View>
            <View className="content">
              <View className="item">
                <View className="left">资方</View>
                <View className="right">邮储银行</View>
              </View>
              <View className="item">
                <View className="left">合同编号</View>
                <View className="right">1024871210</View>
              </View>
              <View className="item">
                <View className="left">经销商</View>
                <View className="right">西安派克峰汽车服务有限公司</View>
              </View>
              <View className="item">
                <View className="left">贷款总额</View>
                <View className="right">壹拾柒万叁仟陆佰元整</View>
              </View>
              <View className="item">
                <View className="left">上牌城市</View>
                <View className="right">西安</View>
              </View>
              <View className="item">
                <View className="left">申请时间</View>
                <View className="right">2024-03-24 11:24:37</View>
              </View>
              <View className="item">
                <View className="left">预估回款</View>
                <View className="right">2024.01.24</View>
              </View>
              <View className="item">
                <View className="left">收款账户</View>
                <View className="right">焦辉平</View>
              </View>
              <View className="item">
                <View className="left">支付日期</View>
                <View className="right">2024.01.30</View>
              </View>
              <View className="item">
                <View className="left">备注</View>
                <View className="right">-</View>
              </View>
              {router.params.type === "已驳回" && (
                <View className="item">
                  <View className="left">驳回理由</View>
                  <View className="right">贷款总额与实际车辆金额不符</View>
                </View>
              )}
              <View className="item">
                <View className="left">接单照片</View>
                <View className="imageList">
                  {imgList &&
                    imgList.map((item, index) => {
                      return (
                        <Image
                          onClick={() => preview(index)}
                          src={item}
                        ></Image>
                      );
                    })}
                </View>
              </View>
            </View>
          </View>
        )}
        {active === 1 && (
          <View className="progress">
            <View className="stepsContent">
              <View className="left">
                <View className="dot"></View>
                <View className="line"></View>
                <View className="dot"></View>
                <View className="line"></View>
                <View className="dot"></View>
              </View>
              <View className="right">
                <View className="item">
                  <View className="top">
                    李建<Text>【申请人】</Text>
                  </View>
                  <View className="bottom">
                    <View className="item_b" style={{ margin: "20rpx 0 " }}>
                      <View className="left_b">申请人电话：</View>
                      <View className="right_b">13084014527</View>
                      <Image
                        src={call}
                        data-mobile="13084014527"
                        onClick={callPhone}
                      ></Image>
                    </View>
                    <View className="item_b">
                      <View className="left_b">审核时间：</View>
                      <View className="right_b">2024-03-24 11:24:37</View>
                    </View>
                  </View>
                </View>
                <View className="item">
                  <View className="top">
                    任梦雪<Text>【审核】</Text>
                  </View>
                  <View className="bottom">
                    <View className="item_b" style={{ margin: "20rpx 0 " }}>
                      <View className="left_b">申请人电话：</View>
                      <View className="right_b">13084014527</View>
                      <Image
                        src={call}
                        data-mobile="13084014527"
                        onClick={callPhone}
                      ></Image>
                    </View>
                    <View className="item_b">
                      <View className="left_b">审核时间：</View>
                      <View className="right_b">2024-03-24 11:24:37</View>
                    </View>
                  </View>
                </View>
                <View className="item">
                  <View className="top">
                    马腾威<Text>【审批人】</Text>
                  </View>
                  <View className="bottom">
                    <View className="item_b" style={{ margin: "20rpx 0 " }}>
                      <View className="left_b">申请人电话：</View>
                      <View className="right_b">13084014527</View>
                      <Image
                        src={call}
                        data-mobile="13084014527"
                        onClick={callPhone}
                      ></Image>
                    </View>
                    <View className="item_b">
                      <View className="left_b">审核时间：</View>
                      <View className="right_b">2024-03-24 11:24:37</View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
        {router.params.type === "已驳回" && (
          <View className="btn">
            <Button className="cancel" onClick={cancel}>
              拒绝
            </Button>
            <Button className="agree" onClick={agree}>
              同意
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};

export default applicationdetail;
