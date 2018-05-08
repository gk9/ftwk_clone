import './StickyMenu.css';
import smoothScroll from '../../plugins/smoothscroll.min.js'

window.sm = {};

export const stickyMenu = () => {

  sm.stickyWrap = document.querySelector('.sticky_wrap');
  sm.sideMenu = document.querySelector('.service_menu');
  sm.serviceContainer = document.querySelector('.service_container');
  sm.serviceSections = document.querySelectorAll('.service_section ');
  sm.menuItems = document.querySelectorAll('.service_item');
  sm.stickyWrap.style.height = sm.sideMenu.clientHeight + 'px';
  sm.winHeight = window.innerHeight;
  let glue = false;
  let refBase = '';

  sm.scrollSectionsArr = [];
  sm.serviceSections.forEach((el, i) => {
    sm.scrollSectionsArr[i] = {
      elem: el,
      offset: el.getBoundingClientRect().top,
      height: el.getBoundingClientRect().height
    }
  });

  window.addEventListener('scroll', () => {
    // handle sticky menu
    let stickyOffset = sm.stickyWrap.getBoundingClientRect().top;
    if (stickyOffset < 250) {
      sm.stickyWrap.classList.add('stuck');
    } else {
      if (!glue) {
        sm.stickyWrap.classList.remove('stuck');
      }
    }
    let sideMenuRect = sm.sideMenu.getBoundingClientRect();
    let serviceRect = sm.serviceContainer.getBoundingClientRect();
    if (serviceRect.bottom <= sideMenuRect.bottom && !glue) {
      glue = true;
      sm.stickyWrap.classList.add('bottom');
      refBase = sideMenuRect.bottom;
    } else if (glue && serviceRect.bottom > refBase) {
      glue = false;
      sm.stickyWrap.classList.remove('bottom');
    }

    // hightlight sticky menu Navigation
    let scrollPos = window.scrollY;
    sm.scrollSectionsArr.map((el, index) => {
      if (scrollPos > (el.offset - sm.winHeight/2)) {
        sm.menuItems.forEach((elem) => {
          elem.classList.remove('is-active');
        });
        sm.menuItems[index].classList.add('is-active');
      }
    });

  });

  [].map.call(sm.menuItems, (el, index) => {
    el.addEventListener('click', () => {
      sm.menuItems.forEach((elem) => {
        sm.menuItems.forEach((elem) => {
          elem.classList.remove('is-active');
        });
      });
      el.classList.add('is-active');
      window.scroll({ top: sm.scrollSectionsArr[index].offset - 270, left: 0, behavior: 'smooth' });
    });
  });

}


// todo
// window.addEventListener('resize', () => {
//   let menuCheck = document.querySelector('[data-namespace="services"]')
//   if (menuCheck) {
//     stickyMenu();
//   }
// });
