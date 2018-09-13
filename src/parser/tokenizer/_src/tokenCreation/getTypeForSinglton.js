// @flow

const { 
  brace_open,
  brace_close,
  colon,
  comma,
  square_braket_open,
  square_braket_close
} = require('../../../tokenTypes')

const getTypeForSinglton = (char: string): string => {
  switch (char) {
    case '{':
      return brace_open
    case '}':
      return brace_close
    case ':':
      return colon
    case ',':
      return comma
   case '[':
      return square_braket_open
    case ']':
     return square_braket_close
    default:
      throw new Error(`This singleton char (${char}) does not have a type`)
  }
}

module.exports = {
  getTypeForSinglton
}