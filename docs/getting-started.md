<script setup>

import ExampleBlankChart from "./components/ExampleBlankChart.vue";

</script>

> 🌐 本文档由 [d3/d3](https://github.com/d3/d3) 翻译,英文原版见原项目。
>
> ℹ️ 注:本文件原文较长,本次翻译覆盖全部正文说明章节;代码示例保持原样(注释为英文原版)。

# 入门指南

D3 可以在任何 JavaScript 环境中运行。

## 在线体验 D3

上手 D3(并获得帮助)最快的方式是在 [Observable](https://observablehq.com) 上!D3 默认内置于 Observable 笔记本的标准库中。要用 D3 创作点什么,只需在单元格中返回生成的 DOM 元素。下面是一个空白图表,帮你起步:

<ExampleBlankChart />

```js
{
  // Declare the chart dimensions and margins.
  const width = 640;
  const height = 400;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;

  // Declare the x (horizontal position) scale.
  const x = d3.scaleUtc()
      .domain([new Date("2023-01-01"), new Date("2024-01-01")])
      .range([marginLeft, width - marginRight]);

  // Declare the y (vertical position) scale.
  const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height - marginBottom, marginTop]);

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height);

  // Add the x-axis.
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x));

  // Add the y-axis.
  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y));

  // Return the SVG element.
  return svg.node();
}
```

想要更完整的示例,可以试试这些起步模板:

* [面积图](https://observablehq.com/@d3/area-chart/2)
* [柱状图](https://observablehq.com/@d3/bar-chart/2)
* [环形图](https://observablehq.com/@d3/donut-chart/2)
* [直方图](https://observablehq.com/@d3/histogram/2)
* [折线图](https://observablehq.com/@d3/line-chart/2)

更多可 fork 的示例请看 [D3 画廊](https://observablehq.com/@d3/gallery)。

点击 **+** 添加单元格时,Observable 会提供一些 D3 代码片段(在单元格菜单打开时输入 “d3” 即可筛选),还有方便的[示例数据集](https://observablehq.com/@observablehq/sample-datasets)供你试用 D3 的各项特性。你也可以直接上传 CSV 或 JSON 文件,开始玩自己的数据。还可以 fork 我们发布的[数百个笔记本](https://observablehq.com/@d3?tab=notebooks)中的任意一个,赢在起跑线上。

Observable 对公开使用免费。注册 [Pro 账户](https://observablehq.com/pricing)即可连接私有数据库、在私有笔记本上协作,以及更多功能。

## 在原生 HTML 中使用 D3

在原生 HTML 中,你可以从 jsDelivr 等 CDN 加载 D3,也可以下载到本地使用。我们推荐使用 CDN 托管的 ES module 包。但如果有需要,我们也提供 UMD 包,以普通脚本方式加载时会导出全局变量 `d3`。

:::code-group
```html [ESM + CDN]
<!DOCTYPE html>
<div id="container"></div>
<script type="module">

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Declare the chart dimensions and margins.
const width = 640;
const height = 400;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

// Declare the x (horizontal position) scale.
const x = d3.scaleUtc()
    .domain([new Date("2023-01-01"), new Date("2024-01-01")])
    .range([marginLeft, width - marginRight]);

// Declare the y (vertical position) scale.
const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height - marginBottom, marginTop]);

// Create the SVG container.
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

// Add the x-axis.
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x));

// Add the y-axis.
svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y));

// Append the SVG element.
container.append(svg.node());

</script>
```

```html [UMD + CDN]
<!DOCTYPE html>
<div id="container"></div>
<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
<script type="module">

// Declare the chart dimensions and margins.
const width = 640;
const height = 400;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

// Declare the x (horizontal position) scale.
const x = d3.scaleUtc()
    .domain([new Date("2023-01-01"), new Date("2024-01-01")])
    .range([marginLeft, width - marginRight]);

// Declare the y (vertical position) scale.
const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height - marginBottom, marginTop]);

// Create the SVG container.
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

// Add the x-axis.
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x));

// Add the y-axis.
svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y));

// Append the SVG element.
container.append(svg.node());

</script>
```

```html [UMD + local]
<!DOCTYPE html>
<div id="container"></div>
<script src="d3.js"></script>
<script type="module">

// Declare the chart dimensions and margins.
const width = 640;
const height = 400;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

// Declare the x (horizontal position) scale.
const x = d3.scaleUtc()
    .domain([new Date("2023-01-01"), new Date("2024-01-01")])
    .range([marginLeft, width - marginRight]);

// Declare the y (vertical position) scale.
const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height - marginBottom, marginTop]);

// Create the SVG container.
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

// Add the x-axis.
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x));

// Add the y-axis.
svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y));

// Append the SVG element.
container.append(svg.node());

</script>
```
:::

你也可以像下面这样导入并解构单个 D3 模块:

```html
<script type="module">

import {forceSimulation, forceCollide, forceX} from "https://cdn.jsdelivr.net/npm/d3-force@3/+esm";

const nodes = [{}, {}];
const simulation = forceSimulation(nodes)
    .force("x", forceX())
    .force("collide", forceCollide(5))
    .on("tick", () => console.log(nodes[0].x));

</script>
```

如果你想在本地(或离线)运行 D3,可以在这里下载 D3 的 UMD 包:

- <a href="./d3.v7.js" download>d3.v7.js</a>
- <a href="./d3.v7.min.js" download>d3.v7.min.js</a>

然后按上面 **UMD + local** 标签页所示创建一个 `index.html` 文件。调试时使用未压缩包,生产环境使用压缩包以获得更好性能。

## 从 npm 安装

如果你在用 Node 开发 Web 应用,可以通过 yarn、npm、pnpm 或你偏好的包管理器安装 D3。

:::code-group

```bash [yarn]
yarn add d3
```

```bash [npm]
npm install d3
```

```bash [pnpm]
pnpm add d3
```

:::

然后在应用中这样加载 D3:

```js
import * as d3 from "d3";
```

也可以按需只导入特定的符号:

```js
import {select, selectAll} from "d3";
```

或者,安装并从 D3 子模块导入:

```js
import {mean, median} from "d3-array";
```

TypeScript 类型声明可通过 [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) 获取。

## 在 React 中使用 D3

大多数 D3 模块(包括 [d3-scale](./d3-scale.md)、[d3-array](./d3-array.md)、[d3-interpolate](./d3-interpolate.md) 和 [d3-format](./d3-format.md))不与 DOM 交互,在 React 中使用毫无差异。你可以在 JSX 中使用它们进行纯声明式可视化,比如下面的折线图。

:::code-group
```jsx [LinePlot.jsx]
import * as d3 from "d3";

export default function LinePlot({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20
}) {
  const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
  const y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
  const line = d3.line((d, i) => x(i), y);
  return (
    <svg width={width} height={height}>
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data)} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (<circle key={i} cx={x(i)} cy={y(d)} r="2.5" />))}
      </g>
    </svg>
  );
}
```
:::

<p style="margin-top: -1em;"><a href="https://codesandbox.io/s/d3-react-ssr-5g1bm0?file=/src/LinePlot.jsx" style="font-size: smaller;" target="_blank">Sandbox ↗︎</a></p>

基于[选择集](./d3-selection/selecting.md)工作的 D3 模块(包括 [d3-selection](./d3-selection.md)、[d3-transition](./d3-transition.md) 和 [d3-axis](./d3-axis.md))会直接操作 DOM,这与 React 的虚拟 DOM 存在竞争。这种情况下,你可以给元素挂一个 ref,并在 useEffect 钩子中把它交给 D3。

:::code-group
```jsx [LinePlot.jsx]
import * as d3 from "d3";
import {useRef, useEffect} from "react";

export default function LinePlot({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40
}) {
  const gx = useRef();
  const gy = useRef();
  const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
  const y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
  const line = d3.line((d, i) => x(i), y);
  useEffect(() => void d3.select(gx.current).call(d3.axisBottom(x)), [gx, x]);
  useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y]);
  return (
    <svg width={width} height={height}>
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data)} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (<circle key={i} cx={x(i)} cy={y(d)} r="2.5" />))}
      </g>
    </svg>
  );
}
```
:::

<p style="margin-top: -1em;"><a href="https://codesandbox.io/s/d3-react-useeffect-5lp0x6?file=/src/LinePlot.jsx" style="font-size: smaller;" target="_blank">Sandbox ↗︎</a></p>

更多在 React 中使用 D3 的指导,参见 [Amelia Wattenberger 的文章](https://2019.wattenberger.com/blog/react-and-d3)。

## 在 Svelte 中使用 D3

[与 React 一样](#d3-in-react),如果你愿意,可以只用 Svelte 做渲染,只用不操作 DOM 的 D3 模块。下面是一个数字数组的折线图,用到了 [d3-shape](./d3-shape.md) 和 [d3-scale](./d3-scale-chromatic.md)。

:::code-group
```svelte [LinePlot.svelte]
<script>
  import * as d3 from 'd3';

  export let data;
  export let width = 640;
  export let height = 400;
  export let marginTop = 20;
  export let marginRight = 20;
  export let marginBottom = 20;
  export let marginLeft = 20;

  $: x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
  $: y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
  $: line = d3.line((d, i) => x(i), y);
</script>
<svg width={width} height={height}>
  <path fill="none" stroke="currentColor" stroke-width="1.5" d={line(data)} />
  <g fill="white" stroke="currentColor" stroke-width="1.5">
    {#each data as d, i}
      <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
    {/each}
  </g>
</svg>
```
:::

<p style="margin-top: -1em;"><a href="https://svelte.dev/repl/ece91c0d8b204d5ea970dbbc0d6783aa?version=3.59.1" style="font-size: smaller;" target="_blank">REPL ↗︎</a></p>

Svelte 的响应式语句(`$:`)与 D3 的[数据联接](./d3-selection/joining.md)搭配得很妙,能高效完成更新。下面我们用它们在数据变化时渲染动态坐标轴。

:::code-group
```svelte [LinePlot.svelte]
<script>
  import * as d3 from 'd3';

  export let data;
  export let width = 640;
  export let height = 400;
  export let marginTop = 20;
  export let marginRight = 20;
  export let marginBottom = 30;
  export let marginLeft = 40;

  let gx;
  let gy;

  $: x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
  $: y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
  $: line = d3.line((d, i) => x(i), y);
  $: d3.select(gy).call(d3.axisLeft(y));
  $: d3.select(gx).call(d3.axisBottom(x));
</script>
<svg width={width} height={height}>
  <g bind:this={gx} transform="translate(0,{height - marginBottom})" />
  <g bind:this={gy} transform="translate({marginLeft},0)" />
  <path fill="none" stroke="currentColor" stroke-width="1.5" d={line(data)} />
  <g fill="white" stroke="currentColor" stroke-width="1.5">
    {#each data as d, i}
      <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
    {/each}
  </g>
</svg>
```
:::

<p style="margin-top: -1em;"><a href="https://svelte.dev/playground/8722c32f4e1a44a98e3a3fc8a095b2d7?version=5.16.0" style="font-size: smaller;" target="_blank">REPL ↗︎</a></p>
