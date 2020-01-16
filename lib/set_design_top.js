'use strict';

let targs = require('./targs.js');

let ar = items => ({
  type: 'array',
  items,
  additionalItems: false
});

exports.schema = {
  type: 'object',
  properties: {
    _start: ar([{type: 'string'}])
  },
  additionalProperties: false
};

exports.handler = validator =>
  async (interp, args) => {
    let obj = targs(args);
    validator(obj);
    let name = obj._start[0];
    let gs = interp.tcl.globalScope;
    gs.design_top = name;
    let ds = gs.result.designs;
    ds[name] = ds[name] || {};
  };
