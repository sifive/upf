'use strict';

let targs = require('./targs.js');

let ar = items => ({type: 'array', items, additionalItems: false});

exports.schema = {
  type: 'object',
  properties: {
    _start: ar([{type: 'string'}]),
    domain: ar([{type: 'string'}]),
    source: ar([{type: 'string'}]),
    sink: ar([{type: 'string'}]),
    location: ar([{enum: ['self']}])
  },
  required: ['domain'],
  additionalProperties: false
};

exports.handler = function (validator) {
  return function () {
    let args = targs(arguments[1]);
    let valid = validator(args);
    if (!valid) {
      console.error(args);
      console.error(validator.errors);
      return;
    }
  };
};
