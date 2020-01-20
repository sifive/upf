'use strict';

exports.schema = {};

exports.handler = (interp, obj) => {
  let res = interp.tcl.globalScope.result;
  if (obj.direction) {
    let port = res.port = res.port || {};
    let name = obj.direction[1];
    let dir = obj.direction[0];
    port[name] = (dir === 'in') ? 1 : -1;
  }
};
