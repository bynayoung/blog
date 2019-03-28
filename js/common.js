document.addEventListener('DOMContentLoaded', function() {
  var header = document.getElementById('header');
  var pageTop = document.getElementById('page-top')
  var barContainer = document.getElementById('bar-container');
  var aside = document.getElementById('aside');
  var asideBackground = document.getElementById('aside-background');
  var footer = document.getElementById('footer');
  var scrollElement = document.documentElement;

  var activeToggle = function() {
    header.classList.toggle('active');
    barContainer.classList.toggle('active');
    aside.classList.toggle('active');
    asideBackground.classList.toggle('active');
  }

  var scrollToggle = function() {
    var throttleFlag = false;
    return function () {
      if (throttleFlag === false) {
        throttleFlag = true
        setTimeout(function() {
          var scrollY = window.scrollY || pageYOffset;
          pageTop.style.opacity = (800 - scrollY) / 800;
          if (scrollY > 400) {
            header.classList.add('scroll');
            barContainer.classList.add('scroll');
          } else {
            header.classList.remove('scroll');
            barContainer.classList.remove('scroll');
          }
          throttleFlag = false
        }, 100);
      }
    }
  }();
  
  var footerToggle = function() {
    var debounceFunc = null;
    return function() {
      if (debounceFunc) {
        clearTimeout(debounceFunc);
      }
      debounceFunc = setTimeout(function() {
        var scrollY = window.scrollY || pageYOffset;
        if (scrollElement.scrollHeight - 30 <= (window.innerHeight + scrollY)) {
          footer.classList.add('active');
        } else {
          footer.classList.remove('active');
        }
      }, 100);
    }
  }();
  
  footerToggle();
  barContainer.addEventListener('click', activeToggle);
  asideBackground.addEventListener('click', activeToggle);
  window.addEventListener('scroll', function() {
    scrollToggle();
    footerToggle();
  });
});