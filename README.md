# jjparse

Javascript JSON Parser

  - Simple to read
  - Get better over time
  - Benchmark against rust version when i write that

Parsing will include tokenizing and analyzing. The resulting Abstract Syntax
Tree (AST) will be used to format json.

##
 - There is a line counter that we can use to understand how the repo is changing,
 we want to get this count as low as possible with it still being easy to read

## Outstanding issues:
General:
  - (since the tokenizers iterator and do lookAheads now, this can be sovled) - Need to add a peek into the tokenizer so that i can check if a exact type ends with something extra e.g. nullllll or falseDJFKLDSJK as this is currently not picked up
  - The errors are not passed into the errors array that is the output of the parser

Weak design:
  - If there is an error in the input, finding where that is, is nearly impossible from the error output


## Would be nice to add:
Easy:
  - minimising with a config variable for `compression` 
