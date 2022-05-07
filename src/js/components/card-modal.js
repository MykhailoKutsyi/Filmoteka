import { getMovieById } from '../services/API';
import { API_KEY, URL, IMG_URL } from '../utils/constants';
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
  modalRefs.backdrop.classList.add('is-hidden');
  modalRefs.cardModal.innerHTML = '';
}

export function onCardsSelect() {
  const cards = document.querySelectorAll('.card-item');

  console.log('cards', cards);

  cards.forEach(onEventListnerSet);
}

export function onEventListnerSet(element) {
  element.addEventListener('click', onClick);
}

export function onClick(e) {
  onModalMarkupPrepair(e.currentTarget.id);
  modalRefs.backdrop.classList.remove('is-hidden');
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
  poster_path,
  genres,
  title,
  original_title,
  vote_average,
  vote_count,
  popularity,
  overview,
}) {
  modalRefs.cardModal.insertAdjacentHTML(
    'beforeend',
    `<div class="item-modal__img-box"><img src="${
      IMG_URL + poster_path
    }" alt="Poster of ${title}" class="item-modal__img" /></div>
    <div class="item-modal__desc-box">
      <h3 class="item-modal__title">${title}</h3>
      <ul class="item-modal__txt">
        <li class="item-modal__txt-line">
          <p class="item-modal__txt-prop">Vote/Votes</p>
        <p class="item-modal__txt-prop-value item-modal__txt-prop-value--num">
          <span class="item-modal__txt-prop-value--orange">${vote_average}</span><span class="item-modal__txt-prop-value--slash">/</span><span>${vote_count}</span
        ></p>
      </li>
        <li class="item-modal__txt-line">
          <p class="item-modal__txt-prop">Popularity</p>
        <p class="item-modal__txt-prop-value item-modal__txt-prop-value--num">${popularity}</p>
      </li>
        <li class="item-modal__txt-line">
          <p class="item-modal__txt-prop">Original Title</p>
        <p class="item-modal__txt-prop-value item-modal__txt-prop-value--up">${original_title}</p>
      </li>
        <li class="item-modal__txt-line">
          <p class="item-modal__txt-prop">Genre</p>
        <p class="item-modal__txt-prop-value">${genres}</p>
      </li>
      </ul>

      <h4 class="item-modal__subtitle">About</h4>
      <p class="item-modal__desc">${overview}</p>
      <div class="item-modal__btns">
        <button class="item-modal__btn focused">add to Watched</button>
        <button class="item-modal__btn">add to queue</button>
      </div>
    </div>`,
  );
}
