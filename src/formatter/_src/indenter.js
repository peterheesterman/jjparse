// @flow

import type { Configuration } from '../types'

const indenter = (config: Configuration, write: (x: string) => string) => (depth: number): string => {
  const { spaces = 2, tabs, compress } = config
  if (compress) return write('')
  let whitespace = '\n' + ' '.repeat(spaces * depth)
  if (tabs) {
    whitespace = '\n' + '\t'.repeat(depth)
  }
  return write(whitespace)
}

module.exports = {
  indenter
}