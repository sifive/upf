'use strict';

exports.schema = {};

exports.handler = (interp, obj) => {
  let res = interp.tcl.globalScope.result;
  let supply_net = res.supply_net = res.supply_net || {};
  let name = obj._start[0];
  let net = supply_net[name] = supply_net[name] || {};
  obj.ports.map(p => {
    net.ports = (net.ports || []).concat(p);
  });
};
