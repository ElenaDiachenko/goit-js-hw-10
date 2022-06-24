import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './js/fetchCountries';
import { renderCountryInfo, renderCountryList } from './js/renderMarkUp';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box')
const countryList= document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')

searchBox.addEventListener('input', debounce(onSerchInput, DEBOUNCE_DELAY))

function onSerchInput(e) {
  const selectedCountries = e.target.value.trim();

  if (selectedCountries === '') {
    Notify.info('Please enter a name');
    clearMarkUp();
    return;
  };
   
  fetchCountries(selectedCountries).then(countries => {
    if (countries.length >= 10) {
      clearMarkUp();
      Notify.info('Too many matches found. Please enter a more specific name');
      return;
    }
    if (countries.length >= 2 && countries.length < 10) {
      countryInfo.innerHTML = '';
      countryList.innerHTML = renderCountryList(countries);
      return;
    }
    if (countries.length === 1) {
      clearMarkUp();
      countryList.innerHTML = renderCountryList(countries);
      countryInfo.innerHTML = renderCountryInfo(countries);
    }
  }).catch(() => {
    Notify.failure('Oops, there is no country with that name');
    clearMarkUp();
  })
}

 function clearMarkUp (){
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
