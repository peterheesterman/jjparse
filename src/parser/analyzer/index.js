// @flow
import type { Token, TreeNode, AST } from '../types'
import type { TokenIterator } from './_src/tokenIterator'

const {
  brace_open,
  brace_close,
  colon,
  comma,
  square_braket_open,
  square_braket_close,
  word,
  _true,
  _false
} = require('../tokenTypes')

const { tokenIterator } = require('./_src/tokenIterator')
const { getValue } = require('./_src/utils/selectors')

function recursiveAnalyse(stream: TokenIterator): TreeNode {
  return {
    type: 'something'
  }
}

const analyzer = (tokens: Array<Token>): AST => {
  const tree = {
    root: null
  }
  
  const stream: TokenIterator = tokenIterator(tokens)
  let currentToken = stream.next()
  while(!currentToken.done) {
    const value = getValue(currentToken)

    switch (value.token.type) {
      case brace_open:

        break;
      case brace_close:

        break;
      case colon:

        break;
      case comma:

        break;
      case square_braket_open:

        break;
      case square_braket_close:

        break;
      case word:

        break;
      case _true:

        break;
      case _false:

        break;
      default:
        throw new Error(`Char (${value.char}) does not start know token - fail!`)
    }

    currentToken = stream.next()
  }

  return tree
}

module.exports = {
  analyzer
}