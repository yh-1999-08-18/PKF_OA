import React, { useEffect, useState } from "react";
import {
  View,
  Picker,
  Image,
  Text,
  Button,
  Form,
  Input,
  Textarea,
} from "@tarojs/components";
import Navigator from "../../../components/navigationTap";
const dropDown = "https://post.pkfeng.net/assets/home/dropDown.png";
import Tabs from "../../../components/tabs";
const upload = "https://post.pkfeng.net/assets/postalsavings/upload.png";
const delImage = "https://post.pkfeng.net/assets/postalsavings/delImage.png";
import "./index.scss";
import Taro from "@tarojs/taro";

const Approval = () => {
  const [imageList, setImageList] = useState([
    "https://img.zcool.cn/community/01e0205d541556a8012187f4c253a0.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100",
    "https://img.zcool.cn/community/01e0205d541556a8012187f4c253a0.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100",
    "https://img.zcool.cn/community/01e0205d541556a8012187f4c253a0.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100",
    "https://img.zcool.cn/community/01e0205d541556a8012187f4c253a0.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100",
    "https://img.zcool.cn/community/01e0205d541556a8012187f4c253a0.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100",
  ]);
  //tab按钮列表
  const [tabList, setTabList] = useState([
    {
      text: "新车垫款申请",
      active: true,
      id: 4,
    },
    {
      text: "邮储车款申请",
      active: false,
      id: 2,
    },
  ]);
  //婚姻状况列表
  const selectData = ["邮储", "平安", "浦发银行", "北京银行"];
  //支付日期
  const [payTime, setPayTime] = useState(null);
  const [ygpayTime, setygpayTime] = useState(null);
  const [workStart, setWorkStart] = useState(null);
  const [marriageActive, setMarriageActive] = useState(null);
  const [textAreaData, setTextAreaData] = useState("");
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
    formReset();
  }, [active]);
  const selChange = (e) => {
    console.log(e);
    setMarriageActive(selectData[e.detail.value]);
  };
  const workStartHandle = (e) => {
    setWorkStart(e.detail.value);
  };
  const payTimeHandle = (e) => {
    setPayTime(e.detail.value);
  };
  const ygpayTimeHandle = (e) => {
    setygpayTime(e.detail.value);
  };
  // 表单提交
  const formSubmit = (e) => {
    Taro.showToast({
      title: "提交成功",
      icon: "none",
      duration: 2000,
      success: () => {
        setTimeout(() => {
          Taro.redirectTo({
            url: `/pages/subpack/application/index`,
          });
        }, 2000);
      },
    });
  };
  // 表单重置
  const formReset = (e) => {};

  const textAre = (e) => {
    console.log(e);
    setTextAreaData(e.detail.value);
  };
  const preview = (index) => {
    Taro.previewImage({
      current: index,
      urls: imageList,
    });
  };
  const del = (event) => {
    event.stopPropagation();
    let list = [...imageList];
    list.splice(event.currentTarget.dataset.index, 1);
    setImageList(list);
  };

  return (
    <View className="wrapper">
      <Navigator title={"审批管理"} />
      {/* tab按钮 */}
      <View className="tabs">
        <Tabs
          tabList={tabList}
          tabsHandoff={tabsHandoff}
          tabItemWidth="120rpx"
          tabItemHeight="56rpx"
          spaceType="space-evenly"
        />
      </View>
      {/* 表单内容 */}
      <View className="formContent">
        <View className="form">
          <Form onSubmit={formSubmit} onReset={formReset}>
            <View className="item">
              <View className="label">
                <View className="requred">*</View>
                客户姓名
              </View>
              <View className="picker">
                <Input
                  placeholderClass="placeStyle"
                  placeholder="请输入客户姓名"
                />
              </View>
            </View>
            <View className="item">
              <View className="label">
                <View className="requred">*</View>
                资方
              </View>
              <Picker range={selectData} onChange={selChange}>
                <View className="picker">
                  <Input
                    disabled={true}
                    placeholderClass="placeStyle"
                    placeholder="请选择"
                    value={marriageActive}
                  />
                  <Image className="search" src={dropDown}></Image>
                </View>
              </Picker>
            </View>
            <View className="item">
              <View className="label">
                <View className="requred">*</View>
                合同编号
              </View>
              <View className="picker">
                <Input
                  placeholderClass="placeStyle"
                  placeholder="请输入合同编号"
                />
              </View>
            </View>
            <View className="item">
              <View className="label">
                <View className="requred">*</View>
                经销商
              </View>
              <View className="picker">
                <Input
                  placeholderClass="placeStyle"
                  placeholder="请输入经销商"
                />
              </View>
            </View>
            <View className="item">
              <View className="label">
                <View className="requred">*</View>
                贷款总额(元)
              </View>
              <View className="picker">
                <Input
                  placeholderClass="placeStyle"
                  placeholder="请输入大写金额"
                />
              </View>
            </View>
            <View className="item">
              <View className="label">
                <View className="requred">*</View>
                上牌城市
              </View>
              <View className="picker">
                <Input
                  placeholderClass="placeStyle"
                  placeholder="请输入城市名称"
                />
              </View>
            </View>
            <View className="item">
              <View className="label">
                <View className="requred">*</View>
                预估回款日期
              </View>
              <Picker mode="date" onChange={ygpayTimeHandle}>
                <View className="picker">
                  <Input
                    disabled={true}
                    placeholderClass="placeStyle"
                    placeholder="请选择回款日期"
                    value={ygpayTime}
                  />
                  <Image className="search" src={dropDown}></Image>
                </View>
              </Picker>
            </View>
            <View className="item">
              <View className="label">
                <View className="requred">*</View>
                收款账户
              </View>
              <Picker mode="date" onChange={workStartHandle}>
                <View className="picker">
                  <Input
                    disabled={true}
                    placeholderClass="placeStyle"
                    placeholder="请选择收款账户"
                    value={workStart}
                  />
                  <Image className="search" src={dropDown}></Image>
                </View>
              </Picker>
            </View>
            <View className="item">
              <View className="label">
                <View className="requred">*</View>
                支付日期
              </View>
              <Picker mode="date" onChange={payTimeHandle}>
                <View className="picker">
                  <Input
                    disabled={true}
                    placeholderClass="placeStyle"
                    placeholder="请选择支付日期"
                    value={payTime}
                  />
                  <Image className="search" src={dropDown}></Image>
                </View>
              </Picker>
            </View>
            <View className="middle">
              <View className="label">备注</View>
              <Textarea
                className="textArea"
                placeholderStyle="placeStyle"
                placeholder="请输入"
                value={textAreaData}
                onInput={textAre}
              />
            </View>
            <View className="upload">
              <Text
                style={{
                  color: "#E54C50",
                  fontFamily: "SimSun, sans-serif",
                }}
              >
                *
              </Text>
              上传附件
              <Text style={{ color: "#b7b7b7" }}>{"（最多五张）"}</Text>
              <View className="uploadwrap">
                {imageList &&
                  imageList.map((item, index) => {
                    return (
                      <Image
                        onClick={() => preview(index)}
                        src={item}
                        className="uploadImage"
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
                <View className="uploadImage">
                  <Image className="up" src={upload}></Image>
                </View>
              </View>
            </View>
          </Form>
        </View>
        <Button className="submitBtn" formType="submit" onClick={formSubmit}>
          提交审核
        </Button>
      </View>
    </View>
  );
};

export default Approval;
