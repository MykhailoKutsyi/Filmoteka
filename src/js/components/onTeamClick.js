import markUpTeammate from './markUpTeammate';
import data from '../../data.json';

const refs = {
  teamLink: document.querySelector('.js-open-modal'),
  modal: document.querySelector('.modal'),
  overlay: document.querySelector('.js-overlay-modal'),
  closeModal: document.querySelector('.js-modal-close'),
  teammateList: document.querySelector('.teammate-list'),
};

refs.teamLink.addEventListener('click', function (e) {
  e.preventDefault();
  refs.modal.classList.add('active');
  refs.overlay.classList.add('active');
});

refs.closeModal.addEventListener('click', function (e) {
  refs.modal.classList.remove('active');
  refs.overlay.classList.remove('active');
});

document.body.addEventListener(
  'keyup',
  function (e) {
    const key = e.keyCode;

    if (key == 27) {
      document.querySelector('.modal.active').classList.remove('active');
      document.querySelector('.overlay').classList.remove('active');
    }
  },
  false,
);

refs.overlay.addEventListener('click', function () {
  document.querySelector('.modal.active').classList.remove('active');
  this.classList.remove('active');
});

markUp(data);
function markUp(data) {
  refs.teammateList.insertAdjacentHTML('beforeend', markUpTeammate(data));
}
