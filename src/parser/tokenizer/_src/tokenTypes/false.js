// @flow

const { defType } = require('./defType')

const type = 'false'

const delimiters = {
  startChar: 'f',
  endChar: 'e'
}

const makeWord = defType(type, delimiters)

module.exports = {
  ...delimiters,
  make: makeWord,
  type
}