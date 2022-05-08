
const homeNavEl = document.querySelector('.nav__link-home');
const libraryNavEl = document.querySelector('.nav__link-library');
const headerEl = document.querySelector('.header');
const formEl = document.querySelector('.search');


libraryNavEl.addEventListener('click', onLibraryClick);
homeNavEl.addEventListener('click', onHomeClick)

function onLibraryClick(event) {
    homeNavEl.classList.remove('current')
    event.target.classList.add('current')
    libraryNavEl.disabled = true;
    formEl.classList.add('visually-hidden')
    

    headerEl.classList.add('header-library')
};

function onHomeClick(event) {
    libraryNavEl.classList.remove('current');
    event.target.classList.add('current')
    headerEl.classList.remove('header-library');
    formEl.classList.remove('visually-hidden')

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

