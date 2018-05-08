export const buildSpace = (data) => {
  let pageTitle = document.querySelector('#space_h1');
  pageTitle.innerHTML = data.title.rendered;
  let content = data.content.rendered;
  let spaceInfo = document.querySelector('#space_info');
  spaceInfo.innerHTML = content;
  let joinSpaceTitle = data.acf.join_our_space;
  let joinSpace = document.querySelector('#space_join');
  joinSpace.innerHTML = joinSpaceTitle;

  let spaceBgUrl = data.acf.space_background;
  let spaceBg = document.querySelector('#space_bg');
  spaceBg.style.backgroundImage = 'url('+ spaceBgUrl + ')';

  const thisId = 'space_slider';
  const slider = document.getElementById(thisId);
  const sliderWrap = slider.querySelector('.swiper-wrapper');
  const sliderTemplate = sliderWrap.querySelector('.swiper-slide');
  sliderTemplate.parentNode.removeChild(sliderTemplate);
  data.acf.space_photos.map((el, index) => {
    let sliderItem = sliderTemplate.cloneNode(true);
    let sliderImage = sliderItem.querySelector('img');
    sliderImage.setAttribute('data-src', el.space_photo);
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

export const buildHome = (data) => {
  let container = document.querySelector('.claim');
  let content = data.content.rendered;
  container.innerHTML = content;
  let head = container.querySelector('h1');
  head.classList.add('prefade', 'fade');
  let para = container.querySelectorAll('p');
  [].map.call(para, (el, index) => {
    el.classList.add('prefade', 'fade');
  });
}

export const buildTeam = (data) => {

  let pageTitle = document.querySelector('#people_title');
  pageTitle.innerHTML = data.title.rendered;

  let subTitle = document.querySelector('#people_subtitle');
  subTitle.innerHTML = data.acf.people_subtitle;

  let container = document.querySelector('.team_member-wrap');

  data.acf.team_member.map((person, index) => {
    let tm = document.createElement('div');
    tm.classList.add('team_member','tm'+(index+1));
    let tmFace = document.createElement('div');
    tmFace.classList.add('team_member-face');
    let tmFaceImg = document.createElement('img');
    tmFaceImg.src = person.photo;
    let tmOverlay = document.createElement('div');
    tmOverlay.classList.add('team_member-overlay');
    let tmLink = document.createElement('a');
    tmLink.href = person.linkedin;
    tmLink.target = '_blank';
    let tmName = document.createElement('div');
    tmName.classList.add('team_member-name');
    tmName.innerHTML = person.name;
    let tmRole = document.createElement('div');
    tmRole.classList.add('team_member-role');
    tmRole.innerHTML = person.role;

    container.appendChild(tm);
    tm.appendChild(tmFace);
    tmFace.appendChild(tmFaceImg);
    tmFace.appendChild(tmOverlay);
    tmOverlay.appendChild(tmLink);
    tmLink.innerHTML = '<svg><use xlink:href="#ftwkIcons_icon-linkedin"></use></svg>';
    tm.appendChild(tmName);
    tm.appendChild(tmRole);
  });

  let teamBeta = document.querySelector('#team_beta');
  teamBeta.innerHTML = data.acf.team_beta;

  let networkTitle = document.querySelector('#network_title');
  networkTitle.innerHTML = data.acf.network_title;

  let networkLeft = document.querySelector('.cc.network_left');
  networkLeft.innerHTML = data.acf.network_left;

  let networkRight = document.querySelector('.cc.network_right');
  networkRight.innerHTML = data.acf.network_right;

}
