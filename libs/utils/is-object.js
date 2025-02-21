/**
 * This function checks if the value is an object literal
 * @param {unknown} object
 * @returns {boolean} result
 */
function isObject(object) {
  return typeof object === 'object' && !Array.isArray(object) && object !== null
}

export { isObject }
