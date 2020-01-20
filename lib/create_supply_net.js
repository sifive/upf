'use strict';

exports.schema = {};

exports.handler = (interp, obj) => {
  let res = interp.tcl.globalScope.result;
  let net = res.net = res.net || {};
  let name = obj._start[0];
  net[name] = net[name] || {};
};
