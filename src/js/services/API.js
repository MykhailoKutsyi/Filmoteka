import { API_KEY, URL } from '../utils/constants';

const axios = require('axios');

export const getTrendingMovies = () => {
  const url = `${URL}trending/movie/day?api_key=${API_KEY}`;
  const response = axios.get(url);
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

export const getGenres = () => {
  const url = `${URL}genre/movie/list?api_key=${API_KEY}&language=en-US`;
  const response = axios.get(url);
  return response;
};