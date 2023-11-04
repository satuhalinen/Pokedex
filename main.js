const content = document.querySelector(".cards");
const searchBar = document.getElementById("searchBar");
const pokemonAmount = document.querySelector("#pokemonAmount");

const typeEmoji = {
  normal: "🔘",
  fighting: "🗡️",
  flying: "🪽",
  poison: "☠️",
  ground: "⏚",
  rock: "🪨",
  bug: "🐛",
  ghost: "👻",
  steel: "🏋️‍♀️",
  fire: "🔥",
  water: "💧",
  grass: "🌱",
  electric: "⚡️",
  psychic: "🔮",
  ice: "🧊",
  dragon: "🐉",
  dark: "🌑",
  fairy: "🦄",
  unknown: "?",
  shadow: "🌗",
};

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value;
  const filteredPokemons = pokeData.filter((pokemon) => {
    const typeArray = pokemon.types.map((item) => {
      return item.type.name;
    });
    return (
      pokemon.name.includes(searchString) || typeArray.includes(searchString)
    );
  });
  pokeCards(filteredPokemons);
});

let pokeData = [];

let fetchData = async (end, start) => {
  await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${end}&offset=${start}`)
    .then((response) => response.json())
    .then((data) => {
      const fetches = data.results.map((item) => {
        return fetch(item.url)
          .then((res) => res.json())
          .then((data) => {
            return {
              id: data.id,
              name: data.name,
              img: data.sprites.other["official-artwork"].front_default,
              types: data.types,
              height: data.height * 10,
              weight: data.weight / 10,
            };
          });
      });

      Promise.all(fetches).then((res) => {
        pokeData = res;
        pokeCards(pokeData);
      });
    });
};

const pokeCards = (pokeData) => {
  const cards = pokeData
    .map((pokemon) => {
      return `<div class="card">
    <img src="${pokemon.img}" alt="${pokemon.name}" />
    <p>${pokemon.id}</p>
    <h2>${pokemon.name}</h2>
    <div class="measures">
    <div class="measure">📏 ${pokemon.height} cm</div>
    <div class="measure">⚖️ ${pokemon.weight} kg</div>
    </div>
    <div class="types">
    ${pokemon.types.map((type) => getType(type)).join("")}
  </div>
  </div>`;
    })
    .join("");
  content.innerHTML = cards;
};

const getType = (type) => {
  let typeName = type.type.name;
  return `<div class="type">${typeEmoji[typeName]}</div>`;
};

const endTable = [151, 100, 135, 107, 156, 72, 88, 96, 112];
const startTable = [0, 151, 251, 386, 493, 649, 721, 809, 905];
const buttons = document.querySelectorAll(".buttons button");
let i = 0;

for (const item of buttons) {
  let j = i;
  item.addEventListener("click", function () {
    fetchData(endTable[j], startTable[j]);
    pokemonAmount.textContent = `There are
      ${endTable[j]} pokemons in generation ${j + 1}.`;
  });
  i = i + 1;
}
