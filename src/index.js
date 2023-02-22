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
    const enteredValue = event.target.value;
    if (enteredValue.trim() === "") {
      clearCountryList();
      return;
    }
    fetchCountries(enteredValue.trim(), refs.countryListEl);
  }, DEBOUNCE_DELAY)
);

function clearCountryList() {
  refs.countryListEl.innerHTML = "";
}