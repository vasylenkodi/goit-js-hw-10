document.querySelector("#search-box").addEventListener("input",(function(e){var n;n=e.target.value,fetch("https://restcountries.com/v3.1/name/".concat(n,"?fields=name,capital,population,flags,languages")).then((function(e){return console.log(e),e.json()})).then((function(e){return console.log(e[0])}))}));
//# sourceMappingURL=index.39e73331.js.map
