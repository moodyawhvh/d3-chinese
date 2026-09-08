<script setup>

import * as Plot from "@observablehq/plot";
import {data as volcano} from "./data/volcano.data.js";
import PlotRender from "./components/PlotRender.js";

</script>

> 🌐 本文档由 [d3/d3](https://github.com/d3/d3) 翻译,英文原版见原项目。

# d3-contour

<div style="margin: 1em 0;">
  <PlotRender :options='{
    axis: null,
    aspectRatio: 1,
    style: "margin: 0;",
    marks: [
      Plot.contour(volcano.values, {
        width: volcano.width,
        height: volcano.height,
        fill: Plot.identity,
        stroke: "black",
        interval: 5
      })
    ]
  }' />
  <a href="https://observablehq.com/@d3/volcano-contours/2" style="font-size: smaller;" target="_blank">Fork ↗︎</a>
</div>

该模块通过对矩形数值网格应用[ marching squares(移动正方形)算法](https://en.wikipedia.org/wiki/Marching_squares)来计算等值多边形。例如,上图中的等高线展示了 [Maungawhau(伊甸山)](https://en.wikipedia.org/wiki/Maungawhau_/_Mount_Eden)的地形。

参阅以下章节:

- [等值线](./d3-contour/contour.md)
- [密度估计](./d3-contour/density.md)
