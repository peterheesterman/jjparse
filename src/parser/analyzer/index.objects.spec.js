// @flow

const { analyzer } = require('./')

test('Analyzer should produce a tree', () => {
  //{}
  const emptyObject = [
    { type: 'brace_open', value: '{' },
    { type: 'brace_close', value: '}' }
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
  /**
   * {
   *   "win": "yes",
   *   "ok": true
   * }
   */
  const littleJson = [ 
    { type: 'brace_open', value: '{' },
    { type: 'word', value: '"win"' },
    { type: 'colon', value: ':' },
    { type: 'word', value: '"yes"' },
    { type: 'comma', value: ',' },
    { type: 'word', value: '"ok"' },
    { type: 'colon', value: ':' },
    { type: 'true', value: 'true' },
    { type: 'brace_close', value: '}' } 
  ]

  expect(analyzer(littleJson)).toEqual({
    root: {
      type: 'root',
      head: {
        type: 'object',
        object: [
        {
          key: { token: { type: 'word', value: '"win"' }, index: 1 },
          value: { token: { type: 'word', value: '"yes"' }, index: 3 }
        },{
          key: { token: { type: 'word', value: '"ok"' }, index: 5 },
          value: { token: { type: 'true', value: 'true' }, index: 7 }
        }]
      } 
    }
  })
})


test('Analyzer should produce a tree for depth 3 objects', () => {
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
    { type: 'brace_open', value: '{' },   // 0
    { type: 'word', value: '"depth"' },
    { type: 'colon', value: ':' },
    { type: 'brace_open', value: '{' },
    { type: 'word', value: '"so1"' },
    { type: 'colon', value: ':' },      // 5
    { type: 'brace_open', value: '{' },
    { type: 'word', value: '"so2"' },
    { type: 'colon', value: ':' },
    { type: 'true', value: 'true' },
    { type: 'brace_close', value: '}' },// 10
    { type: 'brace_close', value: '}' },
    { type: 'brace_close', value: '}' } 
  ] // 13

  expect(analyzer(nestedObjectJSON)).toEqual({
    root: {
      type: 'root',
      head: {
        type: 'object',
        object: [
        {
          key: { token: { type: 'word', value: '"depth"' }, index: 1 },
          value: {
            type: 'object',
            object: [
            {
              key: { token: { type: 'word', value: '"so1"' }, index: 4 },
              value: {
                type: 'object',
                object: [
                {
                  key: { token: { type: 'word', value: '"so2"' }, index: 7 },
                  value: { token: { type: 'true', value: 'true' }, index: 9 }
                }]
              } 
            }]
          } 
        }]
      } 
    }
  })
})


test('Analyzer should Handle arrays', () => {

  const nestedObjectJSON = [ 
    { type: 'brace_open', value: '{' },   // 0
    { type: 'word', value: '"depth"' },
    { type: 'colon', value: ':' },
    { type: 'brace_open', value: '{' },
    { type: 'word', value: '"so1"' },
    { type: 'colon', value: ':' },      // 5
    { type: 'brace_open', value: '{' },
    { type: 'word', value: '"so2"' },
    { type: 'colon', value: ':' },
    { type: 'true', value: 'true' },
    { type: 'brace_close', value: '}' },// 10
    { type: 'brace_close', value: '}' },
    { type: 'brace_close', value: '}' } 
  ] // 13

  expect(analyzer(nestedObjectJSON)).toEqual({
    root: {
      type: 'root',
      head: {
        type: 'object',
        object: [
        {
          key: { token: { type: 'word', value: '"depth"' }, index: 1 },
          value: {
            type: 'object',
            object: [
            {
              key: { token: { type: 'word', value: '"so1"' }, index: 4 },
              value: {
                type: 'object',
                object: [
                {
                  key: { token: { type: 'word', value: '"so2"' }, index: 7 },
                  value: { token: { type: 'true', value: 'true' }, index: 9 }
                }]
              } 
            }]
          } 
        }]
      } 
    }
  })
})