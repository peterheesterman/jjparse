// @flow

const { defTypeExact } = require('./defTypeExact')

const { _true } = require('../../../tokenTypes')

const match = 'true'
const makeTrue = defTypeExact(_true, match)

module.exports = {
  startChar: `t`,
  match,
  make: makeTrue,
  type: _true
}
