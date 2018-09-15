// @flow

const { defTypeExact } = require('./defTypeExact')

const { _false } = require('../../../tokenTypes')

const match = 'false'
const makeFalse = defTypeExact(_false, match)

module.exports = {
  startChar: `f`,
  match,
  make: makeFalse,
  type: _false
}
