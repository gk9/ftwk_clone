import content from '../../content/content.json';
import Swiper from '../../plugins/swiper.min.js';
import './swiper.min.css';
import './Slider.css';


export const buildCsSlider = (id) => {
  const thisId = id + '_slider';
  const slider = document.getElementById(thisId);
  const sliderWrap = slider.querySelector('.swiper-wrapper');
  const sliderTemplate = sliderWrap.querySelector('.swiper-slide');
  sliderTemplate.parentNode.removeChild(sliderTemplate);
  content[thisId].map((el, index) => {
    let sliderItem = sliderTemplate.cloneNode(true);
    let sliderImage = sliderItem.querySelector('img');
    sliderImage.setAttribute('data-src', '../src/img/case_study/'+ id +'/' + el.image);
    sliderImage.setAttribute('alt', el.alt);
    sliderWrap.appendChild(sliderItem);
  });
  let swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      speed: 600,
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 32,
      loop: true,
      keyboardControl: true,
      preloadImages: false,
      lazyLoading: true,
      lazyLoadingInPrevNext: true,
      lazyLoadingInPrevNextAmount: 3
  });
  sliderWrap.addEventListener('click', (e) => {
    if (e.target.parentElement.classList.contains('swiper-slide-prev')) {
      swiper.slidePrev();
    } else if (e.target.parentElement.classList.contains('swiper-slide-next')) {
      swiper.slideNext();
    }
  });
}

export const buildQuoteSlider = (id) => {
  const thisId = id + '_slider';
  const slider = document.getElementById(thisId);
  const sliderWrap = slider.querySelector('.swiper-wrapper');
  let swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      speed: 600,
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 32,
      loop: true,
      keyboardControl: true,
      autoplay: 5000
  });
  sliderWrap.addEventListener('click', (e) => {
    if (e.target.closest('.swiper-slide-prev')) {
      swiper.slidePrev();
    } else if (e.target.closest('.swiper-slide-next')) {
      swiper.slideNext();
    }
  });
}
