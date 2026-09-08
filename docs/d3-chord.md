<script setup>

import ColorSpan from "./components/ColorSpan.vue";
import ExampleChord from "./components/ExampleChord.vue";

</script>

> 🌐 本文档由 [d3/d3](https://github.com/d3/d3) 翻译,英文原版见原项目。

# d3-chord

<ExampleChord/>

弦图(chord diagram)用于可视化图中一组节点之间的流量,例如有限状态之间的转移概率。上图展示了一个来自 [Circos](http://circos.ca/guide/tables/) 的虚构数据集:人们染发颜色的变化。

D3 的弦布局使用一个 *n*×*n* 的方形*矩阵*来表示流量,其中 *n* 是图中节点的数量。每个值 *matrix*[*i*][*j*] 表示从第 *i* 个节点到第 *j* 个节点的流量。(每个数 *matrix*[*i*][*j*] 必须非负;如果节点 *i* 到节点 *j* 没有流量,它可以为零。)

上图中,每一行和每一列代表一种发色(<ColorSpan color="black" />、<ColorSpan color="#ffdd89" text="金发" />、<ColorSpan color="#957244" text="棕发" />、<ColorSpan color="#f26223" text="红发" />);每个值代表从一种发色染成另一种发色的人数。例如,有 5,871 人原本是<ColorSpan color="black" />头发,染成了<ColorSpan color="#ffdd89" text="金发" />;而有 1,951 人原本是<ColorSpan color="#ffdd89" text="金发" />头发,染成了<ColorSpan color="black" />。矩阵对角线表示保持原发色不变的人。

```js
const matrix = [
  // to black, blond, brown, red
  [11975,  5871, 8916, 2868], // from black
  [ 1951, 10048, 2060, 6171], // from blond
  [ 8010, 16145, 8090, 8045], // from brown
  [ 1013,   990,  940, 6907]  // from red
];
```

弦图将这些转变可视化:把人口按起始发色[排布](./d3-chord/chord.md)在圆周上,并在各颜色之间绘制[缎带](./d3-chord/ribbon.md)。缎带起点和终点的宽度与拥有相应起止发色的人数成正比。缎带的颜色(随意规定)取两个值中较大一方所对应的颜色。

参阅以下章节:

- [弦](./d3-chord/chord.md) - 弦图的布局
- [缎带](./d3-chord/ribbon.md) - 弦图的形状基元
