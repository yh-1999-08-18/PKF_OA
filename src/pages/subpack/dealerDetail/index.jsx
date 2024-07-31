import React, { useEffect, useState } from "react";
import { View, Image, Text } from "@tarojs/components";
import Navigator from "../../../components/navigationTap";
import { getCurrentInstance } from "@tarojs/runtime";
const Audit = "https://post.pkfeng.net/assets/postalsavings/Audit.png";
const AuditBg = "https://post.pkfeng.net/assets/postalsavings/refuseBg.png";
const success = "https://post.pkfeng.net/assets/postalsavings/refuse.png";
const successBg = "https://post.pkfeng.net/assets/postalsavings/refuseBg.png";
const Deactivated = "https://post.pkfeng.net/assets/postalsavings/refuse.png";
const DeactivatedBg =
  "https://post.pkfeng.net/assets/postalsavings/DeactivatedBg.png";
import "./index.scss";

const PostalDetail = () => {
  const { router } = getCurrentInstance();
  const [infoType, setInfoType] = useState("");
  const [topIcon, setTopIcon] = useState("");
  const [bgImage, setBgImage] = useState("");
  const [subType, setSubType] = useState("");
  const [detailInfo, setDetailInfo] = useState([
    {
      title: "入网信息",
      info: [
        { key: "系统经销商", value: "西安派克峰汽车服务有限公司" },
        { key: "实际经销商", value: "西安派克峰汽车服务有限公司" },
        { key: "省份", value: "山西省" },
        { key: "城市", value: "西安市" },
        { key: "车商品牌", value: "比亚迪" },
        { key: "店面属性", value: "一网" },
        { key: "业务类型", value: "" },
        { key: "签约方式", value: "平移" },
        { key: "入网日期", value: "2024-06-21" },
        { key: "所属销售", value: "刘小川/刘飞" },
        { key: "销售主管", value: "李晓晨" },
        { key: "返利申请", value: "销售主管" },
        { key: "支付方式", value: "自主支付" },
        { key: "账户类型", value: "仅限公户" },
        { key: "备注", value: "-" },
      ],
      id: 0,
    },
  ]);

  useEffect(() => {
    if (router.params.type) {
      setInfoType(router.params.type);
      switch (router.params.type) {
        case "待审核":
          setBgImage(AuditBg);
          setTopIcon(Audit);
          setSubType("您的入网信息已提交，请等待审核");
          break;
        case "已启用":
          setBgImage(successBg);
          setTopIcon(success);
          setSubType("您的车商入网信息已启用");
          break;
        case "已停用":
          setBgImage(DeactivatedBg);
          setTopIcon(Deactivated);
          setSubType("您的车商入网信息已停用");
          break;
      }
    }
  }, [router]);

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
      <View className="detail_content">
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
                          <View className="value">{k.value}</View>
                        </View>
                      </>
                    );
                  })}
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default PostalDetail;
