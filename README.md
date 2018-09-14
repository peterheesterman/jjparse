# jjparse

Javascript JSON Parser

  - Simple to read
  - Get better over time
  - Benchmark against rust version when i write that

Parsing will include tokenizing and analyzing. The resulting Abstract Syntax
Tree (AST) will be used to format json.

Outstanding issues:
  - Need to add number support to both the tokenizer and analyzer?
  - Need to add null support to both the tokenizer and analyzer?
  - Could be cleaner, specifically in the formatter, just a glob of code
  - If there is an error in the input, finding where that is, is nearly impossible from the error output
  - The errors are not passed into the errors array that is the output of the parser


