import { axios } from '../services/API';
import { API_KEY, URL } from '../utils/constants';

import { refs, markUp, pageNumWrapper } from './hero';

const getTrendingMoviesPage = page => {
  const url = `${URL}trending/movie/day?api_key=${API_KEY}&page=${page}`;
  const response = axios.get(url);
  return response;
};

export function getPageNum() {
  return Number(sessionStorage['calculatedPageNum']);
}

export function makePagesMarkup(num) {
  return `<div class="buttons-container">
  <button type="button" class="btn-num start"><<</button
  ><button type="button" class="btn-num minus">-</button>
  <div class="page-number-box">
    <span class="page-number--fixed">${num}</span>
  </div>
  <button type="button" class="btn-num plus">+</button
  ><button type="button" class="btn-num end">>></button>
</div>`;
}

export function onPageBtnsSelect() {
  const minusBtn = document.querySelector('button.minus');
  const plusBtn = document.querySelector('button.plus');
  const startBtn = document.querySelector('button.start');
  const endBtn = document.querySelector('button.end');

  startBtn.addEventListener('click', onStartBtn);
  endBtn.addEventListener('click', onEndBtn);
  minusBtn.addEventListener('click', onMinusBtn);
  plusBtn.addEventListener('click', onPlusBtn);

  if (getPageNum() === 1) {
    minusBtn.setAttribute('disabled', 'disabled');
    startBtn.setAttribute('disabled', 'disabled');
  }

  if (getPageNum() === Number(sessionStorage['maxPages'])) {
    plusBtn.setAttribute('disabled', 'disabled');
    endBtn.setAttribute('disabled', 'disabled');
  }
}

function onMarkupClean() {
  refs.imagesList.innerHTML = '';
  pageNumWrapper.innerHTML = '';
}

function onStartBtn() {
  sessionStorage.setItem('calculatedPageNum', 1);
  onMarkupClean();
  getTrendingMoviesPage(sessionStorage['calculatedPageNum']).then(data => {
    markUp(data.data);
  });
}

function onEndBtn() {
  sessionStorage.setItem('calculatedPageNum', sessionStorage['maxPages']);
  onMarkupClean();
  getTrendingMoviesPage(sessionStorage['calculatedPageNum']).then(data => {
    markUp(data.data);
  });
}

function onMinusBtn() {
  sessionStorage.setItem('calculatedPageNum', getPageNum() - 1);
  onMarkupClean();
  getTrendingMoviesPage(sessionStorage['calculatedPageNum']).then(data => {
    markUp(data.data);
  });
}

function onPlusBtn() {
  sessionStorage.setItem('calculatedPageNum', getPageNum() + 1);
  onMarkupClean();
  getTrendingMoviesPage(sessionStorage['calculatedPageNum']).then(data => {
    markUp(data.data);
  });
}
