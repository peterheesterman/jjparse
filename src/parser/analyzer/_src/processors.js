// @flow

import type {
  AST, 
  Token, 
  TreeNode_array,
  TreeNode_object
} from '../../types'

import type { TokenIterator } from './tokenIterator'

const {
  square_braket_close,
  comma,
  brace_close,
  brace_open,
  square_braket_open
} = require('../../tokenTypes')

const { getValue } = require('./utils/selectors')

const processArray = (stream: TokenIterator): TreeNode_array => {
  const JUST_PEEK = true
  const values = []
  const makeArray = (values) => ({ type: 'array', values })
  const first = getValue(stream.next(JUST_PEEK)).token.type

  if (first !== square_braket_close) {
    do {
      values.push(stream.next())
    } while (stream.next() === comma)
  }
  
  return makeArray(values)
}


const processValue = (stream: TokenIterator): TreeNode_array | TreeNode_object => {
  const value = getValue(stream.next())
  switch (value.token.type) {
    case brace_open:
      return processObject(stream)
    case square_braket_open:
      return processArray(stream)
    default:
      return value
  }
}


const processObject = (stream: TokenIterator): TreeNode_object => {
  const JUST_PEEK = true
  const pairs = []
  const makeObject = (keyVals) => ({ type: 'object', object: keyVals})

  const first = getValue(stream.next(JUST_PEEK)).token.type
  if (first !== brace_close) {
    do {
      const key = getValue(stream.next())
      stream.next() // Skip colon
      const value = processValue(stream)
      pairs.push({key, value})
    } while (getValue(stream.next()).token.type === comma)
  } else {
    stream.next() // Chew up the `}` token
  }

  return makeObject(pairs)
}


module.exports = {
  processArray,
  processValue,
  processObject
}