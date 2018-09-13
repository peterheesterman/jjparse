// @flow

const { defType } = require('./defType')

const { word } = require('../../../tokenTypes')

const delimiters = {
  startChar: `"`,
  endChar: `"`
}

const makeWord = defType(word, delimiters)

module.exports = {
  ...delimiters,
  make: makeWord,
  type: word
}