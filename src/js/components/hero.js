import markUpFilms from './markUpFilms';
import { getTrendingMovies } from '../services/API';
import { onCardsSelect } from './card-modal';
import { makePagesMarkup, onPageBtnsSelect, getPageNum } from './on-pagination-trending';
import { showSpinner, hideSpinner } from './spinner';

export const refs = {
  imagesList: document.querySelector('.films-list'),
  emptyLibraryText: document.querySelector('.empty-library-text'),
};

export const container = document.querySelector('.main-container');

container.insertAdjacentHTML(
  'beforeend',
  `<div class="pages-numbers-wrapper">
</div>`,
);

export const pageNumWrapper = document.querySelector('.pages-numbers-wrapper');

export let pageNum = 1;
pushFetch();

export function pushFetch() {
  try {
    showSpinner();
    const response = getTrendingMovies(pageNum);
    sessionStorage.setItem('calculatedPageNum', pageNum);
    return response.then(({ data }) => {
      markUp(data);
      hideSpinner();
    });
  } catch (error) {
    hideSpinner();
    console.log(error);
  }
}

export function markUp(data) {
  refs.imagesList.insertAdjacentHTML('beforeend', markUpFilms(data.results));
  pageNumWrapper.insertAdjacentHTML('beforeend', makePagesMarkup(getPageNum()));
  sessionStorage.setItem('maxPages', data.total_pages);
  onPageBtnsSelect();
  onCardsSelect();
}
