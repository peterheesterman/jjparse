// @flow

const fs = require('fs')

const parser = require('./parser')

/* node jjparse ./file.json */
const args = process.argv.slice(2)

const inputFile = args[0]
const outputFile = args[1]

const json = fs.readFileSync(inputFile, { encoding: 'utf8' })
const { parsedJson, errors } = parser.process(json)

if ( errors.length === 0 ) {
  fs.writeFileSync(outputFile, parsedJson)
} else {
  console.log('We have some errors', errors)
}

