import { libraryNavEl } from './header';
import { renderWatchedLibrary, renderQueueLibrary } from './libraryRender';
import { STORAGE_KEY_WATCHED } from '../utils/constants';
import { STORAGE_KEY_QUEUE } from '../utils/constants';

export function myLibrary(dataMovie) {
  const btnRefs = {
    addToWatchedBtn: document.querySelector('.add-watch'),
    addToQueueBtn: document.querySelector('.add-queue'),
  };

  checkMovieWatched(dataMovie.id);
  checkMovieQueue(dataMovie.id);

  function checkMovieWatched(id) {
    checkHelperWatched();
    if (
      JSON.parse(localStorage.getItem(STORAGE_KEY_WATCHED)).some(
        LSdataMovie => LSdataMovie.id === id,
      )
    ) {
      btnWatchedChangeRemove();
    } else {
      btnWatchedChangeAdd();
    }
  }

  function checkMovieQueue(id) {
    checkHelperQueue();
    if (
      JSON.parse(localStorage.getItem(STORAGE_KEY_QUEUE)).some(LSdataMovie => LSdataMovie.id === id)
    ) {
      btnQueueChangeRemove();
    } else {
      btnQueueChangeAdd();
    }
  }

  function addToWatched(e) {
    e.preventDefault();
    const dataToSave = JSON.parse(localStorage.getItem(STORAGE_KEY_WATCHED));
    dataToSave.push(dataMovie);
    const dataToSaveString = JSON.stringify(dataToSave);
    localStorage.setItem(STORAGE_KEY_WATCHED, dataToSaveString);
    watchedLibraryChange(e);
    btnWatchedChangeRemove();
  }
  function addToQueue(e) {
    e.preventDefault();
    const dataToSave = JSON.parse(localStorage.getItem(STORAGE_KEY_QUEUE));
    dataToSave.push(dataMovie);
    const dataToSaveString = JSON.stringify(dataToSave);
    localStorage.setItem(STORAGE_KEY_QUEUE, dataToSaveString);
    queueLibraryChange(e);
    btnQueueChangeRemove();
  }

  function removeMovieFromWatched(e) {
    e.preventDefault();
    const dataToChange = JSON.parse(localStorage.getItem(STORAGE_KEY_WATCHED));
    const movieIndex = dataToChange.findIndex(movie => movie.id === dataMovie.id);
    dataToChange.splice(movieIndex, 1);
    const dataToSave = JSON.stringify(dataToChange);
    localStorage.setItem(STORAGE_KEY_WATCHED, dataToSave);
    watchedLibraryChange(e);
    btnWatchedChangeAdd();
  }

  function removeMovieFromQueue(e) {
    e.preventDefault();
    const dataToChange = JSON.parse(localStorage.getItem(STORAGE_KEY_QUEUE));
    const movieIndex = dataToChange.findIndex(movie => movie.id === dataMovie.id);
    dataToChange.splice(movieIndex, 1);
    const dataToSave = JSON.stringify(dataToChange);
    localStorage.setItem(STORAGE_KEY_QUEUE, dataToSave);
    queueLibraryChange(e);
    btnQueueChangeAdd();
  }

  function checkHelperWatched() {
    if (localStorage.getItem(STORAGE_KEY_WATCHED) === null) {
      const LS_watched_data = [];
      localStorage.setItem(STORAGE_KEY_WATCHED, JSON.stringify(LS_watched_data));
      btnWatchedChangeAdd();
    }
  }

  function checkHelperQueue() {
    if (localStorage.getItem(STORAGE_KEY_QUEUE) === null) {
      const LS_queue_data = [];
      localStorage.setItem(STORAGE_KEY_QUEUE, JSON.stringify(LS_queue_data));
      btnQueueChangeAdd();
    }
  }

  function btnWatchedChangeRemove() {
    btnRefs.addToWatchedBtn.removeEventListener('click', addToWatched);
    btnRefs.addToWatchedBtn.textContent = 'Remove from Watched';
    btnRefs.addToWatchedBtn.addEventListener('click', removeMovieFromWatched);
    btnRefs.addToWatchedBtn.classList.add('focused');
  }

  function btnWatchedChangeAdd() {
    btnRefs.addToWatchedBtn.removeEventListener('click', removeMovieFromWatched);
    btnRefs.addToWatchedBtn.textContent = 'Add to watched';
    btnRefs.addToWatchedBtn.addEventListener('click', addToWatched);
    btnRefs.addToWatchedBtn.classList.remove('focused');
  }

  function btnQueueChangeRemove() {
    btnRefs.addToQueueBtn.removeEventListener('click', addToQueue);
    btnRefs.addToQueueBtn.textContent = 'Remove from Queue';
    btnRefs.addToQueueBtn.addEventListener('click', removeMovieFromQueue);
    btnRefs.addToQueueBtn.classList.add('focused');
  }

  function btnQueueChangeAdd() {
    btnRefs.addToQueueBtn.removeEventListener('click', removeMovieFromQueue);
    btnRefs.addToQueueBtn.textContent = 'Add to Queue';
    btnRefs.addToQueueBtn.addEventListener('click', addToQueue);
    btnRefs.addToQueueBtn.classList.remove('focused');
  }
}

function watchedLibraryChange(e) {
  if (libraryNavEl.classList.contains('current')) {
    renderWatchedLibrary(e);
  }
}
function queueLibraryChange(e) {
  if (libraryNavEl.classList.contains('current')) {
    renderQueueLibrary(e);
  }
}
