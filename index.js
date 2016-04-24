var detect = require('prop-detect')
var transition = detect.transition
var styles = require('computed-style')
var body = document.body

/**
 * Make an element absolute, return original props
 *
 * @param  {Element}  el
 * @param {Element} pel
 * @return {Object}
 * @api public
 */
module.exports = function (el) {
  if (!el.parentNode) return
  var pel = getRelativeElement(el.parentNode)
  if (!pel) return
  var pos = getAbsolutePosition(el, pel)
  var transitionProp = styles(el, transition)
  el.style.transition = 'none'
  var orig = copy(el.style, {
    height: pos.height + 'px',
    width: pos.width + 'px',
    left: pos.left + 'px',
    top: pos.top + 'px',
    position: 'absolute',
    float: 'none'
  })
  setTimeout(function () {
    el.style.transition = transitionProp
  })
  return function restore() {
    copy(el.style, orig)
  }
}

/**
 * Get relative element of el
 *
 * @param  {Element}  el
 * @return {Element}
 * @api public
 */
function getRelativeElement (el) {
  while(el) {
    if (el === body) return el
    var p = styles(el, 'position')
    if (p === 'absolute' || p === 'fixed' || p === 'relative') {
      return el
    }
    el = el.parentNode
  }
}

/**
 * Get absolute left top width height
 *
 * @param  {Element}  el
 * @param {Element} pel
 * @return {Object}
 * @api public
 */
function getAbsolutePosition (el, pel) {
  var r = el.getBoundingClientRect()
  var rect = pel.getBoundingClientRect()
  return {
    left: r.left - rect.left,
    top: r.top -rect.top,
    width: r.width || el.offsetWidth,
    height: r.height || el.offsetHeight
  }
}

function copy (to, from) {
  var orig = {}
  Object.keys(from).forEach(function (k) {
    orig[k] = to[k]
    to[k] = from[k]
  })
  return orig
}
