import fs from 'node:fs'
import { toPath } from 'url-or-path'

/**
 * Check is given value is a directory
 * @param {string | URL} directory
 * @param {{allowSymlinks: boolean}} [options]
 * @returns {Promise<boolean>}
 */
function isDirectory(directory, options) {
  const allowSymlinks = options?.allowSymlinks ?? true

  let stats
  try {
    stats = (allowSymlinks ? fs.statSync : fs.lstatSync)(toPath(directory))
  } catch {
    return false
  }
  return stats.isDirectory()
}

export { isDirectory }
