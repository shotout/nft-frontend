export default function arrayErrorResturctor(obj) {
  Object.keys(obj).map(val => {
    if (obj[val] instanceof Array) {
      // eslint-disable-next-line prefer-destructuring
      obj[val] = obj[val][0];
    }
    return val;
  });
  return obj;
}
