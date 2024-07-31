import React, { useEffect, useState } from "react";
import { View, Image } from "@tarojs/components";
import {
  formatNumber,
  callPhone,
  copyTextToClipboard,
} from "../../until/untils";
const pass = "https://post.pkfeng.net/assets/home/pass.png";
const approvalIcon = "https://post.pkfeng.net/assets/home/approvalIcon.png";
const overrule = "https://post.pkfeng.net/assets/home/overrule.png";
const copy = "https://post.pkfeng.net/assets/postalsavings/copy.png";

import "./index.scss";

const Card = (props) => {
  const [color, setColor] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [imageIcon, setImageIcon] = useState("");
  const [isDealer, setIsDealer] = useState(false);
  const [rebateStatus, setRebateStatus] = useState("");
  useEffect(() => {
    switch (props.item.orderStatus) {
      case 1:
        setBgColor("#FFF3E2");
        setColor("#F9940A");
        break;
      case 5:
        if (props.isAudit) {
          setImageIcon(pass);
          if (props.item.classify === "新车垫款") {
            setBgColor("#E5FAF0");
            setColor("#19B56A");
          } else {
            setBgColor("#EEF5FF");
            setColor("#2273E7");
          }
        } else {
          setBgColor("#E9FFE1");
          setColor("#2BAE0A");
        }
        break;
      case 7:
        setBgColor("#EEF5FF");
        setColor("#2273E7");
        break;
      case 3:
        setBgColor("#FFEFEF");
        setColor("#EC2525");
        break;
      case 9:
        if (props.item.mortgageStatus && !props.item.mortgageCode) {
          setBgColor("#EBFFFA");
          setColor("#3ABD9C");
        }
        if (props.item.mortgageCode) {
          if (!props.item.mortgageStatus) {
            setBgColor("#EEF5FF");
            setColor("#2273E7");
          }
          if (props.item.mortgageStatus === 1) {
            setBgColor("#FFF3E2");
            setColor("#F9940A");
          }
          if (props.item.mortgageStatus === 3) {
            setBgColor("#FFEFEF");
            setColor("#EC2525");
          }
        }
        if (props.item.code) {
          setBgColor("#E5FAF0");
          setColor("#19B56A");
        }
        break;
      case 12:
        setBgColor("#EFEBFF");
        setColor("#5436CF");
        break;
      case "待审批":
        if (props.isAudit) {
          setImageIcon(approvalIcon);
          if (props.item.classify === "新车垫款") {
            setBgColor("#E5FAF0");
            setColor("#19B56A");
          } else {
            setBgColor("#EEF5FF");
            setColor("#2273E7");
          }
        }
        break;
      case "已驳回":
        if (props.isAudit) {
          setImageIcon(overrule);
          if (props.item.classify === "新车垫款") {
            setBgColor("#E5FAF0");
            setColor("#19B56A");
          } else {
            setBgColor("#EEF5FF");
            setColor("#2273E7");
          }
        }
        break;
      case 15:
        setBgColor("#EBFFFA");
        setColor("#3ABD9C");
        break;
      case "已抵押":
        setBgColor("#EBFFFA");
        setColor("#3ABD9C");
        break;
      case "未抵押":
        setBgColor("#FFF0E8");
        setColor("#F9600A");
        break;
      case "待审核":
        setBgColor("#FFF3E2");
        setColor("#F9940A");
        setIsDealer(true);
        break;
      case "已启用":
        setBgColor("#FFEFEF");
        setColor("#EC2525");
        setIsDealer(true);
        break;
      case "已停用":
        setBgColor("#E9FFE1");
        setColor("#2BAE0A");
        setIsDealer(true);
        break;
      case 12:
        setBgColor("#EFEBFF");
        setColor("#5436CF");
        setIsDealer(true);
        break;
    }
  }, [props.item]);
  const conversion = (key, isMortgage, mortgageCode, code) => {
    switch (key) {
      case 0:
        return "已取消";
      case 1:
        return "已提交";
      case 3:
        return "已拒绝";
      case 5:
        return "已通过";
      case 7:
        return "待补充";
      case 9:
        console.log(isMortgage, mortgageCode);
        let str = "已放款";
        if (isMortgage && !mortgageCode && !code) {
          str = "已抵押";
        }
        if (mortgageCode) {
          if (!isMortgage) {
            str = "待上传";
          }
          if (isMortgage === 1) {
            str = "待审核";
          }
          if (isMortgage === 3) {
            str = "已退回";
          }
        }
        return str;
      case 12:
        return "已退车";
      case 15:
        return "已结清";
    }
  };
  useEffect(() => {
    switch (props.item.astatus) {
      case 2:
        setBgColor("#FFF3E2");
        setColor("#F9940A");
        setRebateStatus("已申请");
        break;
      case 4:
        setBgColor("#E5FAF0");
        setColor("#19B56A");
        setRebateStatus("已转款");
        break;
      case 1:
        setBgColor("#FFEFEF");
        setColor("#EC2525");
        setRebateStatus("已退回");
        break;
    }
  }, [props.item]);
  return (
    <>
      {isDealer && props.item && (
        <View
          className="card"
          id={props.item.id}
          style={{ height: "332rpx" }}
          onClick={() => {
            props.item.orderStatus
              ? props.detailInfo(
                  props.item.orderId,
                  props.item.mortgageCode,
                  props.item.codes
                )
              : props.detailInfo(props.item.astatus, props.item.tenant);
          }}
        >
          <View className="top">
            <View
              className="name"
              style={{
                margin:
                  props.type === "rebate"
                    ? "26rpx 0 0 30rpx"
                    : "26rpx 12rpx 0 0",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "396rpx",
              }}
            >
              {props.item.dealer}
            </View>
          </View>
          <View className="middle">
            <View className="item">
              <View className="label">实际经销商</View>
              {isDealer}
              <View className="value">{props.item.dealer}</View>
            </View>
            <View className="loan">
              <View className="loanItem">
                <View className="label">车上品牌</View>
                <View className="value">{props.item.brand}</View>
              </View>
              <View className="loanItem">
                <View className="label loanLabel">店面属性</View>
                <View className="value">{props.item.attribute}</View>
              </View>
            </View>
          </View>
          <View className="bottom">
            <View className="by item">
              <View className="label">销售主管</View>
              <View className="value">{props.item.createBy}</View>
            </View>
            <View className="item">
              <View className="label">入网时间</View>
              <View className="value">{props.item.createTime}</View>
            </View>
          </View>
          <View
            className="status"
            style={{ color: color, backgroundColor: bgColor }}
          >
            {props.item.status}
          </View>
        </View>
      )}
      {!isDealer && props.item && (
        <View
          className="card"
          id={props.item.id}
          style={{ height: props.isAudit ? "350rpx" : "388rpx" }}
          onClick={() => {
            props.item.orderStatus
              ? props.detailInfo(
                  props.item.orderId,
                  props.item.mortgageCode,
                  props.item.codes
                )
              : props.detailInfo(props.item.astatus, props.item.tenant);
          }}
        >
          <View className="top">
            {props.isAudit && (
              <View
                className="audit"
                style={{ color: color, backgroundColor: bgColor }}
              >
                {props.item.classify}
              </View>
            )}
            {props.type === "rebate" && (
              <View
                className="type"
                style={{
                  background:
                    props.item.rebateType === 2 ? "#EEF5FF" : "#E9FFE1",
                  color: props.item.rebateType === 2 ? "#2273E7" : "#2BAE0A",
                }}
              >
                {props.item.rebateType === 1 ? "正常返利" : "特殊激励"}
              </View>
            )}
            {props.type === "rebate" && (
              <View
                className="name"
                style={{
                  margin:
                    props.type === "rebate"
                      ? "26rpx 0 0 30rpx"
                      : "26rpx 12rpx 0 0",
                }}
              >
                {props.item.tenant}
              </View>
            )}

            <View
              className="name"
              style={{
                margin:
                  props.type === "rebate"
                    ? "26rpx 0 0 30rpx"
                    : "26rpx 12rpx 0 0",
              }}
            >
              {props.item.customerName}
            </View>
            {props.type !== "rebate" && !props.isAudit && (
              <View className="mobile">{props.item.customerTel}</View>
            )}
            {props.type !== "rebate" && !props.isAudit && (
              <View
                className="call"
                data-mobile={props.item.customerTel}
                onClick={callPhone}
              >
                联系客户
              </View>
            )}
          </View>
          <View className="middle">
            {props.isAudit && (
              <View className="item">
                <View className="label">资方</View>
                <View className="value">{props.item.management}</View>
              </View>
            )}
            <View className="item">
              <View className="label">
                {props.type === "rebate" || props.isAudit
                  ? "合同编号"
                  : "经销商"}
              </View>
              {props.type === "rebate" ? (
                <>
                  <View className="value">
                    {props.item.orderNumber}
                    <Image
                      src={copy}
                      data-text={props.item.orderNumber}
                      onClick={copyTextToClipboard}
                      style={{
                        width: "28rpx",
                        height: "28rpx",
                        marginLeft: "20rpx",
                      }}
                    ></Image>
                  </View>
                </>
              ) : (
                <View className="value">{props.item.dealerName}</View>
              )}
            </View>
            {props.isAudit && (
              <View className="item">
                <View className="label">贷款总额</View>
                <View className="value">{props.item.loanAmount}元</View>
              </View>
            )}
            {props.isAudit && (
              <View className="item">
                <View className="label">申请时间</View>
                <View className="value">{props.item.intoFirstDate}</View>
              </View>
            )}
            {!props.isAudit && (
              <View className="item">
                <View className="label">
                  {props.type === "rebate" ? "车商名称" : "车辆型号"}
                </View>
                {props.type === "rebate" ? (
                  <View className="value">{props.item.realDealerName}</View>
                ) : (
                  <View className="value">{props.item.modelName}</View>
                )}
              </View>
            )}
            {!props.isAudit && (
              <View className="loan">
                <View className="loanItem">
                  <View className="label">
                    {props.type === "rebate" ? "对公返利" : "贷款金额"}
                  </View>
                  {props.type === "rebate" ? (
                    <View className="value" style={{ width: "auto" }}>
                      {props.item.rebatePAmount
                        ? formatNumber(props.item.rebatePAmount)
                        : ""}
                      &nbsp;&nbsp;元
                    </View>
                  ) : (
                    <View className="value" style={{ width: "auto" }}>
                      {props.item.loanAmount
                        ? formatNumber(props.item.loanAmount)
                        : ""}
                      &nbsp;&nbsp;元
                    </View>
                  )}
                </View>
                <View className="loanItem">
                  <View className="label loanLabel">
                    {props.type === "rebate" ? "对私返利" : "贷款期数"}
                  </View>
                  {props.type === "rebate" ? (
                    <View className="value" style={{ width: "auto" }}>
                      {props.item.rebateRAmount
                        ? formatNumber(props.item.rebateRAmount)
                        : ""}
                      &nbsp;&nbsp;元
                    </View>
                  ) : (
                    <View className="value" style={{ width: "auto" }}>
                      {props.item.financeMonth
                        ? formatNumber(props.item.financeMonth)
                        : ""}
                      &nbsp;&nbsp;元
                    </View>
                  )}
                </View>
              </View>
            )}
          </View>
          {!props.isAudit && (
            <View className="bottom">
              <View className="by item">
                <View className="label">
                  {props.type === "rebate" ? "销售姓名" : "创建人"}:
                </View>
                <View className="value">{props.item.salerName}</View>
              </View>
              <View className="item">
                <View className="label">
                  {props.type === "rebate" ? "申请日期" : "创建时间"}:
                </View>
                {props.type === "rebate" ? (
                  <View className="value">{props.item.applyDate}</View>
                ) : (
                  <View className="value">{props.item.intoFirstDate}</View>
                )}
              </View>
            </View>
          )}

          {props.isAudit ? (
            <Image className="auditIcon" src={imageIcon} />
          ) : (
            <View
              className="status"
              style={{ color: color, backgroundColor: bgColor }}
            >
              {conversion(
                props.item.orderStatus,
                props.item.mortgageStatus,
                props.item.mortgageCode,
                props.item.code
              )}
            </View>
          )}
          {props.type === "rebate" && (
            <View
              className="status"
              style={{ color: color, backgroundColor: bgColor }}
            >
              {rebateStatus}
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default Card;
