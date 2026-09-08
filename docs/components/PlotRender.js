// ============================================================
// PlotRender.js 中文注释版
// 本组件是文档站中渲染 Observable Plot 图表的 Vue 渲染函数组件。
// 核心思路:在服务端/无 DOM 环境用虚拟 Document 生成图表的超脚本
// 表示,在客户端再替换(水合)为真实 DOM。
// 🌐 注释由 d3-chinese 汉化项目添加,代码逻辑与上游完全一致。
// ============================================================

import * as Plot from "@observablehq/plot";
import {h, withDirectives} from "vue";

// 虚拟 Document:在无真实 DOM 的环境(SSG/SSR)下充当 Plot 的 document。
class Document {
  constructor() {
    // 根元素 <html>
    this.documentElement = new Element(this, "html");
  }
  createElementNS(namespace, tagName) {
    return new Element(this, tagName);
  }
  createElement(tagName) {
    return new Element(this, tagName);
  }
  createTextNode(value) {
    return new TextNode(this, value);
  }
  querySelector() {
    return null;
  }
  querySelectorAll() {
    return [];
  }
}

// 空样式桩:虚拟环境下样式属性不产生任何实际效果。
class Style {
  static empty = new Style();
  setProperty() {}
  removeProperty() {}
}

// 虚拟元素:仅记录标签名、属性与子节点,渲染时转成超脚本。
class Element {
  constructor(ownerDocument, tagName) {
    this.ownerDocument = ownerDocument;
    this.tagName = tagName;
    this.attributes = {};
    this.children = [];
    this.parentNode = null;
  }
  setAttribute(name, value) {
    this.attributes[name] = String(value);
  }
  setAttributeNS(namespace, name, value) {
    this.setAttribute(name, value);
  }
  getAttribute(name) {
    return this.attributes[name];
  }
  getAttributeNS(name) {
    return this.getAttribute(name);
  }
  hasAttribute(name) {
    return name in this.attributes;
  }
  hasAttributeNS(name) {
    return this.hasAttribute(name);
  }
  removeAttribute(name) {
    delete this.attributes[name];
  }
  removeAttributeNS(namespace, name) {
    this.removeAttribute(name);
  }
  addEventListener() {
    // ignored; interaction needs real DOM
    // 忽略:交互需要真实 DOM
  }
  removeEventListener() {
    // ignored; interaction needs real DOM
    // 忽略:交互需要真实 DOM
  }
  dispatchEvent() {
    // ignored; interaction needs real DOM
    // 忽略:交互需要真实 DOM
  }
  appendChild(child) {
    this.children.push(child);
    child.parentNode = this;
    return child;
  }
  insertBefore(child, after) {
    if (after == null) {
      this.children.push(child);
    } else {
      const i = this.children.indexOf(after);
      if (i < 0) throw new Error("insertBefore reference node not found");
      this.children.splice(i, 0, child);
    }
    child.parentNode = this;
    return child;
  }
  querySelector() {
    return null;
  }
  querySelectorAll() {
    return [];
  }
  set textContent(value) {
    // 直接用单个文本节点替换全部子节点
    this.children = [this.ownerDocument.createTextNode(value)];
  }
  set style(value) {
    this.attributes.style = value;
  }
  get style() {
    return Style.empty;
  }
  // 递归转换为 Vue 可渲染的超脚本(h 调用)
  toHyperScript() {
    return h(
      this.tagName,
      this.attributes,
      this.children.map((c) => c.toHyperScript())
    );
  }
}

// 虚拟文本节点:仅保存字符串值。
class TextNode {
  constructor(ownerDocument, nodeValue) {
    this.ownerDocument = ownerDocument;
    this.nodeValue = String(nodeValue);
  }
  toHyperScript() {
    return this.nodeValue;
  }
}

// Converts the real DOM to virtual DOM (for client-side hydration).
// 把真实 DOM 转换为虚拟 DOM(用于客户端水合)。
function toHyperScript(node) {
  if (node.nodeType === 3) return node.nodeValue; // TextNode
  const props = {};
  for (const name of node.getAttributeNames()) props[name] = node.getAttribute(name);
  const children = [];
  for (let child = node.firstChild; child; child = child.nextSibling) children.push(toHyperScript(child));
  return h(node.tagName, props, children);
}

export default {
  props: {
    options: Object,
    mark: Object,
    defer: Boolean,
    method: {type: String, default: "plot"}
  },
  render() {
    const {method} = this;
    // 合并默认选项:plot 模式下默认渲染单个 mark,并适配 VitePress 宽度
    const options = {
      ...(method === "plot" && {
        marks: this.mark == null ? [] : [this.mark],
        width: 688 // better default for VitePress
      }),
      ...this.options,
      className: "plot"
    };
    // 延迟渲染模式:滚动进入视口时才绘制图表
    if (this.defer) {
      const mounted = (el) => {
        disconnect(); // remove old listeners
        function observed() {
          unmounted(el); // remove old plot (and listeners)
          el.append(Plot[method](options));
        }
        const rect = el.getBoundingClientRect();
        // 元素已在视口内则立即渲染,否则注册 IntersectionObserver 惰性加载
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          observed();
        } else {
          this._observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) observed();
            },
            {rootMargin: "100px"}
          );
          this._observer.observe(el);
          // 浏览器空闲时兜底渲染,保证图表最终一定出现
          if (typeof requestIdleCallback === "function") {
            this._idling = requestIdleCallback(observed);
          }
        }
      };
      const unmounted = (el) => {
        while (el.lastChild) el.lastChild.remove();
        disconnect();
      };
      const disconnect = () => {
        if (this._observer !== undefined) {
          this._observer.disconnect();
          this._observer = undefined;
        }
        if (this._idling !== undefined) {
          cancelIdleCallback(this._idling);
          this._idling = undefined;
        }
      };
      // 用占位容器保持宽高比,避免延迟渲染时页面跳动
      const {height = 400} = this.options;
      return withDirectives(
        h(
          "span",
          method === "plot"
            ? [
                h("div", {
                  style: {
                    maxWidth: "100%",
                    width: `688px`,
                    aspectRatio: `688 / ${height}`
                  }
                })
              ]
            : []
        ),
        [
          [
            {
              mounted,
              updated: mounted,
              unmounted
            }
          ]
        ]
      );
    }
    // 客户端:直接生成图表,挂载后用真实 DOM 替换服务端渲染的虚拟 DOM
    if (typeof document !== "undefined") {
      const plot = Plot[method](options);
      const replace = (el) => el.firstChild.replaceWith(plot);
      return withDirectives(h("span", [toHyperScript(plot)]), [[{mounted: replace, updated: replace}]]);
    }
    // 服务端:传入虚拟 Document 生成超脚本字符串表示
    return h("span", [Plot[method]({...options, document: new Document()}).toHyperScript()]);
  }
};
