import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Canvas } from "@tarojs/components";
import uCharts from "@qiun/ucharts";
import "./lineChart.scss";
var uChartsInstance = {};
/**
 *chartData ——> 图表数据
 *legendPosition ——> 图例位置
 *legendFloat ——> 图例水平位置
 *dataPointIsShow ——> 数据点是否显示
 *xIsShow ——> x轴是否显示
 *yTextUnit ——> y轴单位
 *tooltipUnit ——> tooltip提示框单位
 *lineType ——> 线类型
 */
export default class Line extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      cWidth: 750,
      cHeight: 540,
      pixelRatio: 1,
    };
  }

  componentDidMount() {
    const sysInfo = Taro.getSystemInfoSync();
    const pixelRatio = sysInfo.pixelRatio;
    const cWidth = (750 / 750) * sysInfo.windowWidth;
    const cHeight = (540 / 750) * sysInfo.windowWidth;
    this.setState({ cWidth, cHeight, pixelRatio });
    if (this.props.chartData) {
      setTimeout(() => {
        this.drawCharts(
          `PgwphKzFVOLrtngDnAbGUwcvEiVPFKCf${this.props.id}`,
          this.props.chartData
        );
      }, 500);
    }
  }

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
            type: "line",
            context: ctx,
            width: cWidth * pixelRatio,
            height: cHeight * pixelRatio,
            categories: data.categories,
            series: data.series,
            pixelRatio: pixelRatio,
            animation: true,
            background: "#FFFFFF",
            color: ["#F9940A", "#19B56A"],
            padding: [15, 10, 0, 15],
            enableScroll: false,
            legend: {
              position: this.props.legendPosition
                ? this.props.legendPosition
                : "bottom",
              float: this.props.legendFloat ? this.props.legendFloat : "center",
              itemName: {
                fontSize: 24,
                fontWeight: 400,
                fill: "#000000",
              },
              margin: 16,
            },
            dataLabel: false, // 是否在图表中显示数据
            dataPointShapeType: "hollow", // 数据点格式：空心/实心
            dataPointShape: this.props.dataPointIsShow
              ? this.props.dataPointIsShow
              : true, // 是否显示数据点
            xAxis: {
              disableGrid: true,
              disabled: this.props.xIsShow ? this.props.xIsShow : false,
              fontColor: this.props.Color ? this.props.Color : "#000000",
            },
            yAxis: {
              gridType: "dash",
              dashLength: 2,
              formatter: (val) => {
                return this.props.yTextUnit ? val + this.props.yTextUnit : val;
              },
            },
            extra: {
              line: {
                type: this.props.lineType ? this.props.lineType : "straight",
                width: 2,
                activeType: "hollow",
              },
              tooltip: {
                borderRadius: 6,
                bgColor: "#F6F6F6",
                boxPadding: 4,
                fontSize: 12,
                lineHeight: 22,
                fontColor: "#111111",
                legendShow: false,
                bgOpacity: 1,
              },
            },
          });
        }
      });
  };

  tap = (e) => {
    //图例点击事件
    uChartsInstance[e.target.id].touchLegend(e);
    //自定义toolTip文字
    uChartsInstance[e.target.id].showToolTip(e, {
      formatter: (item) => {
        return (
          item.name +
          ":" +
          item.data +
          `${this.props.tooltipUnit ? this.props.tooltipUnit : ""}`
        );
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
          canvas-id={`PgwphKzFVOLrtngDnAbGUwcvEiVPFKCf${this.props.id}`}
          id={`PgwphKzFVOLrtngDnAbGUwcvEiVPFKCf${this.props.id}`}
          type="2d"
          class="charts"
          onTouchEnd={this.tap}
        />
      </View>
    );
  }
}
