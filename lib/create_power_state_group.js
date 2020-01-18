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
      let name = obj._start[0];
      let psg = res.power_state_group = res.power_state_group || {};
      psg[name] = psg[name] || {};
    } catch (err) {
      console.error(key, obj, err);
    }
  };
};
