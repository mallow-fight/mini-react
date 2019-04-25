import containerSetAttribute from './containerSetAttribute';
// todo: 更精细化的比较
function needDiff(newTreeContext, oldTreeContext) {
  return true;
  const { state: newTreeState, props: newTreeProps } = newTreeContext;
  const { state: oldTreeState, props: oldTreeProps } = oldTreeContext;
  if (newTreeState !== oldTreeState || newTreeProps !== oldTreeProps) {
    return true;
  }
  return false;
}
export default function diff(oldTree, newTree) {
  const container = oldTree.node;
  // todo: 这个地方可以diff属性来决定更不更新，以后优化
  containerSetAttribute(container, newTree.attributes);
  // 按顺序遍历新旧树的孩子，这个时候发生了更新、删除或者增加操作
  let oldTreeStart = 0;
  let newTreeStart = 0;
  while (oldTree.children[oldTreeStart] || newTree.children[newTreeStart]) {
    if (oldTree.children[oldTreeStart] && !newTree.children[newTreeStart]) {
      // 删除操作
      container.removeChild(oldTree.children[oldTreeStart].node);
      oldTreeStart++;
    } else if (!oldTree.children[oldTreeStart] && newTree.children[newTreeStart]) {
      // 新增操作
      container.appendChild(newTree.children[newTreeStart].node);
      newTreeStart++;
    } else {
      // 更新操作
      const newTreeKid = newTree.children[newTreeStart];
      const oldTreeKid = oldTree.children[oldTreeStart];
      const newTreeContext = newTreeKid.context;
      const oldTreeContext = oldTreeKid.context;
      const newNode = newTree.children[newTreeStart].node;
      const oldNode = oldTree.children[oldTreeStart].node;
      if (newNode && oldNode && needDiff(newTreeContext, oldTreeContext)) {
        // container.replaceChild(newNode, oldNode);
        oldNode.replaceWith(newNode);
      }
      newTreeStart++;
      oldTreeStart++;
    }
  }
}
