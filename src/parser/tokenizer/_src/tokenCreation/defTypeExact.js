// @flow

import type { Token } from '../../../types'
import type { CharIterator } from '../charIterator'

const { makeToken } = require('./makeToken')
const { getValue } = require('../utils/selectors')

const defTypeExact = (type: string, match: string) => (
  stream: CharIterator
): Token => {

  let startPos = 0
  
  let isMatch = true
  for (let i = 1; i < match.length; i++) {
    let value = getValue(stream.next())
    if (i === 1) startPos = value.index - 1
    isMatch = isMatch && value.char == match[i]
  }

  if (!isMatch) {
    throw new Error(`There is a failed match for type (${type})`)
  }

  const endPos = startPos + match.length - 1
  return makeToken(type, startPos, endPos, match)
}

module.exports = {
  defTypeExact
}