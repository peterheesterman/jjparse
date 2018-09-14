// @flow

import type { AST } from '../parser/types'

const { spaces } = require('./config')

const strBuffer = (str: string) => (additionStr: string): string => {
  str = str.concat(additionStr)
  return str
}

const depthHandler = (write: (x: string) => string) => (depth: number): void => {
  write("\n"+" ".repeat(spaces * depth))
}

const writeObject = (write, node, addDepth, depth, startOnNewLine = true) => {
  if (startOnNewLine) addDepth(depth)
  write('{')
  node.object.forEach(keyVal => {
    const newDepth = depth + 1
    addDepth(newDepth)
    // Note the space on the end - this get the layout for ': {' correct - not sure what the best way to handle this is that the momnet
    write(keyVal.key.token.value + ': ')

    switch (keyVal.value.type) {
      case 'object':
        writeObject(write, keyVal.value, addDepth, newDepth, false)
        break;
      case 'array':
        writeArray(write, keyVal.value, addDepth, newDepth, false)
        break;
      default:
        write(keyVal.value.token.value)
        break;
    }
    write(',')
  })

  addDepth(depth)
  write('}')
}

const writeArray = (write, node, addDepth, depth, startOnNewLine = false) => {
  if (startOnNewLine) addDepth(depth)
  write('[')
  node.values.forEach(keyVal => {
    const newDepth = depth + 1
    addDepth(newDepth)
    switch (keyVal.type) {
      case 'object':
      writeObject(write, keyVal, addDepth, newDepth, false)
      break;
      case 'array':
      writeArray(write, keyVal, addDepth, newDepth, false)
      break;
      default:
        write(keyVal.token.value)
      break;
    }
    
    write(',')
  })

  addDepth(depth)
  write(']')
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
      writeObject(write, head, addDepth, 0, false)
      break;
    case 'array':
      writeArray(write, head, addDepth, 0, false)
      break;
    default:
      throw new Error('We are not in an array or object - something is wrong')
  }

  return write('')
}

module.exports = {
  formatter
}