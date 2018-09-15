// @flow

const { strBuffer } = require('./strBuffer')
const { indenter } = require('./indenter')

test('The indenter should use 2 spaces be default', () => {
  const writer = strBuffer('')
  const indent = indenter({}, writer)
  expect(indent(3)).toBe('\n      ')
})

test('The indenter should add only a newline when depth is 0', () => {
  const writer = strBuffer('')
  const indent = indenter({ spaces: 2}, writer)
  expect(indent(0)).toBe('\n')
})

test('The indenter should a new line and 2 * 2 spaces', () => {
  const writer = strBuffer('')
  const indent = indenter({ spaces: 2}, writer)
  expect(indent(2)).toBe('\n    ')
})

test('The indenter should a new line a tab', () => {
  const writer = strBuffer('')
  const indent = indenter({ tabs: true }, writer)
  expect(indent(1)).toBe('\n\t')
})
