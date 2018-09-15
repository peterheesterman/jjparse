// @flow

import type { Token } from '../../../types'
import type { CharIterator } from '../charIterator'

const { makeToken } = require('./makeToken')
const { getValue } = require('../utils/selectors')

const { number } = require('../../../tokenTypes')

const stopChars = [" ", "\t", "\n", "\r", "}", ":", ",", "]", "\""]

const makeNumber = (stream: CharIterator): Token => {
  const LOOK_LAST = true
  const value = getValue(stream.next(LOOK_LAST))
  const startPos = value.index
  let endPos = startPos
  
  const chars = [value.char]
  let steamEnd = false
  while(!stopChars.includes(chars[chars.length - 1]) && !steamEnd) {
    const next = stream.next()
    if (!next.done) {
      chars.push(getValue(next).char)
      endPos++
    } else {
      steamEnd = true
    }
  }

  if (!steamEnd) {
    chars.splice(-1)
    endPos--
  }

  const numberString = chars.join('')
  if (isNaN(numberString)) {
    throw new Error(`This value (${numberString}) is not a valid number`)
  }

  return makeToken(number, startPos, endPos, numberString)
}

module.exports = {
  make: makeNumber,
  type: number
}
