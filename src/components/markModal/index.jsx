import React from "react";
import { View, Button, Image, Textarea } from "@tarojs/components";
const upload = "https://post.pkfeng.net/assets/postalsavings/upload.png";
const delImage = "https://post.pkfeng.net/assets/postalsavings/delImage.png";
import "./index.scss";

const MarkModal = (props) => {
  return (
    <View className="modal">
      {props.isOpen && (
        <View className="modalWrap">
          <View className="modal-mask"></View>
          <View className="modal-content">
            <View className="contents">
              <Textarea placeholder="添加备注" placeholderStyle="plcaeStyle" />
              <View className="imageContent">
                {props.imageList &&
                  props.imageList.map((item, index) => {
                    return (
                      <View style={{ position: "relative" }}>
                        <Image
                          onClick={() => props.preview(index)}
                          className="allImage"
                          src={item}
                        ></Image>
                        <Image
                          className="del"
                          data-index={index}
                          src={delImage}
                          onClick={props.del}
                        />
                      </View>
                    );
                  })}
                <View className="uploa" onClick={props.uploadImage}>
                  <Image className="choose" src={upload}></Image>
                </View>
              </View>
            </View>
            <View className="modal-btns">
              <Button
                className="modal-btn-cancel"
                onClick={() => {
                  props.cancel();
                }}
              >
                {props.cancelText ? props.cancelText : "取消"}
              </Button>
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
        </View>
      )}
    </View>
  );
};

export default MarkModal;
