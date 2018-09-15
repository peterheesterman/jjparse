# jjparse

Javascript JSON Parser

  - Simple to read
  - Get better over time
  - Benchmark against rust version when i write that

Parsing will include tokenizing and analyzing. The resulting Abstract Syntax
Tree (AST) will be used to format json.


## Outstanding issues:
General:
  - Need to add number support to the tokenizer?
  - The errors are not passed into the errors array that is the output of the parser
  - Need to add a peek into the tokenizer so that i can check if a exact type ends with something extra e.g. nullllll or falseDJFKLDSJK as this is currently not picked up

Weak design:
  - If there is an error in the input, finding where that is, is nearly impossible from the error output


## Would be nice to add:
  - minimising with a config variable for `compression` 