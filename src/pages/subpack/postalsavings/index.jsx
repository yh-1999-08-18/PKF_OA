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
  PageContainer,
  CheckboxGroup,
  Checkbox,
} from "@tarojs/components";
import instance from "../../../API/request";
import Navigator from "../../../components/navigationTap";
const search = "https://post.pkfeng.net/assets/postalsavings/search.png";
const scan = "https://post.pkfeng.net/assets/postalsavings/scan.png";
const dropDown = "https://post.pkfeng.net/assets/home/dropDown.png";
import Modal from "../../../components/showModal";
import Tabs from "../../../components/tabs";
import "./index.scss";
import Taro, { usePageScroll } from "@tarojs/taro";
import {
  validateIdCard,
  validateMobile,
  copyTextToClipboardX,
} from "../../../until/untils";
const PostalSavings = () => {
  //tab按钮列表
  const [tabList, setTabList] = useState([
    {
      text: "常规信息",
      active: true,
      pageId: 0,
    },
    {
      text: "客户信息",
      active: false,
      pageId: 500,
    },
    {
      text: "车辆信息",
      active: false,
      pageId: 1200,
    },
  ]);
  //婚姻状况列表
  const selector = ["已婚", "未婚", "离异"];
  //期限数据
  const financeMonth = [12, 18, 24, 36, 48, 60];
  const [code, setCode] = useState(null);
  //未抵押理由弹窗框
  const [isShowMask, setIsShowMask] = useState(null);
  //购车数量
  const [carNum, setCarNum] = useState(0);
  //滚动到哪一个tab
  const [childrenId, setChildrenId] = useState(0);
  //被选中的tab
  const [active, setActive] = useState(0);
  //支行数据
  const [branch, setBranch] = useState([]);
  //区域数据
  const [ZoneList, setZoneList] = useState([]);
  //区域选择项
  const [zeonActive, setZeonActive] = useState(0);
  //支行选择项
  const [branchActive, setBranchActive] = useState(0);
  //经销商查询关键字
  const [dealerKeywords, setDealerKeywords] = useState("");
  //表单数据
  const [formData, setFormData] = useState({
    openId: "ouZj94p6M-SRcZZKF7LCjGmbJfOg",
    province: "",
    Zone: "",
    subBranch: "",
    LevelBank: "",
    storeAtt: "",
    Team: "自营",
    Product: "常规产品",
    financeMonth: 24,
    productRate: "",
    customerName: "",
    customerIDNum: "",
    customerPhone: "",
    maritalStatus: "",
    residenceAddress: "",
    contactsName: "",
    contactsTel: "",
    companyName: "",
    companyAddress: "",
    department: "",
    entryDate: "",
    monthlypay: "",
    sysDealerName: "",
    dealerName: "",
    busiType: "",
    isPerson: "个人",
    corpName: "",
    legalPerson: "",
    carCount: "1",
    brandName: "",
    modelName: "",
    isnewenergy: "",
    totalAmount: "",
    loanAmount: "",
    liabilityMemo: "",
    residenceYear: "",
    obtainYear: "",
    ismortgage: "1",
    Repayent: "等本等息",
    mortgageMemo: "0,0,0",
    levelName: "",
  });
  //表单提交提示
  const [submitMessage, setSubmitMessage] = useState("");
  //表单提交状态
  const [submitCode, setSubmitCode] = useState("");
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
      duration: 300,
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
    if (e.scrollTop < 300) {
      setActive(0);
    } else if (e.scrollTop >= 300 && e.scrollTop < 800) {
      setActive(1);
    } else if (e.scrollTop >= 1000) {
      setActive(2);
    }
  });
  // 婚姻状况选择事件
  const selChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      maritalStatus: selector[e.detail.value],
    }));
  };
  // 支行选择事件
  const branchChange = (e) => {
    setBranchActive(e.detail.value);
    setFormData((prevState) => ({
      ...prevState,
      subBranch: branch[e.detail.value].subbranchName,
      levelName: branch[e.detail.value].levelName,
    }));
  };
  //期限选择事件
  const financeMonthChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      financeMonth: financeMonth[e.detail.value],
    }));
  };
  // 区域选择事件
  const zeonChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      Zone: ZoneList[e.detail.value],
    }));
    getZone(ZoneList[e.detail.value]);
    setZeonActive(e.detail.value);
  };
  // 工作起始时间选择事件
  const workStartHandle = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      entryDate: e.detail.value,
    }));
  };
  //购物车数量增加
  const add = () => {
    setCarNum((s) => s + 1);
    setFormData((prevState) => ({
      ...prevState,
      carCount: carNum,
    }));
  };
  //购物车数量减少
  const minus = () => {
    if (carNum >= 1) {
      setCarNum((s) => s - 1);
      setFormData((prevState) => ({
        ...prevState,
        carCount: carNum,
      }));
    }
  };
  // 扫描身份证
  const scanIdCard = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function (res) {
        const tempFilePaths = res.tempFilePaths;
        Taro.uploadFile({
          url: "https://img.shqili.net:9999/ocrfile",
          filePath: tempFilePaths[0],
          name: "file",
          success(res) {
            let str = JSON.parse(res.data).data.split("@");
            setFormData((prevState) => ({
              ...prevState,
              customerName: str[0],
              customerIDNum: str[1],
            }));
            // if (validateIdCard(61062219999)) {
            //   Taro.showToast({
            //     title: "身份证号识别不正确请手动修改",
            //     icon: "none",
            //     duration: 2000,
            //   });
            // }
          },
        });
      },
    });
  };
  // 表单提交
  const formSubmit = (e) => {
    console.log(e);
    let data = e.detail.value;
    Taro.showModal({
      content: "此页面所有信息是否已核对?",
      success: function (res) {
        if (res.confirm) {
          console.log("用户点击确定");
          Taro.requestSubscribeMessage({
            tmplIds: ["lcq5KwP9qLEMBL-sGxaUaIyid60tDoikAS45KidvIG4"],
            success: function (res) {
              console.log(res);
              for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                  //判空
                  if (data[key] === "") {
                    Taro.showToast({
                      title: "请填写完整信息",
                      icon: "none",
                      duration: 2000,
                    });
                    return;
                  }
                }
              }
              校验身份证号;
              if (validateIdCard(data["customerIDNum"])) {
                //校验手机号   手机号
                if (validateMobile(data["customerPhone"])) {
                  //联系电话
                  if (validateMobile(data["contactsTel"])) {
                    data["salerName"] = Taro.getStorageSync("salerName");
                    data["salerId"] = Taro.getStorageSync("salerId");
                    data["openId"] = Taro.getStorageSync("openId");
                    data["orderId"] = "";
                    data["LevelBank"] = formData.levelName
                      ? formData.levelName
                      : "";
                    if (data["isPerson"] === "个人") {
                      data["corpName"] = "";
                      data["legalPerson"] = "";
                    }
                    data["mortgageMemo"] = formData.mortgageMemo;
                    instance
                      .post("/LoanOrder/loanOrderSave", JSON.stringify(data))
                      .then((res) => {
                        if (res.data.code === 200) {
                          let strData = `
                        借款人姓名：${data.customerName}
                        电话: ${data.customerPhone}
                        身份证号:${data.customerIDNum}
                        婚姻状况：${data.maritalStatus}
                        住房地址（写到门牌号）：${data.residenceAddress}
                        紧急联系人姓名：${data.contactsName}
                        电话：${data.contactsTel}
                        单位全称：${data.companyName}
                        部门职务：${data.department}
                        当前工作起始时间：${data.entryDate}
                        月收入：${data.monthlypay}
                        单位详细地址：${data.companyAddress}
                        系统经销商： ${data.sysDealerName}
                        实际经销商：${data.dealerName}
                        车辆品牌：${data.brandName}
                        车型：${data.modelName}
                        开票价:${data.totalAmount}
                        贷款：${data.loanAmount}
                        期限:${data.financeMonth}
                        费率：${data.productRate} %
                        还款方式：${data.Repayent}
                        负债：${data.liabilityMemo}
                        本地居住年限：${data.residenceYear}年
                        本行业从业时间：${data.obtainYear}
                        是否抵押：${data.ismortgage === "1" ? "是" : "否"}
                        所属支行：${data.subBranch}
                        `;
                          copyTextToClipboardX(strData);
                          setSubmitMessage(res.data.message);
                          setSubmitCode("success");
                          setCode(true);
                        } else {
                          setSubmitMessage(res.data.message);
                          setSubmitCode("fail");
                          setCode(true);
                        }
                      })
                      .catch((err) => {
                        Taro.showToast({
                          title: err,
                          icon: "none",
                          duration: 2000,
                        });
                      });
                  } else {
                    Taro.showToast({
                      title: "联系电话格式不正确",
                      icon: "none",
                      duration: 2000,
                    });
                  }
                } else {
                  Taro.showToast({
                    title: "手机号格式不正确",
                    icon: "none",
                    duration: 2000,
                  });
                }
              } else {
                Taro.showToast({
                  title: "身份证号识别不正确请手动修改",
                  icon: "none",
                  duration: 2000,
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
  // 表单重置
  const formReset = (e) => {
    console.log(e);
  };
  const close = () => {
    setCode(false);
    Taro.redirectTo({
      url: `/pages/subpack/qrcode/index?phone=${formData.customerPhone}`,
    });
  };

  // 经销商查询
  const dealerSearch = () => {
    instance
      .get("/LoanOrder/findCarDealer", {
        params: {
          dealerName: dealerKeywords ? dealerKeywords : null,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          //实际经销商
          formData.dealerName = res.data.data[0].carDealerName;
          setFormData((prevState) => ({
            ...prevState,
            dealerName: res.data.data[0].carDealerName,
          }));
          setDealerKeywords(res.data.data[0].carDealerName);
          //系统经销商
          setFormData((prevState) => ({
            ...prevState,
            sysDealerName: res.data.data[0].sysDealerName,
          }));
          // 区域
          setFormData((prevState) => ({
            ...prevState,
            Zone: res.data.data[0].Zone,
          }));
          // 店面属性
          setFormData((prevState) => ({
            ...prevState,
            storeAtt: res.data.data[0].storeAtt,
          }));
          // 汽车品牌
          setFormData((prevState) => ({
            ...prevState,
            brandName: res.data.data[0].brandName,
          }));
          getZone(res.data.data[0].Zone);
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
  };
  //支行以及区域 数据请求
  const getZone = (Zone) => {
    instance
      .get("/LoanOrder/findbranch", {
        params: {
          city: Zone,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setBranch(res.data.data);
          setZoneList(res.data.zonelist);
          setFormData((prevState) => ({
            ...prevState,
            subBranch: res.data.data[0].subbranchName,
            levelName: res.data.data[0].levelName,
          }));
          setFormData((prevState) => ({
            ...prevState,
            Zone: Zone,
          }));
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
  };
  //所属团队选择事件
  const teamChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      Team: value,
    }));
  };
  //产品名称选择事件
  const productChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      Product: value,
    }));
  };
  //还款方式选择事件
  const repayentChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      Repayent: value,
    }));
  };
  //客户主体选择事件
  const customerChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      isPerson: value,
    }));
  };
  // 是否抵押选择事件
  const mortgageChange = (e) => {
    const { value } = e.target;
    if (value === "2") {
      setIsShowMask(true);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        ismortgage: value,
      }));
    }
  };
  //是否新能源选择事件
  const isNewCarChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      isnewenergy: value,
    }));
  };
  //表单input手动输入项赋值事件
  const inpChange = (e) => {
    const { value } = e.target;
    const { name } = e.cacheTarget.dataset;
    console.log(name, value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //未抵押理由
  const checkChange = (e) => {
    let { value } = e.target;
    let strArr = [0, 0, 0];
    for (const item of value) {
      strArr[item] = 1;
    }
    setFormData((prevState) => ({
      ...prevState,
      mortgageMemo: strArr.toString(),
    }));
  };
  //未抵押理由弹出层关闭事件
  const closeMask = () => {
    if (formData.mortgageMemo !== "0,0,0") {
      setIsShowMask(false);
      setFormData((prevState) => ({
        ...prevState,
        ismortgage: "2",
      }));
    }
    if (formData.mortgageMemo === "0,0,0") {
      setIsShowMask(false);
      setFormData((prevState) => ({
        ...prevState,
        ismortgage: "1",
      }));
    }
  };
  return (
    <View className="wrapper">
      <Navigator title={"邮储台账"} />
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
          {/* 常规信息 */}
          <View className="routine">
            <View className="formItem">
              <View className="label">实际经销商</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="请输入实际经销商关键字搜索"
                type="text"
                confirmType="搜索"
                name="dealerName"
                value={dealerKeywords}
                onInput={(e) => {
                  setDealerKeywords(e.detail.value);
                }}
              />
              <Image
                className="search"
                onClick={dealerSearch}
                src={search}
              ></Image>
            </View>
            <View className="formItem">
              <View className="label">系统经销商</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="信息匹配经销商"
                type="text"
                name="sysDealerName"
                value={formData.sysDealerName}
              />
            </View>
            <View className="formItem">
              <View className="label">区域</View>
              <Picker
                style={{ marginLeft: "auto" }}
                mode="selector"
                range={ZoneList}
                onChange={zeonChange}
              >
                <View className="picker">
                  <Input
                    placeholderClass="inpPlace"
                    readonly
                    value={formData.Zone}
                    style={{ marginRight: "24rpx" }}
                    className="inp"
                    name="Zone"
                  />
                  <Image className="search" src={dropDown}></Image>
                </View>
              </Picker>
            </View>
            <View className="formItem">
              <View className="label">所属支行</View>
              <Picker
                style={{ marginLeft: "auto" }}
                mode="selector"
                range={branch}
                onChange={branchChange}
                name="subBranch"
                rangeKey="subbranchName"
              >
                <View className="picker">
                  <Input
                    placeholderClass="inpPlace"
                    readonly
                    placeholder="请选择支行"
                    style={{ marginRight: "24rpx" }}
                    className="inp"
                    name="subBranch"
                    value={formData.subBranch}
                  />
                  <Image className="search" src={dropDown}></Image>
                </View>
              </Picker>
            </View>
            <View className="formItem">
              <View className="label">店面属性</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="非选项"
                type="text"
                name="storeAtt"
                value={formData.storeAtt}
              />
            </View>
            <View className="formItem">
              <View className="label">所属团队</View>
              <RadioGroup
                style={{ marginLeft: "auto" }}
                name="Team"
                onChange={teamChange}
              >
                <Radio
                  color="#19B56A"
                  checked
                  style={{
                    transform: "scale(0.8)",
                    margin: "0 16rpx 0 0",
                  }}
                  value="自营"
                />
                <Text className="radioLabel">自营</Text>
                <Radio
                  color="#19B56A"
                  style={{
                    transform: "scale(0.8)",
                    margin: "0 16rpx 0 40rpx",
                  }}
                  value="标服"
                />
                <Text className="radioLabel">标服</Text>
              </RadioGroup>
            </View>
            <View className="formItem">
              <View className="label">产品名称</View>
              <RadioGroup
                style={{ marginLeft: "auto" }}
                name="Product"
                onChange={productChange}
              >
                <Radio
                  color="#19B56A"
                  checked
                  style={{
                    transform: "scale(0.8)",
                    margin: "0 16rpx 0 0",
                  }}
                  value="常规产品"
                />
                <Text className="radioLabel">常规产品</Text>
                <Radio
                  color="#19B56A"
                  style={{
                    transform: "scale(0.8)",
                    margin: "0 16rpx 0 40rpx",
                  }}
                  value="贴息产品"
                />
                <Text className="radioLabel">贴息产品</Text>
              </RadioGroup>
            </View>
            <View className="formItem">
              <View className="label">期限</View>
              <Picker
                style={{ marginLeft: "auto" }}
                mode="selector"
                range={financeMonth}
                onChange={financeMonthChange}
              >
                <View className="picker">
                  <Input
                    className="inp"
                    placeholderClass="inpPlace"
                    type="text"
                    name="financeMonth"
                    value={formData.financeMonth}
                    disabled
                  />
                  <Image className="search" src={dropDown}></Image>
                </View>
              </Picker>
            </View>
            <View className="formItem">
              <View className="label">费率</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="请填写费率"
                type="text"
                name="productRate"
                value={formData.productRate}
                onInput={inpChange}
                data-name="productRate"
              />
            </View>
            <View className="formItem">
              <View className="label">还款方式</View>
              <RadioGroup
                style={{ marginLeft: "auto" }}
                name="Repayent"
                onChange={repayentChange}
              >
                <Radio
                  color="#19B56A"
                  style={{
                    transform: "scale(0.8)",
                    margin: "0 16rpx 0 0",
                  }}
                  value="等额本息"
                />
                <Text className="radioLabel">等额本息</Text>
                <Radio
                  color="#19B56A"
                  checked
                  style={{
                    transform: "scale(0.8)",
                    margin: "0 16rpx 0 40rpx",
                  }}
                  value="等本等息"
                />
                <Text className="radioLabel">等本等息</Text>
              </RadioGroup>
            </View>
          </View>
          {/* 客户信息 */}
          <View className="client">
            <View className="formItem">
              <View className="label">客户主体</View>
              <RadioGroup
                style={{ marginLeft: "auto" }}
                name="isPerson"
                onChange={customerChange}
              >
                <Radio
                  color="#19B56A"
                  checked
                  style={{
                    transform: "scale(0.8)",
                    margin: "0 16rpx 0 0",
                  }}
                  value="个人"
                />
                <Text className="radioLabel">个人</Text>
                <Radio
                  color="#19B56A"
                  style={{
                    transform: "scale(0.8)",
                    margin: "0 16rpx 0 40rpx",
                  }}
                  value="公司"
                />
                <Text className="radioLabel">公司</Text>
              </RadioGroup>
            </View>
            {formData.isPerson === "公司" && (
              <>
                <View className="formItem">
                  <View className="label">公司名称</View>
                  <Input
                    className="name"
                    style={{ textAlign: "right" }}
                    type="text"
                    data-name="corpName"
                    value={formData.corpName}
                    placeholder="公司名称"
                    name="corpName"
                    onInput={inpChange}
                  />
                </View>
                <View className="formItem">
                  <View className="label">公司法人</View>
                  <Input
                    className="name"
                    style={{ textAlign: "right" }}
                    type="text"
                    data-name="legalPerson"
                    value={formData.legalPerson}
                    placeholder="请输入公司法人姓名"
                    name="legalPerson"
                    onInput={inpChange}
                  />
                </View>
              </>
            )}
            <View className="formItem">
              <View className="label">身份证号</View>
              <Input
                className="idCode"
                style={{ textAlign: "right", paddingRight: "10rpx" }}
                type="number"
                name="customerIDNum"
                data-name="customerIDNum"
                value={formData.customerIDNum}
                placeholder="上传身份证照片自动识别"
                onInput={inpChange}
              />
              <Image className="scan" src={scan} onClick={scanIdCard}></Image>
            </View>
            <View className="formItem">
              <View className="label">客户姓名</View>
              <Input
                className="name"
                style={{ textAlign: "right" }}
                type="text"
                data-name="customerName"
                value={formData.customerName}
                placeholder="请输入客户姓名"
                name="customerName"
                onInput={inpChange}
              />
            </View>
            <View className="formItem">
              <View className="label">手机号</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="请输入手机号"
                type="number"
                name="customerPhone"
                value={formData.customerPhone}
                onInput={inpChange}
                data-name="customerPhone"
              />
            </View>
            <View className="formItem">
              <View className="label">婚姻状况</View>
              <Picker
                style={{ marginLeft: "auto" }}
                mode="selector"
                range={selector}
                onChange={selChange}
              >
                <View className="picker">
                  <Input
                    placeholderClass="inpPlace"
                    readonly
                    placeholder="请选择婚姻状况"
                    style={{ marginRight: "24rpx" }}
                    className="inp"
                    name="maritalStatus"
                    value={formData.maritalStatus}
                  />
                  <Image className="search" src={dropDown}></Image>
                </View>
              </Picker>
            </View>
            <View className="formItem">
              <View className="label">住房地址</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="填写门牌号"
                type="text"
                name="residenceAddress"
                value={formData.residenceAddress}
                onInput={inpChange}
                data-name="residenceAddress"
              />
            </View>
            <View className="formItem">
              <View className="label">联系人</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="请输入联系人"
                type="text"
                name="contactsName"
                value={formData.contactsName}
                onInput={inpChange}
                data-name="contactsName"
              />
            </View>
            <View className="formItem">
              <View className="label">联系电话</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="请输入联系电话"
                type="text"
                name="contactsTel"
                value={formData.contactsTel}
                onInput={inpChange}
                data-name="contactsTel"
              />
            </View>
            <View className="formItem">
              <View className="label">单位全称</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="请输入单位全称"
                type="text"
                name="companyName"
                value={formData.companyName}
                onInput={inpChange}
                data-name="companyName"
              />
            </View>
            <View className="formItem">
              <View className="label">部门职务</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="请输入部门职务"
                type="text"
                name="department"
                value={formData.department}
                onInput={inpChange}
                data-name="department"
              />
            </View>
            <View className="formItem">
              <View className="label">入职日期</View>
              <Picker
                style={{ marginLeft: "auto" }}
                mode="date"
                onChange={workStartHandle}
                name="entryDate"
                value={formData.entryDate}
              >
                <View className="picker">
                  <Input
                    placeholderClass="inpPlace"
                    readonly
                    disabled={true}
                    name="entryDate"
                    value={formData.entryDate}
                    placeholder="请选择当前工作起始日期"
                    style={{ marginRight: "24rpx" }}
                    className="inp"
                  />
                  <Image className="search" src={dropDown}></Image>
                </View>
              </Picker>
            </View>
            <View className="formItem">
              <View className="label">月收入（万）</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="请选择月收入金额"
                type="number"
                name="monthlypay"
                value={formData.monthlypay}
                onInput={inpChange}
                data-name="monthlypay"
              />
            </View>
            <View className="formItem">
              <View className="label">单位地址</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="请输入单位详细地址"
                type="text"
                name="companyAddress"
                value={formData.companyAddress}
                onInput={inpChange}
                data-name="companyAddress"
              />
            </View>
            <View className="formItem">
              <View className="label">是否抵押</View>
              <RadioGroup
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "baseline",
                }}
                onChange={mortgageChange}
                name="ismortgage"
              >
                <Radio
                  color="#19B56A"
                  style={{
                    transform: "scale(0.8)",
                    margin: "0 16rpx 0 0",
                  }}
                  value="1"
                  checked={formData.ismortgage === "1"}
                />
                <Text className="radioLabel">是</Text>
                <Radio
                  color="#19B56A"
                  style={{
                    transform: "scale(0.8)",
                    margin: "0 16rpx 0 40rpx",
                  }}
                  value="2"
                  checked={formData.ismortgage === "2"}
                />
                <Text className="radioLabel">否</Text>
              </RadioGroup>
            </View>
          </View>
          {/* 车辆信息 */}
          <View className="vehicle">
            <View className="formItem">
              <View className="label">购车数量</View>
              <View className="numContent">
                <View className="minus" onClick={minus}>
                  -
                </View>
                <Input
                  className="num"
                  name="carCount"
                  value={formData.carCount}
                ></Input>
                <View className="add" onClick={add}>
                  +
                </View>
              </View>
            </View>
            <View className="formItem">
              <View className="label">车辆品牌</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="请输入品牌信息"
                type="text"
                name="brandName"
                value={formData.brandName}
                onInput={inpChange}
                data-name="brandName"
              />
            </View>
            <View className="formItem">
              <View className="label">车型</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="请输入车型信息"
                type="text"
                name="modelName"
                value={formData.modelName}
                onInput={inpChange}
                data-name="modelName"
              />
            </View>
            <View className="formItem">
              <View className="label">新能源</View>
              <RadioGroup
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "baseline",
                }}
                name="isnewenergy"
                onChange={isNewCarChange}
              >
                <Radio
                  color="#19B56A"
                  style={{
                    transform: "scale(0.8)",
                    margin: "0 16rpx 0 0",
                  }}
                  value="是"
                />
                <Text className="radioLabel">是</Text>
                <Radio
                  color="#19B56A"
                  style={{
                    transform: "scale(0.8)",
                    margin: "0 16rpx 0 40rpx",
                  }}
                  value="否"
                />
                <Text className="radioLabel">否</Text>
              </RadioGroup>
            </View>
            <View className="formItem">
              <View className="label">开票价</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="请输入开票价"
                type="text"
                name="totalAmount"
                value={formData.totalAmount}
                onInput={inpChange}
                data-name="totalAmount"
              />
            </View>
            <View className="formItem">
              <View className="label">贷款额</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="请输入贷款额"
                type="text"
                name="loanAmount"
                value={formData.loanAmount}
                onInput={inpChange}
                data-name="loanAmount"
              />
            </View>
            <View className="formItem">
              <View className="label">负债情况</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="请输入负债情况说明"
                type="text"
                name="liabilityMemo"
                value={formData.liabilityMemo}
                onInput={inpChange}
                data-name="liabilityMemo"
              />
            </View>
            <View className="formItem">
              <View className="label">居住年限</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="请输入本地居住年限（年）"
                type="text"
                name="residenceYear"
                value={formData.residenceYear}
                onInput={inpChange}
                data-name="residenceYear"
              />
            </View>
            <View className="formItem">
              <View className="label">从业年限</View>
              <Input
                className="inp"
                placeholderClass="inpPlace"
                placeholder="请输入本行业工业年限（年）"
                type="text"
                name="obtainYear"
                value={formData.obtainYear}
                onInput={inpChange}
                data-name="obtainYear"
              />
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
        type={submitCode ? "success" : "fail"}
        subTitle={submitMessage}
        sureText="确定"
      />
      <PageContainer
        show={isShowMask}
        zIndex="101"
        overlay={false}
        position="bottom"
      >
        <View className="wraps">
          <View className="maskWrap">
            <View className="title">
              未抵押原因
              <View className="sure" onClick={closeMask}>
                确定
              </View>
            </View>
            <CheckboxGroup className="content" onChange={checkChange}>
              <Checkbox value={0}>1、优良职业、公务员或上市公司。</Checkbox>
              <Checkbox value={1}>2、首付比例≥5成</Checkbox>
              <Checkbox value={2}>
                3、西安及周边定居工作生活、已婚、稳定。
              </Checkbox>
            </CheckboxGroup>
          </View>
        </View>
      </PageContainer>
    </View>
  );
};

export default PostalSavings;
