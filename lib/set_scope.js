'use strict';

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

exports.handler = (interp, obj) => {
  let name = obj._start[0];
  let gs = interp.tcl.globalScope;
  gs.scope = name;
};
