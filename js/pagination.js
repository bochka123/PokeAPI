//всього є 1154 покемони
let url = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";
let select = document.querySelector("select");
let list = document.querySelector("ul");
let chosenPokemon = document.getElementById("chosenPokemon");
let buttons = document.getElementsByClassName("buttons")[0];
let limit = 10;
let offset = 0;
makeList(url);
select.addEventListener("change", (event)=>{
    limit = Number(event.target.value);
    url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    list.innerHTML = ``;
    makeList(url);
});
function makeList(url) {
    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.send();
    request.onload = function () {
        chosenPokemon.style.display = "none";
        buttons.style.display = "flex";
        let pokemonList = JSON.parse(request.response).results;
        pokemonList.forEach((pokemon) => {
            list.innerHTML += `
                <li class="listElement" onclick="show('${pokemon.url}')">${pokemon.name}</li>
            `;
        });
    }
}
function show(pokemonUrl){
    console.log(pokemonUrl);
    let pokemonRequest = new XMLHttpRequest();
    pokemonRequest.open("GET", pokemonUrl);
    pokemonRequest.send();
    pokemonRequest.onload = function (){
        let response = JSON.parse(pokemonRequest.response);
        list.innerHTML = ``;
        chosenPokemon.style.display = "flex";
        buttons.style.display = "none";
        chosenPokemon.innerHTML = `
            <button onclick="makeList('${url}')" class="backButton">Назад</button>
            <h3>Pokemon № ${response.id}</h3>
            <h2>${response.name[0].toUpperCase() + response.name.substring(1)}</h2>
            <img src="${response.sprites.front_default}" alt="">
        `;
    }
}
function prev(){
    offset -= limit;
    if(offset <= 0){
        document.querySelectorAll(".buttons button")[0].setAttribute("disabled", "true");
    }
    if(offset <= 1154){
        document.querySelectorAll(".buttons button")[1].removeAttribute("disabled");
    }
    url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    list.innerHTML = ``;
    makeList(url);
}
function next(){
    offset += limit;
    if(offset > 0){
        document.querySelectorAll(".buttons button")[0].removeAttribute("disabled");
    }
    if(offset >= 1154){
        document.querySelectorAll(".buttons button")[1].setAttribute("disabled", "true");
    }
    console.log(offset);
    url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    list.innerHTML = ``;
    makeList(url);
}