({searchBoxEl:document.querySelector("#search-box")}).searchBoxEl.addEventListener("change",(e=>{var t;t=e.target.value,fetch(`https://restcountries.com/v3.1/name/${t}`).then((e=>e.json())).then(console.log)}));
//# sourceMappingURL=index.00fda923.js.map
