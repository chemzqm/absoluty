/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var absoluty = __webpack_require__(1)
	var el = document.getElementById('demo')
	var restore
	el.addEventListener('click', function () {
	  if (restore) {
	    restore(el)
	    restore = null
	    el.classList.remove('active')
	  } else {
	    restore = absoluty(el)
	    el.classList.add('active')
	  }
	}, false)


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var detect = __webpack_require__(2)
	var transition = detect.transition
	var styles = __webpack_require__(8)
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
	  if (el.style.position == 'absolute') throw new Error('element should not absolute positioned')
	  var pel = getRelativeElement(el)
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports.transition = __webpack_require__(3)
	
	exports.transform = __webpack_require__(4)
	
	exports.touchAction = __webpack_require__(5)
	
	exports.transitionend = __webpack_require__(6)
	
	exports.has3d = __webpack_require__(7)


/***/ },
/* 3 */
/***/ function(module, exports) {

	var styles = [
	  'webkitTransition',
	  'MozTransition',
	  'OTransition',
	  'msTransition',
	  'transition'
	]
	
	var el = document.createElement('p')
	var style
	
	for (var i = 0; i < styles.length; i++) {
	  if (null != el.style[styles[i]]) {
	    style = styles[i]
	    break
	  }
	}
	el = null
	
	module.exports = style


/***/ },
/* 4 */
/***/ function(module, exports) {

	
	var styles = [
	  'webkitTransform',
	  'MozTransform',
	  'msTransform',
	  'OTransform',
	  'transform'
	];
	
	var el = document.createElement('p');
	var style;
	
	for (var i = 0; i < styles.length; i++) {
	  style = styles[i];
	  if (null != el.style[style]) {
	    module.exports = style;
	    break;
	  }
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	
	/**
	 * Module exports.
	 */
	
	module.exports = touchActionProperty();
	
	/**
	 * Returns "touchAction", "msTouchAction", or null.
	 */
	
	function touchActionProperty(doc) {
	  if (!doc) doc = document;
	  var div = doc.createElement('div');
	  var prop = null;
	  if ('touchAction' in div.style) prop = 'touchAction';
	  else if ('msTouchAction' in div.style) prop = 'msTouchAction';
	  div = null;
	  return prop;
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Transition-end mapping
	 */
	
	var map = {
	  'WebkitTransition' : 'webkitTransitionEnd',
	  'MozTransition' : 'transitionend',
	  'OTransition' : 'oTransitionEnd',
	  'msTransition' : 'MSTransitionEnd',
	  'transition' : 'transitionend'
	};
	
	/**
	 * Expose `transitionend`
	 */
	
	var el = document.createElement('p');
	
	for (var transition in map) {
	  if (null != el.style[transition]) {
	    module.exports = map[transition];
	    break;
	  }
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	
	var prop = __webpack_require__(4);
	
	// IE <=8 doesn't have `getComputedStyle`
	if (!prop || !window.getComputedStyle) {
	  module.exports = false;
	
	} else {
	  var map = {
	    webkitTransform: '-webkit-transform',
	    OTransform: '-o-transform',
	    msTransform: '-ms-transform',
	    MozTransform: '-moz-transform',
	    transform: 'transform'
	  };
	
	  // from: https://gist.github.com/lorenzopolidori/3794226
	  var el = document.createElement('div');
	  el.style[prop] = 'translate3d(1px,1px,1px)';
	  document.body.insertBefore(el, null);
	  var val = getComputedStyle(el).getPropertyValue(map[prop]);
	  document.body.removeChild(el);
	  module.exports = null != val && val.length && 'none' != val;
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	// DEV: We don't use var but favor parameters since these play nicer with minification
	function computedStyle(el, prop, getComputedStyle, style) {
	  getComputedStyle = window.getComputedStyle;
	  style =
	      // If we have getComputedStyle
	      getComputedStyle ?
	        // Query it
	        // TODO: From CSS-Query notes, we might need (node, null) for FF
	        getComputedStyle(el) :
	
	      // Otherwise, we are in IE and use currentStyle
	        el.currentStyle;
	  if (style) {
	    return style
	    [
	      // Switch to camelCase for CSSOM
	      // DEV: Grabbed from jQuery
	      // https://github.com/jquery/jquery/blob/1.9-stable/src/css.js#L191-L194
	      // https://github.com/jquery/jquery/blob/1.9-stable/src/core.js#L593-L597
	      prop.replace(/-(\w)/gi, function (word, letter) {
	        return letter.toUpperCase();
	      })
	    ];
	  }
	}
	
	module.exports = computedStyle;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map