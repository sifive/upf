'use strict';

exports.schema = {};

exports.handler = (interp, obj) => {
  let name = obj._start[0];
  let res = interp.tcl.globalScope.result;
  res.logic_ports[name] = {};
};
