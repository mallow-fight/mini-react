import { componentType } from '../share/constants';

// 区分有状态和无状态函数
function getTagRenderResult(NormalOrComplexComponent, props, children) {
  const wrapProps = {
    ...props,
    children,
  };
  const instance = new NormalOrComplexComponent(wrapProps);
  if (instance.render) {
    const renderResult = instance.render.apply(instance);
    return {
      ...instance,
      renderResult,
    };
  }
  return instance;
}

function getChildrenRenderResult(parent, parentChildren) {
  return parentChildren.map((child) => {
    const {
      tag, type, props, children,
    } = child;
    // eslint-disable-next-line
    return createVDOM({
      tag, type, props, children, parent,
    });
  });
}

function createVDOM({
  tag, type, props, children, parent,
}) {
  const basicInfo = {
    tag, type, props, children, parent,
  };
  if (type === componentType.SIMPLE) {
    return { ...basicInfo };
  }
  if (type === componentType.NORMAL) {
    return {
      ...basicInfo,
      childrenRenderResult: getChildrenRenderResult(tag, children),
    };
  }
  const tagRenderResult = getTagRenderResult(tag, props, children);
  return {
    ...basicInfo,
    tagRenderResult,
    childrenRenderResult: getChildrenRenderResult(tagRenderResult, children),
  };
}

// eslint-disable-next-line
export function render({tag, type, props, children}, container, parent = null) {
  console.log(
    {
      tag, type, props, children,
    },
    container,
    parent,
  );
}
