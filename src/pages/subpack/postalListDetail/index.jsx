import React, { useEffect, useState } from "react";
import { View, Image, Text, RadioGroup, Radio } from "@tarojs/components";
import Navigator from "../../../components/navigationTap";
import { getCurrentInstance } from "@tarojs/runtime";
import Taro from "@tarojs/taro";
import instance from "../../../API/request";

const mortgage = "https://post.pkfeng.net/assets/postalsavings/mortgage.png";
const mortgageBg =
  "https://post.pkfeng.net/assets/postalsavings/mortgageBg.png";
const success = "https://post.pkfeng.net/assets/postalsavings/success.png";
const settle = "https://post.pkfeng.net/assets/postalsavings/settle.png";
const settleBg = "https://post.pkfeng.net/assets/postalsavings/settleBg.png";
const returnCar = "https://post.pkfeng.net/assets/postalsavings/returnCar.png";
const returnCarBg =
  "https://post.pkfeng.net/assets/postalsavings/returnCarBg.png";
const supplementBg =
  "https://post.pkfeng.net/assets/postalsavings/supplementBg.png";
const supplement =
  "https://post.pkfeng.net/assets/postalsavings/supplement.png";
const LendersBg = "https://post.pkfeng.net/assets/postalsavings/LendersBg.png";
const Lenders = "https://post.pkfeng.net/assets/postalsavings/Lenders.png";
const refuseBg = "https://post.pkfeng.net/assets/postalsavings/refuseBg.png";
const refuse = "https://post.pkfeng.net/assets/postalsavings/refuse.png";
const successBg = "https://post.pkfeng.net/assets/postalsavings/successBg.png";
const call = "https://post.pkfeng.net/assets/postalsavings/call.png";
const upload = "https://post.pkfeng.net/assets/postalsavings/upload.png";
const delImage = "https://post.pkfeng.net/assets/postalsavings/delImage.png";

import {
  maskMiddleDigits,
  copyTextToClipboard,
  callPhone,
} from "../../../until/untils";
import "./index.scss";

const PostalDetail = () => {
  const { router } = getCurrentInstance();
  const [orderId, setOrderId] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [infoType, setInfoType] = useState("");
  const [topIcon, setTopIcon] = useState("");
  const [coolHeight, setCoolHeight] = useState("450rpx");
  const [bgImage, setBgImage] = useState("");
  const [subType, setSubType] = useState("");
  const [isCollapse, setIsCollapse] = useState(false);
  const [detailInfo, setDetailInfo] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [uploadImageList, setUpLoadImageList] = useState([]);
  //银行类型
  const [bankType, setBankType] = useState("1");

  const setCool = () => {
    setIsCollapse(!isCollapse);
  };
  useEffect(() => {
    if (isCollapse) {
      setCoolHeight("1080rpx");
    } else {
      setCoolHeight("450rpx");
    }
  }, [isCollapse]);
  useEffect(() => {
    if (router.params.orderId) {
      setOrderId(router.params.orderId);
      let dataInfo = [];
      instance
        .get("/LoanOrder/findOrderDetail", {
          params: { orderId: router.params.orderId },
        })
        .then((res) => {
          dataInfo.push(
            {
              title: "常规信息",
              info: [
                { key: "实际经销商", value: res.data.data.dealerName },
                { key: "系统经销商", value: res.data.data.sysDealerName },
                { key: "区域", value: res.data.data.Zone },
                { key: "所属支行", value: res.data.data.subBranch },
                { key: "店面属性", value: res.data.data.storeAtt },
                { key: "所属团队", value: res.data.data.Team },
                { key: "产品名称", value: res.data.data.Product },
                { key: "期限", value: res.data.data.financeMonth },
                { key: "费率", value: res.data.data.productRate },
                { key: "还款方式", value: res.data.data.Repayent },
              ],
              id: 0,
            },
            {
              title: "客户信息",
              isMortgage: true,
              info: [
                {
                  key: "客户主体",
                  value: res.data.data.isPerson,
                  isMortgage: true,
                },
                {
                  key: "客户姓名",
                  value: res.data.data.customerName,
                  isMortgage: true,
                },
                {
                  key: "身份证号",
                  value: res.data.data.customerIdCard,
                  isMortgage: true,
                },
                {
                  key: "手机号",
                  value: res.data.data.customerTel,
                  isMortgage: true,
                },
                { key: "婚姻状况", value: res.data.data.maritalStatus },
                { key: "住房地址", value: res.data.data.residenceAddress },
                { key: "联系人", value: res.data.data.contactsName },
                { key: "联系人电话", value: res.data.data.contactsTel },
                { key: "单位全称", value: res.data.data.companyName },
                { key: "部门职务", value: res.data.data.department },
                { key: "入职时间", value: res.data.data.entryDate },
                { key: "月收入", value: res.data.data.monthlypay },
                { key: "单位地址", value: res.data.data.companyAddress },
                {
                  key: "是否抵押",
                  value: res.data.data.ismortgage === "1" ? "是" : "否",
                },
              ],
              id: 1,
            },
            {
              title: "车辆信息",
              isMortgage: true,
              info: [
                {
                  key: "车辆品牌",
                  value: res.data.data.brandName,
                  isMortgage: true,
                },
                {
                  key: "车辆型号",
                  value: res.data.data.modelName,
                  isMortgage: true,
                },
                {
                  key: "新能源",
                  value: res.data.data.isnewEnergy,
                  isMortgage: true,
                },
                {
                  key: "开票价",
                  value: res.data.data.totalAmount,
                  isMortgage: true,
                },
                {
                  key: "贷款额",
                  value: res.data.data.loanAmount,
                  isMortgage: true,
                },
                {
                  key: "负债情况",
                  value: res.data.data.liabilityMemo,
                  isMortgage: true,
                },
                {
                  key: "居住年限",
                  value: res.data.data.residenceYear,
                  isMortgage: true,
                },
                {
                  key: "从业年限",
                  value: res.data.data.obtainYear,
                  isMortgage: true,
                },
              ],
              id: 2,
            }
          );
          setDetailInfo(dataInfo);
          setOrderNumber(res.data.data.orderNumber);
          switch (res.data.data.orderStatus) {
            case 1:
              setBgImage(successBg);
              setTopIcon(success);
              setSubType("您的订单已提交，请等待审核");
              setInfoType("已提交");
              break;
            case 3:
              setInfoType("已拒绝");
              setBgImage(refuseBg);
              setTopIcon(refuse);
              setSubType("您的订单被拒绝，请及时查看原因");
              break;
            case 5:
              setInfoType("已通过");
              setBgImage(postalDetailBg);
              setTopIcon(success);
              setSubType("您的所提交的订单已通过");
              break;
            case 7:
              setInfoType("待补充");
              setBgImage(supplementBg);
              setTopIcon(supplement);
              setSubType("您的订单未补齐资料");
              break;
            case 9:
              setInfoType("已放款");
              setSubType("您的所提交的订单已放款");
              if (router.params.type === "true") {
                let showData = [];
                showData.push(
                  {
                    title: "客户信息",
                    isMortgage: true,
                    info: [
                      { key: "客户主体", value: res.data.data.isPerson },
                      { key: "客户姓名", value: res.data.data.customerName },
                      { key: "身份证号", value: res.data.data.customerIdCard },
                      { key: "手机号", value: res.data.data.customerTel },
                    ],
                    id: 1,
                  },
                  {
                    title: "车辆信息",
                    isMortgage: true,
                    info: [
                      { key: "车辆品牌", value: res.data.data.brandName },
                      { key: "车辆型号", value: res.data.data.modelName },
                      { key: "开票价", value: res.data.data.totalAmount },
                      { key: "贷款额", value: res.data.data.loanAmount },
                      { key: "负债情况", value: res.data.data.liabilityMemo },
                      { key: "居住年限", value: res.data.data.residenceYear },
                      { key: "从业年限", value: res.data.data.obtainYear },
                    ],
                    id: 2,
                  }
                );
                if (!res.data.data.mortgageStatus) {
                  setInfoType("未抵押");
                  setSubType("请上传您的产本资料");
                  setBgImage(mortgageBg);
                  setTopIcon(mortgage);
                  setDetailInfo(showData);
                }
                if (res.data.data.mortgageStatus === 1) {
                  setInfoType("待审核");
                  setSubType("您上传的产本信息正在审核中");
                  setBgImage(mortgageBg);
                  setTopIcon(mortgage);
                  setDetailInfo(showData);
                  let imgList = res.data.data.mortgagePic.split(",");
                  for (let i = 0; i < imgList.length; i++) {
                    imgList[
                      i
                    ] = `https://img.shqili.net/uploadfile/mortgageimg/${imgList[i]}`;
                  }
                  setImageList(imgList);
                }
                if (res.data.data.mortgageStatus === 3) {
                  setInfoType("已退回");
                  setSubType("您的产本信息审核未通过，请重新上传");
                  setBgImage(mortgageBg);
                  setTopIcon(mortgage);
                  setDetailInfo(showData);
                }
              }
              if (router.params.code === "true") {
                setInfoType("已抵押");
                setSubType("您的所提交的订单已通过审核");
              }
              setBgImage(LendersBg);
              setTopIcon(Lenders);
              break;
            case 12:
              setInfoType("已退车");
              setBgImage(returnCarBg);
              setTopIcon(returnCar);
              setSubType("您的所提交的订单已退车");
              break;
            case 15:
              setInfoType("已结清");
              setBgImage(settleBg);
              setTopIcon(settle);
              setSubType("您的所提交的贷款订单已结清");
              break;
            case "已抵押":
              setBgImage(successBg);
              setTopIcon(success);
              setSubType("您的所提交的贷款订单已通过审核");
              break;
            case "未抵押":
              setBgImage(mortgageBg);
              setTopIcon(mortgage);
              // setDetailInfo(isMortgageData);
              setSubType("请上传您的产本资料");
              break;
          }
        })
        .catch((error) => {
          Taro.showToast({
            title: error,
            duration: 3000,
            icon: "none",
          });
        });
    }
  }, [router]);
  const handleRadioChange = (event) => {
    console.log("选中的值：", event.detail.value);
    setBankType(event.detail.value);
  };
  const uploadImage = () => {
    if (imageList.length < 2) {
      Taro.chooseImage({
        count: 2,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: function (res) {
          console.log(res);
          setImageList((s) => [...s, ...res.tempFilePaths]);
          Taro.uploadFile({
            url: "https://img.shqili.net/post/upimg.ashx",
            filePath: res.tempFilePaths.toString(),
            formData: {
              contractNumber: "6198932Q123126387474",
            },
            name: "file",
            success(res) {
              console.log(res);
              if (res.statusCode === 200) {
                let arr = [...uploadImageList];
                arr.push(res.data);
                setUpLoadImageList(arr);
                Taro.showToast({
                  title: "上传成功",
                  icon: "success",
                  duration: 2000,
                });
              }
            },
          });
        },
      });
    } else {
      Taro.showToast({
        title: "最多只能上传两张",
        icon: "none",
        duration: 2000,
      });
    }
  };
  const preview = (index) => {
    Taro.previewImage({
      current: index,
      urls: imageList,
    });
  };
  //上传产本
  const uploadProductionCost = () => {
    instance
      .get("/LoanOrder/uploadsave", {
        params: {
          orderNumber: orderNumber,
          mortgageType: bankType,
          upfileList: uploadImageList.toString(),
          openId: Taro.getStorageSync("openId"),
        },
      })
      .then((res) => {
        console.log(res);
      });
  };
  const del = (event) => {
    event.stopPropagation();
    let list = [...imageList];
    list.splice(event.currentTarget.dataset.index, 1);
    setImageList(list);
  };
  return (
    <View className="wrap">
      <Navigator title={""} bgColor="none" position="absolute" />
      <View
        className="navgationTop"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Image className="icon" src={topIcon}></Image>
        <View className="title">
          <View className="top">{infoType}</View>
          <View className="bottom">{subType}</View>
        </View>
      </View>
      <View
        className="detail_content"
        style={{
          height:
            infoType === "未抵押" ||
            infoType === "待审核" ||
            infoType === "已退回"
              ? coolHeight
              : "",
        }}
      >
        {detailInfo &&
          detailInfo.map((item) => {
            return (
              <View className="info">
                <View className="title">
                  <View className="titleIcon"></View>
                  <Text>{item.title}</Text>
                </View>
                {item.info &&
                  item.info.map((k) => {
                    return (
                      <>
                        <View className="item">
                          <View className="label">{k.key}</View>
                          <View className="value">
                            {k.key === "身份证号"
                              ? maskMiddleDigits(k.value)
                              : k.value}
                          </View>
                          {k.key === "身份证号" && (
                            <View
                              className="copy"
                              onClick={() => copyTextToClipboard(k.value)}
                            >
                              复制
                            </View>
                          )}
                          {k.key === "手机号" && (
                            <Image
                              className="call"
                              src={call}
                              data-mobile={k.value}
                              onClick={callPhone}
                            ></Image>
                          )}
                        </View>
                      </>
                    );
                  })}
                {(infoType === "未抵押" ||
                  infoType === "待审核" ||
                  infoType === "已退回") &&
                  item.title === "客户信息" &&
                  !isCollapse && (
                    <View className="Collapse" onClick={setCool}>
                      展开
                    </View>
                  )}
                {(infoType === "未抵押" ||
                  infoType === "待审核" ||
                  infoType === "已退回") &&
                  item.title === "车辆信息" &&
                  isCollapse && (
                    <View className="Collapse" onClick={setCool}>
                      收起
                    </View>
                  )}
              </View>
            );
          })}
      </View>
      {(infoType === "未抵押" ||
        infoType === "待审核" ||
        infoType === "已退回") && (
        <View className="imgUploda">
          <View className="title">
            <View className="titleIcon"></View>
            <Text>上传产本</Text>
          </View>
          <View className="imgItem">
            <View className="label">银行类型</View>
            <RadioGroup
              style={{
                width: "480rpx",
                display: "flex",
                justifyContent: "space-evenly",
              }}
              onChange={handleRadioChange}
            >
              <Radio
                value="1"
                checked={bankType === "1" ? true : false}
                style={{ transform: "scale(0.8)" }}
                color="#19B56A"
              >
                银行抵押
              </Radio>
              <Radio
                style={{ transform: "scale(0.8)" }}
                color="#19B56A"
                value="2"
                checked={bankType === "2" ? true : false}
              >
                自主抵押
              </Radio>
            </RadioGroup>
          </View>
          <View className="labels">
            <View className="requerd">*</View>
            上传产本附件
          </View>
          <View className="imgWrap">
            {imageList &&
              imageList.map((item, index) => {
                return (
                  <Image
                    onClick={() => preview(index)}
                    src={item}
                    className="img"
                  >
                    <View
                      className="del"
                      data-index={index}
                      style={{ backgroundImage: `url(${delImage})` }}
                      onClick={del}
                    ></View>
                  </Image>
                );
              })}
            <View className="img">
              <Image onClick={uploadImage} src={upload}></Image>
            </View>
          </View>
        </View>
      )}
      {(infoType === "未抵押" || infoType === "已退回") && (
        <View className="btn" onClick={uploadProductionCost}>
          上传产本
        </View>
      )}
    </View>
  );
};

export default PostalDetail;
