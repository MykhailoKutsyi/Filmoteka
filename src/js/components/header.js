import markUpFilms from './markUpFilms';
import { getSearchMovie } from '../services/API';
import { onCardsSelect } from './card-modal';
import { renderWatchedLibrary, renderQueueLibrary } from './libraryRender';
import { makePagesMarkup, onPageBtnsSelect, getPageNum } from './on-pagination-search';
import { pageNumWrapper, pushFetch } from './hero';
import { showSpinner, hideSpinner } from './spinner';

// header activity

const homeNavEl = document.querySelector('.nav__link-home');
export const libraryNavEl = document.querySelector('.nav__link-library');
const headerEl = document.querySelector('.header');
const searchForm = document.querySelector('.search');
const searchInput = document.querySelector('.search__input');
const libraryButtons = document.querySelector('.header-buttons-library');
const filmsList = document.querySelector('.films-list');
const filtersSection = document.querySelector('.filters')

export const refsLibrary = {
  watchedBtn: document.querySelector('.library-btn_watched'),
  queueBtn: document.querySelector('.library-btn_queue'),
  watchedList: document.querySelector('.films-list-watched'),
  queueList: document.querySelector('.films-list-queue'),
};

libraryNavEl.addEventListener('click', onLibraryClick);
homeNavEl.addEventListener('click', onHomeClick);
refsLibrary.watchedBtn.addEventListener('click', renderWatchedLibrary);
refsLibrary.queueBtn.addEventListener('click', renderQueueLibrary);

function onHomeClick(event) {
  libraryNavEl.classList.remove('current');
  event.target.classList.add('current');
  headerEl.classList.remove('header-library');
  searchForm.classList.remove('visually-hidden');
  libraryButtons.classList.add('visually-hidden');
  filmsList.classList.remove('visually-hidden');
  refsLibrary.queueList.classList.add('visually-hidden');
  refsLibrary.watchedList.classList.add('visually-hidden');
  pageNumWrapper.innerHTML = '';
  filmsList.innerHTML = '';
  refsLibrary.watchedBtn.removeEventListener('click', renderWatchedLibrary);
refsLibrary.queueBtn.removeEventListener('click', renderQueueLibrary);
  pushFetch();
  filtersSection.classList.remove('visually-hidden')

};

function onLibraryClick(event) {
  homeNavEl.classList.remove('current');
  event.target.classList.add('current');
  libraryButtons.classList.remove('visually-hidden');
  filmsList.classList.add('visually-hidden');
  refsLibrary.watchedList.classList.remove('visually-hidden');
  refsLibrary.queueList.classList.remove('visually-hidden');
  searchForm.classList.add('visually-hidden');
  headerEl.classList.add('header-library');
  libraryNavEl.disabled = true;
  pageNumWrapper.innerHTML = '';
  refsLibrary.watchedBtn.addEventListener('click', renderWatchedLibrary);
  refsLibrary.queueBtn.addEventListener('click', renderQueueLibrary);
  renderWatchedLibrary(event);
  filtersSection.classList.add('visually-hidden')
};

libraryButtons.classList.add('visually-hidden');

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
  pushFetchSearch(searchInput.value);
}

function pushFetchSearch(movie) {
  showSpinner();
  sessionStorage.setItem('calculatedPageNum', 1);
  sessionStorage.setItem('movieName', movie);
  pageNumWrapper.innerHTML = '';
  try {
    const response = getSearchMovie(movie);
    return response.then(data => {
      markUp(data.data);
      hideSpinner();
    });
  } catch (error) {
    console.log(error);
    hideSpinner();
  }
}

export function markUp(data) {
  console.log('onSearch', data);
  refs.imagesList.innerHTML = '';
  refs.imagesList.insertAdjacentHTML('beforeend', markUpFilms(data.results));
  pageNumWrapper.insertAdjacentHTML('beforeend', makePagesMarkup(getPageNum()));
  sessionStorage.setItem('maxPages', data.total_pages);
  onPageBtnsSelect();
  onCardsSelect();
}
