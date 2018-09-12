// @flow

import type { Token } from '../../types'

type indexedToken = {|
  token: Token,
  index: number
|}

type TokenIterator = Generator<indexedToken, {| value: null, done: boolean|}, void>

function* tokenIterator (tokens: Array<Token>): TokenIterator {
  let counter = 0
  while(counter < tokens.length) {
    yield { token: tokens[counter], index: counter}
    counter++
  }
  return {
    value: null,
    done: true
  }
}

module.exports = {
  tokenIterator
}

export type {
  TokenIterator
}