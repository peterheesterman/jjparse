
const getValue = (obj) => {
  return obj.value
}

const getChar = (obj) => {
  return getValue(obj).char
}

module.exports = {
  getValue, 
  getChar
}