// import {btnRefs} from './card-modal';

const LOCALSTORAGE_KEY_Watched = 'WatchedLibrary';
const LOCALSTORAGE_KEY_Queue = 'QueueLibrary';

 export function librarys (id)

 {
const btnRefs = {
    addToWatchedBtn:document.querySelector('.add-watch'),
    addToQueueBtn:document.querySelector('.add-queue'),
  }

  checkMovieWatched(id);
  checkMovieQueue(id);

    console.log(btnRefs.addToQueueBtn);
   console.log(btnRefs.addToWatchedBtn);
  
  function checkMovieWatched(id) {
    checkHelperWatched();
    if (JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_Watched)).includes(id)) {
      btnWatchChangeRemowe();
    } else {
      btnWatchChangeAdd();
    }
  }

 function checkMovieQueue(id) {
    checkHelperQueue();
    if (JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_Queue)).includes(id)) {
      btnQueueChangeRemowe();
    } else {
      btnQueueChangeAdd();
    }
  }

  function addToWatched(e) {
    e.preventDefault();
    const dataToSave = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_Watched));
    dataToSave.push(id);
    const dataToSaveString = JSON.stringify(dataToSave);
    localStorage.setItem(LOCALSTORAGE_KEY_Watched, dataToSaveString);
    console.log("addWtch done");
    btnWatchChangeRemowe();
  }
  function addToQueue(e) {
    e.preventDefault();
    const dataToSave = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_Queue));
    dataToSave.push(id);
    const dataToSaveString = JSON.stringify(dataToSave);
    localStorage.setItem(LOCALSTORAGE_KEY_Queue, dataToSaveString);
    console.log("addQue done");
    btnQueueChangeRemowe();
  }

  function removeMovieFromWatched(e) {
    e.preventDefault();
    const dataToChange = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_Watched));
    dataToChange.splice(dataToChange.indexOf(id),1);
    const dataToSave = JSON.stringify(dataToChange);
    localStorage.setItem(LOCALSTORAGE_KEY_Watched, dataToSave);
    console.log('removeWatch done')
    btnWatchChangeAdd();
  }

  function removeMovieFromQueue(e) {
    e.preventDefault();
    const dataToChange = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_Queue));
    dataToChange.splice(dataToChange.indexOf(id),1);
    const dataToSave = JSON.stringify(dataToChange)
    localStorage.setItem(LOCALSTORAGE_KEY_Queue, dataToSave);
    console.log('removeQue done')
    btnQueueChangeAdd();
  }

  function checkHelperWatched() {
    if (localStorage.getItem(LOCALSTORAGE_KEY_Watched) === null) {
      const LS_watched_data = [];
      localStorage.setItem(LOCALSTORAGE_KEY_Watched, JSON.stringify(LS_watched_data));
      btnWatchChangeAdd();

    }
  }
  function checkHelperQueue() {
    if (localStorage.getItem(LOCALSTORAGE_KEY_Queue) === null) {
      const LS_queue_data = [];
      localStorage.setItem(LOCALSTORAGE_KEY_Queue, JSON.stringify(LS_queue_data));
      btnQueueChangeAdd();
      }
  }

  function btnWatchChangeRemowe() {
    btnRefs.addToWatchedBtn.removeEventListener('click', addToWatched);
    btnRefs.addToWatchedBtn.textContent = 'Remove from Watched';
    btnRefs.addToWatchedBtn.addEventListener('click', removeMovieFromWatched);
  }

  function btnWatchChangeAdd() {
    btnRefs.addToWatchedBtn.removeEventListener('click', removeMovieFromWatched);
    btnRefs.addToWatchedBtn.textContent = 'Add to watched';
    btnRefs.addToWatchedBtn.addEventListener('click', addToWatched);
  }

  function btnQueueChangeRemowe() {
    btnRefs.addToQueueBtn.removeEventListener('click', addToQueue);
    btnRefs.addToQueueBtn.textContent = 'Remove from Queue';
    btnRefs.addToQueueBtn.addEventListener('click', removeMovieFromQueue);
  }

  function btnQueueChangeAdd() {
    btnRefs.addToQueueBtn.removeEventListener('click', removeMovieFromQueue);
    btnRefs.addToQueueBtn.textContent = 'Add to Queue';
    btnRefs.addToQueueBtn.addEventListener('click', addToQueue);
  }}

  