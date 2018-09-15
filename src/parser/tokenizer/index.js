// @flow

import type { Token } from '../types'
import type { CharIterator } from './_src/charIterator'

const { charIterator } = require('./_src/charIterator')
const { makeToken } = require('./_src/tokenCreation/makeToken')
const { make: makeWord, startChar: startWord } = require('./_src/tokenCreation/word')
const { make: makeNull, startChar: startNull } = require('./_src/tokenCreation/null')
const { make: makeTrue, startChar: startTrue } = require('./_src/tokenCreation/true')
const { make: makeFalse, startChar: startFalse } = require('./_src/tokenCreation/false')

const { getValue } = require('./_src/utils/selectors')
const { getTypeForSinglton } = require('./_src/tokenCreation/getTypeForSinglton')

const tokenizer = (input: string): Array<Token> => {
  const stream: CharIterator = charIterator(input)
  const tokens: Array<Token> = []

  let currentChar = stream.next()

  while(!currentChar.done) {
    const value = getValue(currentChar)

    switch (value.char) {
      case " ":
      case "\t":
      case "\n":
      case "\r":
        break;
      case startWord:
        tokens.push(makeWord(stream))
        break;
      case startNull:
        tokens.push(makeNull(stream))
        break;
      case startTrue:
        tokens.push(makeTrue(stream))
        break;
      case startFalse:
        tokens.push(makeFalse(stream))
        break;
      case "{":
      case "}":
      case ":":
      case ",":
      case "[":
      case "]":
        tokens.push(makeToken(getTypeForSinglton(value.char), value.index, value.index, value.char))
        break;
      default:
        throw new Error(`Char (${value.char}) does not start know token - fail!`)
    }

    currentChar = stream.next()
  }

  return tokens
}

module.exports = {
  tokenizer
}