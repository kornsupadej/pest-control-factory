import { describe, expect, test } from 'vitest'

import { isEmpty } from '../../libs/utils/is-empty'

describe('#isEmpty', () => {
  describe('##Empty Cases', () => {
    test('return result for undefined correctly', () => {
      const v = undefined
      const result = isEmpty(v)
      expect(result).toBeTruthy()
    })
    test('return result for null correctly', () => {
      const v = null
      const result = isEmpty(v)
      expect(result).toBeTruthy()
    })
    test('return result for empty string correctly', () => {
      const v = ''
      const result = isEmpty(v)
      expect(result).toBeTruthy()
    })
    test('return result for empty array correctly', () => {
      const v = []
      const result = isEmpty(v)
      expect(result).toBeTruthy()
    })
    test('return result for empty object literal correctly', () => {
      const v = {}
      const result = isEmpty(v)
      expect(result).toBeTruthy()
    })
  })

  describe('##Exist Cases', () => {
    describe('##Empty Cases', () => {
      test('return result for string correctly', () => {
        const v = 'foo'
        const result = isEmpty(v)
        expect(result).toBeFalsy()
      })
      test('return result for array correctly', () => {
        const v = ['foo']
        const result = isEmpty(v)
        expect(result).toBeFalsy()
      })
      test('return result for object literal correctly', () => {
        const v = {
          foo: 'bar',
        }
        const result = isEmpty(v)
        expect(result).toBeFalsy()
      })
    })
  })
})
