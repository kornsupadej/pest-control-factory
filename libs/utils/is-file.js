import fs from 'node:fs'
import { toPath } from 'url-or-path'

/**
 * Check is given value is a file
 * @param {string | URL} file
 * @param {{allowSymlinks: boolean}} [options]
 * @returns {boolean}
 */
function isFile(file, options) {
  const allowSymlinks = options?.allowSymlinks ?? true

  let stats
  try {
    stats = (allowSymlinks ? fs.statSync : fs.lstatSync)(toPath(file))
  } catch {
    return false
  }
  return stats.isFile()
}

export { isFile }
