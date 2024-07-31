import React, { useEffect, useState } from "react";
import { View, Text, Image } from "@tarojs/components";
const glod = "https://post.pkfeng.net/assets/home/goldIcon.png";
const approval = "https://post.pkfeng.net/assets/home/approval.png";
const rebate = "https://post.pkfeng.net/assets/home/Rebate.png";
const rebates = "https://post.pkfeng.net/assets/home/rebates.png";
const right = "https://post.pkfeng.net/assets/home/enterIcon.png";
const ems = "https://post.pkfeng.net/assets/home/ems.png";
const oa = "https://post.pkfeng.net/assets/home/oa.png";
const performance = "https://post.pkfeng.net/assets/home/Group 2148.png";

import "./index.scss";
import Taro from "@tarojs/taro";
import instance from "../../API/request";

const Index = () => {
  const [typeList, setTypeList] = useState([]);
  const btnList = [
    // {
    //   icon: postal,
    //   text: "邮储进件",
    //   path: "postalsavings",
    // },
    {
      icon: rebate,
      text: "进件管理",
      path: "postalsavingslist",
    },
    {
      icon: rebates,
      text: "返利申请",
      path: "rebate",
    },
    {
      icon: approval,
      text: "返利管理",
      path: "rebatelist",
    },
    {
      icon: performance,
      text: "车商管理",
      path: "dealer",
    },
  ];
  //月放款总额
  const [loanAmount, setLoanAmount] = useState(null);
  const [loanAmountFormat, setLoanAmountFormat] = useState(null);

  //月任务
  const [personAmt, setPersonAmt] = useState(null);
  // 月团队任务
  const [teamAmt, setTeamAmt] = useState(null);
  // 获取当前日期
  const today = new Date();
  // 获取今天是这个月的第几天
  const dayOfMonth = today.getDate();
  // 获取这个月的总天数
  const totalDaysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();
  // 计算这个月还剩多少天
  const remainingDays = totalDaysInMonth - dayOfMonth;
  //时间进度占比
  const progress = ((dayOfMonth / totalDaysInMonth) * 100).toFixed(2);

  const formatNumberWithCommas = (num) => {
    let numStr = num.toString();
    let parts = numStr.split(".");
    let integerPart = parts[0];
    let decimalPart = parts[1] ? "." + parts[1] : "";

    let formattedIntegerPart = "";
    let count = 0;

    for (let i = integerPart.length - 1; i >= 0; i--) {
      formattedIntegerPart = integerPart.charAt(i) + formattedIntegerPart;
      count++;
      if (count % 3 === 0 && i !== 0) {
        formattedIntegerPart = "," + formattedIntegerPart;
      }
    }

    return formattedIntegerPart + decimalPart;
  };
  // 首页数据请求
  useEffect(() => {
    instance
      .get("/LoanOrder/personalLoan", {
        params: { salerId: Taro.getStorageSync("salerId") },
      })

      .then((res) => {
        // 处理请求成功的响应
        if (res.status === 200) {
          try {
            // let nf = new Intl.NumberFormat("en-us");
            // 使用 numberFormatter 进行格式化操作
            //各状态订单数量赋值
            let dataList = [
              {
                num: res.data.data.orderSubmit,
                type: "已提交",
                path: "postalsavingslist",
                active: 1,
              },
              {
                num: res.data.data.orderPass,
                type: "已通过",
                path: "postalsavingslist",
                active: 3,
              },
              {
                num: res.data.data.mortgaged,
                type: "已抵押",
                path: "postalsavingslist",
                active: 5,
              },
              {
                num: res.data.data.mortgage,
                type: "未抵押",
                path: "postalsavingslist",
                active: 6,
              },
            ];
            setTypeList(dataList);
            setLoanAmountFormat(
              formatNumberWithCommas(res.data.data.loanAmount)
            );
            setLoanAmount(res.data.data.loanAmount);
            setPersonAmt(res.data.data.personAmt);
            setTeamAmt(res.data.data.teamAmt);
          } catch (error) {
            console.error("Intl.NumberFormat 报错:", error);
          }
        }
      })
      .catch((error) => {
        // 处理请求失败的情况
        console.log(error);
        Taro.showToast({
          title: error,
          icon: "none",
          duration: 1500,
        });
      });
  }, []);
  const navMessage = () => {
    Taro.navigateTo({
      url: `/pages/subpack/message/index`,
    });
  };
  const navigate = (path) => {
    if (path === "grades") {
      Taro.navigateTo({
        url: `/pages/subPages/grades/index?type=1`,
      });
    } else {
      Taro.navigateTo({
        url: `/pages/subpack/${path}/index`,
      });
    }
  };
  const navigateList = (path, act) => {
    Taro.navigateTo({
      url: `/pages/subpack/${path}/index?active=${act}`,
    });
  };
  return (
    <View className="wrapper">
      <Text className="title">首页</Text>
      <View className="top">
        <View className="topInfo">
          <View className="item">
            <Image className="glod" src={glod} />
            <Text className="titleContent">本月总放款额（元）</Text>
          </View>
          <View className="money">{loanAmountFormat}</View>
        </View>
        <View
          className="infoIcon"
          onClick={() => navigate("postalsavingslist")}
        >
          查看详情
        </View>
        <View className="bottom">
          {typeList.map((item) => {
            return (
              <View
                className="list"
                onClick={() => navigateList(item.path, item.active)}
              >
                <View className="num">{item.num}</View>
                <View className="type">{item.type}</View>
              </View>
            );
          })}
        </View>
      </View>
      <View className="qrcodeBtn">
        <View className="qrcode" onClick={() => navigate("qrcode")}>
          <View className="text">
            <View className="titleText">生成二维码</View>
            <View className="subTitle">扫二维码关注公众号</View>
          </View>
        </View>
        <View className="postal" onClick={() => navigate("postalsavings")}>
          <View className="text">
            <View className="titleText">邮储进件</View>
            <View className="subTitle">录入邮储订单信息</View>
          </View>
        </View>
      </View>
      <View className="btnList">
        {btnList.map((item) => {
          return (
            <View className="btnItem" onClick={() => navigate(item.path)}>
              <Image className="btnIcon" src={item.icon} png={true}></Image>
              <View className="btnText">{item.text}</View>
            </View>
          );
        })}
      </View>
      <View className="message">
        <View className="message_title">
          <View className="title_left">最新消息</View>
          <View className="title_right" onClick={navMessage}>
            <Text>3条新消息</Text>
            <View className="pint"></View>
            <Image src={right}></Image>
          </View>
        </View>
        <View className="contentInfo">
          <View className="item_left">
            <Image src={ems}></Image>
            <View className="label">邮储订单</View>
            <View className="text">您的邮储订单已通过</View>
          </View>
          <View className="item_right">刚刚</View>
        </View>
        <View className="contentInfo">
          <View className="item_left">
            <Image src={oa}></Image>
            <View className="label">OA审批</View>
            <View className="text">您的费用申请审批被拒绝</View>
          </View>
          <View className="item_right">16分钟前</View>
        </View>
      </View>
      <View className="target">
        <View className="target_title">
          <View className="title_left">
            月度目标<Text>（放款额度）</Text>
          </View>
          <View className="title_right">时间进度：{progress}%</View>
        </View>
        <View className="num">
          {personAmt / 10000}
          <View className="unit">万</View>
        </View>
        <View className="progressNum">
          {(loanAmount / personAmt) * 100 > 0
            ? ((loanAmount / personAmt) * 100).toFixed(2)
            : 0}
          <View className="unit">%</View>
        </View>
        <View className="progress">
          <View
            className="p_info"
            style={{ width: `${654 * (loanAmount / personAmt).toFixed(2)}rpx` }}
          ></View>
          {(loanAmount / personAmt) * 100 > 0 ? (
            <View className="headLine"></View>
          ) : (
            ""
          )}
        </View>
        <View className="rate">
          <View className="rate_left">
            <View className="left_top">目标完成率</View>
            <View className="left_bottom">
              <View className="rate_num">
                {(loanAmount / personAmt) * 100 > 0
                  ? ((loanAmount / personAmt) * 100).toFixed(2)
                  : 0}
                <View className="unit">%</View>
              </View>
              <View className="amount">
                {loanAmount / 10000}
                <View className="unit">万</View>
              </View>
            </View>
          </View>
          <View className="rate_right">
            <View className="right_top">剩余天数完成目标</View>
            <View className="right_bottom">
              <View className="rate_num">
                {remainingDays}
                <View className="unit">天</View>
              </View>
              <View className="amount">
                {loanAmount > personAmt ? 0 : (personAmt - loanAmount) / 10000}
                <View className="unit">万</View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Index;
