const form = document.querySelector("form");
const main = document.querySelector("main");
form.addEventListener("submit", (event)=>{
    event.preventDefault();
    let pokemon = event.target.pokemonInput.value;
    form.reset();
    let request = new XMLHttpRequest();
    request.open("GET", `https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    request.responseType = "json";
    request.send();
    request.onload = () => {
        if (request.status < 400) {
            drawPokemon(request.response);
        } else {
            main.innerHTML = `
                <div id="pokemon">
                    <h1 style="color:red">There is an error( Try again</h1>
                </div>
            `
        }
    }
});
function drawPokemon(pokemon) {
    console.log(pokemon);
    if (document.getElementById("pokemon")) {
        document.getElementById("pokemon").remove();
    }
    let div = document.createElement("div");
    div.id = "pokemon";
    div.innerHTML = `
        <h3>Pokemon № ${pokemon.id}</h3>
        <h2>${pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</h2>
        <img src="${pokemon.sprites.front_default}" alt="">
    `;
    main.append(div);
}