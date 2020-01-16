'use strict';

let targs = require('./targs.js');

exports.schema = {
  type: 'object'
};

exports.handler = function (validator, key) {
  return function (interp, args) {
    let obj = targs(args);
    if (!validator(obj)) {
      console.error(key, obj, validator.errors);
      return;
    }
    try {
      let res = interp.tcl.globalScope.result;
      let dname = obj.domain[0];
      res.power_domain[dname] = res.power_domain[dname] || {};
      Object.assign(res.power_domain[dname], obj);
      console.log(key, obj);
    } catch (err) {
      console.error(key, obj, err);
    }
  };
};
