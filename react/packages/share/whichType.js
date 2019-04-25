export default function whichType(target) {
  let type = typeof target;
  if (type === 'object') {
    type = Object.prototype.toString.call(target);
    type = type.slice(8, type.length - 1).toLowerCase();
  }
  return type;
}
