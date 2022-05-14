import { API_KEY, URL } from '../utils/constants';
import {activeLanguage} from '../components/translate'
export const axios = require('axios');

export const getTrendingMovies = page => {
  const url = `${URL}trending/movie/day?api_key=${API_KEY}&page=${page}&language=${activeLanguage}`;
  const response = axios.get(url);
  return response;
};

export const getWeekTrendingMovies = () => {
  const url = `${URL}trending/movie/week?api_key=${API_KEY}&language=${activeLanguage}`;
  const response = axios.get(url);
  return response;
};

export const getMovieById = movieId => {
  const url = `${URL}movie/${movieId}?api_key=${API_KEY}&language=${activeLanguage}`;
  const response = axios.get(url);
  return response;
};

export const getSearchMovie = (movie, page) => {
  const url = `${URL}search/movie?api_key=${API_KEY}&query=${movie}&page=${page}&language=${activeLanguage}`;
  const response = axios.get(url);
  return response;
};

export const getGenres = () => {
  const url = `${URL}genre/movie/list?api_key=${API_KEY}&language=${activeLanguage}`;
  const response = axios.get(url);
  return response;
};

export function getVideos(movieId) {
  const url = `${URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=${activeLanguage}`;
  const response = axios.get(url);
  return response;
}