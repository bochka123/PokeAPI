//всього є 1154 покемони
let url = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";
const select = document.querySelector("select");
const list = document.querySelector("ul");
const chosenPokemon = document.getElementById("chosenPokemon");
const buttons = document.getElementsByClassName("buttons")[0];
const numbers = document.querySelectorAll(".buttons li");
const selectElement = document.querySelector("select");
const centralNumber = document.getElementsByClassName("central")[0];
let limit = 10;
let offset = 0;
let currentPage = 0, min = 0, max = 4;
makeList(url);
select.addEventListener("change", (event) => {
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
        selectElement.style.display = "flex";
        buttons.style.display = "flex";
        let pokemonList = JSON.parse(request.response).results;
        pokemonList.forEach((pokemon) => {
            console.log(pokemon);
            list.innerHTML += `
                <li class="listElement" onclick="show('${pokemon.url}')">${pokemon.name}</li>
            `;
        });
    }
}

function show(pokemonUrl) {
    let pokemonRequest = new XMLHttpRequest();
    pokemonRequest.open("GET", pokemonUrl);
    pokemonRequest.send();
    pokemonRequest.onload = function () {
        let response = JSON.parse(pokemonRequest.response);
        list.innerHTML = ``;
        chosenPokemon.style.display = "flex";
        selectElement.style.display = "none";
        buttons.style.display = "none";
        chosenPokemon.innerHTML = `
            <button onclick="makeList('${url}')" class="backButton">Назад</button>
            <h3>Pokemon № ${response.id}</h3>
            <h2>${response.name[0].toUpperCase() + response.name.substring(1)}</h2>
            <img src="${response.sprites.front_default}" alt="">
        `;
    }
}

function prev() {
    offset -= limit;
    if (offset <= 0) {
        document.querySelectorAll(".buttons button")[0].setAttribute("disabled", "true");
    }
    if (offset <= 1154) {
        document.querySelectorAll(".buttons button")[1].removeAttribute("disabled");
    }
    url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    list.innerHTML = ``;
    makeList(url);
}

function next() {
    offset += limit;
    if (offset > 0) {
        document.querySelectorAll(".buttons button")[0].removeAttribute("disabled");
    }
    if (offset >= 1154) {
        document.querySelectorAll(".buttons button")[1].setAttribute("disabled", "true");
    }
    console.log(offset);
    url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    list.innerHTML = ``;
    makeList(url);
}

numbers.forEach((number) => {
    number.addEventListener("click", function () {
        currentPage = Number(number.textContent) - 1;
        document.getElementById("selected").removeAttribute("id");
        if (currentPage > 2 && currentPage < (1154 / limit) - 1) {
            centralNumber.id = "selected";
            for (let i = currentPage - 1, j = 0; i < numbers.length + currentPage - 1; i++, j++) {
                numbers[j].textContent = String(i);
            }
        } else {
            if (this.textContent === "3") {
                centralNumber.id = "selected";
            } else {
                this.id = "selected";
            }
            for (let i = 0; i < numbers.length; i++) {
                numbers[i].textContent = String(i + 1);
            }
        }
        offset = currentPage * limit;
        console.log(offset);
        url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
        list.innerHTML = ``;
        makeList(url);
    })
})