import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Input,
  Picker,
  Textarea,
  ScrollView,
  Form,
  Button,
} from "@tarojs/components";
import Navigator from "../../../components/navigationTap";
const down = "https://post.pkfeng.net/assets/home/dropDown.png";
const boy = "https://post.pkfeng.net/assets/repair/boy.png";
const girl = "https://post.pkfeng.net/assets/repair/girl.png";
const addIcon = "https://post.pkfeng.net/assets/repair/addIcon.png";
const addBtn = "https://post.pkfeng.net/assets/repair/addBtn.png";
const addImg = "https://post.pkfeng.net/assets/attendance/add.png";
const delImg = "https://post.pkfeng.net/assets/attendance/cancel_del.png";
import { AtTabs, AtTabsPane } from "taro-ui";
import Taro from "@tarojs/taro";
import "./index.scss";

const Repair = () => {
  const [tabCurrent, setTabCurrent] = useState(0);
  const [date, setDate] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const tabList = [{ title: "发起申请" }, { title: "查看报表" }];
  const [startTime, setStartTime] = useState(null);
  const [maskIsShow, setMaskIsShow] = useState(false);
  const headList = [
    "车辆品牌",
    "政策开始日期",
    "期数",
    "费率区间（%-%）",
    "对公激励（%）",
    "额外激励（%）",
    "是否扣税",
    "特殊激励金额（元）",
  ];
  const viewHeadList = [
    "审批编号",
    "车商名称",
    "提交人",
    "提交时间",
    "审批完成时间",
  ];
  const viewTableData = [
    [
      "10148275401",
      "西安派克峰汽车服务有限公司",
      "王建东",
      "2024-08-06",
      "2024-08-26",
    ],
    [
      "10148265214",
      "西安派克峰汽车服务有限公司",
      "李扎布",
      "2024-06-12",
      "2024-06-20",
    ],
  ];
  const cityData = ["陕西省", "内蒙古", "甘肃", "宁夏"];
  const [cityValue, setCityValue] = useState(cityData[0]);
  const [tableData, setTableData] = useState([
    [1, "比亚迪", "2024-06-10", "12", "28.29-29.22", "10", "3", "否", "200"],
  ]);
  const [modal, setModal] = useState([
    tableData.length + 1,
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [imageList, setImageList] = useState([]);
  const handleClick = (value) => {
    setTabCurrent(value);
  };
  const changeSelect = (e) => {
    let data = [...modal];
    console.log(e.detail.value, e.currentTarget.dataset.index);
    if (e.detail.value === "0" && e.currentTarget.dataset.index === 7) {
      data[e.currentTarget.dataset.index] = "是";
    } else if (e.detail.value === "1" && e.currentTarget.dataset.index === 7) {
      data[e.currentTarget.dataset.index] = "否";
    } else {
      data[e.currentTarget.dataset.index] = e.detail.value;
    }
    setModal(data);
  };
  const dateHandle = (e) => {
    setDate(e.detail.value);
  };
  const startHandle = (e) => {
    setStart(e.detail.value);
  };
  const endHandle = (e) => {
    setEnd(e.detail.value);
  };
  const cityChange = (e) => {
    setCityValue(cityData[e.detail.value]);
  };
  const changeInput = (e) => {
    let data = [...modal];
    console.log(e);
    data[e.currentTarget.dataset.index] = e.detail.value;
    setModal(data);
  };
  const uploadImage = () => {
    if (imageList.length < 3) {
      Taro.chooseImage({
        count: 3,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: function (res) {},
      });
    }
  };
  const del = (event) => {
    event.stopPropagation();
    let list = [...imageList];
    list.splice(event.currentTarget.dataset.index, 1);
    setImageList(list);
  };
  const addBasiness = () => {
    // let data = [...tableData];
    // data.push([data.length + 1, "", "", "", "", "", "", "", ""]);
    // setTableData(data);
    setMaskIsShow(true);
  };
  const remove = () => {
    setStartTime(new Date().getTime());
  };
  const removeEnd = (index) => {
    const time = new Date().getTime();
    console.log(time, startTime, time - startTime);
    if (time - startTime > 1000) {
      Taro.showModal({
        content: "是否确定删除此行",
        success: function (res) {
          if (res.confirm) {
            let data = [...tableData];
            if (data.length > 1) {
              data.splice([index], 1);
              for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].length; j++) {
                  console.log(i);
                  data[i][0] = i + 1;
                }
              }
              setTableData(data);
            }
          } else if (res.cancel) {
          }
        },
      });
    } else {
      setStartTime(null);
    }
  };
  const add = (event) => {
    let data = [...tableData];
    let modalData = Object.values(event.detail.value);
    modalData.unshift(data.length + 1);
    data.push(modalData);
    setTableData(data);
    setMaskIsShow(false);
  };
  const isDduction = (e) => {};
  return (
    <View className="wrapper">
      <Navigator title={"商务政策申请"} />
      <View className="listContent">
        <AtTabs current={tabCurrent} tabList={tabList} onClick={handleClick}>
          <AtTabsPane current={tabCurrent} index={0}>
            <View className="tabContent" style={{ minHeight: "max-content" }}>
              <View className="top">
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    实际车商名称
                  </View>
                  <Picker mode="date" onChange={dateHandle}>
                    <View className="picker">
                      <Input
                        disabled={true}
                        placeholderClass="placeStyle"
                        placeholder="请选择"
                        value={date}
                      />
                      <Image className="search" src={down}></Image>
                    </View>
                  </Picker>
                </View>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    实际车商名称
                  </View>
                  <View className="picker">
                    <Input
                      placeholderClass="placeStyle"
                      placeholder="信息匹配经销商"
                      style={{ margin: 0, padding: 0, textAlign: "right" }}
                    />
                  </View>
                </View>
              </View>
              <View className="middleInfo">
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    政策详情
                  </View>
                  <View className="table">
                    <ScrollView scrollX scrollWithAnimation>
                      <View className="t_head">
                        {headList &&
                          headList.map((item) => {
                            return <View className="t_title">{item}</View>;
                          })}
                      </View>
                      <View className="content">
                        {tableData &&
                          tableData.map((item, index) => {
                            return (
                              <View
                                className="t_info"
                                onTouchStart={() => remove()}
                                onTouchEnd={() => removeEnd(index)}
                              >
                                {item.map((info, index) => {
                                  return (
                                    <Input
                                      disabled={true}
                                      className="t_text"
                                      value={info}
                                      data-index={item[0] - 1}
                                      data-infoIndex={index}
                                    />
                                  );
                                })}
                              </View>
                            );
                          })}
                      </View>
                    </ScrollView>
                    <ScrollView scrollX scrollWithAnimation></ScrollView>
                  </View>
                  <View className="addTab" onClick={addBasiness}>
                    + 添加政策
                  </View>
                </View>
              </View>
              <View className="update">
                <View className="label">图片上传</View>
                <Image src={addImg} onClick={uploadImage} />
              </View>
              <View className="middle">
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    备注
                  </View>
                  <Textarea
                    className="textArea"
                    placeholderStyle="placeStyle"
                    placeholder="请输入"
                  />
                </View>
              </View>
              <View className="bottom">
                <View className="line"></View>
                <View className="title">审批流程</View>
                <View className="flow">
                  <View className="left">
                    <View className="round"></View>
                    <View className="processName">审批人</View>
                    <View className="sub">1人审批</View>
                  </View>
                  <View className="right">
                    <Image className="headImage" src={boy}></Image>
                    <View className="name">涛涛</View>
                  </View>
                </View>
                <View className="flow">
                  <View className="left">
                    <View className="round"></View>
                    <View className="processName">抄送人</View>
                    <View className="sub">抄送2人</View>
                  </View>
                  <View className="right">
                    <View
                      className="item"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "240rpx",
                        justifyContent: "space-between",
                      }}
                    >
                      <Image className="headImage" src={girl}></Image>
                      <Image className="icon" src={addIcon}></Image>
                      <Image className="headImage" src={girl}></Image>
                      <Image className="icon" src={addIcon}></Image>
                      <View className="addbtn">
                        <Image className="btnimg" src={addBtn}></Image>
                      </View>
                    </View>
                    <View
                      className="item"
                      style={{
                        display: "flex",
                        width: "240rpx",
                      }}
                    >
                      <View className="name" style={{ marginRight: "42rpx" }}>
                        糖糖
                      </View>
                      <View className="name" style={{ marginRight: "42rpx" }}>
                        关关
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View className="subButton">提交</View>
            </View>
          </AtTabsPane>
          <AtTabsPane current={tabCurrent} index={1}>
            <View className="tabContent" style={{ position: "relative" }}>
              <View className="listwrap">
                <View className="item">
                  <Picker
                    range={cityData}
                    style={{ width: "200rpx" }}
                    onChange={cityChange}
                  >
                    <View className="picker">
                      <Input
                        disabled={true}
                        placeholderClass="placeStyle"
                        value={cityValue}
                        style={{ textAlign: "left" }}
                      />
                      <Image
                        className="search"
                        style={{ right: "80rpx" }}
                        src={down}
                      ></Image>
                    </View>
                  </Picker>
                  <View style={{ display: "flex", justifyContent: "right" }}>
                    <Picker
                      mode="date"
                      style={{ width: "160rpx" }}
                      onChange={startHandle}
                    >
                      <View className="picker">
                        <Input
                          disabled={true}
                          placeholder="起始时间"
                          value={start}
                          style={{ marginRight: "0" }}
                        />
                      </View>
                    </Picker>
                    <View style={{ margin: "0 20rpx" }}>~</View>
                    <Picker
                      mode="date"
                      style={{ width: "160rpx" }}
                      onChange={endHandle}
                    >
                      <View className="picker">
                        <Input
                          disabled={true}
                          placeholder="结束时间"
                          placeholderClass="placeStyle"
                          value={end}
                          style={{ marginRight: "0", textAlign: "left" }}
                        />
                      </View>
                    </Picker>
                  </View>
                </View>
                <View className="listItem">
                  <View className="items">
                    <View className="label">表单提交次数</View>
                    <View className="text">2次</View>
                  </View>
                </View>
                <View className="middleInfo_wrap">
                  <View className="info">
                    <View className="label">政策详情</View>
                    <View className="table">
                      <ScrollView scrollX scrollWithAnimation>
                        <View className="t_head">
                          {viewHeadList &&
                            viewHeadList.map((item) => {
                              return <View className="t_title">{item}</View>;
                            })}
                        </View>
                        <View className="content">
                          {viewTableData &&
                            viewTableData.map((item) => {
                              return (
                                <View className="t_info">
                                  {item.map((info) => {
                                    return (
                                      <Input
                                        disabled={true}
                                        className="t_text"
                                        value={info}
                                      />
                                    );
                                  })}
                                </View>
                              );
                            })}
                        </View>
                      </ScrollView>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
      {maskIsShow && (
        <View className="maskWrap">
          <View className="content">
            <View className="title">
              <View className="text">填写表格</View>
              <Image src={delImg} onClick={() => setMaskIsShow(false)} />
            </View>
            <View className="list">
              <Form onSubmit={add}>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    车辆品牌
                  </View>
                  <View className="picker">
                    <Input
                      placeholderClass="placeStyle"
                      style={{ textAlign: "right" }}
                      placeholder="请输入"
                      name="1"
                      value={modal[1]}
                      onInput={changeInput}
                      data-index={1}
                    />
                  </View>
                </View>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    政策开始日期
                  </View>
                  <Picker mode="date" data-index={2} onChange={changeSelect}>
                    <View className="picker">
                      <Input
                        disabled={true}
                        placeholderClass="placeStyle"
                        placeholder="请选择"
                        style={{ paddingRight: "50rpx", textAlign: "right" }}
                        name="2"
                        value={modal[2]}
                        data-index={2}
                        onInput={changeInput}
                      />
                      <Image className="search" src={down}></Image>
                    </View>
                  </Picker>
                </View>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    期数
                  </View>
                  <Picker mode="date" data-index={3} onChange={changeSelect}>
                    <View className="picker">
                      <Input
                        disabled={true}
                        placeholderClass="placeStyle"
                        placeholder="请选择"
                        style={{ paddingRight: "50rpx", textAlign: "right" }}
                        name="3"
                        value={modal[3]}
                        data-index={3}
                        onInput={changeInput}
                      />
                      <Image className="search" src={down}></Image>
                    </View>
                  </Picker>
                </View>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    费率区间(%-%)
                  </View>
                  <View className="picker">
                    <Input
                      placeholderClass="placeStyle"
                      style={{ textAlign: "right" }}
                      placeholder="请输入"
                      name="4"
                      value={modal[4]}
                      data-index={4}
                      onInput={changeInput}
                    />
                  </View>
                </View>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    对公激励(%)
                  </View>
                  <View className="picker">
                    <Input
                      placeholderClass="placeStyle"
                      style={{ textAlign: "right" }}
                      placeholder="请输入"
                      name="5"
                      value={modal[5]}
                      data-index={5}
                      onInput={changeInput}
                    />
                  </View>
                </View>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    额外激励(%)
                  </View>
                  <View className="picker">
                    <Input
                      placeholderClass="placeStyle"
                      style={{ textAlign: "right" }}
                      placeholder="请输入"
                      name="6"
                      value={modal[6]}
                      data-index={6}
                      onInput={changeInput}
                    />
                  </View>
                </View>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    是否扣税
                  </View>
                  <Picker
                    range={["是", "否"]}
                    data-index={7}
                    onChange={changeSelect}
                  >
                    <View className="picker">
                      <Input
                        data-index={7}
                        disabled={true}
                        placeholderClass="placeStyle"
                        placeholder="请选择"
                        style={{ paddingRight: "50rpx", textAlign: "right" }}
                        name="7"
                        value={modal[7]}
                        onInput={changeInput}
                      />
                      <Image className="search" src={down}></Image>
                    </View>
                  </Picker>
                </View>
                <View className="item">
                  <View className="label">
                    <View className="requred">*</View>
                    特殊激励金额(元)
                  </View>
                  <View className="picker">
                    <Input
                      placeholderClass="placeStyle"
                      style={{ textAlign: "right" }}
                      placeholder="请输入"
                      name="8"
                      value={modal[8]}
                      data-index={8}
                      onInput={changeInput}
                    />
                  </View>
                </View>
                <Button className="btn" formType="submit">
                  保存
                </Button>
              </Form>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Repair;
