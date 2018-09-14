// @flow

const { analyzer } = require('./')

test('Analyzer should produce a tree', () => {
  // [  ]
  const emptyArray = [ 
    { type: 'square_braket_open', value: '[' },
    { type: 'square_braket_close', value: ']' }
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

  // [[], []]
  const nestedArrays = [ 
    { type: 'square_braket_open', value: '[' },
    { type: 'square_braket_open', value: '[' },
    { type: 'square_braket_close', value: ']' },
    { type: 'comma', value: ',' },
    { type: 'square_braket_open', value: '[' },
    { type: 'square_braket_close', value: ']' },
    { type: 'square_braket_close', value: ']' } 
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

  const nestedBothArraysAndObjects = [
    { type: 'brace_open', value: '{' },
    { type: 'word', value: '"depth"' },
    { type: 'colon', value: ':' },
    { type: 'square_braket_open', value: '[' },
    { type: 'true', value: 'true' },
    { type: 'square_braket_close', value: ']' },
    { type: 'brace_close', value: '}' } 
  ]

  expect(analyzer(nestedBothArraysAndObjects)).toEqual({
    "root": {
      "head": {
        "object": [{
          "key": {
            "index": 1,
            "token": {
              "type": "word",
              "value": "\"depth\""
            }
          },
          "value": {
            "type": "array",
            "values": [{
              "index": 4,
              "token": {
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