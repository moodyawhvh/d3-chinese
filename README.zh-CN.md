<div align="center">

# d3 中文文档

[![原项目](https://img.shields.io/badge/原项目-d3--d3-blue?style=flat-square&logo=github)](https://github.com/d3/d3)
[![官网](https://img.shields.io/badge/官网-d3js.org-blueviolet?style=flat-square)](https://d3js.org)
[![微信联系](https://img.shields.io/badge/微信-uaycar-brightgreen?style=flat-square&logo=wechat)](#)

</div>

> 本文档是 [d3/d3](https://github.com/d3/d3) 官方 README 的中文翻译与整理,仅供中文社区学习参考。

## 📖 简介

**D3**(或 **D3.js**,全称 **Data-Driven Documents**,数据驱动文档)是一个免费、开源的 JavaScript 数据可视化库。它基于 Web 标准构建的底层方法,让你在编写动态、数据驱动的图形时拥有无与伦比的灵活性。十余年来,D3 支撑了无数开创性的、屡获殊荣的可视化作品,成为众多更高层图表库的基础构建块,并在全球范围内孕育了一个充满活力的数据实践者社区。

一句话概括:**D3 借助 SVG、Canvas 与 HTML 让数据栩栩如生(Bring data to life with SVG, Canvas and HTML)**。

## ✨ 核心特性

- **数据驱动文档**:将任意数据绑定到文档对象模型(DOM),再由数据驱动文档的创建、更新与销毁。
- **基于 Web 标准**:完全构建在 SVG、Canvas、HTML 与 CSS 之上,不依赖私有格式或插件,现代浏览器即开即用。
- **底层而灵活**:不像传统图表库那样提供固定的图表类型,而是提供一组可自由组合的可视化原语,任何你能想到的图形都能实现。
- **模块化设计**:约 30 个独立的 JavaScript 模块,既可以整库引入,也可以只取所需。
- **组件丰富**:比例尺、坐标轴、形状生成器、过渡动画、力导向图、地理投影、层级布局、缩放与拖拽交互等一应俱全。
- **久经考验**:持续维护十余年,广泛用于新闻媒体的数据新闻与企业的商业报表。
- **生态繁荣**:拥有大量示例、教程与基于 D3 构建的上层图表库。

## 📦 安装

使用 npm 安装:

```bash
npm install d3
```

整库引入:

```js
import * as d3 from "d3";
```

只引入需要的模块(推荐,便于 tree-shaking 减小打包体积):

```js
import {select, selectAll} from "d3";
```

在浏览器中直接通过 CDN 引入:

```html
<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
```

## 🚀 快速上手

一个最小的 D3 示例:选中元素、绑定数据、绘制条形图。

```js
import * as d3 from "d3";

const data = [40, 90, 130, 60];

const svg = d3.select("body")
  .append("svg")
  .attr("width", 300)
  .attr("height", 150);

svg.selectAll("rect")
  .data(data)
  .join("rect")
    .attr("x", (d, i) => i * 40)
    .attr("y", d => 150 - d)
    .attr("width", 30)
    .attr("height", d => d)
    .attr("fill", "steelblue");
```

推荐学习路径:

1. 阅读[官方文档](https://d3js.org),理解选择集(selections)与比例尺(scales)等核心概念;
2. 浏览[示例画廊](https://observablehq.com/@d3/gallery),找到最接近需求的例子;
3. 在 [Observable](https://observablehq.com) 上在线交互实验,无需配置本地环境;
4. 前往 [Releases](https://github.com/d3/d3/releases) 查看各版本变更。

## 🧩 主要模块一览(节选)

| 模块 | 说明 |
|:-----|:-----|
| d3-selection | W3C 选择集 API,实现数据与 DOM 的绑定 |
| d3-scale | 用于视觉编码的比例尺(线性、对数、序数、颜色等) |
| d3-shape | 折线、面积、弧、堆叠图等图形生成器 |
| d3-transition | 基于插值的平滑过渡动画 |
| d3-axis | 面向人类阅读的坐标轴组件 |
| d3-force | 力导向图布局 |
| d3-geo | 地理投影与球面形状 |
| d3-hierarchy | 树图、集群图、打包图等层级布局 |
| d3-zoom / d3-drag / d3-brush | 缩放、拖拽、框选等交互行为 |

完整模块列表以[原项目文档](https://d3js.org)为准。

## 🌐 资源

* 文档:https://d3js.org
* 示例:https://observablehq.com/@d3/gallery
* 发布版本:https://github.com/d3/d3/releases
* 社区与求助:https://d3js.org/community

## 📞 联系方式

**代部署 / 定制服务 / 技术咨询 请添加微信:uaycar**

---

> 本文档为 [d3/d3](https://github.com/d3/d3) 的中文翻译版本,翻译内容仅供学习交流;所有代码版权归原项目作者所有,D3 基于 ISC 许可证开源发布。

**如果觉得有用,请给原项目点个 Star!** ⭐
