import markUpTeammate from './markUpTeammate';
import data from '../../data.json';

const refs = {
  teamLink: document.querySelector('.js-open-modal'),
  modal: document.querySelector('.modal'),
  overlay: document.querySelector('.js-overlay-modal'),
  closeModal: document.querySelector('.js-modal-close'),
  teammateList: document.querySelector('.teammate-list'),
};

function openModal() {
  refs.modal.classList.add('active');
  refs.overlay.classList.add('active');
  document.body.addEventListener('keydown', onEscPress);
  markUpModal(data);
}

function closeModal() {
  refs.modal.classList.remove('active');
  refs.overlay.classList.remove('active');
  document.body.removeEventListener('keydown', onEscPress);
  setTimeout(cleanTeam, 300);
}

function cleanTeam() {
  refs.teammateList.innerHTML = '';
}

function onEscPress(e) {
  const key = e.keyCode;
  if (key == 27) {
    closeModal();
  }
}

refs.teamLink.addEventListener('click', function (e) {
  e.preventDefault();
  openModal();
});

refs.closeModal.addEventListener('click', function (e) {
  closeModal();
});

refs.overlay.addEventListener('click', function () {
  closeModal();
});

function markUpModal(data) {
  refs.teammateList.insertAdjacentHTML('beforeend', markUpTeammate(data));
}
