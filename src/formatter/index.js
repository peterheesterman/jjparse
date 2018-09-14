// @flow

import type { AST } from '../parser/types'
import type { Configuration } from './types'

const { strBuffer } = require('./_src/strBuffer')
const { indenter } = require('./_src/indenter')

const { writeObject, writeArray } = require('./_src/typeWriters')

const getHead = (tree: AST): Object => {
  return tree.root.head
}

const formatter = (config: Configuration, tree: AST): string => {
  const write = strBuffer('')
  const indent = indenter(config, write)
  
  const head = getHead(tree)
  switch (head.type) {
    case 'object':
      writeObject(write, head, indent, 0, false)
      break;
    case 'array':
      writeArray(write, head, indent, 0, false)
      break;
    default:
      throw new Error('We are not in an array or object - something is wrong')
  }

  return write('')
}

module.exports = {
  formatter
}