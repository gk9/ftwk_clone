import './Overlays.css';

const Overlays = () => {
  let overlay = {};

  overlay.body = document.querySelector('body');
  overlay.wrap = document.querySelector('.overlay');
  overlay.open = document.querySelectorAll('.overlay-open');
  overlay.close = document.querySelectorAll('.overlay-close');
  [].map.call(overlay.open, (el, index) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.body.classList.add('paused');
      overlay.wrap.classList.add('on');
      overlay.name = el.getAttribute('data-overlay');
      if (overlay.content) {
        overlay.content.classList.remove('on');
      }
      overlay.content = document.getElementById(overlay.name);
      overlay.content.classList.add('on');
      overlay.active = true;
    });
  });
  [].map.call(overlay.close, (el, index) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      if (overlay.active) {
        overlay.body.classList.remove('paused');
        overlay.wrap.classList.remove('on');
        overlay.content.classList.remove('on');
        overlay.active = false;
      }
    });
  });

}

export default Overlays;
