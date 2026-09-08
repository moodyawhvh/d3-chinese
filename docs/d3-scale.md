> 🌐 本文档由 [d3/d3](https://github.com/d3/d3) 翻译,英文原版见原项目。

# d3-scale

比例尺把抽象数据的某个维度映射到视觉表示。虽然最常见的用法是把数据编码为位置——比如在散点图中把时间和温度映射到水平和垂直位置——但比例尺几乎可以表示任何视觉编码,例如颜色、描边宽度或符号大小。比例尺也几乎适用于任何数据类型,比如命名分类数据,或需要合理分段取值的离散数据。

参阅以下章节:

* [线性比例尺](./d3-scale/linear.md) - 适用于定量数据
* [时间比例尺](./d3-scale/time.md) - 适用于时间序列数据
* [幂比例尺](./d3-scale/pow.md) - 适用于定量数据(数值范围较大时)
* [对数比例尺](./d3-scale/log.md) - 适用于定量数据(数值范围较大时)
* [对称对数比例尺](./d3-scale/symlog.md) - 适用于定量数据(数值范围较大时)
* [序数比例尺](./d3-scale/ordinal.md) - 适用于分类或有序数据
* [分段比例尺](./d3-scale/band.md) - 适用于作为位置编码的分类或有序数据
* [点比例尺](./d3-scale/point.md) - 适用于作为位置编码的分类或有序数据
* [连续比例尺](./d3-scale/sequential.md) - 适用于作为连续颜色编码的定量数据
* [发散比例尺](./d3-scale/diverging.md) - 适用于作为发散颜色编码的定量数据
* [分位数比例尺](./d3-scale/quantile.md) - 适用于作为离散编码的定量数据
* [量化比例尺](./d3-scale/quantize.md) - 适用于作为离散编码的定量数据
* [阈值比例尺](./d3-scale/threshold.md) - 适用于作为离散编码的定量数据

要可视化比例尺的编码结果,请参见 [d3-axis](./d3-axis.md),以及 [*scale*.ticks](./d3-scale/linear.md#linear_ticks) 和 [*scale*.tickFormat](./d3-scale/linear.md#linear_tickFormat)。配色方案请参见 [d3-scale-chromatic](./d3-scale-chromatic.md)。
