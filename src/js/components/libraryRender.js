import { refsLibrary, imagesList, libraryNavEl } from './header';
import markUpFilms from './markUpFilms';
import { onCardsSelect } from './card-modal';
import { STORAGE_KEY_WATCHED, STORAGE_KEY_QUEUE } from '../utils/constants';
import Swal from 'sweetalert2';
import {refs} from './hero';
// import {libraryNavEl} from './header';
// import { STORAGE_KEY_QUEUE } from '../utils/constants';

export function renderWatchedLibrary(e) {
  e.preventDefault();
    refsLibrary.watchedBtn.classList.add('library-btn-current');
  emptyWatchedLibNtf (e);
  refsLibrary.queueBtn.classList.remove('library-btn-current');
  const libData = JSON.parse(localStorage.getItem('WatchedLibrary'));
  if (libData===null) {
    return;
  };
  markUpLib(libData);
}

export function renderQueueLibrary(e) {
  e.preventDefault();
  refsLibrary.watchedBtn.classList.remove('library-btn-current');
  refsLibrary.queueBtn.classList.add('library-btn-current');
  emptyQueueLibNtf (e);
  const libData = JSON.parse(localStorage.getItem('QueueLibrary'));
  if (libData===null) {
    return;
  };
  markUpLib(libData);
}

function markUpLib(data) {
  refsLibrary.watchedList.innerHTML = '';
  refsLibrary.watchedList.insertAdjacentHTML('beforeend', markUpFilms(data));
  onCardsSelect();
}
function emptyWatchedLibNtf (e){
  e.preventDefault();
  if(refsLibrary.watchedBtn.classList.contains('library-btn-current') 
  && localStorage.getItem(STORAGE_KEY_WATCHED) === '[]'
  && libraryNavEl.classList.contains('current')){
  refs.emptyLibraryText.classList.remove('visually-hidden');
  }
  else{
refs.emptyLibraryText.classList.add('visually-hidden');
  }
  }
  
  function emptyQueueLibNtf (e){
  e.preventDefault();
  if(refsLibrary.queueBtn.classList.contains('library-btn-current') 
  && localStorage.getItem(STORAGE_KEY_QUEUE) === '[]'
  ){
refs.emptyLibraryText.classList.remove('visually-hidden');
  }
  else{
refs.emptyLibraryText.classList.add('visually-hidden');
  }
  };

