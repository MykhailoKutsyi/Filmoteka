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