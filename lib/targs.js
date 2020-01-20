'use strict';

module.exports = (key, args) => {
  let cur = [];
  let res = {_start: cur};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === undefined) {
      console.error(key, '->', args);
    } else {
      let name = args[i].value;
      let m = name.match(/^-(.+)/);
      if (m) {
        cur = res[m[1]] = res[m[1]] || [];
      } else {
        cur.push(name);
      }
    }
  }
  return res;
};
