'use strict';

exports.schema = {};

let Types = require('tcl-js/dist/types.js');

exports.handler = (interp, obj, key) => {
  console.log(key, '->', obj);
  return new Types.TclSimple('p1 p2 p3');
};
