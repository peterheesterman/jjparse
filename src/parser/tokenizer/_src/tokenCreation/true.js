// @flow

const { defType } = require('./defType')

const { _true } = require('../../../tokenTypes')

const delimiters = {
  startChar: 't',
  endChar: 'e'
}

const makeWord = defType(_true, delimiters, _true)

module.exports = {
  ...delimiters,
  make: makeWord,
  type: _true
}