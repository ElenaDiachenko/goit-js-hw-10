import './css/styles.css';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 1000;
const searchBox = document.querySelector('#search-box')
const countryList= document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')

searchBox.addEventListener('input', debounce(onSerchInput, DEBOUNCE_DELAY))

function fetchCountries(name) {
    fetch(`https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags,languages`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
}
