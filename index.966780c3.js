({searchBoxEl:document.querySelector("#search-box")}).searchBoxEl.addEventListener("input",(e=>{var o;o=e.target.value,fetch(`https://restcountries.com/v3.1/name/${o}?fields=name,capital,population,flags,languages`).then((e=>(console.log(e),e.json()))).then((e=>console.log(e[0])))}));
//# sourceMappingURL=index.966780c3.js.map
