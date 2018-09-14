// @flow

const strBuffer = (str: string) => (additionStr: string): string => {
  str = str.concat(additionStr)
  return str
}

module.exports = {
  strBuffer
}