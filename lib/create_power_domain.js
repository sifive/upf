'use strict';

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

exports.handler = (interp, obj) => {
  let name = obj._start[0];
  let result = interp.tcl.globalScope.result;
  let pd = result.power_domain[name] = result.power_domain[name] || {};
  pd.supply = pd.supply || {};
  if (obj.supply) {
    obj.supply.map(e => {
      pd.supply[e] = {};
    });
  }
};
