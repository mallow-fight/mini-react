import whichType from './whichType';
import { componentType } from './constants';

export default function getComponentType({ tag, props, children }) {
  const tagType = whichType(tag);
  if (tagType === 'string' && !props && !children) {
    return componentType.SIMPLE;
  }
  if (tagType === 'string' && children) {
    return componentType.NORMAL;
  }
  return componentType.COMPLEX;
}
