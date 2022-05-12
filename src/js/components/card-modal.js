import { getMovieById } from '../services/API';
import { API_KEY, URL, IMG_URL } from '../utils/constants';
import { convertIdInGenre, movieGenresModalMarkup } from './genres.js';
import { librarys } from './addLibraryBtn';
// getMovieById(453395).then(d => console.log(d.data));

// Как подключать функцию в файле hero.js
// function markUp(data) {
//   refs.imagesList.insertAdjacentHTML('beforeend', markUpFilms(data.results));
//   onCardsSelect();
// }

export const modalRefs = {
  backdrop: document.querySelector('.item-modal-backdrop'),
  cardModalCloseBtn: document.querySelector('button.item-modal__close-btn'),
  cardModal: document.querySelector('.item-modal__wrapper'),
};

// const backdrop = document.querySelector('.item-modal-backdrop');
// const cardModalCloseBtn = document.querySelector('button.item-modal__close-btn');
// const cardModal = document.querySelector('.item-modal__wrapper');

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
  modalRefs.cardModal.innerHTML = '';
  modalRefs.backdrop.removeEventListener('click', onBackdropClick);
  document.body.removeEventListener('keydown', onEscape);
}

export function onModalMarkupPrepair(filmId) {
  getMovieById(filmId).then(onDataPrepair);
  // getMovieById(453395).then(d => console.log(d.data));
}

export function onDataPrepair(d) {
  const data = d.data;
  onModalMarkup(data);
}

// {adult: false, backdrop_path: '/ndCSoasjIZAMMDIuMxuGnNWu4DU.jpg', belongs_to_collection: {…}, budget: 200000000, genres: Array(3), …}
// adult: false
// backdrop_path: "/ndCSoasjIZAMMDIuMxuGnNWu4DU.jpg"
// belongs_to_collection: {id: 618529, name: 'Doctor Strange Collection', poster_path: '/bm7UlW3ctMJAvD6NNXrCDdRyyKn.jpg', backdrop_path: '/5ZuctJh5uX5L2dz1CjA7WsTJwZk.jpg'}
// budget: 200000000
// genres: (3) [{…}, {…}, {…}]
// homepage: "https://isaimini.pw/movie/doctor-strange-in-the-multiverse-of-madness"
// id: 453395
// imdb_id: "tt9419884"
// original_language: "en"
// original_title: "Doctor Strange in the Multiverse of Madness"
// overview: "Doctor Strange, with the help of mystical allies both old and new, traverses the mind-bending and dangerous alternate realities of the Multiverse to confront a mysterious new adversary."
// popularity: 2653.763
// poster_path: "/wRnbWt44nKjsFPrqSmwYki5vZtF.jpg"
// production_companies: [{…}]
// production_countries: [{…}]
// release_date: "2022-05-04"
// revenue: 27000000
// runtime: 126
// spoken_languages: [{…}]
// status: "Released"
// tagline: "Enter a new dimension of Strange."
// title: "Doctor Strange in the Multiverse of Madness"
// video: false
// vote_average: 7.6
// vote_count: 381
// [[Prototype]]: Object

export function onModalMarkup({
  poster_path: posterPath,
  genres: allGenres,
  title: title,
  original_title: origTitle,
  vote_average: vote,
  vote_count: voteNum,
  popularity: popularity,
  overview: overview,
  id: id,
  release_date: movieDate,
}) {
  let arr = [];
  for (const genre of allGenres) {
    let realGenre = convertIdInGenre(genre.id);
    arr.push(realGenre);
  }


  modalRefs.cardModal.insertAdjacentHTML(
    'beforeend',
    `<div class="item-modal__img-box"><img src="${IMG_URL + posterPath}" onerror="this.src='https://michaelnakache.com/wp-content/uploads/2018/08/movie-poster-coming-soon-2.png';" alt="Poster of ${
      title ? title : ''
    }" class="item-modal__img" /></div>
    <div class="item-modal__desc-box">
      <h3 class="item-modal__title">${title ? title : ''}</h3>
      <ul class="item-modal__txt">
        <li class="item-modal__txt-line">
          <p class="item-modal__txt-prop">Vote/Votes</p>
        <p class="item-modal__txt-prop-value item-modal__txt-prop-value--num">
          <span class="item-modal__txt-prop-value--orange">${
            vote ? vote : ''
          }</span><span class="item-modal__txt-prop-value--slash">/</span><span>${
      voteNum ? voteNum : ''
    }</span
        ></p>
      </li>
        <li class="item-modal__txt-line">
          <p class="item-modal__txt-prop">Popularity</p>
        <p class="item-modal__txt-prop-value item-modal__txt-prop-value--num">${
          popularity ? popularity : ''
        }</p>
      </li>
        <li class="item-modal__txt-line">
          <p class="item-modal__txt-prop">Original Title</p>
        <p class="item-modal__txt-prop-value item-modal__txt-prop-value--up">${
          origTitle ? origTitle : ''
        }</p>
      </li>
        <li class="item-modal__txt-line">
          <p class="item-modal__txt-prop">Genre</p>
        <p class="item-modal__txt-prop-value">${movieGenresModalMarkup(arr)}</p>
      </li>
      </ul>

      <h4 class="item-modal__subtitle">About</h4>
      <p class="item-modal__desc">${overview ? overview : ''}</p>
      <div class="item-modal__btns">
        <button class="item-modal__btn add-watch">add to Watched</button>
        <button class="item-modal__btn add-queue">add to queue</button>
      </div>
    </div>`,
  );
const genresArray = allGenres.flatMap(genre => genre.id);
librarys(
{
  poster_path: posterPath,
  genre_ids: genresArray,
  title: title,
  original_title: origTitle,
  vote_average: vote,
  vote_count: voteNum,
  popularity: popularity,
  overview: overview,
  id: id,
  release_date: movieDate,
  }
);
}