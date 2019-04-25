/**
 * todos
 * 1. 空文本封装成合适的数据结构
 */
import { componentType, elementType, lifeCycleType } from '../share/constants';
import containerSetAttribute from './containerSetAttribute';
/**
 * @description 获取某个元素的标签
 * 1. empty 空标签
 * 2. custom 自定义
 * 3. 正常的标签
 */
function getElementTag(Tag, type) {
  if (type === componentType.SIMPLE) {
    return 'empty';
  }
  if (type === componentType.NORMAL) {
    return Tag;
  }
  return 'custom';
}
function getChildren(type, children, context, parent) {
  if (type === componentType.SIMPLE) {
    return [];
  }
  if (type === componentType.NORMAL) {
    const kids = [];
    children.forEach((child) => {
      // 如果有tag，说明还没有被Root
      if (child.tag) {
        const self = new Root(child);
        self.parent = parent;
        kids.push(self);
      } else if (!child || !child.elementTag) {
        // 插槽
        if (child[0] && child[0].tag) {
          const thinningChild = child.map(c => (
            new Root({
              ...c,
              parent,
            })
          ));
          kids.push(...thinningChild);
        } else {
          // 如果没有elementTag且没有tag或者值是不存在的，说明是一个简单类型的节点，基本类型之类的
          kids.push(new Root({
            tag: child,
            type: componentType.SIMPLE,
            props: {},
            children: [],
            parent,
          }));
        }
      } else {
        kids.push(child);
      }
    });
    return kids;
  }
  let renderResult;
  if (context.render) {
    // render之前触发钩子函数，比较廉价，直接通知组件更新对应的state
    hookLifeCycle(context, lifeCycleType.COMP_WILL_MOUNT, parent);
    renderResult = context.render();
    // 已经render了，这个时候再去render就比较昂贵了，所以先把它放在一个更新队列里面，等待合适的时机去更新，比如说浏览器的下一个tick之类的
    hookLifeCycle(context, lifeCycleType.COMP_DID_MOUNT, parent);
  } else {
    renderResult = context;
  }
  const renderResultRoot = new Root(renderResult);
  renderResultRoot.parent = parent;
  return [renderResultRoot];
}
function getNode(elementTag, content, attributes) {
  if (elementTag === elementType.CUSTOM) {
    /**
     * custom类型
     * 直接跳过
     */
    return null;
  }
  if (elementTag === elementType.EMPTY) {
    // empty类型
    return document.createTextNode(content);
  }
  // 普通类型
  const container = document.createElement(elementTag);
  containerSetAttribute(container, attributes);
  return container;
}
function hookLifeCycle(context, cycleName, root) {
  if (context[cycleName]) {
    context[cycleName]();
    context.noticeUpdate(cycleName, root);
  }
}
export default function Root({
  tag: Tag,
  type = componentType.SIMPLE,
  props = {},
  children = [],
  parent = null,
}) {
  let context = {};
  if (type === componentType.COMPLEX) {
    context = new Tag({
      ...props,
      children,
    });
  }
  const elementTag = getElementTag(Tag, type);
  const standardChildren = getChildren(type, children, context, this) || [];
  const content = Tag;
  const attributes = props || {};
  // 执行上下文，自定义组件有
  this.context = context;
  // 元素的标签
  this.elementTag = elementTag;
  // 元素的属性
  this.attributes = props || {};
  // 元素的孩子，this就是元素自生，作为孩子的父亲
  this.children = standardChildren || [];
  // 元素的父亲
  this.parent = parent;
  // 元素定义
  this.content = content;
  // 元素真实dom节点
  this.node = getNode(
    elementTag,
    content,
    attributes,
  );
}
