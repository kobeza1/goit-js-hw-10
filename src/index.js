import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryInfo: document.querySelector('.country-info'),
  countryList: document.querySelector('.country-list'),
};

refs.input.addEventListener('input', debounce(onSearchRender, DEBOUNCE_DELAY));

function onSearchRender() {
  const searchQuery = refs.input.value;
  if (searchQuery.trim()) {
    fetchCountries(searchQuery).then(renderCountryInfo).catch(onFetchError);
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
  }
}

function renderCountryInfo(data = []) {
  const countriesArray = data;
  refs.countryList.innerHTML = '';

  // console.log(countriesArray);

  if (countriesArray.length > 10) {
    Notiflix.Notify.warning(
      'Too many matches found. Please enter a more specific name.'
    );
  } else {
    countriesArray.forEach(country => {
      const { name, capital, population, languages, flags } = country;

      if (countriesArray.length === 1) {
        const markup = `<div class='title-container'>
    <img class="country-icon" src="${flags.png}" width='60' height='40'></img>
    <h2>${name.official}</h2>
    </div>
    <ul>
      <li>
        <p>Capital: ${capital}</p>
      </li>
      <li>
      <p>Population: ${population}</p>
      </li>
      <li>
      <p>Languages: ${Object.values(languages).join(', ')}</p>
      </li>
    </ul>`;
        refs.countryInfo.innerHTML = markup;
      } else {
        const markup = `<li>
        <img class="country-icon" src="${flags.png}" width='20' height='15'></img>
        <p class="country-list__text">${name.official}</p>
      </li>`;

        refs.countryList.insertAdjacentHTML('beforeend', markup);
      }
    });
  }
}

function onFetchError(error) {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
