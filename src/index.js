import './css/styles.css';

const DEBOUNCE_DELAY = 300;

function fetchCountries(name) {
    fetch(`https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags,languages`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
}


fetchCountries('usa')

  