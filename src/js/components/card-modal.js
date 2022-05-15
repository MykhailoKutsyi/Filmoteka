import { getMovieById } from '../services/API';
import { IMG_URL } from '../utils/constants';
import { convertIdInGenre, movieGenresModalMarkup } from './genres.js';
import { myLibrary } from './addLibraryBtn';
import { showSpinner, hideSpinner } from './spinner';

// let activeLanguage = localStorage.getItem('active-language') ? localStorage.getItem('active-language') : 'en';

let activeLanguage = '';

export const modalRefs = {
  backdrop: document.querySelector('.item-modal-backdrop'),
  cardModalCloseBtn: document.querySelector('button.item-modal__close-btn'),
  cardModal: document.querySelector('.item-modal__wrapper'),
};

modalRefs.cardModalCloseBtn.addEventListener('click', onCardModalClose);

export function onCardModalClose(e) {
  onClose();
}

export function onCardsSelect(activeLang) {
  const cards = document.querySelectorAll('.card-item');
  activeLanguage = activeLang

  console.log(activeLang);
  cards.forEach(onEventListnerSet);
}

console.log(activeLanguage);

function onBackdropClick(e) {
  if (e.target !== e.currentTarget) {
    return;
  }
  onClose();
}

export function onEventListnerSet(element) {
  element.addEventListener('click', onClick);
}

export function onClick(e) {
  showSpinner();
  onModalMarkupPrepair(e.currentTarget.id);
  modalRefs.backdrop.classList.remove('is-hidden');
  modalRefs.backdrop.addEventListener('click', onBackdropClick);
  document.body.addEventListener('keydown', onEscape);
}

function onEscape(e) {
  if (e.keyCode !== 27) {
    return;
  }
  onClose();
}

function onClose() {
  modalRefs.backdrop.classList.add('is-hidden');
  modalRefs.backdrop.removeEventListener('click', onBackdropClick);
  document.body.removeEventListener('keydown', onEscape);
  setTimeout(cleanModal, 300);
}

function cleanModal() {
  modalRefs.cardModal.innerHTML = '';
}

export function onModalMarkupPrepair(filmId) {
  getMovieById(filmId).then(onDataPrepair);
}

export function onDataPrepair(d) {
  const data = d.data;
  onModalMarkup(data);
  hideSpinner();
}

export function onModalMarkup({
  poster_path: posterPath,
  genres: allGenres,
  title,
  original_title: origTitle,
  vote_average: vote,
  vote_count: voteNum,
  popularity,
  overview,
  id,
  release_date: movieDate,
}) {
  let arr = [];
  for (const genre of allGenres) {
    let realGenre = convertIdInGenre(genre.id);
    arr.push(realGenre);
  }

  modalRefs.cardModal.insertAdjacentHTML(
    'beforeend',
    `<div class="item-modal__img-box"><img src="${
      IMG_URL + posterPath
    }" onerror="this.src='https://michaelnakache.com/wp-content/uploads/2018/08/movie-poster-coming-soon-2.png';" alt="Poster of ${
      title ? title : 'Unavailable'
    }" class="item-modal__img" /></div>
    <div class="item-modal__desc-box">
      <h3 class="item-modal__title">${title ? title : 'Unavailable'}</h3>
      <ul class="item-modal__txt">
        <li class="item-modal__txt-line">
          <p class="item-modal__txt-prop">Vote/Votes</p>
        <p class="item-modal__txt-prop-value item-modal__txt-prop-value--num">
          <span class="item-modal__txt-prop-value--orange">${
            vote ? vote : 'Unavailable'
          }</span><span class="item-modal__txt-prop-value--slash">/</span><span>${
      voteNum ? voteNum : 'Unavailable'
    }</span
        ></p>
      </li>
        <li class="item-modal__txt-line">
          <p class="item-modal__txt-prop">Popularity</p>
        <p class="item-modal__txt-prop-value item-modal__txt-prop-value--num">${
          popularity ? popularity : 'Unavailable'
        }</p>
      </li>
        <li class="item-modal__txt-line">
          <p class="item-modal__txt-prop">Original Title</p>
        <p class="item-modal__txt-prop-value item-modal__txt-prop-value--up">${
          origTitle ? origTitle : 'Unavailable'
        }</p>
      </li>
        <li class="item-modal__txt-line">
          <p class="item-modal__txt-prop">Genre</p>
        <p class="item-modal__txt-prop-value">${movieGenresModalMarkup(arr)}</p>
      </li>
      </ul>

      <h4 class="item-modal__subtitle">About</h4>
      <p class="item-modal__desc">${overview ? overview : 'Unavailable'}</p>
      <div class="item-modal__btns">
        <button class="item-modal__btn add-watch">add to Watched</button>
        <button class="item-modal__btn add-queue">add to queue</button>
      </div>
    </div>`,
  );

  const genresArray = allGenres.flatMap(genre => genre.id);
  myLibrary({
    poster_path: posterPath,
    genre_ids: genresArray,
    title,
    original_title: origTitle,
    vote_average: vote,
    vote_count: voteNum,
    popularity: popularity,
    overview,
    id,
    release_date: movieDate,
  });
}
