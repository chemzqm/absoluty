var absoluty = require('..')
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
