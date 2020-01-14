'use strict';

module.exports = args => {
  let cur = [];
  let res = {_start: cur};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === undefined) {
      console.error(args);
    } else {
      let name = args[i].value;
      let m = name.match(/^-(.+)/);
      if (m) {
        cur = [];
        res[m[1]] = cur;
      } else {
        cur.push(name);
      }
    }
  }
  return res;
};
