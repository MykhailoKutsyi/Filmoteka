import markUpFilms from './markUpFilms';
import { getTrendingMovies } from '../services/API';
import { onCardsSelect } from './card-modal';
import { makePagesMarkup, onPageBtnsSelect, getPageNum } from './on-pagination-trending';

export const refs = {
  imagesList: document.querySelector('.films-list'),
};

export const container = document.querySelector('.main-container');

container.insertAdjacentHTML(
  'beforeend',
  `<div class="pages-numbers-wrapper">
</div>`,
);

export const pageNumWrapper = document.querySelector('.pages-numbers-wrapper');

// modalRefs.cardModalCloseBtn.addEventListener('click', onCardModalClose);
export let pageNum = 1;
pushFetch();

export function pushFetch() {
  try {
    const response = getTrendingMovies(pageNum);
    sessionStorage.setItem('calculatedPageNum', pageNum);
    return response.then(({ data }) => {
      console.log('data', data);

      markUp(data);
    });
  } catch (error) {
    console.log(error);
  }
}

// function markUp(data) {
//   markUpFilms(data.results);
// };

export function markUp(data) {
  console.log('markUp', data);
  refs.imagesList.insertAdjacentHTML('beforeend', markUpFilms(data.results));
  pageNumWrapper.insertAdjacentHTML('beforeend', makePagesMarkup(getPageNum()));
  sessionStorage.setItem('maxPages', data.total_pages);
  onPageBtnsSelect();
  onCardsSelect();
}

// let isScrolled = false;

// const infiniteScroll = () => {
//   if (window.scrollY > (document.body.offsetHeight ,1) && !isScrolled) {
// isScrolled = true;
// pageNum +=1;
// pushFetch(pageNum);
// setTimeout(() => {
//   isScrolled = false;

// }, 0);
// }
// }

// window.onscroll = function () { infiniteScroll(); }
// window.onload = () => {
//   getTrendingMovies(pageNum);
// }
