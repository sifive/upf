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
    _start: ar([{type: 'string'}]),
    update: ar(),
    supply: ar({type: 'string'}),
    elements: ar({type: 'string'})
  },
  additionalProperties: false
};

exports.handler = validator =>
  async (interp, args) => {
    let obj = targs(args);
    let valid = validator(obj);
    if (!valid) {
      console.error(obj);
      console.error(validator.errors);
      return;
    }
    let name = obj._start[0];
    let gs = interp.tcl.globalScope;
    let pd = gs.result.power_domain;
    pd[name] = pd[name] || {supply: []};
    if (obj.supply) {
      pd[name].supply = pd[name].supply.concat(obj.supply);
    }
  };
