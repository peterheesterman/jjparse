// @flow

const { strBuffer } = require('./strBuffer')

test('The strBuffer should just add strings together and return them', () => {
  const writer = strBuffer('')

  writer('first')
  expect(writer(' second')).toBe('first second')
})
