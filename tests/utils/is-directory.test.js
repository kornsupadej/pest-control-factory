import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test, vi } from 'vitest'

import { isDirectory } from '../../libs/utils/is-directory'

describe('#isFile', () => {
  describe('##truthy', () => {
    test('return true if path is a directory', () => {
      expect(isDirectory(process.cwd())).toBeTruthy()
    })
    test('allowSymlinks option = true correct function called', () => {
      const statSyncSpy = vi.spyOn(fs, 'statSync')
      isDirectory(process.cwd(), {
        allowSymlinks: true,
      })
      expect(statSyncSpy).toBeCalledTimes(1)
    })
    test('allowSymlinks option = false correct function called', () => {
      const lstatSyncSpy = vi.spyOn(fs, 'lstatSync')
      isDirectory(process.cwd(), {
        allowSymlinks: false,
      })
      expect(lstatSyncSpy).toBeCalledTimes(1)
    })
  })
  describe('##falsy', () => {
    test('return false if path is a file', () => {
      expect(isDirectory(path.join(process.cwd(), 'package.json'))).toBeFalsy()
    })
    test('return false if path not exists', () => {
      expect(isDirectory(path.join(process.cwd(), 'ghost-folder'))).toBeFalsy()
    })
    test('return false if type of value is a number', () => {
      expect(isDirectory(0)).toBeFalsy()
    })
    test('return false if type of value is a string', () => {
      expect(isDirectory('string')).toBeFalsy()
    })
    test('return false if type of value is a boolean', () => {
      expect(isDirectory(true)).toBeFalsy()
    })
    test('return false if type of value is an object', () => {
      expect(isDirectory({})).toBeFalsy()
    })
  })
})
