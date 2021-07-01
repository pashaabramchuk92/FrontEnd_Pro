function bind(func, context, ...otherArgs) {
  return function(...args) {
    return func.apply(context, otherArgs, args);
  }
}


const a = function () {
  return this;
}

const b = bind(a, {key: 'value' });
const c = bind(b, null);
const d = bind(c, { a: '1' });

console.log(c())