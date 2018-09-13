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

  /* Leaving this here to clear first brace
     this is a lot less work than modifying the iterator for handling if you peek
     right at the end
   */
  stream.next() 

  const first = getValue(stream.next(JUST_PEEK)).token.type
  console.log(first)

  if (first !== brace_close) {
    do {
      const key = getValue(stream.next())
  console.log(key)

      stream.next() // Skip colon
      const value = getValue(stream.next())
      pairs.push({key, value})
    } while (stream.next() === comma)
  } 
  
  return makeObject(pairs)
}

module.exports = {
  processObject
}