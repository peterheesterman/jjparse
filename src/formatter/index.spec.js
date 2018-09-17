// @flow

const { process } = require('../parser')
const { formatter } = require('./')

const input = 
`{ "glossary": { "title": "example glossary","GlossDiv": {"title": "S","GlossList": {    "GlossEntry": {     "ID": "SGML",
        "SortAs": "SGML",
        "Glos sTerm": "Standard Generalized Markup Language",
        "Acronym": -123e-3,
        "Abbrev": "ISO 8879:1986",
        "GlossSeeAlso": [
            {
                "para": "A meta-markup language, used to create markup languages such as DocBook.",
                "GlossSeeAlso": [
                    "GML",                    "XML"                ]
            },
            "XML"
        ],
        "GlossDef": {
            "para": "A meta-markup language, used to create markup languages such as DocBook.",
            "GlossSeeAlso": [
                "GML",
                "XML"
            ]},        "GlossSee": "markup"}}}}}
`

const ASTree = process(input).parsedJson


test('Formatter should accept a tree and write it out - integration', () => {

  const expectedResult = 
`{
  "glossary": {
    "title": "example glossary",
    "GlossDiv": {
      "title": "S",
      "GlossList": {
        "GlossEntry": {
          "ID": "SGML",
          "SortAs": "SGML",
          "Glos sTerm": "Standard Generalized Markup Language",
          "Acronym": -123e-3,
          "Abbrev": "ISO 8879:1986",
          "GlossSeeAlso": [
            {
              "para": "A meta-markup language, used to create markup languages such as DocBook.",
              "GlossSeeAlso": [
                "GML",
                "XML"
              ]
            },
            "XML"
          ],
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

  expect(formatter(ASTree)).toBe(expectedResult)
})

test('Formatter should accept a tree a compressed result - integration', () => {
  const compressedResult = '{"glossary":{"title":"example glossary","GlossDiv":{"title":"S","GlossList":{"GlossEntry":{"ID":"SGML","SortAs":"SGML","Glos sTerm":"Standard Generalized Markup Language","Acronym":-123e-3,"Abbrev":"ISO 8879:1986","GlossSeeAlso":[{"para":"A meta-markup language, used to create markup languages such as DocBook.","GlossSeeAlso":["GML","XML"]},"XML"],"GlossDef":{"para":"A meta-markup language, used to create markup languages such as DocBook.","GlossSeeAlso":["GML","XML"]},"GlossSee":"markup"}}}}}'
  expect(formatter(ASTree, { compress: true })).toBe(compressedResult)
})

