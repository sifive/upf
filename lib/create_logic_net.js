'use strict';

exports.schema = {};

exports.handler = (interp, obj) => {
  let name = obj._start[0];
  let res = interp.tcl.globalScope.result;
  let logic_net = res.logic_net = res.logic_net || {};
  logic_net[name] = {};
};
