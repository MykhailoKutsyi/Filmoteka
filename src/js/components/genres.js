import { getGenres } from '../services/API';
import { STORAGE_KEY_GENRES } from '../utils/constants'
import {checkForChosenGenres, markupFiltersOfGenres } from './filters-genres';



saveLocalStorage();

function pushFetch () {
    try {
        const response = getGenres();
        return response.then(data => data.data.genres);
    } catch (error) {
        console.log(error);
    };
};

function saveLocalStorage() {
    pushFetch()
        .then((genres) => {   
            console.log(genres)
            localStorage.setItem(STORAGE_KEY_GENRES, JSON.stringify(genres));
            genres.forEach(genre => markupFiltersOfGenres(genre));
            checkForChosenGenres();
    });
};

export function convertIdInGenre(id) {
    let  arr = localStorage.getItem(STORAGE_KEY_GENRES)
    for (const el of JSON.parse(arr)) {
        if (el.id === id) {
            return el.name;
        };
    };
};

export function movieGenresManipulationsMarkup(arr) {
    let string = ', Other';
    if (arr) {
        if (arr.length === 0) {
        return 'No genre';
    }   else 
        if (arr.length <= 2) {
        return arr.slice().join(', ');
    } else {
        return arr.slice(0, 2).join(', ') + string.toLowerCase();
        };
    }  
};

export function movieGenresModalMarkup(arr) {
    if (arr.length === 0) {
        return 'No genre'
    } else
    if (arr) {
        return arr.join(', ');
    } else {
        return '';
    };    
};