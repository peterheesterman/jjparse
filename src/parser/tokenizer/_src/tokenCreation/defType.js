// @flow


import type { Token } from '../../../types'
import type { CharIterator } from '../charIterator'

const { makeToken } = require('./makeToken')
const { getValue } = require('../utils/selectors')

type $delimiters = {
  startChar: string,
  endChar: string
}

const anything = '#$*(ANYTHING!)*$#'

const defType = (type: string, delimiters: $delimiters, allowedChars: string = anything) => (
  stream: CharIterator
): Token => {
  const chars = [delimiters.startChar]

  let value = getValue(stream.next())
  const startPos = value.index - 1
  
  let foundEndOfWord = false
  while (!foundEndOfWord) {
    const char = value.char
    if (allowedChars !== anything && !allowedChars.includes(char)) 
      throw new Error(`(${char}) is not allowed in type ${type}`)
    if (char !== delimiters.endChar) {
      chars.push(char)
      value = getValue(stream.next())
    } else {
      foundEndOfWord = true
    }
  }

  const endPos = value.index
  chars.push(delimiters.endChar)
  return makeToken(type, startPos, endPos, chars.join(''))
}

module.exports = {
  defType
}