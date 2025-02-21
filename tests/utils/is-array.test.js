import { describe, expect, test } from 'vitest'

import { isArray } from '../../libs/utils/is-array'

describe('#isArray', () => {
  describe('##truthy', () => {
    test('return true if type of value is an array', () => {
      expect(isArray([])).toBeTruthy()
    })
  })
  describe('##falsy', () => {
    test('return false if type of value is a number', () => {
      expect(isArray(0)).toBeFalsy()
    })
    test('return false if type of value is a string', () => {
      expect(isArray('string')).toBeFalsy()
    })
    test('return false if type of value is a boolean', () => {
      expect(isArray(true)).toBeFalsy()
    })
    test('return false if type of value is an object', () => {
      expect(isArray({})).toBeFalsy()
    })
  })
})
