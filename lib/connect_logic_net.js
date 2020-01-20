'use strict';

exports.schema = {};

exports.handler = (interp, obj) => {
  let res = interp.tcl.globalScope.result;
  let logic_net = res.logic_net = res.logic_net || {};
  let name = obj._start[0];
  let net = logic_net[name] = logic_net[name] || {};
  obj.ports.map(p => {
    net.ports = (net.ports || []).concat(p);
  });
};
