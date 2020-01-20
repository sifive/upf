'use strict';

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

exports.handler = () => {};
