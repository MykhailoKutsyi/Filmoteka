import { API_KEY, URL } from '../utils/constants';

const axios = require('axios');

export const getTrendingMovies = () => {
  document.querySelector(".button-submit").disabled = true;
  document.querySelector(".submit-spinner").classList.remove('submit-spinner_hide');
  const url = `${URL}trending/movie/day?api_key=${API_KEY}`;
  const response = axios.get(url);
  document.querySelector(".button-submit").disabled = false;
  document.querySelector(".submit-spinner").classList.add('submit-spinner_hide');
  return response; 
};

export const getMovieById = movieId => {
  const url = `${URL}movie/${movieId}?api_key=${API_KEY}`;
  const response = axios.get(url);
  return response;
};

export const getSearchMovie = movie => {
  const url = `${URL}search/movie?api_key=${API_KEY}&query=${movie}`;
  const response = axios.get(url);
  return response;
};
