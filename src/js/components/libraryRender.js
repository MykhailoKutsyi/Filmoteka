import { refsLibrary } from './header';
import { convertIdInGenre, movieGenresManipulationsMarkup } from './genres.js';
import { IMG_URL } from '../utils/constants';
import markUpFilms from './markUpFilms';
import { onCardsSelect } from './card-modal';

export function renderWatchedLibrary(e) {
  e.preventDefault();
  refsLibrary.watchedBtn.classList.add('library-btn-current');
  refsLibrary.queueBtn.classList.remove('library-btn-current');
  const libData = JSON.parse(localStorage.getItem('WatchedLibrary'));
  markUpLib(libData);
  refsLibrary.filtersWrapper.style.display = 'none';
}

export function renderQueueLibrary(e) {
  e.preventDefault();
  refsLibrary.watchedBtn.classList.remove('library-btn-current');
  refsLibrary.queueBtn.classList.add('library-btn-current');
  const libData = JSON.parse(localStorage.getItem('QueueLibrary'));
  markUpLib(libData);
  refsLibrary.filtersWrapper.style.display = 'none';
}

function markUpLib(data) {
  refsLibrary.watchedList.innerHTML = '';
  refsLibrary.watchedList.insertAdjacentHTML('beforeend', markUpFilms(data));
  onCardsSelect();
}
