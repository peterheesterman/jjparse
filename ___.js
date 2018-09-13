
// node ___.js

const { tokenizer } = require('./dist/parser/tokenizer/index')

const json = `{
	"depth": [true]
}`

console.log(tokenizer(json))

/**
  [ { type: 'brace_open', start: 0, end: 0, value: '{' },
  { type: 'word', start: 1, end: 5, value: '"win"' },
  { type: 'colon', start: 6, end: 6, value: ':' },
  { type: 'word', start: 7, end: 11, value: '"yes"' },
  { type: 'comma', start: 12, end: 12, value: ',' },
  { type: 'word', start: 13, end: 16, value: '"ok"' },
  { type: 'colon', start: 17, end: 17, value: ':' },
  { type: 'true', start: 18, end: 21, value: 'true' },
  { type: 'brace_close', start: 22, end: 22, value: '}' } ]
 */

