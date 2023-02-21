import { Notify } from "notiflix/build/notiflix-notify-aio";

export default function fetchCountries(name, ref) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then((response) => {
        clearCountryList(ref);
        console.log(response);
        if (response.status === 404) {
            Notify.failure("Oops, there is no country with that name");
        }
      return response.json();
    })
      .then((data) => {
      const countries = data.map((dataItem) => {
        return {
          name: dataItem.name.official,
          capital: dataItem.capital[0],
          population: dataItem.population,
          flag: dataItem.flags.svg,
          languages: dataItem.languages,
        };
      });
      if (data.length > 10) {
        tooManyCountriesError();
      } else if (data.length > 1) {
        countries.map((country) => createListOfCountries(country, ref));
      } else {
        createCard(...countries, ref);
      }
    })
    .catch((error) => console.log(error));
}

function createCard({ name, capital, population, flag, languages }, ref) {
  let string = `<li class="country-card"><h2 class="country-card__title">${name}</h2><img class="country-card__flag" src="${flag}"></img><h3 class="country-card__subtitle">Capital:</h3><p class="country-card__text">${capital}</p><h3 class="country-card__subtitle">Population:</h3><p class="country-card__text">${population}</p><h3 class="country-card__subtitle">Languages:</h3><p class="country-card__text">${Object.values(
    languages
  ).join(", ")}</p></li> `;
  ref.insertAdjacentHTML("afterbegin", string);
}

function createListOfCountries({ name, flag }, ref) {
  let string = `<li class="country-list__item">
  <img class="country-list__flag" src="${flag}" width="32px"></img>
${name}</li> `;
  ref.insertAdjacentHTML("afterbegin", string);
}

function tooManyCountriesError() {
  Notify.info("Too many matches found. Please enter a more specific name.");
}

function clearCountryList(ref) {
  ref.innerHTML = "";
}
