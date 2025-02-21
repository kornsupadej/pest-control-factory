import { describe, expect, test } from 'vitest'

import { isObject } from '../../libs/utils/is-object'

describe('#isArray', () => {
  describe('##truthy', () => {
    test('return true if type of value is an object', () => {
      expect(isObject({})).toBeTruthy()
    })
  })
  describe('##falsy', () => {
    test('return false if type of value is a number', () => {
      expect(isObject(0)).toBeFalsy()
    })
    test('return false if type of value is a string', () => {
      expect(isObject('string')).toBeFalsy()
    })
    test('return false if type of value is a boolean', () => {
      expect(isObject(true)).toBeFalsy()
    })
    test('return false if type of value is an array', () => {
      expect(isObject([])).toBeFalsy()
    })
  })
})
