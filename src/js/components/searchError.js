export { showErrorSearch,removeErrorSearch};

const error = document.querySelector('js_search-error');

function showErrorSearch() {
    error.classList.add('visually-hidden');
}

function removeErrorSearch() {
    error.classList.remove('visually-hidden');
}