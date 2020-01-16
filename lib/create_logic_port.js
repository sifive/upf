'use strict';

let targs = require('./targs.js');

let ar = items => ({
  type: 'array',
  items,
  additionalItems: false
});

exports.schema = {
  type: 'object'
};

exports.handler = (validator, key) =>
  async (interp, args) => {
    let obj = targs(args);
    validator(obj);
    let name = obj._start[0];
    let gs = interp.tcl.globalScope;
    gs.result.logic_ports[name] = {};
  };
