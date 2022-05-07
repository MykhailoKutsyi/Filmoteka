import markUpFilms from './markUpFilms';
import { getTrendingMovies } from '../services/API';
import { onCardsSelect } from './card-modal';

const refs = {
  imagesList: document.querySelector('.films-list'),
};

// modalRefs.cardModalCloseBtn.addEventListener('click', onCardModalClose);

pushFetch();

function pushFetch() {
  try {
    const response = getTrendingMovies();
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
