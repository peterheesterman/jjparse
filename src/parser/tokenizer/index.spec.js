// @flow

const { tokenizer } = require('./')

const word = `"word"`
const _true = `true`
const _false = `false`

test('Tokenizer should make a word', () => {
  const node = {
    type: "word",
    start: 0,
    end: 5,
    value: `"word"`
  }
  expect(tokenizer(word)[0]).toEqual(node)
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
  return [ { type: 'brace_open', start: 0, end: 0, value: '{' },
  { type: 'word', start: 1, end: 10, value: '"glossary"' },
  { type: 'colon', start: 11, end: 11, value: ':' },
  { type: 'brace_open', start: 12, end: 12, value: '{' },
  { type: 'word', start: 13, end: 19, value: '"title"' },
  { type: 'colon', start: 20, end: 20, value: ':' },
  { type: 'word', start: 21, end: 37, value: '"exampleglossary"' },
  { type: 'comma', start: 38, end: 38, value: ',' },
  { type: 'word', start: 39, end: 48, value: '"GlossDiv"' },
  { type: 'colon', start: 49, end: 49, value: ':' },
  { type: 'brace_open', start: 50, end: 50, value: '{' },
  { type: 'word', start: 51, end: 57, value: '"title"' },
  { type: 'colon', start: 58, end: 58, value: ':' },
  { type: 'word', start: 59, end: 61, value: '"S"' },
  { type: 'comma', start: 62, end: 62, value: ',' },
  { type: 'word', start: 63, end: 73, value: '"GlossList"' },
  { type: 'colon', start: 74, end: 74, value: ':' },
  { type: 'brace_open', start: 75, end: 75, value: '{' },
  { type: 'word', start: 76, end: 87, value: '"GlossEntry"' },
  { type: 'colon', start: 88, end: 88, value: ':' },
  { type: 'brace_open', start: 89, end: 89, value: '{' },
  { type: 'word', start: 90, end: 93, value: '"ID"' },
  { type: 'colon', start: 94, end: 94, value: ':' },
  { type: 'word', start: 95, end: 100, value: '"SGML"' },
  { type: 'comma', start: 101, end: 101, value: ',' },
  { type: 'word', start: 102, end: 109, value: '"SortAs"' },
  { type: 'colon', start: 110, end: 110, value: ':' },
  { type: 'word', start: 111, end: 116, value: '"SGML"' },
  { type: 'comma', start: 117, end: 117, value: ',' },
  { type: 'word', start: 118, end: 128, value: '"GlossTerm"' },
  { type: 'colon', start: 129, end: 129, value: ':' },
  { type: 'word',
    start: 130,
    end: 164,
    value: '"StandardGeneralizedMarkupLanguage"' },
  { type: 'comma', start: 165, end: 165, value: ',' },
  { type: 'word', start: 166, end: 174, value: '"Acronym"' },
  { type: 'colon', start: 175, end: 175, value: ':' },
  { type: 'word', start: 176, end: 181, value: '"SGML"' },
  { type: 'comma', start: 182, end: 182, value: ',' },
  { type: 'word', start: 183, end: 190, value: '"Abbrev"' },
  { type: 'colon', start: 191, end: 191, value: ':' },
  { type: 'word', start: 192, end: 205, value: '"ISO8879:1986"' },
  { type: 'comma', start: 206, end: 206, value: ',' },
  { type: 'word', start: 207, end: 216, value: '"GlossDef"' },
  { type: 'colon', start: 217, end: 217, value: ':' },
  { type: 'brace_open', start: 218, end: 218, value: '{' },
  { type: 'word', start: 219, end: 224, value: '"para"' },
  { type: 'colon', start: 225, end: 225, value: ':' },
  { type: 'word',
    start: 226,
    end: 289,
    value:
     '"Ameta-markuplanguage,usedtocreatemarkuplanguagessuchasDocBook."' },
  { type: 'comma', start: 290, end: 290, value: ',' },
  { type: 'word', start: 291, end: 304, value: '"GlossSeeAlso"' },
  { type: 'colon', start: 305, end: 305, value: ':' },
  { type: 'square_braket_open', start: 306, end: 306, value: '[' },
  { type: 'word', start: 307, end: 311, value: '"GML"' },
  { type: 'comma', start: 312, end: 312, value: ',' },
  { type: 'word', start: 313, end: 317, value: '"XML"' },
  { type: 'square_braket_close', start: 318, end: 318, value: ']' },
  { type: 'brace_close', start: 319, end: 319, value: '}' },
  { type: 'comma', start: 320, end: 320, value: ',' },
  { type: 'word', start: 321, end: 330, value: '"GlossSee"' },
  { type: 'colon', start: 331, end: 331, value: ':' },
  { type: 'word', start: 332, end: 339, value: '"markup"' },
  { type: 'brace_close', start: 340, end: 340, value: '}' },
  { type: 'brace_close', start: 341, end: 341, value: '}' },
  { type: 'brace_close', start: 342, end: 342, value: '}' },
  { type: 'brace_close', start: 343, end: 343, value: '}' },
  { type: 'brace_close', start: 344, end: 344, value: '}' } ]
}
