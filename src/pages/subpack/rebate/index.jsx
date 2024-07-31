import React, { useEffect, useState } from "react";
import {
  View,
  Input,
  Image,
  Text,
  Form,
  Radio,
  RadioGroup,
  Picker,
  Button,
} from "@tarojs/components";
import Navigator from "../../../components/navigationTap";
const searchIcon =
  "https://post.pkfeng.net/assets/postalsavings/searchIcon.png";
const dropDown = "https://post.pkfeng.net/assets/home/dropDown.png";
const scan = "https://post.pkfeng.net/assets/postalsavings/scan.png";
import Modal from "../../../components/showModal";
import { getCurrentInstance } from "@tarojs/runtime";
import "./index.scss";
import Taro from "@tarojs/taro";
import instance from "../../../API/request";

const Rebate = () => {
  const { router } = getCurrentInstance();
  //是否为退回返利
  const [isReturn, setIsReturn] = useState(false);
  //表单提交弹窗显示状态
  const [code, setCode] = useState(null);
  //私户数据列表
  const [partitionList, setPartitionList] = useState([]);
  //增加的发票数据
  const [invoicesList, setInvoicesList] = useState([]);
  //客户姓名搜索关键词
  const [keyWords, setKeyWords] = useState("");
  //客户姓名列表
  const [nameList, setNameList] = useState([]);
  //私户账户搜索关键词
  const [accountKey, setAccountKey] = useState("");
  //公户账户搜索关键词
  const [accountKey_P, setAccountKey_P] = useState("");
  //表单提交返回消息
  const [submitMessage, setSubmitMessage] = useState("");
  //表单提交状态
  const [markStatus, setMarkStatus] = useState("");
  // 返利退回哈希值
  const [rebateHash, setRebateHash] = useState("");
  //发票下拉数据
  const InvoiceTypeList = [
    {
      receiptType: "普通发票",
      taxrate: 0.94,
      realtaxrate: 0.06,
    },
    {
      receiptType: "专票 3%",
      taxrate: 0.97,
      realtaxrate: 0.03,
    },
    {
      receiptType: "专票 6%",
      taxrate: 1,
      realtaxrate: 0.06,
    },
    {
      receiptType: "专票 1%",
      taxrate: 0.95,
      realtaxrate: 0.01,
    },
  ];
  //表单数据
  const [formData, setFormData] = useState({
    rebateType: 1,
    financeMonth: "",
    ismortgage: "",
    loanAmount: "",
    orderNumber: "",
    privateAmount: "",
    productRate: "",
    publicAmount: "",
    realDealerName: "",
    rebateAmount: "",
    rebateId: "",
    rebatePAmount: "",
    rebatePriceAmount: "",
    rebateRAmount: "",
    salerName: "",
    tenant: "",
    corpAccount: "",
    corpBank: "",
  });
  //发票类型选中项
  const [invoiceType, setInvoiceType] = useState(
    InvoiceTypeList[0].receiptType
  );
  //接口返回返利数据列表
  const [dataList, setDataList] = useState(null);
  //选中客户
  const [name, setName] = useState(nameList[0]);
  //私户数量
  const [privateNum, setPrivateNum] = useState(0);
  //发票数量
  const [invoicesNum, setInvoicesNum] = useState(0);
  //添加发票总列表数据
  const [invoiceNumberList, setInvoiceNumberList] = useState([]);
  //选中的客户索引
  const [chooseActive, setChooseActive] = useState(0);
  //发票汇率
  const [invoiceRate, setInvoiceRate] = useState(InvoiceTypeList[0].taxrate);
  //查询私户数据
  const [personData, setPersonData] = useState([]);
  //退回公户数据
  const [returnCorp, setReturnCorp] = useState(null);
  //动态修改发票汇率
  useEffect(() => {
    switch (invoiceType) {
      case "普通发票":
        setInvoiceRate(InvoiceTypeList[0].taxrate);
        break;
      case "专票 3%":
        setInvoiceRate(InvoiceTypeList[1].taxrate);
        break;
      case "专票 6%":
        setInvoiceRate(InvoiceTypeList[2].taxrate);
        break;
      case "专票 1%":
        setInvoiceRate(InvoiceTypeList[3].taxrate);
        break;
    }
  }, [invoiceType]);
  //私户转账金额数组
  const [mountData, setMountData] = useState([]);
  useEffect(() => {
    if (router.params.name) {
      setKeyWords(router.params.name);
      setIsReturn(true);
    }
  }, [router]);
  //客户姓名下拉事件
  const selChange = (e) => {
    setChooseActive(e.detail.value);
    setName(nameList[e.detail.value]);
  };
  //公户发票总金额计算校验
  const amountVerify = () => {
    if (invoicesNum) {
      let sum = 0;
      for (const item of invoiceNumberList) {
        item.amount = Number(item.amount);
        sum += item.amount;
      }
      console.log(sum, invoicesNum, formData.rebatePAmount);

      // if (sum > Number(formData.rebatePAmount)) {
      //   Taro.showToast({
      //     title: "发票合计超出！",
      //     icon: "error",
      //   });
      // }
      // if (sum < Number(formData.rebatePAmount)) {
      //   Taro.showToast({
      //     title: "发票合计金额小于转账金额,请仔细核对！",
      //     icon: "error",
      //   });
      // }
    }
  };
  useEffect(() => {
    let arr = [];
    for (let i = 0; i < privateNum; i++) {
      arr.push(dataList ? dataList.rebateRAmount / privateNum : "");
    }
    setMountData(arr);
  }, [privateNum]);
  //发票数量监听 总金额计算校验
  useEffect(() => {
    if (invoiceNumberList.length > 0) {
      amountVerify();
    }
  }, [invoiceNumberList]);
  //增加私户
  const add = () => {
    if (privateNum < 5) {
      setPrivateNum((s) => s + 1);
      setPartitionList((s) => [...s, s.length + 1]);
    }
  };
  //减少私户;
  const minus = () => {
    if (privateNum > 0) {
      setPrivateNum((s) => s - 1);
      setPartitionList((s) => s.slice(0, s.length - 1));
    }
  };
  //接口返回返利数据赋值
  useEffect(() => {
    if (dataList) {
      setData(dataList);
    }
  }, [dataList]);
  //切换用户名称后更换对应的返利内容
  useEffect(() => {
    if (dataList) {
      setData(dataList);
    }
  }, [chooseActive]);
  //增加发票
  const addInvoices = () => {
    setInvoicesNum((s) => s + 1);
    setInvoicesList((s) => [...s, s.length + 1]);
  };
  //减少私户;
  const minusInvoices = () => {
    if (invoicesNum > 0) {
      setInvoicesNum((s) => s - 1);
      setInvoicesList((s) => s.slice(0, s.length - 1));
    }
  };
  //表单提交
  const formSubmit = (e) => {
    console.log(e);
    Taro.showModal({
      content: "此页面所有信息是否已核对?",
      success: function (res) {
        if (res.confirm) {
          console.log("用户点击确定");
          //返利消息模板
          Taro.requestSubscribeMessage({
            tmplIds: [
              "ahLdjiWijVlu2CuZvJ4z-AQ2GcfQEMXw6UzAAV43dlE",
              "y8XMNO_Hx3vsiWEsvZk2GjAgL88hktEuiSAUskqXZwY",
            ],
            success: function (res) {
              console.log(res);
              // 发票数组
              let arr = [];
              let amountArr = [];
              for (const item of invoiceNumberList) {
                arr.push(item.invoiceNumber);
                amountArr.push(item.amount);
              }
              if (dataList) {
                let data = {
                  orderNumber: dataList.orderNumber, //返利合同编号（数组） 重新赋值数组
                  rebateId: dataList.rebateId, //返利ID（数组） 重新赋值数组
                  openId: "ouZj94p6M-SRcZZKF7LCjGmbJfOg", //微信openID 重新赋值
                  invoiceCode: arr, //发票 代码（数组）
                  invoiceQrcode: "", //电子发票二维码（数组）
                  invoiceTAmount: amountArr, //发票金额
                  rebateHash: isReturn ? rebateHash : "", //初次提交未空
                  paccountCount: "1", //公户账户数量
                  corptaxrate:
                    InvoiceTypeList[
                      InvoiceTypeList.findIndex(
                        (item) =>
                          item.receiptType === e.detail.value.receiptType
                      )
                    ].taxrate, //参考发票类型
                  corprealTaxrate:
                    InvoiceTypeList[
                      InvoiceTypeList.findIndex(
                        (item) =>
                          item.receiptType === e.detail.value.receiptType
                      )
                    ].realtaxrate,
                  attach: "", //附件 -s
                  corpAccount: e.detail.value.corpAccount,
                  corpBank: e.detail.value.corpBank,
                };
                data = Object.assign(data, e.detail.value);
                data["orderNumber"] = dataList.orderNumber;
                data = { redateData: data };
                console.log(data);
                if (data.corpAccount !== "" && data.corpBank !== "") {
                  instance
                    .post("/RebateOrder/rebatesave", data)
                    .then((res) => {
                      if (res.data.code === 200) {
                        setSubmitMessage(res.data.message);
                        setMarkStatus("success");
                        setCode(true);
                      } else {
                        setSubmitMessage(res.data.message);
                        setMarkStatus("none");
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                      Taro.showToast({
                        title: err,
                        icon: "error",
                      });
                    });
                } else {
                  Taro.showToast({
                    title: "请输入表单数据！",
                    icon: "error",
                  });
                }
              } else {
                Taro.showToast({
                  title: "请输入表单数据！",
                  icon: "error",
                });
              }
            },
          });
        } else if (res.cancel) {
          console.log("用户点击取消");
        }
      },
    });
  };
  //关闭表单提交弹窗
  const close = () => {
    setCode(false);
    Taro.redirectTo({
      url: "/pages/subpack/rebatelist/index",
    });
  };
  //发票扫码
  const scanCode = () => {
    Taro.scanCode({
      success: (res) => {
        console.log(res);
        let dataArr = res.result.split(",");
        let invoiceNumber = dataArr[3];
        let amount = dataArr[4];
        let arr = [];
        arr.push({ invoiceNumber: invoiceNumber, amount: amount });
        setInvoiceNumberList(arr);
        amountVerify();
      },
    });
  };
  //账户查询
  const searchAccount = (type) => {
    let url = "/RebateOrder/finddealeraccount";
    let data = "";
    if (type === "R") {
      data = {
        account: accountKey,
        accountName: formData.realDealerName,
        accountType: 2,
      };
    }
    if (type === "P") {
      data = {
        account: accountKey_P,
        accountName: formData.realDealerName,
        accountType: 1,
      };
    }

    instance
      .get(url, {
        params: data,
      })
      .then((res) => {
        if (res.data.code === 200) {
          setPersonData((s) => [...s, res.data.data]);
          if (type === "R") setAccountKey("");
          if (type === "P") setAccountKey_P("");
        } else {
          Taro.showToast({
            title: res.data.message,
            icon: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Taro.showToast({
          title: err,
          icon: "error",
        });
      });
  };

  //赋值
  const setData = (dataList) => {
    setFormData((s) => ({
      ...s,
      financeMonth: dataList.financeMonth[chooseActive],
      ismortgage:
        dataList.ismortgage[chooseActive] === "1" ? "已抵押" : "未抵押",
      loanAmount: dataList.loanAmount[chooseActive],
      orderNumber: dataList.orderNumber[chooseActive],
      privateAmount: dataList.privateAmount[chooseActive],
      productRate: dataList.productRate[chooseActive],
      publicAmount: dataList.publicAmount[chooseActive],
      realDealerName: dataList.realDealerName[chooseActive],
      rebateAmount: dataList.rebateAmount[chooseActive],
      rebateId: dataList.rebateId[chooseActive],
      rebatePAmount: dataList.rebatePAmount,
      rebatePriceAmount: dataList.rebatePriceAmount,
      rebateRAmount: dataList.rebateRAmount,
      salerName: dataList.salerName[chooseActive],
      tenant: dataList.tenant[chooseActive],
    }));
    if (dataList.rebateRAmount > 0) {
      add();
    }
  };
  //客户姓名输入框赋值
  const searchData = (e) => {
    setKeyWords(e.detail.value);
  };
  //客户姓名搜索关键词数据请求
  useEffect(() => {
    if (keyWords != "") {
      instance
        .get("/RebateOrder/findrebate", {
          params: {
            custName: keyWords,
            openid: Taro.getStorageSync("openid"),
            salerId: Taro.getStorageSync("salerId"),
            rebateType: formData.rebateType,
          },
        })
        .then((res) => {
          if (res.data.code === 200) {
            //客户姓名数组
            setNameList(res.data.data.tenant);
            //总数据备份
            setDataList(res.data.data);
            setRebateHash(res.data.data.rebateHash);
            if (isReturn) {
              //私户信息
              let data = "";
              let mountArr = [];
              for (let i = 1; i < 6; i++) {
                if (res.data.data[`personlName${i}`]) {
                  data = {
                    personlAccount: res.data.data[`personlAccount${i}`],
                    personlBank: res.data.data[`personlBank${i}`],
                    personlDNum: res.data.data[`personlDNum${i}`],
                    personlMobile: res.data.data[`personlMobile${i}`],
                    personlName: res.data.data[`personlName${i}`],
                    personlaMount: res.data.data[`personlaMount${i}`],
                  };
                  mountArr.push(res.data.data[`personlaMount${i}`]);
                  console.log(data);
                  setPersonData((s) => [...s, data]);
                  setMountData(mountArr);
                  add();
                }
              }
              //退回后公户账户以及开户行
              setReturnCorp({
                corpAccount: res.data.data.corpAccount,
                corpBank: res.data.data.corpBank,
              });
              //发票数量
              let arr = [];
              for (let j = 0; j < res.data.data.invoiceCArray.length; j++) {
                addInvoices();
                arr.push({
                  invoiceNumber: res.data.data.invoiceCArray[j],
                  amount: res.data.data.invoiceTArray[j],
                });
                setInvoiceNumberList(arr);
              }
            }
          } else {
            Taro.showToast({
              title: res.data.message,
              icon: "none",
              duration: 2000,
            });
          }
        })
        .catch((err) => {
          Taro.showToast({
            title: err,
            icon: "none",
            duration: 2000,
          });
        });
    }
  }, [keyWords]);
  return (
    <View className="wrapper">
      <Navigator title={"返利申请"} />
      <View className="topInput">
        <Input
          placeholderClass="placeHorderStyle"
          placeholder="输入客户姓名查询"
          value={keyWords}
          onInput={searchData}
        />
        <Image src={searchIcon}></Image>
      </View>
      <View className="formContent">
        <Form onSubmit={formSubmit}>
          <View className="formItem">
            <View className="info">
              <View className="label">返利类型</View>
              <RadioGroup style={{ marginLeft: "auto" }} name="rebateType">
                <Radio
                  color="#19B56A"
                  checked={formData.rebateType === 1}
                  style={{
                    transform: "scale(0.8)",
                    margin: "0 16rpx 0 0",
                  }}
                  value="1"
                />
                <Text className="radioLabel">正常</Text>
                <Radio
                  color="#19B56A"
                  style={{
                    transform: "scale(0.8)",
                    margin: "0 16rpx 0 40rpx",
                  }}
                  checked={formData.rebateType === 2}
                  value="2"
                />
                <Text className="radioLabel">特殊</Text>
              </RadioGroup>
            </View>
            <View className="info">
              <View className="label">车商名称</View>
              <Input
                disabled={true}
                className="inp"
                value={formData.realDealerName}
                name="dealerName"
              ></Input>
            </View>
            <View className="info">
              <View className="label">合同编号</View>
              <Input
                disabled={true}
                className="inp"
                value={formData.orderNumber}
                name="orderNumber"
              ></Input>
            </View>
            <View className="info">
              <View className="label">客户姓名</View>
              <Picker
                style={{ marginLeft: "auto" }}
                mode="selector"
                range={nameList}
                onChange={selChange}
                name="tenant"
              >
                <View className="picker">
                  <Input
                    value={formData.tenant}
                    disabled={true}
                    name="tenant"
                    className="inpText"
                  />
                  <Image className="search" src={dropDown}></Image>
                </View>
              </Picker>
            </View>
            <View className="info">
              <View className="label">销售姓名</View>
              <Input
                disabled={true}
                className="inp"
                name="salerName"
                value={formData.salerName}
              ></Input>
            </View>
            <View className="info">
              <View className="label">是否抵押</View>
              <Input
                disabled={true}
                className="inp"
                name="ismortgage"
                value={formData.ismortgage}
              ></Input>
            </View>
            <View className="info">
              <View className="label">贷款期限</View>
              <Input
                disabled={true}
                className="inp"
                name="financeMonth"
                value={formData.financeMonth}
              ></Input>
            </View>
            <View className="info">
              <View className="label">贷款金额</View>
              <Input
                disabled={true}
                className="inp"
                name="loanAmount"
                value={formData.loanAmount}
              ></Input>
            </View>
            <View className="info">
              <View className="label">对公返利</View>
              <Input
                disabled={true}
                className="inp"
                name="publicAmount"
                value={formData.publicAmount}
              ></Input>
            </View>
            <View className="info">
              <View className="label">对私返利</View>
              <Input
                disabled={true}
                className="inp"
                name="privateAmount"
                value={formData.privateAmount}
              ></Input>
            </View>
          </View>
          <View className="partition">返利合计</View>
          <View className="formItem">
            <View className="info">
              <View className="label">返利客户</View>
              <Input
                disabled={true}
                className="inp"
                value={`共计  ${nameList ? nameList.length : 0}  单`}
              ></Input>
            </View>
            <View className="info">
              <View className="label">对公总款</View>
              <Input
                disabled={true}
                className="inp"
                name="rebatePAmount"
                value={formData.rebatePAmount}
              ></Input>
            </View>
            <View className="info">
              <View className="label">对私总款</View>
              <Input
                disabled={true}
                className="inp"
                name="rebateRAmount"
                value={formData.rebateRAmount}
              ></Input>
            </View>
            <View className="info">
              <View className="label">添加私户</View>
              <View className="numContent">
                <View className="minus" onClick={minus}>
                  -
                </View>
                <Input
                  disabled={true}
                  className="num"
                  name="accountCount"
                  value={privateNum}
                ></Input>
                <View className="add" onClick={add}>
                  +
                </View>
              </View>
            </View>
          </View>
          {/* {formData.rebatePAmount > 0 ? (
            <> */}
          <View className="partition">公户信息</View>
          <View className="formItem">
            <View className="info">
              <View className="label">电子发票</View>
              <RadioGroup style={{ marginLeft: "auto" }} name="iseleReceipt">
                <Radio
                  color="#19B56A"
                  checked
                  style={{
                    transform: "scale(0.8)",
                    margin: "0 16rpx 0 0",
                  }}
                  value="1"
                />
                <Text className="radioLabel">是</Text>
                <Radio
                  color="#19B56A"
                  style={{
                    transform: "scale(0.8)",
                    margin: "0 16rpx 0 40rpx",
                  }}
                  value="2"
                />
                <Text className="radioLabel">否</Text>
              </RadioGroup>
            </View>
            <View className="info">
              <View className="label">开票类型</View>
              <Picker
                style={{ marginLeft: "auto" }}
                mode="selector"
                range={InvoiceTypeList}
                onChange={(e) => {
                  setInvoiceType(InvoiceTypeList[e.detail.value].receiptType);
                }}
                rangeKey="receiptType"
              >
                <View className="picker">
                  <Input
                    value={invoiceType}
                    disabled={true}
                    className="inpText"
                    name="receiptType"
                  />
                  <Image className="search" src={dropDown}></Image>
                </View>
              </Picker>
            </View>
            <View className="info">
              <View className="label">账户</View>
              {!isReturn && (
                <>
                  <Input
                    className="inp"
                    style={{ padding: "0 50rpx 0 0" }}
                    name="corpAccount"
                    value={formData.corpAccount}
                    onInput={(e) =>
                      setFormData((s) => ({
                        ...s,
                        corpAccount: e.detail.value,
                      }))
                    }
                  ></Input>
                  <Image
                    className="find"
                    src={searchIcon}
                    onClick={() => searchAccount("P")}
                  ></Image>
                </>
              )}
              {isReturn && (
                <Input
                  className="inp"
                  value={returnCorp ? returnCorp.corpAccount : ""}
                  name="corpAccount"
                  onInput={(e) =>
                    setReturnCorp((prevState) => ({
                      ...prevState,
                      corpAccount: e.detail.value,
                    }))
                  }
                ></Input>
              )}
            </View>
            <View className="info">
              <View className="label">账户名</View>
              <Input
                disabled={true}
                className="inp"
                value={formData.realDealerName}
                name="corpName"
              ></Input>
            </View>
            <View className="info">
              <View className="label">开户行</View>
              {!isReturn && (
                <Input
                  className="inp"
                  name="corpBank"
                  value={formData.corpBank}
                  onInput={(e) =>
                    setFormData((s) => ({
                      ...s,
                      corpBank: e.detail.value,
                    }))
                  }
                ></Input>
              )}
              {isReturn && (
                <Input
                  className="inp"
                  value={returnCorp ? returnCorp.corpBank : ""}
                  name="corpBank"
                  onInput={(e) =>
                    setReturnCorp((prevState) => ({
                      ...prevState,
                      corpBank: e.detail.value,
                    }))
                  }
                ></Input>
              )}
            </View>
            <View className="info">
              <View className="label">转账金额</View>
              <Input
                disabled={true}
                className="inp"
                name="corpaMount"
                value={(formData.rebatePAmount * invoiceRate).toFixed(2) * 1}
              ></Input>
            </View>
            <View className="info">
              <View className="label">回执申请</View>
              <RadioGroup style={{ marginLeft: "auto" }} name="rebateVoucher">
                <Radio
                  color="#19B56A"
                  checked
                  style={{
                    transform: "scale(0.8)",
                    margin: "0 16rpx 0 0",
                  }}
                  value="1"
                />
                <Text className="radioLabel">是</Text>
                <Radio
                  color="#19B56A"
                  style={{
                    transform: "scale(0.8)",
                    margin: "0 16rpx 0 40rpx",
                  }}
                  value="2"
                />
                <Text className="radioLabel">否</Text>
              </RadioGroup>
            </View>
            <View className="info">
              <View className="label">发票数量</View>
              <View className="numContent">
                <View className="minus" onClick={minusInvoices}>
                  -
                </View>
                <Input
                  disabled={true}
                  className="num"
                  name="invoiceCount"
                  value={invoicesNum}
                ></Input>
                <View className="add" onClick={addInvoices}>
                  +
                </View>
              </View>
            </View>
            {invoicesList.map((item, index) => {
              return (
                <View className="info">
                  <View className="label">发票号码</View>
                  <Input
                    value={
                      invoiceNumberList[index]
                        ? invoiceNumberList[index].invoiceNumber
                        : ""
                    }
                    className="inp"
                  ></Input>
                  <Image
                    className="search"
                    onClick={scanCode}
                    src={scan}
                  ></Image>
                </View>
              );
            })}
          </View>
          {/* </>
          ) : (
            ""
          )} */}

          {partitionList.map((item, index) => {
            return (
              <>
                <View className="partition">{`私户信息${index + 1}`}</View>
                <View className="formItem" style={{ marginTop: "30rpx" }}>
                  <View className="info">
                    <View className="label">账户</View>
                    <Input
                      style={{ padding: "0 50rpx 0 0" }}
                      className="inp"
                      name={`accountNumber${index + 1}`}
                      value={
                        personData[index]
                          ? personData[index].personlAccount
                          : accountKey
                      }
                      onInput={(e) => {
                        setAccountKey(e.detail.value);
                      }}
                    ></Input>
                    <Image
                      className="find"
                      src={searchIcon}
                      onClick={() => searchAccount("R")}
                    ></Image>
                  </View>
                  <View className="info">
                    <View className="label">账户名</View>
                    <Input
                      className="inp"
                      name={`accountName${index + 1}`}
                      value={
                        personData[index] ? personData[index].personlName : ""
                      }
                    ></Input>
                  </View>
                  <View className="info">
                    <View className="label">证件号</View>
                    <Input
                      className="inp"
                      name={`actualPersonIDNum${index + 1}`}
                      value={
                        personData[index] ? personData[index].personlDNum : ""
                      }
                    ></Input>
                  </View>
                  <View className="info">
                    <View className="label">手机号</View>
                    <Input
                      className="inp"
                      name={`actualPersonMobile${index + 1}`}
                      value={
                        personData[index] ? personData[index].personlMobile : ""
                      }
                    ></Input>
                  </View>
                  <View className="info">
                    <View className="label">转账金额</View>
                    {!isReturn && (
                      <Input
                        className="inp"
                        name={`aMount${index + 1}`}
                        value={mountData[index]}
                      ></Input>
                    )}
                    {isReturn && (
                      <Input
                        className="inp"
                        name={`aMount${index + 1}`}
                        value={mountData[index] ? mountData[index] : ""}
                        onInput={(e) => {
                          let data = [...mountData];
                          data[index] = e.detail.value;
                          setMountData(data);
                        }}
                      ></Input>
                    )}
                  </View>
                  <View className="info">
                    <View className="label">备注</View>
                    <Input placeholder="备注信息" className="inp"></Input>
                  </View>
                </View>
              </>
            );
          })}
          <Button className="subMit" type="primary" formType="submit">
            提交申请
          </Button>
        </Form>
        {/* 弹窗组件 */}
        <Modal
          isOpen={code}
          sure={() => close()}
          closeHandle={() => close()}
          type={markStatus}
          subTitle={submitMessage}
          sureText="确定"
        />
      </View>
    </View>
  );
};

export default Rebate;
