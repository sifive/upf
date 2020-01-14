#!/usr/bin/env node
'use strict';

let fs = require('fs-extra');
let { Tcl } = require('tcl-js');
let Ajv = require('ajv');

let set_level_shifter = require('../lib/set_level_shifter.js');
let dummy = require('../lib/dummy.js');

let index = {
  set_scope: dummy,
  set_port_attributes: dummy,
  set_retention_elements: dummy,
  set_retention: dummy,
  set_design_attributes: dummy,
  set_isolation: dummy,
  set_level_shifter,
  set_variation: dummy,
  set_correlated: dummy,

  create_supply_port: dummy,
  create_supply_set: dummy,
  create_logic_port: dummy,
  create_supply_net: dummy,
  create_logic_net: dummy,
  create_power_state_group: dummy,
  create_power_switch: dummy,
  create_power_domain: dummy,

  define_power_model: dummy,
  find_objects: dummy,
  add_power_state: dummy,
  load_upf: dummy,
  apply_power_model: dummy,
  associate_supply_set: dummy,
  connect_supply_net: dummy,
  connect_logic_net: dummy
};

let tcl = new Tcl();

Object.keys(index).map(key => {
  let handler = index[key].handler;
  let schema = index[key].schema;
  let ajv = new Ajv();
  let validator = ajv.compile(schema);
  tcl.addAdvancedProcedure(key, handler(validator));
});

// PHY3TX2RX0P8V.upf
let flist = `
MEMSRAM_1024X32.upf

cpu_constraints.upf
cpu_configiration.upf
cpu_implementation.upf

mpcore_constraints.upf
mpcore_configuration.upf

display_constraints.upf
display_configuration.upf

soc_constraints.upf
soc_configuration.upf
soc_implementation.upf
`.trim().split(/\s+/).map(e => './examples/' + e);

let main = async () => {
  for (let fname of flist) {
    console.log(fname);
    let body = await fs.readFile(fname, 'utf8');
    await tcl.run(body).catch(err => {
      console.error(fname);
      console.error(err);
    });
  }
};

main();
