import { refsLibrary } from './header';
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
  function currentLS(e){
      if (e.currentTarget.classList.contains('add-watch')){
      return STORAGE_KEY_WATCHED
    }else{
     return STORAGE_KEY_QUEUE
    };
  };

  function addToLibrary(e) {
    e.preventDefault();
    let currentLsKey = currentLS(e);
    const dataToSave = JSON.parse(localStorage.getItem(currentLsKey));
    dataToSave.push(dataMovie);
    const dataToSaveString = JSON.stringify(dataToSave);
    localStorage.setItem(currentLsKey, dataToSaveString);
    LibraryChange(e);
    if(currentLsKey === STORAGE_KEY_WATCHED){btnWatchedChangeRemove()}
      else{
         btnQueueChangeRemove();
      
    };
  }
  // function addToQueue(e) {
  //   e.preventDefault();
  //   const dataToSave = JSON.parse(localStorage.getItem(STORAGE_KEY_QUEUE));
  //   dataToSave.push(dataMovie);
  //   const dataToSaveString = JSON.stringify(dataToSave);
  //   localStorage.setItem(STORAGE_KEY_QUEUE, dataToSaveString);
  //   queueLibraryChange(e);
  //   btnQueueChangeRemove();
  // }

  function removeFromLibrary(e) {
    e.preventDefault();
    let currentLsKey = currentLS(e);
    const dataToChange = JSON.parse(localStorage.getItem(currentLsKey));
    const movieIndex = dataToChange.findIndex(movie => movie.id === dataMovie.id);
    dataToChange.splice(movieIndex, 1);
    const dataToSave = JSON.stringify(dataToChange);
    localStorage.setItem(currentLsKey, dataToSave);
    LibraryChange(e);
    if(currentLsKey === STORAGE_KEY_QUEUE){btnQueueChangeAdd();}
      else{
         btnWatchedChangeAdd()
      
    };
    }

  

  // function removeMovieFromQueue(e) {
  //   e.preventDefault();
  //   const dataToChange = JSON.parse(localStorage.getItem(STORAGE_KEY_QUEUE));
  //   const movieIndex = dataToChange.findIndex(movie => movie.id === dataMovie.id);
  //   dataToChange.splice(movieIndex, 1);
  //   const dataToSave = JSON.stringify(dataToChange);
  //   localStorage.setItem(STORAGE_KEY_QUEUE, dataToSave);
  //   queueLibraryChange(e);
  //   btnQueueChangeAdd();
  // }

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
    btnRefs.addToWatchedBtn.removeEventListener('click', addToLibrary);
    btnRefs.addToWatchedBtn.textContent = 'Remove from Watched';
    btnRefs.addToWatchedBtn.addEventListener('click', removeFromLibrary);
    btnRefs.addToWatchedBtn.classList.add('focused');
  }

  function btnWatchedChangeAdd() {
    btnRefs.addToWatchedBtn.removeEventListener('click', removeFromLibrary);
    btnRefs.addToWatchedBtn.textContent = 'Add to watched';
    btnRefs.addToWatchedBtn.addEventListener('click', addToLibrary);
    btnRefs.addToWatchedBtn.classList.remove('focused');
  }
   function btnQueueChangeAdd() {
    btnRefs.addToQueueBtn.removeEventListener('click', removeFromLibrary);
    btnRefs.addToQueueBtn.textContent = 'Add to Queue';
    btnRefs.addToQueueBtn.addEventListener('click', addToLibrary);
    btnRefs.addToQueueBtn.classList.remove('focused');
  }

  function btnQueueChangeRemove() {
    btnRefs.addToQueueBtn.removeEventListener('click', addToLibrary);
    btnRefs.addToQueueBtn.textContent = 'Remove from Queue';
    btnRefs.addToQueueBtn.addEventListener('click', removeFromLibrary);
    btnRefs.addToQueueBtn.classList.add('focused');
  }

 
}

function LibraryChange(e) {
  if (refsLibrary.watchedBtn.classList.contains('library-btn-current')) {
    renderWatchedLibrary(e);
  }else{
    renderQueueLibrary(e);
  }
}
// function queueLibraryChange(e) {
//   if (refsLibrary.queueBtn.classList.contains('library-btn-current')) {
//     renderQueueLibrary(e);
//   }
// }
