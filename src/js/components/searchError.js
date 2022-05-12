export { removeErrorSearch,showErrorSearch};

const error = document.querySelector('.js_search-error');

function removeErrorSearch() {
    error.classList.add('visually-hidden');
}

function showErrorSearch() {
    error.classList.remove('visually-hidden');
}