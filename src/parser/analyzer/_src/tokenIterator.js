// @flow

import type { Token } from '../../types'

type indexedToken = {|
  token: Token,
  index: number
|}

type TokenIterator = Generator<indexedToken, {| value: null, done: boolean|}, boolean>

function* tokenIterator (tokens: Array<Token>): TokenIterator {
  let counter = 0
  let wasAPeek = false;
  while(counter < tokens.length) {
    const peeker = counter + 1 === tokens.length ? tokens.length - 1 : counter + 1
    const placeToYield = wasAPeek ? peeker : counter
    wasAPeek = yield { token: tokens[placeToYield], index: placeToYield}
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