// @flow

import type {
  AST, 
  Token, 
  TreeNode,
  TreeNode_array,
  TreeNode_object
} from '../../types'

import type { TokenIterator } from './tokenIterator'

const {
  brace_close,
  comma
} = require('../../tokenTypes')

const { getValue } = require('./utils/selectors')

const processObject = (stream: TokenIterator): TreeNode_object => {
  const JUST_PEEK = true
  const pairs = []
  const makeObject = (keyVals) => ({ type: 'object', object: keyVals})

  const first = getValue(stream.next(true)).token.type
  if (first !== brace_close) {
    do {
      const key = getValue(stream.next())
      stream.next() // Skip colon
      const value = getValue(stream.next())
      pairs.push({key, value})
    } while (getValue(stream.next()).token.type === comma)
  } else {
    stream.next() // Chew up the `}` token
  }
  
  return makeObject(pairs)
}

module.exports = {
  processObject
}