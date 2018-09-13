// @flow

import type { Token } from '../../types'

type indexedToken = {|
  token: Token,
  index: number
|}

type TokenIterator = Generator<indexedToken, {| value: null, done: boolean|}, boolean>

function* tokenIterator (tokens: Array<Token>): TokenIterator {
  let counter = 0
  while(counter < tokens.length) {
    let wasAPeek = yield { token: tokens[counter], index: counter}
    if (!wasAPeek) counter++
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