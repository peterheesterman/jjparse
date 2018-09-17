# jjparse

Javascript JSON Parser

  - Simple to read
  - Get better over time
  - Benchmark against rust version when i write that

Parsing will include tokenizing and analyzing. The resulting Abstract Syntax
Tree (AST) will be used to format json.

## Tips and tricks
  - There is a line counter that we can use to understand how the repo is changing,
  we want to get this count as low as possible with it still being easy to read, it
  now excludes test which we want to grow in size over time.

## Outstanding issues:
General:
  - The errors are not passed into the errors array that is the output of the parser.

Weak design:
  - If there is an error in the input, finding where that is, is nearly
  impossible from the error output.
