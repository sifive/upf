'use strict';

exports.schema = {};

exports.handler = (interp, obj) => {
  let res = interp.tcl.globalScope.result;
  let dname = obj.domain[0];
  let pd = res.power_domain[dname] = res.power_domain[dname] || {};
  let retention = pd.retention = pd.retention || {};
  if (obj._start[0]) {
    let strategy = retention[obj._start[0]] = {};
    ['retention_supply', 'save_signal', 'restore_signal', 'elements'].map(key => {
      if (obj[key]) { strategy[key] = obj[key][0]; }
    });
  }
};
