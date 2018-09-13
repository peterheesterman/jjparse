// @flow

import type {
  AST, 
  Token, 
  TreeNode_array,
} from '../../types'

import type { TokenIterator } from './tokenIterator'

const {
  square_braket_close,
  comma
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

module.exports = {
  processArray
}