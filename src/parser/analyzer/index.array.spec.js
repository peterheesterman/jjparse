// @flow

const { analyzer } = require('./')

test('Analyzer should produce a tree', () => {
  const emptyArray = [ 
    { type: 'square_braket_open', start: 0, end: 0, value: '[' },
    { type: 'square_braket_close', start: 1, end: 1, value: ']' } 
  ]

  expect(analyzer(emptyArray)).toEqual({
    root: {
      type: 'root',
      head: {
        type: 'array',
        values: []
      } 
    }
  })
})


test('Analyzer should Handle arrays and object nested', () => {
  // failing test to pick up from next time

  const nestedArrays = [ 
    { type: 'square_braket_open', start: 0, end: 0, value: '[' },
    { type: 'square_braket_open', start: 1, end: 1, value: '[' },
    { type: 'square_braket_close', start: 2, end: 2, value: ']' },
    { type: 'comma', start: 3, end: 3, value: ',' },
    { type: 'square_braket_open', start: 4, end: 4, value: '[' },
    { type: 'square_braket_close', start: 5, end: 5, value: ']' },
    { type: 'square_braket_close', start: 6, end: 6, value: ']' } 
  ]

  expect(analyzer(nestedArrays)).toEqual({
    "root": {
      "head": {
        "type": "array",
        "values": [{
          "type": "array",
          "values": []
        }, {
          "type": "array",
          "values": []
        }]
      },
      "type": "root"
    }
  })
})

test('Analyzer should Handle arrays and object nested', () => {
  // failing test to pick up from next time

  const nestedBothArraysAndObjects = [
    { type: 'brace_open', start: 0, end: 0, value: '{' },
    { type: 'word', start: 1, end: 7, value: '"depth"' },
    { type: 'colon', start: 8, end: 8, value: ':' },
    { type: 'square_braket_open', start: 9, end: 9, value: '[' },
    { type: 'true', start: 10, end: 13, value: 'true' },
    { type: 'square_braket_close', start: 14, end: 14, value: ']' },
    { type: 'brace_close', start: 15, end: 15, value: '}' } 
  ]

  expect(analyzer(nestedBothArraysAndObjects)).toEqual({
    "root": {
      "head": {
        "object": [{
          "key": {
            "index": 1,
            "token": {
              "end": 7,
              "start": 1,
              "type": "word",
              "value": "\"depth\""
            }
          },
          "value": {
            "type": "array",
            "values": [{
              "index": 4,
              "token": {
                "end": 13,
                "start": 10,
                "type": "true",
                "value": "true"
              }
            }]
          }
        }],
        "type": "object"
      },
      "type": "root"
    }
  })
})