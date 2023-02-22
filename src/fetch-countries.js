import { Notify } from "notiflix/build/notiflix-notify-aio";

export default function fetchCountries(name, ref) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then((response) => {
      clearCountryList(ref);
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
        createListOfCountries(countries, ref);
      } else {
        createCard(...countries, ref);
      }
    })
    .catch((error) =>
      Notify.failure("Oops, there is no country with that name")
    );
}

function createCard({ name, capital, population, flag, languages }, ref) {
  let string = `<li class="country-card"><h2 class="country-card__title">${name}</h2><img class="country-card__flag" src="${flag}"></img><div class="country-card__footer"><div class="country-card__group"><h3 class="country-card__subtitle">Capital:</h3><p class="country-card__text">${capital}</p></div><div class="country-card__group"><h3 class="country-card__subtitle">Population:</h3><p class="country-card__text">${population}</p></div><div class="country-card__group"><h3 class="country-card__subtitle">Languages:</h3><p class="country-card__text">${Object.values(
    languages
  ).join(", ")}</p></div></div></li> `;
  ref.insertAdjacentHTML("afterbegin", string);
}

function createListItemOfCountries({ name, flag }) {
  return `<li class="country-list__item">
  <img class="country-list__flag" src="${flag}" width="32px"></img>
${name}</li> `;
}

function createListOfCountries(countries, ref) {
  const markup = countries.map((country) => createListItemOfCountries(country));
  ref.insertAdjacentHTML("afterbegin", markup.join(""));
}

function tooManyCountriesError() {
  Notify.info("Too many matches found. Please enter a more specific name.");
}

function clearCountryList(ref) {
  ref.innerHTML = "";
}
