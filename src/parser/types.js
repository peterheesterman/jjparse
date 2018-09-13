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

type TreeNode_object = {|
  type: string, 
  object: Array<Object>
|}

type TreeNode_array = {|
  type: string, 
  values: Array<Object>
|}

type TreeNode_root = {|
  type: string,
  head: Object
|}

type AST = {|
  root: ?TreeNode_root
|}

export type {
  AST,
  Token,
  TreeNode,
  TreeNode_array,
  TreeNode_object
}
