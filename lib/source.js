'use strict';

let fs = require('fs-extra');
let targs = require('./targs.js');
let path = require('path');

let ar = items => ({type: 'array', items, additionalItems: false});

exports.schema = {
  type: 'object',
  properties: {
    _start: ar([{type: 'string'}])
  },
  required: ['_start'],
  additionalProperties: false
};

exports.handler = function (validator) {
  return async function (interp, args) {
    let obj = targs(args);
    validator(args);
    let rootPath = interp.tcl.globalScope.rootPath;
    let fullName = path.resolve(rootPath, obj._start[0]);
    let body = await fs.readFile(fullName, 'utf8');
    console.log('load: ' + fullName + ' : ' + body.length);
  };
};
