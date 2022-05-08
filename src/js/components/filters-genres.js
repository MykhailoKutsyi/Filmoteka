const filtersContainer = document.querySelector('.filters');
const filtersHideContainer = document.querySelector('.js-hide');
let filtersListEl = document.querySelector('.js-filters-list');
let valueEl = document.getElementById('filters-values');
const text = "You've chosen: ";
const FILTERS_STORAGE_KEY = 'filters';
const STORAGE_KEY = 'genres';
let filters = [];

markupGenresForFilters();
checkForChosenGenres();

// ================ filters container listener

filtersContainer.addEventListener('mouseover', () => {
    filtersHideContainer.classList.remove('filters_genres-hidden');
});

filtersContainer.addEventListener('mouseout', () => {
    filtersHideContainer.classList.add('filters_genres-hidden');
});

// ================ check in local storage if there are already chosen genres
function checkForChosenGenres() {
    if (localStorage.getItem(FILTERS_STORAGE_KEY)=== null) {
        return;
    } else {
        let arr = localStorage.getItem(FILTERS_STORAGE_KEY);
        JSON.parse(arr).forEach(el => {
            filters.push(el);
            let classElement = el.toString();
            // console.log(classElement);
           let element = document.querySelector(`.${classElement}`);
            // console.log(element);
            element.checked = true;
            valueEl.innerHTML = text + filters.join(', ');
            return filters;
        });
    };
    
};


function onCheckboxClick() {
    if (this.checked == true) {
        filters.push(this.value);
        valueEl.innerHTML = text + filters.join(', ');
    } else {
        filters = filters.filter(element => element !== this.value);
        valueEl.innerHTML = text + filters.join(', ');
    };

    if (filters.length === 0) {
        localStorage.removeItem(FILTERS_STORAGE_KEY);
    };

    if (filters.length !==0) {
        localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(filters));
    };    
};


// =========================markup filters-genres ========================


function markupGenresForFilters() {
    let  arr = localStorage.getItem(STORAGE_KEY)
    for (const el of JSON.parse(arr)) {
        let filter = document.createElement('li');
        filter.classList.add('filters_item');
        filter.innerHTML = `
        <input type="checkbox" value="${el.name}" class="filters_checkbox ${el.name} js-filters-check" id="${el.id}">
            <label class="filters_label" for="${el.name}">${el.name}</label>
        `;
        let checkboxEl = filter.querySelector('.js-filters-check');
        checkboxEl.addEventListener('click', onCheckboxClick);
        filtersListEl.appendChild(filter);
    };
};

