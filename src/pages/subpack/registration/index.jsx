import React, { useEffect, useState } from "react";
import {
  Form,
  View,
  Input,
  Image,
  RadioGroup,
  Radio,
  Text,
  Picker,
  Button,
  Textarea,
} from "@tarojs/components";
import Navigator from "../../../components/navigationTap";
const search = "https://post.pkfeng.net/assets/postalsavings/search.png";
const scan = "https://post.pkfeng.net/assets/postalsavings/scan.png";
const dropDown = "https://post.pkfeng.net/assets/home/dropDown.png";
import Modal from "../../../components/showModal";
import Tabs from "../../../components/tabs";
import "./index.scss";
import Taro, { usePageScroll } from "@tarojs/taro";

const PostalSavings = () => {
  //tab按钮列表
  const [tabList, setTabList] = useState([
    {
      text: "个人信息",
      active: true,
      pageId: 0,
    },
    {
      text: "入职信息",
      active: false,
      pageId: 520,
    },
    {
      text: "教育信息",
      active: false,
      pageId: 992,
    },
  ]);
  //婚姻状况列表
  const selector = ["已婚", "未婚", "离异"];
  const [marriageActive, setMarriageActive] = useState(null);
  const [code, setCode] = useState(null);
  //工作起始时间
  const [workStart, setWorkStart] = useState(null);
  //购车数量
  const [carNum, setCarNum] = useState(0);
  //滚动到哪一个tab
  const [childrenId, setChildrenId] = useState(0);
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
        setChildrenId(item.pageId);
      }
      return item;
    });
    setTabList(newList);
  };
  //监听被点击的tab滚动到指定内容区域
  useEffect(() => {
    Taro.pageScrollTo({
      scrollTop: childrenId,
      duration: 200,
    });
  }, [childrenId]);
  //监听页面滚动改变tab选中状态
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
  // 监听页面滚动
  usePageScroll((e) => {
    if (e.scrollTop < 520) {
      setActive(0);
    } else if (e.scrollTop >= 520 && e.scrollTop < 980) {
      setActive(1);
    } else if (e.scrollTop >= 980) {
      setActive(2);
    }
  });
  // 婚姻状况选择事件
  const selChange = (e) => {
    setMarriageActive(e.detail.value);
  };
  // 工作起始时间选择事件
  const workStartHandle = (e) => {
    setWorkStart(e.detail.value);
  };
  //购物车数量增加
  const add = () => {
    setCarNum((s) => s + 1);
  };
  //购物车数量减少
  const minus = () => {
    if (carNum >= 1) {
      setCarNum((s) => s - 1);
    }
  };
  // 扫描身份证
  const scanIdCard = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function (res) {
        console.log(res.tempFilePaths);
      },
    });
  };
  // 表单提交
  const formSubmit = (e) => {
    setCode(true);
    console.log(e);
  };
  // 表单重置
  const formReset = (e) => {
    console.log(e);
  };
  const close = () => {
    setCode(false);
    Taro.redirectTo({ url: "/pages/subpack/postalsavingslist/index" });
  };

  return (
    <View className="wrapper">
      <Navigator title={"申请注册"} />
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
        <Form onSubmit={formSubmit} onReset={formReset}>
          {/* 个人信息 */}
          <View className="routine">
            <View className="formItem">
              <View className="requred">*</View>
              <View className="label">姓名</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="请输入姓名"
                type="text"
                name="sjjss"
              />
            </View>
            <View className="formItem">
              <View className="requred">*</View>
              <View className="label">性别</View>
              <RadioGroup style={{ marginLeft: "auto" }} name="sstd">
                <Radio
                  color="#19B56A"
                  checked
                  style={{
                    transform: "scale(0.8)",
                    margin: "0 16rpx 0 0",
                  }}
                />
                <Text className="radioLabel">男</Text>
                <Radio
                  color="#19B56A"
                  style={{
                    transform: "scale(0.8)",
                    margin: "0 16rpx 0 40rpx",
                  }}
                />
                <Text className="radioLabel">女</Text>
              </RadioGroup>
            </View>
            <View className="formItem">
              <View className="requred">*</View>
              <View className="label">民族</View>
              <Picker
                style={{ marginLeft: "auto" }}
                mode="selector"
                range={selector}
                onChange={selChange}
                name="hyzk"
              >
                <View className="picker">
                  <Input
                    placeholderClass="inpPlace"
                    readonly
                    value={selector[marriageActive]}
                    placeholder="请选择"
                    style={{ marginRight: "24rpx" }}
                    className="inp"
                  />
                  <Image className="search" src={dropDown}></Image>
                </View>
              </Picker>
            </View>
            <View className="formItem">
              <View className="requred">*</View>
              <View className="label">籍贯</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="请输入籍贯"
                type="text"
                name="xtjss"
              />
            </View>
            <View className="formItem">
              <View className="requred">*</View>
              <View className="label">身份证号</View>
              <View className="idCode" name="idCard"></View>
              <Image className="scan" src={scan} onClick={scanIdCard}></Image>
            </View>
            <View className="formItem">
              <View className="requred">*</View>
              <View className="label">身份证住址</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="请输入"
                type="text"
                name="qy"
              />
            </View>
            <View className="formItem">
              <View className="requred">*</View>
              <View className="label">现住址</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="请输入"
                type="text"
                name="sszh"
              />
            </View>
            <View className="formItem">
              <View className="requred">*</View>
              <View className="label">联系电话</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="请输入"
                type="text"
                name="dmsx"
              />
            </View>
            <View className="formItem">
              <View className="requred">*</View>
              <View className="label">婚否</View>
              <Picker
                style={{ marginLeft: "auto" }}
                mode="selector"
                range={selector}
                onChange={selChange}
                name="hyzk"
              >
                <View className="picker">
                  <Input
                    placeholderClass="inpPlace"
                    readonly
                    value={selector[marriageActive]}
                    placeholder="请选择"
                    style={{ marginRight: "24rpx" }}
                    className="inp"
                  />
                  <Image className="search" src={dropDown}></Image>
                </View>
              </Picker>
            </View>
            <View className="formItem">
              <View className="requred">*</View>
              <View className="label">政治面貌</View>
              <Picker
                style={{ marginLeft: "auto" }}
                mode="selector"
                range={selector}
                onChange={selChange}
                name="hyzk"
              >
                <View className="picker">
                  <Input
                    placeholderClass="inpPlace"
                    readonly
                    value={selector[marriageActive]}
                    placeholder="请选择"
                    style={{ marginRight: "24rpx" }}
                    className="inp"
                  />
                  <Image className="search" src={dropDown}></Image>
                </View>
              </Picker>
            </View>
          </View>
          {/* 入职信息 */}
          <View className="client">
            <View className="formItem">
              <View className="requred">*</View>
              <View className="label">入职时间</View>
              <Picker
                style={{ marginLeft: "auto" }}
                mode="date"
                onChange={workStartHandle}
                name="rzsj"
              >
                <View className="picker">
                  <Input
                    placeholderClass="inpPlace"
                    readonly
                    disabled={true}
                    value={workStart}
                    placeholder="请选择"
                    style={{ marginRight: "24rpx" }}
                    className="inp"
                  />
                  <Image className="search" src={dropDown}></Image>
                </View>
              </Picker>
            </View>
            <View className="formItem">
              <View className="requred">*</View>
              <View className="label">岗位</View>
              <Picker
                style={{ marginLeft: "auto" }}
                mode="date"
                onChange={workStartHandle}
                name="rzsj"
              >
                <View className="picker">
                  <Input
                    placeholderClass="inpPlace"
                    readonly
                    disabled={true}
                    value={workStart}
                    placeholder="请选择"
                    style={{ marginRight: "24rpx" }}
                    className="inp"
                  />
                  <Image className="search" src={dropDown}></Image>
                </View>
              </Picker>
            </View>
            <View className="formItem">
              <View className="requred">*</View>
              <View className="label">所在省份</View>
              <Picker
                style={{ marginLeft: "auto" }}
                mode="date"
                onChange={workStartHandle}
                name="rzsj"
              >
                <View className="picker">
                  <Input
                    placeholderClass="inpPlace"
                    readonly
                    disabled={true}
                    value={workStart}
                    placeholder="请选择"
                    style={{ marginRight: "24rpx" }}
                    className="inp"
                  />
                  <Image className="search" src={dropDown}></Image>
                </View>
              </Picker>
            </View>
            <View className="formItem">
              <View className="requred">*</View>
              <View className="label">所在市区</View>
              <Picker
                style={{ marginLeft: "auto" }}
                mode="date"
                onChange={workStartHandle}
                name="rzsj"
              >
                <View className="picker">
                  <Input
                    placeholderClass="inpPlace"
                    readonly
                    disabled={true}
                    value={workStart}
                    placeholder="请选择"
                    style={{ marginRight: "24rpx" }}
                    className="inp"
                  />
                  <Image className="search" src={dropDown}></Image>
                </View>
              </Picker>
            </View>
            <View className="formItem">
              <View className="requred">*</View>
              <View className="label">所在部门</View>
              <Picker
                style={{ marginLeft: "auto" }}
                mode="date"
                onChange={workStartHandle}
                name="rzsj"
              >
                <View className="picker">
                  <Input
                    placeholderClass="inpPlace"
                    readonly
                    disabled={true}
                    value={workStart}
                    placeholder="请选择"
                    style={{ marginRight: "24rpx" }}
                    className="inp"
                  />
                  <Image className="search" src={dropDown}></Image>
                </View>
              </Picker>
            </View>
            <View className="formItem">
              <View className="requred">*</View>
              <View className="label">紧急联系人</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="请输入紧急联系人"
                type="number"
                name="phone"
              />
            </View>
            <View className="formItem">
              <View className="requred">*</View>
              <View className="label">紧急联系电话</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="请输入电话"
                type="text"
                name="bmzw"
              />
            </View>
            <View className="formItem">
              <View className="requred">*</View>
              <View className="label">银行卡号</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="请输入卡号"
                type="number"
                name="ysr"
              />
            </View>
            <View className="formItem">
              <View className="requred">*</View>
              <View className="label">开户行</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="请输入开户行"
                type="text"
                name="dwdz"
              />
            </View>
          </View>
          {/* 教育信息 */}
          <View className="vehicle">
            <View className="formItem">
              <View className="requred">*</View>
              <View className="label">学历</View>
              <Picker
                style={{ marginLeft: "auto" }}
                mode="date"
                onChange={workStartHandle}
                name="rzsj"
              >
                <View className="picker">
                  <Input
                    placeholderClass="inpPlace"
                    readonly
                    disabled={true}
                    value={workStart}
                    placeholder="请选择"
                    style={{ marginRight: "24rpx" }}
                    className="inp"
                  />
                  <Image className="search" src={dropDown}></Image>
                </View>
              </Picker>
            </View>
            <View className="formItem">
              <View className="requred">*</View>
              <View className="label">专业</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="请输入专业"
                type="text"
                name="clpp"
              />
            </View>
            <View className="formItem">
              <View className="requred">*</View>
              <View className="label">毕业院校</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="请输入毕业院校"
                type="text"
                name="cx"
              />
            </View>
            <View className="formItem">
              <View className="label">专业职称/资质</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="请输入"
                type="text"
                name="kpj"
              />
            </View>
            <View className="middle">
              <View className="item">
                <View className="label">备注</View>
                <Textarea
                  className="textArea"
                  placeholderStyle="placeStyle"
                  placeholder="请输入"
                />
              </View>
            </View>
          </View>
          <Button className="submitBtn" formType="submit">
            提交保存
          </Button>
        </Form>
      </View>
      {/* 弹窗组件 */}
      <Modal
        isOpen={code}
        sure={() => close()}
        closeHandle={() => close()}
        type="success"
        subTitle="您的台账信息提交失败，请重新提交"
        sureText="确定"
      />
    </View>
  );
};

export default PostalSavings;
