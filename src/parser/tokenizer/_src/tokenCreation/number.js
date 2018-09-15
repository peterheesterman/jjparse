// @flow

const { defTypeByRegex } = require('./defTypeByRegex')

const { number } = require('../../../tokenTypes')

const regex = '-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?'
const stopChars = [" ", "\t", "\n", "\r", "}", ":", ",", "]", "\""]
const makeNumber = defTypeByRegex(number, regex, stopChars)

module.exports = {
  regex,
  make: makeNumber,
  type: number
}
