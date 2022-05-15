import { getMovieById } from '../services/API';
import { API_KEY, URL } from '../utils/constants';
import { convertIdInGenre, movieGenresModalMarkup } from './genres.js';
import { myLibrary } from './addLibraryBtn';
import { showSpinner, hideSpinner } from './spinner';
import { IMG_URL } from '../utils/constants';
import { activeLang } from '../components/translate';
import { axios } from '../services/API';

export const modalRefs = {
  backdrop: document.querySelector('.item-modal-backdrop'),
  cardModalCloseBtn: document.querySelector('button.item-modal__close-btn'),
  cardModal: document.querySelector('.item-modal__wrapper'),
};

modalRefs.cardModalCloseBtn.addEventListener('click', onCardModalClose);

export function onCardModalClose(e) {
  onClose();
}

export function onCardsSelect() {
  const cards = document.querySelectorAll('.card-item');

  cards.forEach(onEventListnerSet);
}

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
  (activeLang !== 'uk') && axios.get(`${URL}movie/${filmId}?api_key=${API_KEY}&language=uk`).then(({ data }) => { localStorage.setItem('movie-ua', `${JSON.stringify(data)}`) });
  (activeLang !== 'en') && axios.get(`${URL}movie/${filmId}?api_key=${API_KEY}&language=en`).then(({ data }) => { localStorage.setItem('movie-en', `${JSON.stringify(data)}`) });
  (activeLang !== 'pl') && axios.get(`${URL}movie/${filmId}?api_key=${API_KEY}&language=pl`).then(({ data }) => { localStorage.setItem('movie-pl', `${JSON.stringify(data)}`) });
}

export function onDataPrepair(d) {
  const activeLanguage = localStorage.getItem('active-language') ? localStorage.getItem('active-language') : 'en';
  const data = d.data;
  onModalMarkup(JSON.parse(localStorage.getItem(`movie-${activeLanguage}`)));
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

  const indexLang = ['en', 'ua', 'pl'].indexOf(localStorage.getItem('active-language') ? localStorage.getItem('active-language') : 'en');
  const textContents = {
    vote: ['Vote/Votes', 'Голосування/Голоси', 'Głosowanie/Głosy'],
    popularity: ['Popularity', 'Популярність', 'Popularność'],
    originalTitle: ['Original Title', 'Оригінальна назва', 'Tytuł oryginalny'],
    genre: ['Genre', 'Жанр', 'Gatunek filmowy'],
    about: ['About', 'Про фільм', 'O filmie'],
    addToWatched: ['add to Watched', 'додати до Див', 'dodaj do obserwowanych'],
  };

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
          <p class="item-modal__txt-prop">${textContents.vote[indexLang]}</p>
        <p class="item-modal__txt-prop-value item-modal__txt-prop-value--num">
          <span class="item-modal__txt-prop-value--orange">${
            vote ? vote : 'Unavailable'
          }</span><span class="item-modal__txt-prop-value--slash">/</span><span>${
      voteNum ? voteNum : 'Unavailable'
    }</span
        ></p>
      </li>
        <li class="item-modal__txt-line">
          <p class="item-modal__txt-prop">${textContents.popularity[indexLang]}</p>
        <p class="item-modal__txt-prop-value item-modal__txt-prop-value--num">${
          popularity ? popularity : 'Unavailable'
        }</p>
      </li>
        <li class="item-modal__txt-line">
          <p class="item-modal__txt-prop">${textContents.originalTitle[indexLang]}</p>
        <p class="item-modal__txt-prop-value item-modal__txt-prop-value--up">${
          origTitle ? origTitle : 'Unavailable'
        }</p>
      </li>
        <li class="item-modal__txt-line">
          <p class="item-modal__txt-prop">${textContents.genre[indexLang]}</p>
        <p class="item-modal__txt-prop-value">${movieGenresModalMarkup(arr)}</p>
      </li>
      </ul>

      <h4 class="item-modal__subtitle">${textContents.about[indexLang]}</h4>
      <p class="item-modal__desc">${overview ? overview : 'Unavailable'}</p>
      <div class="item-modal__btns">
        <button class="item-modal__btn add-watch">${textContents.addToWatched[indexLang]}</button>
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
