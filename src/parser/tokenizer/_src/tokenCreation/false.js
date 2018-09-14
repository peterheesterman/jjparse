// @flow

const { defType } = require('./defType')

const { _false } = require('../../../tokenTypes')

const delimiters = {
  startChar: 'f',
  endChar: 'e'
}

const makeWord = defType(_false, delimiters, _false)

module.exports = {
  ...delimiters,
  make: makeWord,
  type: _false
}