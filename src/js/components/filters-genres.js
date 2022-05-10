import { convertIdInGenre, movieGenresManipulationsMarkup } from "./genres";
import { IMG_URL } from '../utils/constants';
import { onCardsSelect } from './card-modal';


const filtersContainer = document.querySelector('.filters');
const filtersHideContainer = document.querySelector('.js-hide');
const filtersList = document.querySelector('.js-filters-list');
let valueEl = document.getElementById('filters-values');
const filtersBtn = document.querySelector('.filters__filter');
let imagesList= document.querySelector('.films-list')

const text = "You've chosen: ";
const FILTERS_STORAGE_KEY = 'filters';
const MOVIE_STORAGE_KEY = 'movies';
let filters = [];

// ================ filters container listener=======================
filtersContainer.addEventListener('mouseover', () => {
    filtersHideContainer.classList.remove('filters__genres-hidden');
});

filtersContainer.addEventListener('mouseout', () => {
    filtersHideContainer.classList.add('filters__genres-hidden');
});

// ================ checkbox listener=================

function onCheckboxClick() {
    if (this.checked == true) {
        filters.push(this.value);
        valueEl.innerHTML = text + filters.map(filter => convertIdInGenre(Number(filter))).join(", ");
    } else {
        filters = filters.filter(element => element !== this.value);
        valueEl.innerHTML = text + filters.map(filter=>convertIdInGenre(Number(filter))).join(", ");
    };

    if (filters.length === 0) {
        localStorage.removeItem(FILTERS_STORAGE_KEY);
        document.location.reload();
    };

    if (filters.length !==0) {
        localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(filters));
    };  
    return filters;
};

// =========================markup filters-genres ========================


export function markupFiltersOfGenres(genre) {
    const filtersMarkup = document.createElement("li");
    filtersMarkup.classList.add("filters__item");
    filtersMarkup.innerHTML = `
        <input type="checkbox" value="${genre.id}" class="filters__checkbox js-filters-check" id="${genre.id}">
        <label class="filters__label" for="${genre.id}">${genre.name}</label>
    `;
    filtersList.appendChild(filtersMarkup);

    let checkboxEl = filtersMarkup.querySelector('.js-filters-check');

    checkboxEl.addEventListener('click', onCheckboxClick);
};

// ================ check in local storage if there are already chosen genres

export function checkForChosenGenres() {
        if (localStorage.getItem(FILTERS_STORAGE_KEY) === null) {
        // console.log('first')
        return;
    } else {
        let arr = localStorage.getItem(FILTERS_STORAGE_KEY);
        JSON.parse(arr).forEach(el => {
            const element = document.querySelector(`input[id='${el}']`);
            // console.log(element);
            element.checked = true;
            filters.push(element.value);
            valueEl.innerHTML = text + filters.map(filter=>convertIdInGenre(Number(filter))).join(", ");
            return filters;
        });
    };
    return filters;
};

// ========================== button event=========

filtersBtn.addEventListener('click', onFilterBtnClick);

function onFilterBtnClick() {
    if (filters.length === 0) {
        filtersBtn.disabled = true;
    } else {
        let filterNum = filters.map(filter => Number(filter));
        console.log(filterNum);
        imagesList.innerHTML = '';
        let allMovies = localStorage.getItem(MOVIE_STORAGE_KEY);
        for (const movie of JSON.parse(allMovies)) {
            let genreIds = movie.genre_ids;
            let op = filterNum.every(element => genreIds.indexOf(element) > -1);
            if (op === true) {
                console.log(movie);
                const movieEl = document.createElement('li');
                movieEl.setAttribute('id', `${movie.id}`);
                movieEl.classList.add('card-item');
                let movieGenres = [];
                for (let i = 0; i < movie.genre_ids.length; i += 1) {
                let genre = convertIdInGenre(movie.genre_ids[i]);
                movieGenres.push(genre);
                };
                movieEl.innerHTML = `
                    <div class="card-item__image-box">
                    <img src="${IMG_URL + movie.poster_path}" alt="Poster of ${movie.title}" class="card-item__image" />
                    </div>
                    <p class="card-item__text">${movie.title}<br />
                    <span class="card-item__text--orange">${movieGenresManipulationsMarkup(movieGenres)} | ${movie.release_date?movie.release_date.slice(0, 4):''}</span>
                    </p>  
                `;
                imagesList.appendChild(movieEl);
                onCardsSelect();
            };
        };
    };
};