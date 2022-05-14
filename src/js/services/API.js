import { API_KEY, URL } from '../utils/constants';

let lang = localStorage.getItem('active-language') ? localStorage.getItem('active-language') : 'en';
(lang === 'ua') && (lang = 'uk')

export const axios = require('axios');

export const getTrendingMovies = () => {
  const url = `${URL}trending/movie/day?api_key=${API_KEY}&language=${lang}`;
  const response = axios.get(url);
  return response;
};

export const getMovieById = movieId => {
  const url = `${URL}movie/${movieId}?api_key=${API_KEY}&language=${lang}`;
  const response = axios.get(url);
  return response;
};

export const getSearchMovie = movie => {
  const url = `${URL}search/movie?api_key=${API_KEY}&query=${movie}&language=${lang}`;
  const response = axios.get(url);
  return response;
};

export const getGenres = () => {
  const url = `${URL}genre/movie/list?api_key=${API_KEY}&language=${lang}`;
  const response = axios.get(url);
  return response;
};

export const getTrendingMoviesPage = page => {
  const url = `${URL}trending/movie/day?api_key=${API_KEY}&page=${page}&language=${lang}`;
  const response = axios.get(url);
  return response;
};

export function getSearchMoviePage(movie, page) {
  const url = `${URL}search/movie?api_key=${API_KEY}&query=${movie}&page=${page}&language=${lang}`;
  const response = axios.get(url);
  return response;
}
