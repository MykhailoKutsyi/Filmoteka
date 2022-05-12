// import {btnRefs} from './card-modal';
import { libraryNavEl } from "./header";
import {renderWatchedLibrary, renderQueueLibrary} from './libraryRender'

const LOCALSTORAGE_KEY_Watched = 'WatchedLibrary';
const LOCALSTORAGE_KEY_Queue = 'QueueLibrary';

 export function librarys (dataMovie)

 {
const btnRefs = {
    addToWatchedBtn:document.querySelector('.add-watch'),
    addToQueueBtn:document.querySelector('.add-queue'),
  }

  checkMovieWatched(dataMovie.id);
  checkMovieQueue(dataMovie.id);

    
  function checkMovieWatched(id) {
  
    checkHelperWatched();
        //   JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_Watched)).map(LSdataMovie => LSdataMovie.id.includes(id));
        // console.log(id);
    if (JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_Watched)).some(LSdataMovie => LSdataMovie.id === id)){
      btnWatchedChangeRemowe();
    } else {
      btnWatchedChangeAdd();
    }
  }

 function checkMovieQueue(id) {
    checkHelperQueue();
    if (JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_Queue)).some(LSdataMovie => LSdataMovie.id === id)) {
      btnQueueChangeRemowe();
    } else {
      btnQueueChangeAdd();
    }
  }

  function addToWatched(e) {
    e.preventDefault();
    const dataToSave = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_Watched));
    dataToSave.push(dataMovie);
    console.log(dataMovie.title);
    const dataToSaveString = JSON.stringify(dataToSave);
    localStorage.setItem(LOCALSTORAGE_KEY_Watched, dataToSaveString);
    console.log("addWtched done");
    watchedLibraryChange(e);
    btnWatchedChangeRemowe();
  }
  function addToQueue(e) {
    e.preventDefault();
    const dataToSave = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_Queue));
    dataToSave.push(dataMovie);
    const dataToSaveString = JSON.stringify(dataToSave);
    localStorage.setItem(LOCALSTORAGE_KEY_Queue, dataToSaveString);
    console.log("addQue done");
    queueLibraryChange(e);
    btnQueueChangeRemowe();
  }

  function removeMovieFromWatched(e) {
    e.preventDefault();
    const dataToChange = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_Watched));
    const movieIndex = dataToChange.findIndex(movie => movie.id === dataMovie.id);
    dataToChange.splice(movieIndex, 1);
    const dataToSave = JSON.stringify(dataToChange);
    localStorage.setItem(LOCALSTORAGE_KEY_Watched, dataToSave);
    console.log('removeWatched done');
    watchedLibraryChange(e);
    btnWatchedChangeAdd();
  }

  function removeMovieFromQueue(e) {
    e.preventDefault();
    const dataToChange = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_Queue));
    const movieIndex = dataToChange.findIndex(movie => movie.id === dataMovie.id);
    dataToChange.splice(movieIndex, 1);
    const dataToSave = JSON.stringify(dataToChange)
    localStorage.setItem(LOCALSTORAGE_KEY_Queue, dataToSave);
    console.log('removeQue done');
    queueLibraryChange(e)
    btnQueueChangeAdd();
  }

  function checkHelperWatched() {
    if (localStorage.getItem(LOCALSTORAGE_KEY_Watched) === null) {
      const LS_watched_data = [];
      localStorage.setItem(LOCALSTORAGE_KEY_Watched, JSON.stringify(LS_watched_data));
      btnWatchedChangeAdd();
      console.log('checkHelper made check');

    }
  }
  function checkHelperQueue() {
    if (localStorage.getItem(LOCALSTORAGE_KEY_Queue) === null) {
      const LS_queue_data = [];
      localStorage.setItem(LOCALSTORAGE_KEY_Queue, JSON.stringify(LS_queue_data));
      btnQueueChangeAdd();
      console.log('checkHelper made check');
      }
  }

  function btnWatchedChangeRemowe() {
    btnRefs.addToWatchedBtn.removeEventListener('click', addToWatched);
    btnRefs.addToWatchedBtn.textContent = 'Remove from Watched';
    btnRefs.addToWatchedBtn.addEventListener('click', removeMovieFromWatched);
    btnRefs.addToWatchedBtn.classList.add('focused')
  }

  function btnWatchedChangeAdd() {
    btnRefs.addToWatchedBtn.removeEventListener('click', removeMovieFromWatched);
    btnRefs.addToWatchedBtn.textContent = 'Add to watched';
    btnRefs.addToWatchedBtn.addEventListener('click', addToWatched);
    btnRefs.addToWatchedBtn.classList.remove('focused')
  }

  function btnQueueChangeRemowe() {
    btnRefs.addToQueueBtn.removeEventListener('click', addToQueue);
    btnRefs.addToQueueBtn.textContent = 'Remove from Queue';
    btnRefs.addToQueueBtn.addEventListener('click', removeMovieFromQueue);
    btnRefs.addToQueueBtn.classList.add('focused')
  }

  function btnQueueChangeAdd() {
    btnRefs.addToQueueBtn.removeEventListener('click', removeMovieFromQueue);
    btnRefs.addToQueueBtn.textContent = 'Add to Queue';
    btnRefs.addToQueueBtn.addEventListener('click', addToQueue);
    btnRefs.addToQueueBtn.classList.remove('focused')
  }}

  function watchedLibraryChange(e){
    if(libraryNavEl.classList.contains('current')){
renderWatchedLibrary(e);
    }
  }
  function queueLibraryChange(e){
    if(libraryNavEl.classList.contains('current')){
renderQueueLibrary(e);
    }
  }