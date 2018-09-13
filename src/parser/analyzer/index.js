// @flow

import type {
  AST, 
  Token, 
  TreeNode,
  TreeNode_array,
  TreeNode_object
} from '../types'

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

const { processObject } = require('./_src/processObject')
const { processArray } = require('./_src/processArray')

const analyzer = (tokens: Array<Token>): AST => {
  const tree = {
    root: {
      type: 'root',
      head: {}
    }
  }
  
  const stream = tokenIterator(tokens)
  let currentToken = stream.next()

  while(!currentToken.done) {
    const value = getValue(currentToken)
    switch (value.token.type) {
      case brace_open:
        tree.root.head = processObject(stream)
        break;
      case square_braket_open:
        tree.root.head = processArray(stream)
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