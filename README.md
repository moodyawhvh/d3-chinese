<div align="center">

# d3 中文翻译版

**[中文版] d3 — 用 SVG、Canvas 与 HTML 让数据栩栩如生的 JavaScript 数据可视化库**

[![原项目](https://img.shields.io/badge/原项目-d3--d3-blue?style=flat-square&logo=github)](https://github.com/d3/d3)
[![中文文档](https://img.shields.io/badge/中文文档-README.zh--CN.md-orange?style=flat-square)](README.zh-CN.md)
[![GitHub Stars](https://img.shields.io/github/stars/d3/d3?style=flat-square&label=原项目Stars)](https://github.com/d3/d3/stargazers)
[![微信联系](https://img.shields.io/badge/微信-uaycar-brightgreen?style=flat-square&logo=wechat)](#)

</div>

---

> 这是 [d3/d3](https://github.com/d3/d3) 的中文翻译版本。
> 完整源代码请访问原项目:https://github.com/d3/d3

**代部署 / 定制服务 / 技术咨询 请添加微信:uaycar**

---

## 📖 项目简介

d3(又称 D3.js,全称 Data-Driven Documents,即"数据驱动文档")是一个免费、开源的 JavaScript 数据可视化库,通过 SVG、Canvas 与 HTML 让数据栩栩如生。它采用基于 Web 标准的底层设计,在编写动态、数据驱动的图形时提供了无与伦比的灵活性。十余年来,d3 支撑了大量开创性的、屡获殊荣的可视化作品,成为众多上层图表库的基础构建块,并在全球孕育了一个充满活力的数据实践者社区。

## ✨ 主要特性

- 免费开源(ISC 许可证),十余年持续维护,久经生产环境考验
- 数据驱动文档:将任意数据绑定到 DOM,用数据驱动页面的创建与更新
- 完全基于 SVG、Canvas、HTML 与 CSS 等 Web 标准,无私有格式、无框架锁定
- 底层而灵活:提供可视化原语而非固定图表模板,可自由组合出任意图形
- 模块化设计:selections、scales、shapes、transitions 等约 30 个独立模块,可按需引入
- 内置坐标轴、过渡动画、力导向图、地理投影、层级布局等丰富组件
- 支持缩放、拖拽、框选等交互行为,轻松构建可探索的可视化
- 示例画廊与社区生态繁荣,是新闻数据可视化与商业报表领域的经典选择

## 📁 文件说明

| 文件 | 说明 |
|:-----|:-----|
| README.md | 本文件(中文简介) |
| README.zh-CN.md | 详细中文文档(完整汉化) |

## 🚀 快速开始

1. 使用 npm 安装:

```bash
npm install d3
```

2. 在项目中整库引入:

```js
import * as d3 from "d3";
```

3. 或按需只引入需要的模块(推荐,便于 tree-shaking):

```js
import {select, scaleLinear} from "d3";
```

4. 浏览器中直接通过 CDN 引入:

```html
<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
```

5. 选中元素、绑定数据、绘制图形,完整的中文示例见 [README.zh-CN.md](README.zh-CN.md)。

完整源代码与最新版本请访问原项目:https://github.com/d3/d3

## 📞 联系方式

**代部署 / 定制服务 / 技术咨询 请添加微信:uaycar**

---

本项目为 [d3/d3](https://github.com/d3/d3) 的中文翻译版本,所有代码版权归原项目作者所有,遵循其原始许可证。

**如果觉得有用,请给原项目点个 Star!** ⭐
