// @flow

import type { Token } from '../../../types'
import type { CharIterator } from '../charIterator'

const { makeToken } = require('./makeToken')
const { getValue } = require('../utils/selectors')

const defTypeByRegex = (type: string, regex: string, stopChars: Array<string>) => (
  stream: CharIterator
): Token => {
  const LOOK_LAST = true
  const value = getValue(stream.next(LOOK_LAST))
  const startPos = value.index
  let endPos = startPos
  // accumulateUntil we have a char we don't like, 
  // then push that chat back and check if we are a valid number 
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
  return makeToken(type, startPos, endPos, chars.join(''))
}

module.exports = {
  defTypeByRegex
}