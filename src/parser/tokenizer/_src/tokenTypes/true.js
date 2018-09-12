// @flow

const { defType } = require('./defType')

const type = 'true'

const delimiters = {
  startChar: 't',
  endChar: 'e'
}

const makeWord = defType(type, delimiters)

module.exports = {
  ...delimiters,
  make: makeWord,
  type
}