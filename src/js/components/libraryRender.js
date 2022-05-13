import {refsLibrary} from './header';
import { convertIdInGenre, movieGenresManipulationsMarkup } from './genres.js';
import { IMG_URL } from '../utils/constants';
import markUpFilms from './markUpFilms';
import {onCardsSelect} from './card-modal';

// import { renderWatchedLibrary, renderQueueLibrary} from './libraryRender'


// export const refsLibrary = {
//     watchedBtn: document.querySelector('.library-btn_watched'),
//     queueBtn: document.querySelector('.library-btn_queue'),
//     watchedList: document.querySelector('.films-list-watched'),
//     queueList: document.querySelector('.films-list-queue'),
//   }

// refsLibrary.queueList.classList.add('visually-hidden');
//     refsLibrary.watchedList.classList.add('visually-hidden');

// refsLibrary.watchedList.classList.remove('visually-hidden')
//     refsLibrary.queueList.classList.remove('visually-hidden')

// refsLibrary.watchedBtn.addEventListener('click', renderWatchedLibrary);
// refsLibrary.queueBtn.addEventListener('click', renderQueueLibrary);

export function renderWatchedLibrary(e) {
  e.preventDefault();
  refsLibrary.watchedBtn.classList.add('library-active-btn')
  refsLibrary.queueBtn.classList.remove('library-active-btn')
  const libData = JSON.parse(localStorage.getItem('WatchedLibrary'));
  console.log(libData);
  markUpLib(libData);
  refsLibrary.filtersWrapper.style.display = 'none';
}

export function renderQueueLibrary(e) {
  e.preventDefault();
  refsLibrary.watchedBtn.classList.remove('library-active-btn')
  refsLibrary.queueBtn.classList.add('library-active-btn')
  const libData = JSON.parse(localStorage.getItem('QueueLibrary'));
  markUpLib(libData);
  refsLibrary.filtersWrapper.style.display = 'none';
}

function markUpLib(data) {
  console.log(refsLibrary.watchedList);
  refsLibrary.watchedList.innerHTML = '';
  refsLibrary.watchedList.insertAdjacentHTML('beforeend', markUpFilms(data));
  onCardsSelect();
}


// класи для кнопок

// library-btn_queue
// library-btn_watched

// додатковий параметр який має приходити =>
// release_date: movieDate,


//кінець card-modal.js

// const genresArray = allGenres.flatMap(student => student.id);
// librarys(
// {
//   poster_path: posterPath,
//   genre_ids: genresArray,
//   title: title,
//   original_title: origTitle,
//   vote_average: vote,
//   vote_count: voteNum,
//   popularity: popularity,
//   overview: overview,
//   id: id,
//   release_date: movieDate,
//   }
// );
// }















// function markUpFilmsLib(data) {
//   console.log(data);
//   return data
//     .map(
//       ({
//         poster_path: posterPath,
//         genres: allGenres,
//         title: title,
//         id: id,
//         release_date: movieDate,
//       }) => {
//         console.log(movieDate);
//         let arrGenresid = [];
//         allGenres.map(ganre => arrGenresid.push(ganre.id));
//         let movieGenres = [];
//         for (let i = 0; i < arrGenresid.length; i += 1) {
//           let genre = convertIdInGenre(arrGenresid[i]);
//           movieGenres.push(genre);
//         }
//         return `  
//        <li class="card-item" id="${id}">                
//         <div class="card-item__image-box">
//           <img src="${IMG_URL + posterPath}" alt="Poster of ${
//           title ? title : ''
//         }" class="card-item__image" />
//         </div>
//         <p class="card-item__text">${title}<br />
//          <span class="card-item__text--orange">${movieGenresManipulationsMarkup(movieGenres)} | ${
//           movieDate ? movieDate.slice(0, 4) : ''
//         }</span>
//         </p>   
//         </li>    
//        `;
//       },
//     )
//     .join('');
// }



// Це функція для відмалювання розмітки в бібліотеці(черзі)
// export function markUpFilmsForLib(data) {
//   console.log(data);
//   return data
//     .map(({ poster_path, genre_ids, id, release_date, title, vote_average }) => {
//       return `
//     <li class="card-item" id="${id}">
//       <div class="card-item__image-box">
//         <img src="${IMG_URL + poster_path}" alt="Poster of ${title}" class="card-item__image" />
//       </div>
//       <p class="card-item__text">${title}<br />
//         <span class="card-item__text--orange">${genre_ids} | ${release_date.slice(0, 4)}</span>
//         <span class="card-item__text--fill-orange">${vote_average}</span>
//       </p>
//     </li>
//     `;
//     })
//     .join('');
// }
