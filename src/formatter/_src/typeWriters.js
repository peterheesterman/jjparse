// @flow

import type { TreeNode_object, TreeNode_array } from '../../parser/types'

const writeObject = (write:(x: string) => string, node: TreeNode_object, indent:(x: number) => string, depth: number, startOnNewLine: boolean = true) => {
  if (startOnNewLine) indent(depth)
  write('{')
  node.object.forEach(keyVal => {
    const newDepth = depth + 1
    indent(newDepth)
    write(keyVal.key.token.value + ': ')

    switch (keyVal.value.type) {
      case 'object':
        writeObject(write, keyVal.value, indent, newDepth, false)
        break;
      case 'array':
        writeArray(write, keyVal.value, indent, newDepth, false)
        break;
      default:
        write(keyVal.value.token.value)
        break;
    }
    if (node.object[node.object.length - 1] !== keyVal) write(',') 
  })

  indent(depth)
  write('}')
}

const writeArray = (write:(x: string) => string, node: TreeNode_array, indent:(x: number) => string, depth: number, startOnNewLine: boolean = false) => {
  if (startOnNewLine) indent(depth)
  write('[')
  node.values.forEach(keyVal => {
    const newDepth = depth + 1
    indent(newDepth)
    switch (keyVal.type) {
      case 'object':
        writeObject(write, keyVal, indent, newDepth, false)
        break;
      case 'array':
        writeArray(write, keyVal, indent, newDepth, false)
        break;
      default:
        write(keyVal.token.value)
        break;
    }
    
    if (node.values[node.values.length - 1] !== keyVal) write(',')
  })

  indent(depth)
  write(']')
}

module.exports = {
  writeObject,
  writeArray
}