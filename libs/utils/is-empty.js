/**
 * Check is given value is considered empty
 * @param {unknown} v
 * @returns {boolean} result
 */
function isEmpty(v) {
  return (
    v === undefined ||
    v === null ||
    (typeof v === 'object' && Object.keys(v).length === 0) ||
    (typeof v === 'string' && v.trim().length === 0) ||
    (Array.isArray(v) && v.length === 0)
  )
}

export { isEmpty }
