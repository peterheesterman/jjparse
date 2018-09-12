// @flow

import type { Token, AST } from '../types'

const analyzer = (tokens: Array<Token>): AST => {
  // We have tokens
  //console.log(tokens.length)
  
  return {
    root: { type: 'someType'}
  }
}

module.exports = {
  analyzer
}