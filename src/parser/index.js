// @flow

const { compose } = require('ramda')

const { tokenizer } = require('./tokenizer')
const { analyzer } = require('./analyzer')
const { formatter } = require('./formatter')

const transform = compose(
  formatter,
  analyzer,
  tokenizer
)

type $output = {|
  parsedJson: string, 
  errors: Array<Error>  
|}

const process = (json: string): $output => {
  const errors = []
  return {
    parsedJson: transform(json),
    errors
  }
}

module.exports = {
  process
}