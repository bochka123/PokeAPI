let allPokemons = [];
let sortedPokemons = [];
const url = "https://pokeapi.co/api/v2/pokemon?limit=127";
const main = document.querySelector("main");
const form = document.querySelector("form");
const request = new XMLHttpRequest();
request.open("GET", url);
request.send();
request.onload = function () {
    const pokemons = JSON.parse(request.response).results;
    pokemons.forEach(pokemon => {
        let promise = new Promise(function (resolve, reject) {
            let pokemonRequest = new XMLHttpRequest();
            pokemonRequest.open("GET", pokemon.url);
            pokemonRequest.send();
            pokemonRequest.onload = function () {
                if (pokemonRequest.status === 200) {
                    resolve(JSON.parse(pokemonRequest.response));
                } else {
                    reject(pokemonRequest.statusText)
                }
            }
            pokemonRequest.onerror = function () {
                reject(pokemonRequest.statusText);
            }
        });
        promise.then((pokemon) => {
            allPokemons.push(pokemon);
            drawPokemon(pokemon);
        });
    });
}

function drawPokemon(pokemon) {
    let getTypes = "";
    pokemon.types.forEach(type => {
        getTypes += `
        <h4>${type.type.name}</h4>
        `
    })
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
            <div class="heightAndWeight">
                <p>Висота: ${pokemon.height}</p>
                <p>Вага: ${pokemon.weight}</p>
            </div>
            <div class="types">
                ${getTypes}
            </div>
        </div>
    `;
}
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    sortedPokemons = allPokemons;
    //name
    if(event.target.name.value){
        sortedPokemons = sortedPokemons.filter(function (pokemon){
            return pokemon.name.indexOf(event.target.name.value.toLowerCase()) !== -1;
        });
    }
    //hp
    if(event.target.minHp.value > 10){
        sortedPokemons = sortedPokemons.filter(function (pokemon){
            return pokemon.stats[0].base_stat >= event.target.minHp.value;
        });
    }
    if(event.target.maxHp.value < 250){
        sortedPokemons = sortedPokemons.filter(function (pokemon){
            return pokemon.stats[0].base_stat <= event.target.maxHp.value;
        });
    }
    //attack
    if(event.target.minAttack.value > 5){
        sortedPokemons = sortedPokemons.filter(function (pokemon){
            return pokemon.stats[1].base_stat >= event.target.minAttack.value;
        });
    }
    if(event.target.maxAttack.value < 130){
        sortedPokemons = sortedPokemons.filter(function (pokemon){
            return pokemon.stats[1].base_stat <= event.target.maxAttack.value;
        });
    }
    //defense
    if(event.target.minDefense.value > 5){
        sortedPokemons = sortedPokemons.filter(function (pokemon){
            return pokemon.stats[2].base_stat >= event.target.minDefense.value;
        });
    }
    if(event.target.maxDefense.value < 180){
        sortedPokemons = sortedPokemons.filter(function (pokemon){
            return pokemon.stats[2].base_stat <= event.target.maxDefense.value;
        });
    }
    //speed
    if(event.target.minSpeed.value > 15){
        sortedPokemons = sortedPokemons.filter(function (pokemon){
            return pokemon.stats[5].base_stat >= event.target.minSpeed.value;
        });
    }
    if(event.target.maxSpeed.value < 150){
        sortedPokemons = sortedPokemons.filter(function (pokemon){
            return pokemon.stats[5].base_stat <= event.target.maxSpeed.value;
        });
    }
    //height
    if(event.target.minHeight.value > 1){
        sortedPokemons = sortedPokemons.filter(function (pokemon){
            return pokemon.height >= event.target.minHeight.value;
        });
    }
    if(event.target.maxHeight.value < 89){
        sortedPokemons = sortedPokemons.filter(function (pokemon){
            return pokemon.height<= event.target.maxHeight.value;
        });
    }
    //weight
    if(event.target.minWeight.value > 0){
        sortedPokemons = sortedPokemons.filter(function (pokemon){
            return pokemon.weight >= event.target.minWeight.value;
        });
    }
    if(event.target.maxWeight.value < 3001){
        sortedPokemons = sortedPokemons.filter(function (pokemon){
            return pokemon.weight<= event.target.maxWeight.value;
        });
    }
    // type
    event.target.type.forEach(function (filterType){
        console.log(filterType);
        console.log(filterType.value);
        if(!filterType.checked){
            sortedPokemons = sortedPokemons.filter(function (pokemon){
                for(i in pokemon.types){
                    if(pokemon.types[i].type.name === filterType.value) {
                        return false;
                    }
                }
                return true;
            })
        }
    })
    main.innerHTML = null;
    sortedPokemons.forEach((pokemon)=>{
        drawPokemon(pokemon);
    })
})