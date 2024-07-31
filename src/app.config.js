export default {
  permission: {
    "scope.userLocation": {
      desc: "你的位置将用于考勤位置展示",
    },
  },
  requiredPrivateInfos: ["getLocation"],
  requiredBackgroundModes: ["location"],
  pages: [
    "pages/login/index", //登录
    "pages/index/index", //首页
    "pages/statistics/index", //统计
    "pages/workbench/index", //工作台
    "pages/mine/index", //我的
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  subpackages: [
    {
      root: "pages/subpack/",
      pages: [
        "phonelogin/index", //手机号登录
        "authentication/index", //认证服务条款
        "privacypolicy/index", //隐私政策
        "useragreement/index", //用户协议
        "account/index", //账号密码登录
        "captcha_login/index", //获取验证码
        "forget/index", //修改密码
        "postalsavings/index", //邮储台账
        "rebate/index", //返利申请
        "approval/index", //审批表单
        "more/index", //更多功能
        "postalsavingslist/index", //邮储订单
        "postalListDetail/index", //邮储订单详情
        "rebatelist/index", //返利订单
        "rebatelistdetail/index", //返利订单详情
        "application/index", //审批列表
        "applicationdetail/index", //审批详情
        "refuse/index", //费用审核
        "ranking/index", //放款额排行
        "attendance/index", //考勤打卡
        "signin/index", //外出
        "repair/index", //补卡
        "repairDetail/index", //补卡详情
        "askForLeave/index", //请假
        "askForLeaveDetail/index", //请假详情
        "trip/index", //出差
        "tripDetail/index", //出差详情
        "out/index", //外出
        "outDetail/index", //外出详情
        "reimbursement/index", //报销
        "reimbursementDetail/index", //报销详情
        "daily/index", //日报
        "dailyList/index", //日报列表
        "dailyDetail/index", //日报详情
        "business/index", //"商务政策申请"
        "message/index", //消息
        "businessDetail/index", //"商务政策详情"
        "declaration/index", //任务审批
        "approvalList/index", //审批列表
        "registration/index", //申请注册
        "dealer/index", //车商管理
        "dealerDetail/index", //车商详情
        "qrcode/index", //二维码
      ],
    },
    {
      root: "pages/subPages/",
      pages: [
        "grades/index", //业绩分析
      ],
    },
  ],
  lazyCodeLoading: "requiredComponents",
  tabBar: {
    color: "#AABEB4",
    selectedColor: "#19B56A",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "./assets/tabbar/home.png",
        selectedIconPath: "./assets/tabbar/home_select.png",
      },
      {
        pagePath: "pages/statistics/index",
        text: "统计",
        iconPath: "./assets/tabbar/statistics.png",
        selectedIconPath: "./assets/tabbar/statistics_select.png",
      },
      {
        pagePath: "pages/workbench/index",
        text: "工作台",
        iconPath: "./assets/tabbar/workbench.png",
        selectedIconPath: "./assets/tabbar/workbench_select.png",
      },
      {
        pagePath: "pages/mine/index",
        text: "我的",
        iconPath: "./assets/tabbar/mine.png",
        selectedIconPath: "./assets/tabbar/mine_select.png",
      },
    ],
  },
};
