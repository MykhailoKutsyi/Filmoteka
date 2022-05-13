import Glide from '@glidejs/glide';
import { API_KEY, URL } from '../utils/constants';
import filmsCardSliderTpl from './card-films-slider.hbs';
import trailer from './trailers.js';
const sliderContainer = document.querySelector('.js-slider-container');
renderTrendy();

const glide = new Glide('.glide', {
  type: 'slider',
  startAt: 0,
  perView: 8,
  autoplay: 3000,
  hoverpause: true,
  bound: true,
});

glide.mount();

function renderTrendy() {
  const url = `${URL}trending/all/week?api_key=${API_KEY}`;
  return fetch(url)
  
    .then(response => response.json())
    .then(({ results }) => {
      return results;
    })
    .then(renderSliderFilms)
    .catch(err => {
      sliderContainer.innerHTML = `<img class="catch-error-pagination" src="${errorUrl}" />`;
    });
}

function renderSliderFilms(articles) {
  sliderContainer.innerHTML = filmsCardSliderTpl(articles);
  trailer.createTrailerLink(document.querySelectorAll('.btn-youtube-slider'));
}
