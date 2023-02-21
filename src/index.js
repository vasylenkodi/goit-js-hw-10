import "./css/styles.css";
import fetchCountries from "./fetch-countries";
import debounce from "lodash.debounce";

const DEBOUNCE_DELAY = 300;

const refs = {
    searchBoxEl: document.querySelector("#search-box"),
    countryListEl: document.querySelector('.country-list'),
};

refs.searchBoxEl.addEventListener(
  "input",
  debounce((event) => {
    if (event.target.value.trim() === "") {
        clearCountryList();
        return;
    }
      fetchCountries(event.target.value.trim(), refs.countryListEl);
      
  }, 300)
);

function clearCountryList() {
  refs.countryListEl.innerHTML = "";
}