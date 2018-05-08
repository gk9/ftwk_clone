import './Navigation.css';

let nav = {};
nav.menu = document.querySelector('.main-menu');
nav.items = nav.menu.querySelectorAll('a');
nav.skater = nav.menu.querySelector('.skater');

const skate = (el) => {
	let elWidth = el.offsetWidth;
	let elLeft = el.offsetLeft;
	nav.skater.style.width = elWidth + 'px';
	nav.skater.style.transform = 'translateX(' + elLeft + 'px)';
}
const skateOn = () => {
	nav.skater.style.opacity = 1;
}
export const skateOff = () => {
	nav.skater.style.opacity = 0;
}


[].map.call(nav.items, (el, index) => {
	el.addEventListener('click', () => {
		if (el.getAttribute('href') === '#' || el.classList.contains('back-btn')) { return };
		Array.prototype.filter.call(nav.items, (item) => {
			item.classList.remove('is-active');
		})
		el.classList.add('is-active');
		if(main.isTouchDevice) {
			skate(el);
		}
	});

	el.addEventListener('mouseenter', () => {
		if (main.isTouchDevice || el.classList.contains('back-btn')) { return }
		skateOn();
		skate(el);
	});
	el.addEventListener('mouseleave', () => {
		if (main.isTouchDevice) { return }
		nav.active = nav.menu.querySelector('.is-active');
		if (nav.active) {
			skate(nav.active);
		} else {
			skateOff();
		}
	});


});

document.addEventListener("DOMContentLoaded", () => {
	nav.active = nav.menu.querySelector('.is-active');
	if(nav.active) {
		skateOn();
		skate(nav.active);
	}
});

document.querySelector('.overlay-close').addEventListener('click', () => {
	nav.active = nav.menu.querySelector('.is-active');
	if (nav.active) {
		skate(nav.active);
	} else {
		skateOff();
	}
});

// prevent page reload
var links = document.querySelectorAll('a[href]');
var cbk = function(e) {
 if(e.currentTarget.href === window.location.href) {
   e.preventDefault();
   e.stopPropagation();
 }
};
for(var i = 0; i < links.length; i++) {
  links[i].addEventListener('click', cbk);
}
