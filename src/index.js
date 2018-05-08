import Navigation from './components/Navigation/Navigation.js';
import FtwkLogo from './components/FtwkLogo/FtwkLogo.js';
import Overlays from './components/Overlays/Overlays.js';
import Footer from './components/Footer/Footer.js';
import Icons from './img/ftwkIcons.svg';
import Barba from './plugins/barba.min.js';
import content from './content/content.json';
import LogoWall from './components/LogoWall/LogoWall.js';
import * as Slider from './components/Slider/Slider.js';
import * as TeamMembers from './components/TeamMembers/TeamMembers.js';
import * as StickyMenu from './components/StickyMenu/StickyMenu.js';
import * as Cms from './components/FtwkCms/FtwkCms.js';
import './css/main.css';


if (process.env.NODE_ENV !== 'production') {
  document.querySelector('body').classList.add('dev');
}

window.main = {};
main.body = document.querySelector('body');
main.container = document.querySelector('.main_container');
main.content = document.querySelector('.main_content');
main.topBar = document.querySelector('.top_bar');
main.footer = document.querySelector('.footer');
main.backBtn = document.querySelector('.back-btn');
main.barbaContainer = document.querySelector('.barba-container');
main.entered = false;

main.isTouchDevice = 'ontouchstart' in document.documentElement;
if (main.isTouchDevice) {
  main.body.classList.add('is_touch');
} else {
  main.body.classList.add('no_touch');
}

Barba.Dispatcher.on('transitionCompleted', () => {
  if (process.env.NODE_ENV !== 'production') {
    handleLinks();
  }
  Overlays();
  const contentDivs = document.querySelectorAll('.hasContent');
  [].map.call(contentDivs, (el, index) => {
    let elId = el.getAttribute('id');
    el.innerHTML = content.text[elId];
  });
});

const throttle = (func, limit) => {
  let inThrottle = undefined;
  return function() {
    let args = arguments,
      context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      return setTimeout(function() {
        return inThrottle = false;
      }, limit);
    }
  };
};

const prefade = () => {
  main.prefaders = document.querySelectorAll('.prefade');
  [].map.call(main.prefaders, (el, index) => {
    setTimeout(() => {
      el.classList.remove('fade');
    }, index*200);
  });
}

const handleLinks = () => {
  main.links = document.querySelectorAll('a[dev-link]');
  [].map.call(main.links, (el, index) => {
    let tmp = el.getAttribute('href');
    if (tmp.split('.').pop() == 'html') {
      return;
    }
    el.setAttribute('href', tmp + '.html');
  });
}

const deepLink = () => {
  main.dl = document.querySelectorAll('[data-deepLink]');
  [].map.call(main.dl, (el, index) => {
    el.addEventListener('click', () => {
      let target = el.getAttribute('data-deepLink');
      setTimeout(() => {
          document.querySelector('[data-deepTarget='+target+']').click();
      }, 400);
    });
  });
}

const expander = () => {
  main.exp = document.querySelectorAll('.service_section-title');
  [].map.call(main.exp, (el, index) => {
    el.addEventListener('click', () => {
      if (el.classList.contains('is-active')) {
        el.parentNode.style.height = (el.clientHeight+2) + 'px';
        el.classList.remove('is-active');
      } else {
        let content = el.parentNode.querySelector('.service_content');
        el.parentNode.style.height = (el.clientHeight + content.clientHeight) + 'px';
        el.classList.add('is-active');
      }
    });
  });
}

var Homepage = Barba.BaseView.extend({
  namespace: 'homepage',
  onEnter: function() {
    if (main.cmsData.length > 0) {
      Cms.buildHome(main.cmsData[2]);
    }
    main.body.classList.add('home');
  },
  onEnterCompleted: function() {
    deepLink();
    let delay = 0;
    if (!main.entered) {
      delay = 800;
    }
    setTimeout(() => {
      prefade();
    }, delay);
    main.entered = true;
  }
});

var Workpage = Barba.BaseView.extend({
  namespace: 'workpage',
  onEnter: function() {
    document.querySelector('[data-nav="cases"]').classList.add('is-active');
    content.projects.map((el, index) => {
      require('./img/' + el.image);
    });
  },
  onEnterCompleted: function() {
    prefade();
  }
});

var Peoplepage = Barba.BaseView.extend({
  namespace: 'people',
  onEnter: function() {
    if (main.cmsData.length > 0) {
      Cms.buildTeam(main.cmsData[1]);
    }
    document.querySelector('[data-nav="people"]').classList.add('is-active');
    require('./plugins/lightwidget.js');
  },
  onEnterCompleted: function() {
    prefade();
    // TeamMembers.randomTM(); remove classlist tm from cms if randomizing
  }
});

var Servicespage = Barba.BaseView.extend({
  namespace: 'services',
  onEnter: function() {
    document.querySelector('[data-nav="services"]').classList.add('is-active');
  },
  onEnterCompleted: function() {
    prefade();
    StickyMenu.stickyMenu();
    expander();
  }
});

var CS_boip = Barba.BaseView.extend({
  namespace: 'cs_boip',
  onEnter: function() {
    main.backBtn.classList.add('on');
    Slider.buildCsSlider('boip');
    require('./video/open_innovation.mp4');
    require('./video/open_innovation_poster.jpg');
  },
  onLeave: function() {
    main.backBtn.classList.remove('on');
  }
});

var CS_roche = Barba.BaseView.extend({
  namespace: 'cs_roche',
  onEnter: function() {
    main.backBtn.classList.add('on');
    Slider.buildCsSlider('roche');
    require('./video/design_sprints.mp4');
    require('./video/design_sprints_poster.jpg');
  },
  onLeave: function() {
    main.backBtn.classList.remove('on');
  }
});

var CS_simapp = Barba.BaseView.extend({
  namespace: 'cs_simapp',
  onEnter: function() {
    main.backBtn.classList.add('on');
    Slider.buildQuoteSlider('quotes');
  },
  onLeave: function() {
    main.backBtn.classList.remove('on');
  }
});

var Space = Barba.BaseView.extend({
  namespace: 'space',
  onEnter: function() {
    if (main.cmsData.length > 0) {
      Cms.buildSpace(main.cmsData[0]);
    }
    document.querySelector('[data-nav="space"]').classList.add('is-active');
  },
  onEnterCompleted: function() {
    prefade();
  }
});

var NotFound = Barba.BaseView.extend({
  namespace: 'not_found',
});

var Imprint = Barba.BaseView.extend({
  namespace: 'imprint',
});

const initPages = () => {
  main.body.style.opacity = 1;
  main.barbaContainer.style.opacity = 1;
  Homepage.init();
  Workpage.init();
  Peoplepage.init();
  Servicespage.init();
  CS_boip.init();
  CS_roche.init();
  CS_simapp.init();
  Space.init();
  Barba.Pjax.init();
  Barba.Prefetch.init();

  var lastElementClicked;

  Barba.Dispatcher.on('linkClicked', function(el) {
    lastElementClicked = el;
  });

  var ExpandTransition = Barba.BaseTransition.extend({
    start: function() {
      this.originalThumb = lastElementClicked;
      Promise
        .all([this.newContainerLoading, this.fadeOut()])
        .then(this.showNewPage.bind(this));
    },
    fadeOut: function() {
      var deferred = Barba.Utils.deferred();
      var thumbPosition = this.originalThumb.getBoundingClientRect();
      this.oldContainer.style.opacity = 0;
      setTimeout(() => {
        deferred.resolve();
      }, 300);
      return deferred.promise;
    },
    showNewPage: function() {
      window.scrollTo(0,0);
      this.newContainer.style.visibility = 'visible';
      this.newContainer.style.opacity = 1;
      this.done();
    }
  });

  Barba.Pjax.getTransition = function() {
    var transitionObj = ExpandTransition;
    return transitionObj;
  };
}

// fetch the wordpress content
const dataFtwk = () => {
  fetch('https://wp.ftwk.io/wp-json/wp/v2/pages/')
    .then(r => r.json())
    .then(page => {
      main.cmsData = page;
      initPages();
    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ', error.message);
      main.cmsData = '';
      initPages();
    });
};

dataFtwk();

window.addEventListener('scroll', () => {
  let mainTop = main.body.getBoundingClientRect().top;
  let mainHeight = main.body.getBoundingClientRect().height;
  if (mainTop < -150) {
    main.topBar.classList.add('up');
  } else {
    main.topBar.classList.remove('up');
  }
});
