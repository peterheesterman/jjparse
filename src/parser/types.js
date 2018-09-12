// @flow

type Token = {|
  type: string,
  start: number,
  end: number,
  value: string
|}

type TreeNode = {|
  type: string
|}

type AST = {|
  root: ?TreeNode
|}

export type {
  Token,
  TreeNode,
  AST
}
