import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test, vi } from 'vitest'

import { isFile } from '../../libs/utils/is-file'

describe('#isFile', () => {
  describe('##truthy', () => {
    test('return true if path is a file', () => {
      expect(isFile(path.join(process.cwd(), 'package.json'))).toBeTruthy()
    })
    test('allowSymlinks option = true correct function called', () => {
      const statSyncSpy = vi.spyOn(fs, 'statSync')
      isFile(path.join(process.cwd(), 'package.json'), {
        allowSymlinks: true,
      })
      expect(statSyncSpy).toBeCalledTimes(1)
    })
    test('allowSymlinks option = false correct function called', () => {
      const lstatSyncSpy = vi.spyOn(fs, 'lstatSync')
      isFile(path.join(process.cwd(), 'package.json'), {
        allowSymlinks: false,
      })
      expect(lstatSyncSpy).toBeCalledTimes(1)
    })
  })
  describe('##falsy', () => {
    test('return false if path is a directory', () => {
      expect(isFile(process.cwd())).toBeFalsy()
    })
    test('return false if path not exists', () => {
      expect(isFile(path.join(process.cwd(), 'ghost-file.json'))).toBeFalsy()
    })
    test('return false if type of value is a number', () => {
      expect(isFile(0)).toBeFalsy()
    })
    test('return false if type of value is a string', () => {
      expect(isFile('string')).toBeFalsy()
    })
    test('return false if type of value is a boolean', () => {
      expect(isFile(true)).toBeFalsy()
    })
    test('return false if type of value is an object', () => {
      expect(isFile({})).toBeFalsy()
    })
  })
})
