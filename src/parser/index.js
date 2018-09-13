// @flow

import type { AST } from './types'

const { compose } = require('ramda')

const { tokenizer } = require('./tokenizer')
const { analyzer } = require('./analyzer')

const parse = compose(
  analyzer,
  tokenizer
)

type $output = {|
  parsedJson: AST, 
  errors: Array<Error>  
|}

const process = (json: string): $output => {
  const errors = []
  return {
    parsedJson: parse(json),
    errors
  }
}

module.exports = {
  process
}