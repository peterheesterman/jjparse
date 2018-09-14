// @flow

import type { AST } from '../parser/types'

const { spaces } = require('./config')

const strBuffer = (str) => (additionStr) => {
  str = str.concat(additionStr)
  return str
}

const depthHandler = (writer: func): func => (depth: number) => {
  writer(" ".repeat(spaces * depth))
}

const writeObject = (writer, node, depthHandler, depth) => {
  depthHandler(depth)
}

const getHead = (tree: AST): Object => {
  return tree.root.head
}

const formatter = (tree: AST): string => {
  const write = strBuffer('')
  const addDepth = depthHandler(write)
  
  const head = getHead(tree)

  switch (head.type) {
    case 'object':
      writeObject(write, head, depthHandler, 0)
      break;
    case 'array':
      
      break;
    default:
      break;
  }

  return "formatted json"
}

module.exports = {
  formatter
}