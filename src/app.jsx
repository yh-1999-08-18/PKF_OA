import { Component } from "react";
import "taro-ui/dist/style/index.scss";
import "./app.scss";
import Taro from "@tarojs/taro";

class App extends Component {
  /**
   * 在组件挂载到 DOM 后执行的钩子函数。
   * 检查本地存储中的 openId 是否为空。
   * 如果 openId 不存在，使用 Taro.navigateTo 跳转到登录页面。
   */
  componentDidMount() {
    const openId = Taro.getStorageSync("openId");
    if (!openId) {
      Taro.navigateTo({
        url: "/pages/login/index",
      });
    }
  }

  componentDidShow() {}

  componentDidHide() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
