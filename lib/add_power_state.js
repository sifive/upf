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
    state:  ar({type: 'string'}),
    supply: ar([{type: 'string'}]),
    group: ar([{type: 'string'}]),
    update: ar()
  },
  additionalProperties: false
};

exports.handler = (validator, key) =>
  async (interp, args) => {
    let obj = targs(args);
    let valid = validator(obj);
    if (!valid) {
      console.error(key, obj, validator.errors);
      return;
    }
    try {
      let gs = interp.tcl.globalScope;
      if (obj.supply) {
        gs.result.supply[obj.supply[0]] = {state: obj.state};
      }
      if (obj.domain) {
        let name = obj.domain[0] || obj._start;
        gs.result.power_domain[name].state = obj.state;
      }
    } catch (err) {
      console.error(key, obj, err);
    }
  };
