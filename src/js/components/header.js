import markUpFilms from './markUpFilms';
import { getSearchMovie } from '../services/API';
import { onCardsSelect } from './card-modal';

// header activity

const homeNavEl = document.querySelector('.nav__link-home');
const libraryNavEl = document.querySelector('.nav__link-library');
const headerEl = document.querySelector('.header');
const searchForm = document.querySelector('.search');
const searchInput = document.querySelector('.search__input');
const libraryButtons = document.querySelector('.header-buttons-library');
const filmsList = document.querySelector('.films-list');


libraryNavEl.addEventListener('click', onLibraryClick);
homeNavEl.addEventListener('click', onHomeClick)


function onLibraryClick(event) {
    homeNavEl.classList.remove('current')
    event.target.classList.add('current')
    libraryNavEl.disabled = true;
    searchForm.classList.add('visually-hidden')
    libraryButtons.classList.remove('visually-hidden')
    filmsList.classList.add('visually-hidden')
    headerEl.classList.remove('header-home')
    headerEl.classList.add('header-library')
};

function onHomeClick(event) {
  libraryButtons.classList.add('visually-hidden')
    libraryNavEl.classList.remove('current');
    event.target.classList.add('current')
    headerEl.classList.remove('header-library');
    searchForm.classList.remove('visually-hidden')
    filmsList.classList.remove('visually-hidden')
    headerEl.classList.add('header-home')
}

  libraryButtons.classList.add('visually-hidden')
// search by word
searchForm.addEventListener('submit', onSubmitForm);

const refs = {
  imagesList: document.querySelector('.films-list'),
};

function onSubmitForm(e) {
  e.preventDefault();
  if (!searchInput.value) {
    return;
  }

  pushFetch(searchInput.value);
  console.log(searchInput.value);
  
}

function pushFetch(movie) {
  try {
    const response = getSearchMovie(movie);
    return response.then(data => {
      markUp(data.data);
    });
  } catch (error) {
    console.log(error);
  }
}

function markUp(data) {
  refs.imagesList.innerHTML= '';
  refs.imagesList.insertAdjacentHTML('beforeend', markUpFilms(data.results));
  onCardsSelect();
}

