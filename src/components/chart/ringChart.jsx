//index.js
import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Canvas } from "@tarojs/components";
import uCharts from "@qiun/ucharts";
import "./ringChart.scss";
var uChartsInstance = {};
export default class Ring extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      cWidth: 375,
      cHeight: 223,
      pixelRatio: 1,
    };
  }

  componentDidMount() {
    const sysInfo = Taro.getSystemInfoSync();
    const pixelRatio = sysInfo.pixelRatio;
    //这里的第一个 750 对应 css .charts 的 width
    const cWidth = (375 / 375) * sysInfo.windowWidth;
    //这里的 500 对应 css .charts 的 height
    const cHeight = (223 / 375) * sysInfo.windowWidth;
    this.setState({ cWidth, cHeight, pixelRatio }, () => this.getServerData());
  }

  getServerData = () => {
    //模拟从服务器获取数据时的延时
    setTimeout(() => {
      //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
      let res = {
        series: [
          {
            data: [
              { name: "已完成", value: 75, legendShape: "rect" },
              { name: "目标额", value: 100, legendShape: "rect" },
            ],
          },
        ],
      };
      this.drawCharts("xAFnJDItkjQXoLyPgJqoQCVcbBbkjMqR", res);
    }, 500);
  };

  drawCharts = (id, data) => {
    const { cWidth, cHeight, pixelRatio } = this.state;
    const query = Taro.createSelectorQuery();
    query
      .select("#" + id)
      .fields({ node: true, size: true })
      .exec((res) => {
        if (res[0]) {
          const canvas = res[0].node;
          const ctx = canvas.getContext("2d");
          canvas.width = res[0].width * pixelRatio;
          canvas.height = res[0].height * pixelRatio;
          uChartsInstance[id] = new uCharts({
            type: "ring",
            context: ctx,
            width: cWidth * pixelRatio,
            height: cHeight * pixelRatio,
            series: data.series,
            pixelRatio: pixelRatio,
            animation: true,
            rotate: false,
            rotateLock: false,
            background: "#FFFFFF",
            color: ["#19B56A", "#D2F0E2"],
            padding: [5, 5, 5, 5],
            dataLabel: false,
            legend: {
              show: false,
            },
            title: {
              name: "75%",
              fontSize: 22,
              color: "#000000",
            },
            subtitle: {
              name: "达成率",
              fontSize: 12,
              color: "#777777",
              offsetY: 5,
            },
            extra: {
              ring: {
                ringWidth: 20,
                customRadius: 70,
              },
              tooltip: {
                borderRadius: 6,
                bgColor: "#F6F6F6",
                boxPadding: 4,
                fontSize: 12,
                lineHeight: 22,
                fontColor: "#111111",
                legendShow: true,
                bgOpacity: 1,
              },
            },
          });
        } else {
          console.error("[uCharts]: 未获取到 context");
        }
      });
  };

  tap = (e) => {
    uChartsInstance[e.target.id].touchLegend(e);
    uChartsInstance[e.target.id].showToolTip(e, {
      formatter: (item) => {
        return item.name + ":" + item.data + "%";
      },
    });
  };

  render() {
    const { cWidth, cHeight } = this.state;
    const canvasProps = { style: { width: cWidth, height: cHeight } };
    return (
      <View>
        <Canvas
          {...canvasProps}
          canvas-id="xAFnJDItkjQXoLyPgJqoQCVcbBbkjMqR"
          id="xAFnJDItkjQXoLyPgJqoQCVcbBbkjMqR"
          type="2d"
          class="ringCharts"
          onTouchEnd={this.tap}
        />
      </View>
    );
  }
}
