// header activity

const homeNavEl = document.querySelector('.nav__link-home');
const libraryNavEl = document.querySelector('.nav__link-library');
const headerEl = document.querySelector('.header');
const searchForm = document.querySelector('.search');
const searchnput = document.querySelector('.search__input')


libraryNavEl.addEventListener('click', onLibraryClick);
homeNavEl.addEventListener('click', onHomeClick)




function onLibraryClick(event) {
    homeNavEl.classList.remove('current')
    event.target.classList.add('current')
    libraryNavEl.disabled = true;
   searchForm.classList.add('visually-hidden')
    

    headerEl.classList.add('header-library')
};

function onHomeClick(event) {
    libraryNavEl.classList.remove('current');
    event.target.classList.add('current')
    headerEl.classList.remove('header-library');
   searchForm.classList.remove('visually-hidden')

}

const myLibraryBtn = document.querySelector('.open-my-library-btn')
const homeBtn = document.querySelector('.open-home-btn')
const headerSearchForm = document.querySelector('.search')
const libraryButtons = document.querySelector('.header-buttons-library')
const filmsList = document.querySelector('.films-list')
const header = document.querySelector('.header')

homeBtn.addEventListener('click', changeCurrentPageOnHome)
myLibraryBtn.addEventListener('click', changeCurrentPageOnLibrary)

libraryButtons.classList.add('visually-hidden')

function changeCurrentPageOnLibrary() {
    myLibraryBtn.classList.add('current')
    homeBtn.classList.remove('current')
    headerSearchForm.classList.add('visually-hidden')
    libraryButtons.classList.remove('visually-hidden')
    filmsList.classList.add('visually-hidden')
    header.classList.remove('header-home')
    header.classList.add('header-library')

}

function changeCurrentPageOnHome() {
    myLibraryBtn.classList.remove('current')
    homeBtn.classList.add('current')
    headerSearchForm.classList.remove('visually-hidden')
    libraryButtons.classList.add('visually-hidden')
    filmsList.classList.remove('visually-hidden')
    header.classList.add('header-home')
    header.classList.remove('header-library')
}



// search by word
import markUpFilms from './markUpFilms';
import { getSearchMovie } from '../services/API';
import { onCardsSelect } from './card-modal';

searchForm.addEventListener('submit', onSubmitForm);

const refs = {
  imagesList: document.querySelector('.films-list'),
};

function onSubmitForm(e) {
  e.preventDefault();
  if (!searchnput.value ) {
    return;
  }
  pushFetch(searchnput.value);
  
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

