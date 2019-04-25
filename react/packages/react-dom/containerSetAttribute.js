/**
 * @description 给dom容器设置指定的属性
 */
export default function containerSetAttribute(container, attributes) {
  const { className, id, style } = attributes;
  if (className) {
    container.setAttribute('class', className);
  }
  if (id) {
    container.setAttribute('id', id);
  }
  if (style) {
    container.setAttribute('style', style);
  }
}
