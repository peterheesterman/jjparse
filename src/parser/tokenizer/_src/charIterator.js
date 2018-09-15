// @flow

type indexedChar = {|
  char: string,
  index: number
|}

type CharIterator = Generator<indexedChar, {| value: null, done: boolean|}, boolean>

function* charIterator (input: string): CharIterator {
  const chars = input//.replace(/\s/gi, '')
  let counter = 0
  while(counter < chars.length) {
    const sameAgain = yield { char: chars[counter], index: counter}
    if (!sameAgain) counter++
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