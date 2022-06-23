import './css/styles.css';
import debounce from 'lodash.debounce';
import {Notify} from 'notiflix';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box')
const countryList= document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')

searchBox.addEventListener('input', debounce(onSerchInput, DEBOUNCE_DELAY))

function onSerchInput(e) {
  const selectedCountries = e.target.value.trim();

  fetchCountries(selectedCountries).then(countries => {
    if (selectedCountries === '') {
      Notify.failure('Oops, there is no country with that name');
      return;
  }
    if (countries.length >= 10) {
      countryInfo.innerHTML = '';
      countryList.innerHTML = '';
      Notify.info('Too many matches found. Please enter a more specific name');
      return;
    }
    if (countries.length > 2 && countries.length < 10) {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
      countryList.innerHTML = renderCountryList(countries);
      return;
    }
    if (countries.length === 1) {
      countryList.innerHTML = renderCountryList(countries);
      countryInfo.innerHTML = renderCountryInfo(countries);
    }
  }).catch(() => {
    Notify.failure('Oops, there is no country with that name');
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  })

}


function renderCountryList(countries) {
  return countries
    .map(({ name, flags }) => {
      return `
          <li class="country-list__item">
              <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 50px height = 45px>
              <h2 class="country-list__name">${name.official}</h2>
          </li>`
    }).join('');
}

function renderCountryInfo(countries) {
  return countries
    .map(({ capital, population, languages }) => {
      return `
        <ul class="country-info__list">
            <li class="country-info__item"><p><b>Capital: </b>${capital}</p></li>
            <li class="country-info__item"><p><b>Population: </b>${population}</p></li>
            <li class="country-info__item"><p><b>Languages: </b>${Object.values(languages) }</p></li>
        </ul>`;
    })
}

function fetchCountries(name) {
  return  fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  })
}
