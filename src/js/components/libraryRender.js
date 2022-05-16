import { refsLibrary, imagesList, libraryNavEl } from './header';
import { onCardsSelect } from './card-modal';
import { STORAGE_KEY_WATCHED, STORAGE_KEY_QUEUE } from '../utils/constants';
import Swal from 'sweetalert2';
import {refs} from './hero';
import { convertIdInGenre, movieGenresManipulationsMarkup } from './genres.js';
import { IMG_URL} from '../utils/constants';
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

function markUpFilms(data) {
  if (!data) {
    return;
  }

  return data
    .map(
      ({
        poster_path: posterPath,
        genre_ids: genreIds,
        id: movieId,
        release_date: movieDate,
        title: title,
      }) => {
        let movieGenres = [];
        for (let i = 0; i < genreIds.length; i += 1) {
          let genre = convertIdInGenre(genreIds[i]);
          movieGenres.push(genre);
        }

        return `  
       <li class="card-item" id="${movieId}">                
        <div class="card-item__image-box">
          <img src="${IMG_URL + posterPath}" alt="Poster of ${
          title ? title : ''
        }" onerror="this.src='https://michaelnakache.com/wp-content/uploads/2018/08/movie-poster-coming-soon-2.png';" class="card-item__image" />
        </div>
        <p class="card-item__text">${title ? title : 'Title unavailable'}<br />
         <span class="card-item__text--orange">${movieGenresManipulationsMarkup(movieGenres)} | ${
          movieDate ? movieDate.slice(0, 4) : 'Date unavailable'
        }</span>
        </p>   
        </li>    
       `;
      },
    )
    .join('');
}