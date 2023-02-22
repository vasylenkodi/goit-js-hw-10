document.querySelector("#search-box").addEventListener("change",(function(e){var t;t=e.target.value,fetch("https://restcountries.com/v3.1/name/".concat(t)).then((function(e){return e.json()})).then(console.log)}));
//# sourceMappingURL=index.38e0e969.js.map
