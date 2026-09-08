> 🌐 本文档由 [d3/d3](https://github.com/d3/d3) 翻译,英文原版见原项目。

# d3-shape

可视化可以由离散的图形标记构成,例如[符号](./d3-shape/symbol.md)、[弧线](./d3-shape/arc.md)、[折线](./d3-shape/line.md)和[面积](./d3-shape/area.md)。柱状图的矩形有时还算简单,但其他形状可能相当复杂,比如圆角环形扇区和 Catmull–Rom 样条。d3-shape 模块为你提供了各种现成的形状生成器。

与 D3 的其他部分一样,这些形状由数据驱动:每个形状生成器都暴露了访问器(accessor),用于控制输入数据如何映射到视觉表示。例如,你可以这样为时间序列定义一个折线生成器,把数据字段[缩放](./d3-scale.md)到图表范围内:

```js
const line = d3.line()
    .x((d) => x(d.date))
    .y((d) => y(d.value));
```

然后可以用这个折线生成器计算 SVG path 元素的 `d` 属性:

```js
path.datum(data).attr("d", line);
```

也可以用它渲染到 Canvas 2D 上下文:

```js
line.context(context)(data);
```

参阅以下章节:

- [弧线](./d3-shape/arc.md) - 圆形或环形扇区,用于饼图或环形图。
- [面积](./d3-shape/area.md) - 由上边界线和基线围成的区域,用于面积图。
- [曲线](./d3-shape/curve.md) - 在点之间插值,生成连续的形状。
- [折线](./d3-shape/line.md) - 样条或折线,用于折线图。
- [连线](./d3-shape/link.md) - 从源到目标的平滑三次贝塞尔曲线。
- [饼图](./d3-shape/pie.md) - 为饼图或环形图计算角度。
- [堆叠](./d3-shape/stack.md) - 堆叠相邻的形状,用于堆叠柱状图。
- [符号](./d3-shape/symbol.md) - 分类形状编码,用于散点图。
- [径向面积](./d3-shape/radial-area.md) - 类似[面积](./d3-shape/area.md),但使用极坐标。
- [径向折线](./d3-shape/radial-line.md) - 类似[折线](./d3-shape/line.md),但使用极坐标。
- [径向连线](./d3-shape/radial-link.md) - 类似[连线](./d3-shape/link.md),但使用极坐标。
