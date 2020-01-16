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
    _start: ar(),
    domain: ar([{type: 'string'}]),
    state: ar({type: 'string'}),
    supply: ar([{type: 'string'}]),
    update: ar()
  },
  additionalProperties: false
};

exports.handler = validator =>
  async (interp, args) => {
    let obj = targs(args);
    let valid = validator(obj);
    if (!valid) {
      console.error('add_power_state', obj, validator.errors);
      return;
    }
    let gs = interp.tcl.globalScope;
    let pd = gs.result.power_domain[obj.domain[0]];
    pd.state = obj.state;
  };
