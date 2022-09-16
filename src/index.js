import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onSearchRender, DEBOUNCE_DELAY));

function onSearchRender() {
  const searchQuery = inputRef.value;
  fetchCountries(searchQuery)
    .then(renderCountryInfo)
    .catch(error => console.log(error));
}

function renderCountryInfo(data) {
  const country = data[0];
  const markup = `<div>
    <svg aria-label='Country flag'>
      <use class='country-flag' href=''></use>
    </svg>
    <h2>${country.name.official}</h2>
  </div>
  <ul>
    <li>
      <p>Capital: ${country.capital}</p>
    </li>
    <li>
    <p>Population: ${country.population}</p>
    </li>
    <li>
    <p>Languages: ${country.languages}</p>
    </li>
  </ul>`;
  countryInfo.innerHTML = markup;
}
