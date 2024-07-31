import React, { useEffect, useState } from "react";
import { View, Image, Picker, Input } from "@tarojs/components";
import Navigator from "../../../components/navigationTap";
import { getCurrentInstance } from "@tarojs/runtime";
import Taro from "@tarojs/taro";
const success = "https://post.pkfeng.net/assets/postalsavings/success.png";
const settle = "https://post.pkfeng.net/assets/postalsavings/settle.png";
const settleBg = "https://post.pkfeng.net/assets/postalsavings/settleBg.png";
const postalDetailBg =
  "https://post.pkfeng.net/assets/postalsavings/successBg.png";
const call = "https://post.pkfeng.net/assets/postalsavings/call.png";
const return_bg = "https://post.pkfeng.net/assets/postalsavings/return-bg.png";
const dropDown = "https://post.pkfeng.net/assets/home/dropDown.png";
import { callPhone } from "../../../until/untils";
import "./index.scss";
import instance from "../../../API/request";
const PostalDetail = () => {
  const { router } = getCurrentInstance();
  const [infoType, setInfoType] = useState("");
  const [topIcon, setTopIcon] = useState("");
  const [bgImage, setBgImage] = useState("");
  const [subType, setSubType] = useState("");
  const [isReturn, setIsReturn] = useState(false);
  const [select, setSelect] = useState(0);
  const [name, setName] = useState("");

  //客户姓名列表
  const [nameList, setNameList] = useState([]);
  const [detailInfo, setDetailInfo] = useState([
    {
      info: [],
      id: 1,
    },
    {
      title: "返利合计",
      info: [],
      id: 2,
    },
    {
      title: "公户信息",
      info: [],
      id: 3,
    },
  ]);
  useEffect(() => {
    if (router.params.type) {
      console.log(router.params);
      switch (router.params.type) {
        case "2":
          setBgImage(postalDetailBg);
          setTopIcon(success);
          setSubType("您的订单已提交，请等待审核");
          setInfoType("已申请");
          break;
        case "4":
          setBgImage(settleBg);
          setTopIcon(settle);
          setSubType("您的返利订单已转款");
          setInfoType("已转款");
          break;
        case "1":
          setBgImage(return_bg);
          setTopIcon(settle);
          setSubType("您的返利订单已退回");
          setInfoType("已退回");
          setIsReturn(true);
          break;
      }
    }
  }, [router]);
  //客户姓名下拉事件
  const selChange = (e) => {
    const model = [
      {
        info: [],
        id: 1,
      },
      {
        title: "返利合计",
        info: [],
        id: 2,
      },
      {
        title: "公户信息",
        info: [],
        id: 3,
      },
    ];
    setDetailInfo(model);
    setSelect(e.detail.value * 1);
    Taro.showLoading({
      title: "加载中...",
      mask: true,
    });
  };
  useEffect(() => {
    console.log(name, select);
    getDetailInfo(name);
  }, [select]);
  useEffect(() => {
    if (router.params.name) {
      setName(router.params.name);
      getDetailInfo(router.params.name);
    }
  }, [router.params.name]);
  const getDetailInfo = (name) => {
    if (!name) return;
    instance
      .get("/RebateOrder/findrebate", {
        params: {
          custName: name,
          openid: Taro.getStorageSync("openid"),
          salerId: Taro.getStorageSync("salerId"),
        },
      })
      .then((res) => {
        if (res.data.code === 200) {
          console.log(res);
          setNameList(res.data.data.tenant);
          setDetailInfo((s) =>
            s.map((item) => {
              return {
                ...item,
                info: item.info.filter((item) => {
                  return item.key !== "返利客户";
                }),
              };
            })
          );
          let data = res.data.data;
          let infos = [...detailInfo];
          console.log(infos, "w");
          infos[0].info.push(
            {
              key: "返利类型",
              value: data.rebateType === "1" ? "正常返利" : "特殊返利",
            },
            { key: "车商名称", value: data.realDealerName[select] },
            { key: "合同编号", value: data.orderNumber[select] },
            { key: "客户姓名", value: data.tenant[select] },
            { key: "销售姓名", value: data.salerName[select] },
            {
              key: "是否抵押",
              value: data.ismortgage[select] === "1" ? "未抵押" : "已抵押",
            },
            { key: "贷款货期", value: data.financeMonth[select] },
            { key: "贷款金额", value: data.loanAmount[select] },
            { key: "对公返利", value: data.rebatePAmount },
            { key: "对私返利", value: data.rebateRAmount }
          );
          for (let i = 1; i < 6; i++) {
            if (data[`personlName${i}`]) {
              infos.push({
                title: `私户信息${i}`,
                info: [
                  { key: "账户名", value: data[`personlName${i}`] },
                  { key: "证件号", value: data[`personlDNum${i}`] },
                  { key: "手机号", value: data[`personlMobile${i}`] },
                  { key: "转账金额", value: data[`personlaMount${i}`] },
                  { key: "备注", value: data[`personlBank${i}`] },
                ],
                id: i + 1,
              });
            }
          }
          infos[1].info.push(
            { key: "返利客户", value: `共计${data.tenant.length}单` },
            { key: "对公总款", value: data.rebatePAmount },
            { key: "对私总款", value: data.rebateRAmount },
            { key: "添加私户", value: infos.length - 3 }
          );
          infos[2].info.push(
            { key: "电子发票", value: data.iseleReceipt === 1 ? "是" : "否" },
            { key: "开票类型", value: data.receiptType },
            { key: "账户", value: data.corpAccount },
            { key: "账户名", value: data.corpName },
            { key: "开户行", value: data.corpBank },
            { key: "转账金额", value: data.corpAmount },
            { key: "回执申请", value: data.realDealerName[select] },
            { key: "发票数量", value: data.invoiceCArray.length },
            { key: "发票号码", value: data.invoiceCArray }
          );
          setDetailInfo(infos);
          Taro.hideLoading();
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
        Taro.hideLoading();
      });
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
        {isReturn && <View className="edit">编辑返利</View>}
      </View>
      <View className="detail_content">
        {detailInfo[0].info.length &&
          detailInfo.map((item) => {
            return (
              <>
                {item.title && <View className="partition">{item.title}</View>}
                <View className="info">
                  {item.info &&
                    item.info.map((k) => {
                      return (
                        <>
                          {k.key === "发票号码" ? (
                            k.value.map((v) => {
                              return (
                                <View className="item">
                                  <View className="label">{k.key}</View>
                                  <View className="value">{v}</View>
                                </View>
                              );
                            })
                          ) : (
                            <View className="item">
                              <View className="label">{k.key}</View>
                              <View className="value">
                                {k.key === "客户姓名" ? (
                                  <Picker
                                    style={{ marginLeft: "auto" }}
                                    mode="selector"
                                    range={nameList}
                                    onChange={selChange}
                                  >
                                    <View className="picker">
                                      <Input
                                        value={nameList[select]}
                                        disabled={true}
                                        className="inpText"
                                      />
                                      <Image
                                        className="search"
                                        src={dropDown}
                                      ></Image>
                                    </View>
                                  </Picker>
                                ) : (
                                  k.value
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
                            </View>
                          )}
                        </>
                      );
                    })}
                </View>
              </>
            );
          })}
      </View>
    </View>
  );
};

export default PostalDetail;
