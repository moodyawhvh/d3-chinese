<script setup>

import * as d3 from "d3";
import ColorRamp from "./components/ColorRamp.vue";

</script>

> 🌐 本文档由 [d3/d3](https://github.com/d3/d3) 翻译,英文原版见原项目。

# d3-interpolate

该模块提供多种插值方法,用于在两个值之间进行混合过渡。值可以是数字、颜色、字符串、数组,甚至是深度嵌套的对象。例如:

```js
const i = d3.interpolateNumber(10, 20);
i(0.0); // 10
i(0.2); // 12
i(0.5); // 15
i(1.0); // 20
```

返回的函数 `i` 是一个*插值器(interpolator)*。给定起始值 *a* 和结束值 *b*,它接受一个通常位于 [0, 1] 区间的参数 *t*,并返回对应的插值结果。插值器通常在 *t* = 0 时返回等价于 *a* 的值,在 *t* = 1 时返回等价于 *b* 的值。

能插值的不只是数字。想求 steelblue 和 brown 之间感知上的中间色:

```js
d3.interpolateLab("steelblue", "brown")(0.5); // "rgb(142, 92, 109)"
```

或者,作为从 *t* = 0 到 *t* = 1 的色带:

<ColorRamp :color='d3.interpolateLab("steelblue", "brown")' />

下面这个更完整的示例演示了 [interpolate](./d3-interpolate/value.md#interpolate) 所使用的类型推断:

```js
const i = d3.interpolate({colors: ["red", "blue"]}, {colors: ["white", "black"]});
i(0.0); // {colors: ["rgb(255, 0, 0)", "rgb(0, 0, 255)"]}
i(0.5); // {colors: ["rgb(255, 128, 128)", "rgb(0, 0, 128)"]}
i(1.0); // {colors: ["rgb(255, 255, 255)", "rgb(0, 0, 0)"]}
```

注意,这个通用值插值器不仅能识别嵌套的对象和数组,还能识别颜色字符串以及嵌在字符串中的数字!

参阅以下章节:

* [值插值](./d3-interpolate/value.md)
* [颜色插值](./d3-interpolate/color.md)
* [变换插值](./d3-interpolate/transform.md)
* [缩放插值](./d3-interpolate/zoom.md)
