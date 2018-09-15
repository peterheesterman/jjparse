// @flow

const { defTypeExact } = require('./defTypeExact')

const { _null } = require('../../../tokenTypes')

const match = 'null'
const makeNull = defTypeExact(_null, match)

module.exports = {
  startChar: `n`,
  match,
  make: makeNull,
  type: _null
}
