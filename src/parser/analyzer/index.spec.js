// @flow

const { analyzer } = require('./')

test('Analyzer should produce a tree', () => {
  // failing test to pick up from next time
  const emptyObject = [
    { type: 'brace_open', start: 0, end: 0, value: '{' },
    { type: 'brace_close', start: 1, end: 1, value: '}' }
  ]

  expect(analyzer(emptyObject)).toEqual(null)
})