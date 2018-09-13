// @flow

const { analyzer } = require('./')

test.skip('Analyzer should produce a tree', () => {
  // failing test to pick up from next time
  const emptyObject = [
    { type: 'brace_open', start: 0, end: 0, value: '{' },
    { type: 'brace_close', start: 1, end: 1, value: '}' }
  ]

  expect(analyzer(emptyObject)).toEqual({
    root: {
      type: 'root',
      head: {
        type: 'object',
        object: []
      } 
    }
  })
})


test('Analyzer should produce a tree for depth 1 objects', () => {
  // failing test to pick up from next time
  /**
   * {
   *   "win": "yes",
   *   "ok": true
   * }
   */
  const littleJson = [ 
    { type: 'brace_open', start: 0, end: 0, value: '{' },
    { type: 'word', start: 1, end: 5, value: '"win"' },
    { type: 'colon', start: 6, end: 6, value: ':' },
    { type: 'word', start: 7, end: 11, value: '"yes"' },
    { type: 'comma', start: 12, end: 12, value: ',' },
    { type: 'word', start: 13, end: 16, value: '"ok"' },
    { type: 'colon', start: 17, end: 17, value: ':' },
    { type: 'true', start: 18, end: 21, value: 'true' },
    { type: 'brace_close', start: 22, end: 22, value: '}' } 
  ]

  expect(analyzer(littleJson)).toEqual({
    root: {
      type: 'root',
      head: {
        type: 'object',
        object: [
        {
          key: { token: { type: 'word', start: 1, end: 5, value: '"win"' }, index: 1 },
          value: { token: { type: 'word', start: 7, end: 11, value: '"yes"' }, index: 3 }
        },{
          key: { token: { type: 'word', start: 13, end: 16, value: '"ok"' }, index: 5 },
          value: { token: { type: 'true', start: 18, end: 21, value: 'true' }, index: 7 }
        }]
      } 
    }
  })
})


test('Analyzer should produce a tree for depth 3 objects', () => {
  // failing test to pick up from next time
  /**
   * {
   *   "depth": {
   *     "so1": {
   *       "so2": true 
   *     }
   *   }
   * }
   */
  const nestedObjectJSON = [ 
    { type: 'brace_open', start: 0, end: 0, value: '{' },   // 0
    { type: 'word', start: 1, end: 7, value: '"depth"' },
    { type: 'colon', start: 8, end: 8, value: ':' },
    { type: 'brace_open', start: 9, end: 9, value: '{' },
    { type: 'word', start: 10, end: 14, value: '"so1"' },
    { type: 'colon', start: 15, end: 15, value: ':' },      // 5
    { type: 'brace_open', start: 16, end: 16, value: '{' },
    { type: 'word', start: 17, end: 21, value: '"so2"' },
    { type: 'colon', start: 22, end: 22, value: ':' },
    { type: 'true', start: 23, end: 26, value: 'true' },
    { type: 'brace_close', start: 27, end: 27, value: '}' },// 10
    { type: 'brace_close', start: 28, end: 28, value: '}' },
    { type: 'brace_close', start: 29, end: 29, value: '}' } 
  ] // 13

  expect(analyzer(nestedObjectJSON)).toEqual({
    root: {
      type: 'root',
      head: {
        type: 'object',
        object: [
        {
          key: { token: { type: 'word', start: 1, end: 7, value: '"depth"' }, index: 1 },
          value: {
            type: 'object',
            object: [
            {
              key: { token: { type: 'word', start: 10, end: 14, value: '"so1"' }, index: 4 },
              value: {
                type: 'object',
                object: [
                {
                  key: { token: { type: 'word', start: 17, end: 21, value: '"so2"' }, index: 7 },
                  value: { token: { type: 'true', start: 23, end: 26, value: 'true' }, index: 9 }
                }]
              } 
            }]
          } 
        }]
      } 
    }
  })
})