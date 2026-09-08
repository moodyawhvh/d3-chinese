<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {useData} from "vitepress";
import {computed} from "vue";
import LogoDiagram from "./components/LogoDiagram.vue";
import PlotRender from "./components/PlotRender.js";

const {site: {value: {themeConfig: {sidebar}}}} = useData();

const paths = computed(() => {
  const paths = [];
  (function visit(node, path) {
    paths.push({path, link: node.link && `.${node.link}`});
    if (node.items) {
      for (const item of node.items) {
        visit(item, (path === "/" ? path : path + "/") + item.text);
      }
    }
  })({items: sidebar}, "/D3");
  return paths;
});

// https://github.com/observablehq/plot/issues/1703
function computeTreeWidth(paths) {
  const root = d3.tree().nodeSize([1, 1])(d3.stratify().path((d) => d.path)(paths));
  const [x1, x2] = d3.extent(root, (d) => d.x);
  return x2 - x1;
}

</script>

> 🌐 本文档由 [d3/d3](https://github.com/d3/d3) 翻译,英文原版见原项目。

# 什么是 D3?

<LogoDiagram />

**D3**(或 **D3.js**)是一个免费开源的 JavaScript 数据可视化库。它构建在 Web 标准之上的底层方案,为编写动态的、数据驱动的图形提供了无与伦比的灵活性。十多年来,D3 支撑了大量开创性的、屡获殊荣的可视化作品,成为了众多更高层级图表库的基础构件,并在全球范围内培育出一个充满活力的数据实践者社区。

Information is Beautiful 的 [2022 年“经久不衰奖”](https://nightingaledvs.com/information-is-beautiful-awards-test-of-time/)评价道:D3 “将整个领域弹射进了一场前所未有的增长、多元化与创造力的浪潮”,并“改变了新闻编辑室、网站和个人作品集中数百万数据可视化的创作方式”。IEEE VIS 的 [2021 年“经久不衰奖”](https://ieeevis.org/year/2021/info/awards/test-of-time-awards)则指出:“作者们创建了一个引人入胜、且便于 Web 开发者上手编写交互式可视化的框架,无疑推动了数据可视化走向主流。[D3] 是对本届会议、乃至对整个领域成功的基石性贡献。”

D3 由 Mike Bostock 于 2011 年创建。Mike 在斯坦福与 Jeff Heer、Vadim Ogievetsky 合著了 [D3 论文](http://vis.stanford.edu/papers/d3)。Jason Davies 在 2011 至 2013 年间对 D3 做出了重大贡献,其中最著名的是 D3 的地理投影系统。自 2016 年起,Philippe Rivière 一直是 D3 及其文档的重要贡献者。多年来,无数好心人通过分享代码与想法、答疑解惑、组织社区,为 D3 和可视化实践的发展添砖加瓦。如今,Mike 和 Philippe 在 [Observable](https://observablehq.com) 维护着 D3 和 [Observable Plot](https://observablehq.com/plot)。

## D3 是一套底层工具箱

D3 并不是传统意义上的图表库。它没有“图表(chart)”的概念。用 D3 可视化数据时,你需要自己组合各种基础部件。

例如,要制作一张[堆叠面积图](https://observablehq.com/@d3/stacked-area-chart/2),你可能会用到:

- 一个 [CSV 解析器](./d3-dsv.md)来加载数据;
- 一个[时间比例尺](./d3-scale/time.md)来确定水平位置(*x*);
- 一个[线性比例尺](./d3-scale/linear.md)来确定垂直位置(*y*);
- 一个[序数比例尺](./d3-scale/ordinal.md)和[分类配色方案](./d3-scale-chromatic/categorical.md)来确定颜色;
- 一个[堆叠布局](./d3-shape/stack.md)来排列数值;
- 一个带[线性曲线](./d3-shape/curve.md)的[面积形状](./d3-shape/area.md)来生成 SVG path 数据;
- [坐标轴](./d3-axis.md)来标注位置编码;
- [选择集](./d3-selection.md)来创建 SVG 元素。

信息量不小,对吧?但深呼吸——你不必一口气全学会。每个部件都可以独立使用,所以你可以先逐个掌握,再把它们拼装起来。D3 不是一个单一的庞然大物,而是由 30 个相互独立的库(或称“模块”)组成的套件。我们把这些模块打包在一起只是出于方便,而非必要——这样你在迭代设计时,所有工具都触手可及。

D3 的工具箱里都有什么?我们建议你翻一翻文档和示例,找出对你有用的部分。

<PlotRender :options='{
  axis: null,
  height: computeTreeWidth(paths) * 12,
  marginTop: 4,
  marginBottom: 4,
  marginRight: 120,
  marks: [
    Plot.tree(paths, {path: "path", textStroke: "var(--vp-c-bg)", channels: {href: {value: "link", filter: null}}, treeSort: null})
  ]
}' />

:::tip
如果你不需要 D3 的底层控制力,我们推荐我们更高层级的姐妹库:[Observable Plot](https://observablehq.com/plot)。在 D3 中可能要写 50 行代码的直方图,Plot 一行搞定!Plot 简洁而富有表现力的 API 让你把精力放在分析和可视化数据上,而不是 Web 开发上。你甚至可以把 Plot 和 D3 结合使用,兼得两者之长。
:::

## D3 灵活自由

因为 D3 没有统一抽象的“图表”概念,即便是最基础的图表也可能需要几十行代码。但好处是,所有部件都摆在你面前,一切尽在掌控。你可以为所欲为地定制可视化,精确实现你想要的效果。D3 对你的数据没有任何默认呈现——呈现方式只取决于你写的代码。(或者你从示例里抄来的代码。)

把 D3 当作“一切从零自己写”的替代品,而不是某个高层级图表库的替代品。如果你对其他工具不满意,正打算用 SVG 或 Canvas(甚至 WebGL)手搓图表,那不妨先逛逛 D3 的工具箱!几乎可以肯定,这里总有一件工具能帮你造出梦想中的图表,同时不束缚你的创造力。

## D3 与 Web 标准协同工作

D3 不引入新的图形表示;相反,你直接用 SVG、Canvas 等 Web 标准,配合 D3 来作图。

“D3”这个名字是 *data-driven documents*(数据驱动的文档)的缩写,其中 *documents* 指的是表示网页内容的[文档对象模型(DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) 标准。D3 的部分模块(例如[选择集](./d3-selection.md)和[过渡](./d3-selection.md))会直接操作 DOM,而另一些模块(包括[比例尺](./d3-scale.md)和[形状](./d3-shape.md))则只处理数据。D3 还能与 React、Vue、Svelte 等 Web 框架搭配使用;相关建议见[入门指南](./getting-started.md)。

D3 对 Web 标准的拥抱带来诸多好处。例如,你可以用外部样式表调整图表外观(甚至结合媒体查询,实现响应式图表或深色模式);你可以用调试器和元素检查器审查代码的行为;D3 同步、命令式的求值模型——调用 [*selection*.attr](./d3-selection/modifying.md#selection_attr) 会立即修改 DOM——比起那些运行时复杂异步的框架,调试起来往往更容易。

## D3 适合定制化可视化

D3 让事情成为可能,但不一定让事情变得容易;有些本应简单的事,往往也不简单。借用 Amanda Cox 的话:“如果你觉得为一张柱状图写一百行代码再正常不过,那就用 D3 吧。”

如果你的定制化可视化需要极致的表现力,那就应该考虑 D3。对于《纽约时报》《The Pudding》这类媒体机构,D3 是合理之选:一张图表可能有上百万读者,编辑团队能够协同合作,推动视觉传达技术的边界。

反过来说,随手搭一个私人仪表盘、做一次一次性分析,用 D3 就属于杀鸡用牛刀。别被那些炫酷的示例迷惑:它们中的许多都耗费了巨大的实现成本!如果你时间紧张(谁不紧张呢?),用 [Observable Plot](https://observablehq.com/plot) 可能做出更好的可视化或分析。

## D3 适合动态可视化

D3 最具原创性的概念是[数据联接(data join)](./d3-selection/joining.md):给定一组数据和一组 DOM 元素,数据联接让你能对*进入(entering)*、*更新(updating)*和*退出(exiting)*的元素分别执行不同操作。如果你只做静态图表(不做动画、不响应用户输入),你可能会觉得这个概念反直觉甚至莫名其妙,因为你根本用不上它。

数据联接的存在,是为了让你能*精确*控制数据变化时发生的一切,并据此更新显示。这种直接控制带来了极高性能的更新——你只改动需要变化的元素和属性,无需对 DOM 做 diff——还能实现状态之间平滑的动画过渡。D3 在动态、交互式可视化中大放异彩。(试试按住 Option 点击 2012 年[《通往白宫的 512 条路》](https://archive.nytimes.com/www.nytimes.com/interactive/2012/11/02/us/politics/paths-to-the-white-house.html)里的州切换按钮。真的。)
