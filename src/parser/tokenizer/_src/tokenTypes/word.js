// @flow

const { defType } = require('./defType')

const doubleQuote = `"`
const type = 'word'

const delimiters = {
  startChar: doubleQuote,
  endChar: doubleQuote
}

const makeWord = defType(type, delimiters)

module.exports = {
  ...delimiters,
  make: makeWord,
  type
}