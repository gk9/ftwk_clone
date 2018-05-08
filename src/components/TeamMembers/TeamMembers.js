import './TeamMembers.css';

window.tm = {};

export const randomTM = () => {
  tm.items = document.querySelectorAll('.team_member');

  tm.itemsArr = [...tm.items]
  tm.itemsNewOrder = shuffle(tm.itemsArr);
  tm.itemsNewOrder.map((el, index) => {
    el.style.order = index;
    el.classList.add('tm'+(index+1));
  });
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
