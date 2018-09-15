// @flow

const { tokenizer } = require('./')

const word = `"wo rd"`
const _null = `null`
const _true = `true`
const _false = `false`

test('Tokenizer should make a word', () => {
  const node = {
    type: "word",
    start: 0,
    end: 6,
    value: `"wo rd"`
  }
  expect(tokenizer(word)[0]).toEqual(node)
})

test('Tokenizer should make a null', () => {
  const node = {
    type: "null",
    start: 0,
    end: 3,
    value: `null`
  }
  expect(tokenizer(_null)[0]).toEqual(node)
})

test('Tokenizer should make a true', () => {
  const node = {
    type: "true",
    start: 0,
    end: 3,
    value: `true`
  }
  expect(tokenizer(_true)[0]).toEqual(node)
})

test('Tokenizer should make a false', () => {
  const node = {
    type: "false",
    start: 0,
    end: 4,
    value: `false`
  }
  expect(tokenizer(_false)[0]).toEqual(node)
})

test('Tokenizer should work for things with spaces in the words', () => {
  const json = `{"win":"y es","ok":true}`
  expect(tokenizer(json)).toEqual([ 
    { type: 'brace_open', start: 0, end: 0, value: '{' },
    { type: 'word', start: 1, end: 5, value: '"win"' },
    { type: 'colon', start: 6, end: 6, value: ':' },
    { type: 'word', start: 7, end: 12, value: '"y es"' },
    { type: 'comma', start: 13, end: 13, value: ',' },
    { type: 'word', start: 14, end: 17, value: '"ok"' },
    { type: 'colon', start: 18, end: 18, value: ':' },
    { type: 'true', start: 19, end: 22, value: 'true' },
    { type: 'brace_close', start: 23, end: 23, value: '}' } 
  ])
})

test('Tokenizer should throw for a w in null', () => {
  const json = `{"win":"y es","ok":nuull`
  expect(() => {
    tokenizer(json)}
  ).toThrow('There is a failed match for type (null)')
})

test('Tokenizer should throw for spam in true', () => {
  const json = `{"win":"y es","ok":tr*(*ue}`
  expect(() => {
    tokenizer(json)}
  ).toThrow('There is a failed match for type (true)')
})

test('Tokenizer should throw for a space in false', () => {
  const json = `{"win":"y es","ok":fals e}`
  expect(() => {
    tokenizer(json)}
  ).toThrow('There is a failed match for type (false)')
})

test('Tokenizer should throw for double "s" in false', () => {
  const json = `{"win":"y es","ok":falsse}`
  expect(() => {
    tokenizer(json)}
  ).toThrow('There is a failed match for type (false)')
})

test('Tokenizer integration test', () => {
  const tokens = hiddenSetup()
  const input = `{
    "glossary": {
        "title": "example glossary",
        "GlossDiv": {
            "title": "S",
            "GlossList": {
                "GlossEntry": {
                    "ID": "SGML",
                    "SortAs": "SGML",
                    "GlossTerm": "Standard Generalized Markup Language",
                    "Acronym": "SGML",
                    "Abbrev": "ISO 8879:1986",
                    "GlossDef": {
                        "para": "A meta-markup language, used to create markup languages such as DocBook.",
                        "GlossSeeAlso": [
                            "GML",
                            "XML"
                        ]
                    },
                    "GlossSee": "markup"
                }
            }
        }
    }
}`
  expect(tokenizer(input)).toEqual(tokens)
})


/**
 * Reference output 
 */
function hiddenSetup() {
  return [{"end": 0, "start": 0, "type": "brace_open", "value": "{"},
   {"end": 15, "start": 6, "type": "word", "value": "\"glossary\""},
   {"end": 16, "start": 16, "type": "colon", "value": ":"},
   {"end": 18, "start": 18, "type": "brace_open", "value": "{"},
   {"end": 34, "start": 28, "type": "word", "value": "\"title\""},
   {"end": 35, "start": 35, "type": "colon", "value": ":"},
   {"end": 54, "start": 37, "type": "word","value": "\"example glossary\""},
   {"end": 55, "start": 55, "type": "comma", "value": ","},
   {"end": 74, "start": 65, "type": "word", "value": "\"GlossDiv\""},
   {"end": 75, "start": 75, "type": "colon", "value": ":"},
   {"end": 77, "start": 77, "type": "brace_open", "value": "{"},
   {"end": 97, "start": 91, "type": "word", "value": "\"title\""},
   {"end": 98, "start": 98, "type": "colon", "value": ":"},
   {"end": 102, "start": 100, "type": "word", "value": "\"S\""},
   {"end": 103, "start": 103, "type": "comma", "value": ","},
   {"end": 127, "start": 117, "type": "word", "value": "\"GlossList\""},
   {"end": 128, "start": 128, "type": "colon", "value": ":"},
   {"end": 130, "start": 130, "type": "brace_open", "value": "{"},
   {"end": 159, "start": 148, "type": "word", "value": "\"GlossEntry\""},
   {"end": 160, "start": 160, "type": "colon", "value": ":"},
   {"end": 162, "start": 162, "type": "brace_open", "value": "{"},
   {"end": 187, "start": 184, "type": "word", "value": "\"ID\""},
   {"end": 188, "start": 188, "type": "colon", "value": ":"},
   {"end": 195, "start": 190, "type": "word", "value": "\"SGML\""},
   {"end": 196, "start": 196, "type": "comma", "value": ","},
   {"end": 225, "start": 218, "type": "word", "value": "\"SortAs\""},
   {"end": 226, "start": 226, "type": "colon", "value": ":"},
   {"end": 233, "start": 228, "type": "word", "value": "\"SGML\""},
   {"end": 234, "start": 234, "type": "comma", "value": ","},
   {"end": 266, "start": 256, "type": "word", "value": "\"GlossTerm\""},
   {"end": 267, "start": 267, "type": "colon", "value": ":"},
   {"end": 306, "start": 269, "type": "word", "value": "\"Standard Generalized Markup Language\""},
   {"end": 307, "start": 307, "type": "comma", "value": ","},
   {"end": 337, "start": 329, "type": "word", "value": "\"Acronym\""},
   {"end": 338, "start": 338, "type": "colon", "value": ":"},
   {"end": 345, "start": 340, "type": "word", "value": "\"SGML\""},
   {"end": 346, "start": 346, "type": "comma", "value":","},
   {"end": 375, "start": 368, "type": "word", "value": "\"Abbrev\""},
   {"end": 376, "start": 376, "type": "colon", "value": ":"},
   {"end": 392, "start": 378, "type": "word", "value": "\"ISO 8879:1986\""},
   {"end": 393, "start": 393, "type": "comma", "value": ","},
   {"end": 424, "start": 415, "type": "word", "value": "\"GlossDef\""},
   {"end": 425, "start": 425, "type": "colon", "value": ":"},
   {"end": 427, "start": 427, "type": "brace_open", "value": "{"},
   {"end": 458, "start": 453, "type": "word", "value": "\"para\""},
   {"end": 459, "start": 459, "type": "colon", "value": ":"},
   {"end": 534, "start": 461, "type": "word", "value": "\"A meta-markup language, used to create markup languages such as DocBook.\""},
   {"end": 535, "start": 535, "type": "comma", "value": ","},
   {"end": 574, "start": 561, "type": "word", "value": "\"GlossSeeAlso\""},
   {"end": 575, "start": 575, "type": "colon", "value": ":"},
   {"end": 577, "start": 577, "type": "square_braket_open", "value": "["},
   {"end": 611, "start": 607, "type": "word", "value": "\"GML\""},
   {"end": 612, "start": 612, "type": "comma", "value": ","},
   {"end": 646, "start": 642, "type": "word", "value": "\"XML\""},
   {"end": 672, "start": 672, "type": "square_braket_close", "value": "]"},
   {"end": 694, "start": 694, "type": "brace_close", "value": "}"},
   {"end": 695, "start": 695, "type": "comma", "value": ","},
   {"end": 726, "start": 717, "type": "word", "value": "\"GlossSee\""},
   {"end": 727, "start": 727, "type": "colon", "value": ":"},
   {"end": 736, "start": 729, "type": "word", "value": "\"markup\""},
   {"end": 754, "start": 754, "type": "brace_close", "value": "}"},
   {"end": 768, "start": 768, "type":"brace_close", "value": "}"},
   {"end": 778, "start": 778, "type": "brace_close", "value": "}"},
   {"end": 784, "start": 784, "type": "brace_close", "value": "}"},
   {"end": 786, "start": 786, "type": "brace_close", "value": "}"}]
}
