'use strict';

let targs = require('./targs.js');

exports.schema = {
  type: 'object'
};

exports.handler = function (validator, key) {
  return function (interp, args) {
    let obj = targs(args);
    console.log('dummy -> ' + key, obj);
  };
};
