export const  renderCountryList = countries=> {
  return countries
    .map(({ name, flags }) => {
      return `
          <li class="country-list__item">
              <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 50px height = 45px>
              <h2 class="country-list__name">${name.official}</h2>
          </li>`
    }).join('');
}

export const renderCountryInfo = countries => {
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


