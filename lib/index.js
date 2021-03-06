'use strict';

let pkg = require('../package.json');

let source = require('./source.js');
let dummy = require('./dummy.js');
let find_objects = require('./find_objects.js');

let set_level_shifter = require('./set_level_shifter.js');
let set_scope = require('./set_scope.js');
let set_design_top = require('./set_design_top.js');

let add_power_state = require('./add_power_state.js');
let set_retention = require('./set_retention.js');

let create_power_domain = require('./create_power_domain.js');
let create_logic_port = require('./create_logic_port.js');
let create_power_state_group = require('./create_power_state_group.js');
let create_supply_port = require('./create_supply_port.js');
let create_supply_net = require('./create_supply_net.js');
let create_logic_net = require('./create_logic_net.js');

let connect_supply_net = require('./connect_supply_net.js');
let connect_logic_net = require('./connect_logic_net.js');

exports.procs = {
  source,
  load_upf: dummy,
  find_objects,

  set_design_top,
  set_scope,
  set_port_attributes: dummy,
  set_retention_elements: dummy,
  set_retention,
  set_design_attributes: dummy,
  set_isolation: dummy,
  set_level_shifter,
  set_variation: dummy,
  set_correlated: dummy,

  create_supply_port,
  create_supply_net,
  create_supply_set: dummy,
  create_logic_port,
  create_logic_net,
  create_power_state_group,
  create_power_switch: dummy,
  create_power_domain,

  define_power_model: dummy,
  add_power_state,
  apply_power_model: dummy,
  associate_supply_set: dummy,
  connect_supply_net,
  connect_logic_net
};

exports.version = pkg.version;
