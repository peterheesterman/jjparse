// @flow

const { analyzer } = require('./')

test('Analyzer should produce a tree', () => {
  // failing test to pick up from next time
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

test.skip('Analyzer should Handle arrays', () => {
  // failing test to pick up from next time
  /**
   * []
   */
})