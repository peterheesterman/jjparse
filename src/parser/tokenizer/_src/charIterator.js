// @flow

type indexedChar = {|
  char: string,
  index: number
|}

type CharIterator = Generator<indexedChar, {| value: null, done: boolean|}, void>

function* charIterator (input: string): CharIterator {
  const chars = input//.replace(/\s/gi, '')
  let counter = 0
  while(counter < chars.length) {
    yield { char: chars[counter], index: counter}
    counter++
  }
  return {
    value: null,
    done: true
  }
}

module.exports = {
  charIterator
}

export type {
  CharIterator
}