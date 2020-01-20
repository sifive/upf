'use strict';

exports.schema = {};

exports.handler = (interp, obj) => {
  let res = interp.tcl.globalScope.result;
  let name = obj._start[0];
  let psg = res.power_state_group = res.power_state_group || {};
  psg[name] = psg[name] || {};
};
