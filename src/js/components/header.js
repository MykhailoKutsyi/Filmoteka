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

