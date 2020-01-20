'use strict';

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

exports.handler = (interp, obj) => {
  let res = interp.tcl.globalScope.result;
  let sname = obj._start[0];

  if (obj.group) {
    let name = obj.group[0] || sname;
    res.power_state_group[name].sate = obj.state;
  }

  if (obj.supply) {
    let name = obj.supply[0] || sname;
    let path = name.split('.');
    let domain = res.power_domain[path[0]] = res.power_domain[path[0]] || {};
    let supply = domain.supply[path[1]] = domain.supply[path[1]] || {};
    supply.state = (supply.state || []).concat(obj.state);
  }

  if (obj.domain) {
    let name = obj.domain[0] || sname;
    let pd = res.power_domain[name] = res.power_domain[name] || {};
    let state = pd.state = pd.state || [];
    pd.state = state.concat(obj.state);
  }
};
