import { refsLibrary } from './header';
import markUpFilms from './markUpFilms';
import { onCardsSelect } from './card-modal';
import { STORAGE_KEY_WATCHED, STORAGE_KEY_QUEUE } from '../utils/constants';
import Swal from 'sweetalert2';
// import { STORAGE_KEY_QUEUE } from '../utils/constants';

export function renderWatchedLibrary(e) {
  e.preventDefault();
    refsLibrary.watchedBtn.classList.add('library-btn-current');
  emptyWatchedLibNtf (e);
  refsLibrary.queueBtn.classList.remove('library-btn-current');
  const libData = JSON.parse(localStorage.getItem('WatchedLibrary'));
  markUpLib(libData);
  refsLibrary.filtersWrapper.style.display = 'none';
}

export function renderQueueLibrary(e) {
  e.preventDefault();
  refsLibrary.watchedBtn.classList.remove('library-btn-current');
  refsLibrary.queueBtn.classList.add('library-btn-current');
  emptyQueueLibNtf (e);
  const libData = JSON.parse(localStorage.getItem('QueueLibrary'));
  markUpLib(libData);
  refsLibrary.filtersWrapper.style.display = 'none';
}
``;
function markUpLib(data) {
  refsLibrary.watchedList.innerHTML = '';
  refsLibrary.watchedList.insertAdjacentHTML('beforeend', markUpFilms(data));
  onCardsSelect();
}
function emptyWatchedLibNtf (e){
  e.preventDefault();
  if(refsLibrary.watchedBtn.classList.contains('library-btn-current') 
  && localStorage.getItem(STORAGE_KEY_WATCHED) === '[]'
  ){
return Swal.fire({
      position: 'top',
      title: 'There are no movies in this library yet',
      showConfirmButton: false,
      timer: 2500,
      background: 'darkgray',
      color: 'black',
    });
  }
  }
  
  function emptyQueueLibNtf (e){
  e.preventDefault();
  if(refsLibrary.queueBtn.classList.contains('library-btn-current') 
  && localStorage.getItem(STORAGE_KEY_QUEUE) === '[]'
  ){
return Swal.fire({
      position: 'top',
      title: 'There are no movies in this library yet',
      showConfirmButton: false,
      timer: 2500,
      background: 'darkgray',
      color: 'black',
    });
  }};