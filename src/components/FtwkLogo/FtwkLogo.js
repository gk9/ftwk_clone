import './FtwkLogo.css';
import anime from '../../plugins/anime.min.js';
import * as Navigation from '../Navigation/Navigation.js';

window.logo = {};
logo.logo = document.querySelector('#ftwk_logo');
logo.shape0 = void 0;
logo.shape1 = void 0;
logo.shape2 = void 0;
logo.shape3 = void 0;
logo.logoShapes = [logo.shape0 = anime({
	targets: document.getElementById("p1"),
	d: "M 35,49 1,38 1,68 35,58 Z",
	duration: 5000,
	loop: true,
	easing: 'easeInOutQuint'
}), logo.shape1 = anime({
	targets: document.getElementById("p2"),
	d: "M 35,49 99,29 99,58 35,58 Z",
	duration: 5000,
	loop: true,
	easing: 'easeInOutQuint'
}), logo.shape2 = anime({
	targets: document.getElementById("p3"),
	d: "M 99,29 63,12 63,88 99,58 Z",
	duration: 5000,
	loop: true,
	easing: 'easeInOutQuint'
}), logo.shape3 = anime({
	targets: document.getElementById("p4"),
	d: "M 63,12 1,38 1,68 63,88 Z",
	duration: 5000,
	loop: true,
	easing: 'easeInOutQuint'
})];

logo.logoPause = function () {
	logo.logoShapes.forEach(function (element) {
		element.pause();
	});
};
logo.logoPlay = function () {
	logo.logoShapes.forEach(function (element) {
		element.play();
	});
};
logo.logo.addEventListener('click', () => {
	let el = document.querySelector('.main-menu a.is-active');
	if (el) {
		el.classList.remove('is-active');
	}
	Navigation.skateOff();
});

// window.addEventListener('resize', () => {
	// if (process.env.NODE_ENV !== 'production') {
	// 	logo.logoPause();
	// }
// });
