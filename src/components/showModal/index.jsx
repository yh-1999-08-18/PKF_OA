import React from "react";
import { View, Button, Image } from "@tarojs/components";
const close = "https://post.pkfeng.net/assets/postalsavings/close.png";
const success = "https://post.pkfeng.net/assets/postalsavings/successIcon.png";
const fail = "https://post.pkfeng.net/assets/postalsavings/fail.png";
const address = "https://post.pkfeng.net/assets/attendance/madelIcon.png";
import "./index.scss";

const Modal = (props) => {
  return (
    <View className="modal">
      {props.isOpen && (
        <View className="modalWrap">
          <View className="modal-mask"></View>
          <View className="modal-contents">
            <View className="content">
              {props.type === "localtion" ? (
                <Image style={{ marginTop: "58rpx" }} src={address}></Image>
              ) : (
                <Image src={props.type === "success" ? success : fail}></Image>
              )}

              {props.type === "localtion" ? (
                <View className="l_title">不在公司范围内</View>
              ) : (
                <View className="title">
                  {props.type === "success" ? "提交成功" : "提交失败"}
                </View>
              )}
              <View
                className={
                  props.type === "localtion" ? "l_subTitle" : "subTitle"
                }
              >
                {props.subTitle}
              </View>
            </View>
            <View
              className={
                props.type === "localtion" ? "modal-btns" : "modal-btn"
              }
            >
              {props.type === "localtion" && (
                <Button
                  className="modal-btn-cancel"
                  onClick={() => {
                    props.cancel();
                  }}
                >
                  {props.cancelText ? props.cancelText : "取消"}
                </Button>
              )}
              <Button
                className="modal-btn-sure"
                onClick={() => {
                  props.sure();
                }}
              >
                {props.sureText ? props.sureText : "确定"}
              </Button>
            </View>
          </View>
          <Image
            src={close}
            className="modal-close"
            onClick={() => {
              props.closeHandle();
            }}
          ></Image>
        </View>
      )}
    </View>
  );
};

export default Modal;
