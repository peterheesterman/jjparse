// @flow

const { defTypeByDelimiters } = require('./defTypeByDelimiters')

const { word } = require('../../../tokenTypes')

const delimiters = {
  startChar: `"`,
  endChar: `"`
}

const makeWord = defTypeByDelimiters(word, delimiters)

module.exports = {
  ...delimiters,
  make: makeWord,
  type: word
}