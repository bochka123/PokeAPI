let allPokemons = [];
const url = "https://pokeapi.co/api/v2/pokemon?limit=127";
const main = document.querySelector("main");
const form = document.querySelector("form");
let order = true;
let object = "id";
const request = new XMLHttpRequest();
request.open("GET", url);
request.send();
request.onload = function () {
    const pokemons = JSON.parse(request.response).results;
    pokemons.forEach(pokemon=>{
        let promise = new Promise(function (resolve, reject){
            let pokemonRequest = new XMLHttpRequest();
            pokemonRequest.open("GET", pokemon.url);
            pokemonRequest.send();
            pokemonRequest.onload = function() {
                if(pokemonRequest.status === 200) {
                    resolve(JSON.parse(pokemonRequest.response));
                }
                else {
                    reject(pokemonRequest.statusText)
                }
            }
            pokemonRequest.onerror = function() {
                reject(pokemonRequest.statusText);
            }
        })
        promise.then((pokemon)=>{
            allPokemons.push(pokemon);
            drawPokemon(pokemon);
        })
    });
}
function drawPokemon(pokemon){
    main.innerHTML += `
        <div id="pokemon">
            <p>Pokemon № ${pokemon.id}</p>
            <h3>${pokemon.name}</h3>
            <img src="${pokemon.sprites.front_default}" alt="">
            <div class="stats">
                <p class="hp stat">&#10084;${pokemon.stats[0].base_stat}</p>
                <p class="attack stat">&#9876;${pokemon.stats[1].base_stat}</p>
                <p class="defense stat">&#128737;${pokemon.stats[2].base_stat}</p>
                <p class="speed stat">&#128007;${pokemon.stats[5].base_stat}</p>
            </div>
        </div>
    `
}
form.addEventListener("change", (event)=>{
    let value = event.target.value;
    switch (value){
        case "id":
            object = "id";
            break;
        case "hp":
            object = "hp";
            break;
        case "attack":
            object = "attack";
            break;
        case "defense":
            object = "defense";
            break;
        case "speed":
            object = "speed";
            break;
        case "downToUp":
            order = true;
            break;
        case "upToDown":
            order = false;
            break;
    }
    sort(object, order);
})
function sort(item){
    main.innerHTML = null;
    switch (item) {
        case "id":
            allPokemons = allPokemons.sort(function (first, second) {
                if (first.id > second.id) {
                    return order;
                }
                if (first.id < second.id) {
                    return -order;
                }
            });
            break;
        case "hp":
            allPokemons = allPokemons.sort(function (first, second) {
                if (first.stats[0].base_stat > second.stats[0].base_stat) {
                    return order;
                }
                if (first.stats[0].base_stat < second.stats[0].base_stat) {
                    return -order;
                }
            });
            break;
        case "attack":
            allPokemons = allPokemons.sort(function (first, second) {
                if (first.stats[1].base_stat > second.stats[1].base_stat) {
                    return order;
                }
                if (first.stats[1].base_stat < second.stats[1].base_stat) {
                    return -order;
                }
            });
            break;
        case "defense":
            allPokemons = allPokemons.sort(function (first, second) {
                if (first.stats[2].base_stat > second.stats[2].base_stat) {
                    return order;
                }
                if (first.stats[2].base_stat < second.stats[2].base_stat) {
                    return -order;
                }
            });
            break;
        case "speed":
            allPokemons = allPokemons.sort(function (first, second) {
                if (first.stats[5].base_stat > second.stats[5].base_stat) {
                    return order;
                }
                if (first.stats[5].base_stat < second.stats[5].base_stat) {
                    return -order;
                }
            });
            break;
    }
    if(!order){
        allPokemons.reverse();
    }
    allPokemons.forEach((pokemon)=>{
        drawPokemon(pokemon);
    })
}