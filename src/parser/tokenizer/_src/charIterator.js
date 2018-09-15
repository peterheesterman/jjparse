// @flow

type indexedChar = {|
  char: string,
  index: number
|}

type CharIterator = Generator<indexedChar, {| value: null, done: boolean|}, Object>

function* charIterator (input: string): CharIterator {
  const chars = input
  let counter = 0
  while(counter < chars.length) {
    const flags = yield { char: chars[counter], index: counter}

    if (!flags) {
      counter++
    } else {
      if (flags.rewind) {
        counter--
      }
    }
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