import { IMG_URL } from '../utils/constants';

export default function markUpFilms(data) {
  // console.log(data);
  return data
    .map(({ poster_path, genre_ids, id, release_date, title }) => {
      return `
    <li class="card-item" id="${id}">
      <div class="card-item__image-box">
        <img src="${IMG_URL + poster_path}" alt="Poster of ${title}" class="card-item__image" />
      </div>
      <p class="card-item__text">${title}<br />
        <span class="card-item__text--orange">${genre_ids} | ${release_date.slice(0, 4)}</span>
      </p>
    </li>
    `;
    })
    .join('');
}

// Це функція для відмалювання розмітки в бібліотеці(черзі)
// function markUpFilmsForLib(data) {
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

// {data: {…}, status: 200, statusText: '', headers: {…}, config: {…}, …}
// config: {transitional: {…}, transformRequest: Array(1), transformResponse: Array(1), timeout: 0, adapter: ƒ, …}
// data:
// page: 1
// results: Array(20)
// 0:
// adult: false
// backdrop_path: "/egoyMDLqCxzjnSrWOz50uLlJWmD.jpg"
// genre_ids: (5) [28, 878, 35, 10751, 12]
// id: 675353
// media_type: "movie"
// original_language: "en"
// original_title: "Sonic the Hedgehog 2"
// overview: "After settling in Green Hills, Sonic is eager to prove he has what it takes to be a true hero. His test comes when Dr. Robotnik returns, this time with a new partner, Knuckles, in search for an emerald that has the power to destroy civilizations. Sonic teams up with his own sidekick, Tails, and together they embark on a globe-trotting journey to find the emerald before it falls into the wrong hands."
// popularity: 3693.556
// poster_path: "/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg"
// release_date: "2022-03-30"
// title: "Sonic the Hedgehog 2"
// video: false
// vote_average: 7.6
// vote_count: 843
// [[Prototype]]: Object
// 1: {genre_ids: Array(5), original_language: 'en', id: 629542, poster_path: '/7qop80YfuO0BwJa1uXk1DXUUEwv.jpg',
// video: false
