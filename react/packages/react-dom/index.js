import Root from './Root';
import { elementType } from '../share/constants';

function updateContainer(container, html) {
  container.appendChild(html);
}
function getRealTarget(children) {
  if (children[0].node) {
    return children[0];
  }
  return getRealTarget(children[0]);
}
export function getHtmlFromRoot(root) {
  const { elementTag, children, node } = root;
  let parentNode;
  if (elementTag === elementType.CUSTOM) {
    const realTarget = getRealTarget(children);
    parentNode = realTarget.node;
    realTarget.children.forEach((child) => {
      const leaf = getHtmlFromRoot(child);
      parentNode.appendChild(leaf);
    });
  } else {
    parentNode = node;
    children.forEach((child) => {
      const leaf = getHtmlFromRoot(child);
      parentNode.appendChild(leaf);
    });
  }
  return parentNode;
}
// eslint-disable-next-line
export function render({tag, type, props, children}, container, parent = null) {
  // 把container挂载在tag上，再把root挂载在container上，这样就可以在React.Component中访问到container和root了，就可以愉快的patches了
  tag.prototype.$container = container;
  const root = new Root({
    tag,
    type,
    props,
    children,
    parent,
  });
  // todo: new Root过程中直接产生最终的Node，而不是再遍历一次
  const html = getHtmlFromRoot(root);
  updateContainer(container, html);
  container.$root = root;
  return container;
}
