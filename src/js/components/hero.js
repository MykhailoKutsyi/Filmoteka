import markUpFilms from './markUpFilms';
import { getTrendingMovies } from '../services/API';
import { onCardsSelect } from './card-modal';

const refs = {
  imagesList: document.querySelector('.films-list'),
};

// modalRefs.cardModalCloseBtn.addEventListener('click', onCardModalClose);
let pageNum = 1;
pushFetch();

function pushFetch() {
  
  try {
    const response = getTrendingMovies(pageNum);
    return response.then(data => {
      markUp(data.data);
    });
  } catch (error) {
    console.log(error);
  }
}

// function markUp(data) {
//   markUpFilms(data.results);
// };

function markUp(data) {
  refs.imagesList.insertAdjacentHTML('beforeend', markUpFilms(data.results));
  onCardsSelect();
}


// let isScrolled = false;

// const infiniteScroll = () => {
//   if (window.scrollY > (document.body.offsetHeight ,1) && !isScrolled) {
// isScrolled = true;
// pageNum +=1;
// pushFetch(pageNum);
// setTimeout(() => {
//   isScrolled = false;

// }, 0);
// }
// }

// window.onscroll = function () { infiniteScroll(); }
// window.onload = () => {
//   getTrendingMovies(pageNum);
// }