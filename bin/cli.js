#!/usr/bin/env node
'use strict';

let fs = require('fs-extra');
let { Tcl } = require('tcl-js');
let Ajv = require('ajv');
let yargs = require('yargs');
let path = require('path');

let lib = require('../lib/');

let tcl = new Tcl();

let index = lib.procs;

Object.keys(index).map(key => {
  let handler = index[key].handler;
  let schema = index[key].schema;
  let ajv = new Ajv();
  let validator = ajv.compile(schema);
  tcl.addAdvancedProcedure(key, handler(validator));
});

let readHandler = async args => {
  let fname = args.filename;
  let fullName = path.resolve(process.cwd(), fname);
  let rootPath = path.dirname(fullName);
  tcl.globalScope.rootPath = rootPath;
  tcl.globalScope.result = {
    designs: {},
    power_domain: {}
  };
  let body = await fs.readFile(fname, 'utf8');
  console.log('load: ' + fullName + ' : ' + body.length);
  await tcl.run(body);
  console.log(JSON.stringify(tcl.globalScope.result, null, 2));
};

yargs
  .scriptName('upf')
  .command({
    command: 'read <filename>',
    desc: 'read UPF',
    handler: readHandler,
    builder: yargs => {
      yargs.positional('filename', {
        type: 'string',
        desc: 'document file'
      });
    }
  })
  .demandCommand(1, 'You need at least one command before moving on')
  .help()
  .argv;
