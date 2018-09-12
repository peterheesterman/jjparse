// @flow

import type { Token } from '../../types'

const makeToken = (type: string, start: number, end: number, value: string): Token => {
  return {
    type,
    start,
    end,
    value
  }
}

module.exports = {
  makeToken
}