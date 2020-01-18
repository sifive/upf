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

exports.handler = (validator, fname) =>
  async (interp, args) => {
    let obj = targs(args);
    let valid = validator(obj);
    if (!valid) {
      console.error(fname, obj, validator.errors);
      return;
    }
    try {
      let name = obj._start[0];
      let result = interp.tcl.globalScope.result;
      let pd = result.power_domain[name] = result.power_domain[name] || {};
      pd.supply = pd.supply || {};
      if (obj.supply) {
        obj.supply.map(e => {
          pd.supply[e] = {};
        });
      }
    } catch (err) {
      console.error(fname, obj, err);
    }
  };
