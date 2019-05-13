import getComponentType from '../share/getComponentType';
import { lifeCycleType } from '../share/constants';
import Root from '../react-dom/Root';
import diff from '../react-dom/diff';
import { getHtmlFromRoot } from '../react-dom';

const React = {
  createElement(tag, props, ...children) {
    return {
      tag,
      props,
      children,
      type: getComponentType({ tag, props, children }),
    };
  },
};

export function Component(props) {
  this.props = props;
  this.updateQueue = [];
  this.completeFirstRender = false;
}

Component.prototype.setState = function setState(updateState) {
  // 发布
  this.updateQueue.push({
    updateState,
  });
  // todo：隔离异步更新，放到will-update中，
  // todo：did-mount中更新某些state失败
  if (this.completeFirstRender) {
    this.noticeUpdate(lifeCycleType.COMP_DID_MOUNT, this.root);
  }
};

function mergeState(oldState, newState) {
  return {
    ...oldState,
    ...newState,
  };
}

Component.prototype.noticeUpdate = function noticeUpdate(lifeCycleName, root, cb) {
  /**
   * @desc 在这里消费订阅的更新队列
   */
  if (lifeCycleName === lifeCycleType.COMP_WILL_MOUNT) {
    // 还没有实例化，所以可以直接修改
    this.update();
  }
  if (lifeCycleName === lifeCycleType.COMP_DID_MOUNT) {
    // 直接调用this.update不生效，因为这个时候页面已经render好了
    // 需要patch这个更新，然后遍历虚拟dom树去更新对应的节点
    // 这个parent肯定是自定义组件，其他的也没生命周期
    // 为何setTimeout，因为这个时候的setState肯定已经调用完了updateQueue了，更新队列中肯定是有东西的
    // 另一个目的是所有的同步setState都会被收集到更新队列中，这样可以一次性批量更新
    setTimeout(() => {
      // 修改示例context
      this.update();
      // 根据新的context生成新的VDOM
      const {
        context,
        context: {
          render,
        },
        children,
      } = root;
      const newRender = render.apply(context);
      const newTree = new Root({
        ...newRender,
        parent: root,
      });
      // 将所有子节点插入新的树中
      getHtmlFromRoot(newTree);
      // 因为oldTree是已经render之后的，所以直接取之前render的结果
      const oldTree = children[0];
      // root就是该组件的parent
      /**
       * 重新render生成dom节点
       * 将重新生成的dom节点插入到对应的原来的dom的对应位置（需要知道节点的位置信息）
       * 并不仅仅是插入，还有删除、修改等等
       */
      diff(oldTree, newTree);
      this.root = root;
      this.completeFirstRender = true;
    }, 0);
  }
};

Component.prototype.update = function update() {
  let newState = {};
  this.updateQueue.forEach((queue) => {
    newState = mergeState(newState, queue.updateState);
  });
  this.state = mergeState(this.state, newState);
  this.updateQueue = [];
};

export default React;
