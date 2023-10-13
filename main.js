const content = document.querySelector(".cards");
const searchBar = document.getElementById("searchBar");
const pokemonAmount = document.querySelector("#pokemonAmount");

let amount = 151;

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

const buttonOne = document.getElementById("buttonI");
buttonOne.addEventListener("click", tellAmountOne);

function tellAmountOne() {
  amount = 151;
  fetchData(amount, 0);
  pokemonAmount.textContent = `There are 151 pokemons in generation 1.`;
}

const buttonTwo = document.getElementById("buttonII");
buttonTwo.addEventListener("click", tellAmountTwo);

function tellAmountTwo() {
  amount = 100;
  fetchData(amount, 151);
  pokemonAmount.textContent = `There are 100 pokemons in generation 2.`;
}

const buttonThree = document.getElementById("buttonIII");
buttonThree.addEventListener("click", tellAmountThree);

function tellAmountThree() {
  amount = 135;
  fetchData(amount, 251);
  pokemonAmount.textContent = `There are 135 pokemons in generation 3.`;
}

const buttonFour = document.getElementById("buttonIV");
buttonFour.addEventListener("click", tellAmountFour);

function tellAmountFour() {
  amount = 107;
  fetchData(amount, 386);
  pokemonAmount.textContent = `There are 107 pokemons in generation 4.`;
}

const buttonFive = document.getElementById("buttonV");
buttonFive.addEventListener("click", tellAmountFive);

function tellAmountFive() {
  amount = 156;
  fetchData(amount, 493);
  pokemonAmount.textContent = `There are 156 pokemons in generation 5.`;
}

const buttonSix = document.getElementById("buttonVI");
buttonSix.addEventListener("click", tellAmountSix);

function tellAmountSix() {
  amount = 72;
  fetchData(amount, 649);
  pokemonAmount.textContent = `There are 72 pokemons in generation 6.`;
}

const buttonSeven = document.getElementById("buttonVII");
buttonSeven.addEventListener("click", tellAmountSeven);

function tellAmountSeven() {
  amount = 88;
  fetchData(amount, 721);
  pokemonAmount.textContent = `There are 88 pokemons in generation 7.`;
}

const buttonEight = document.getElementById("buttonVIII");
buttonEight.addEventListener("click", tellAmountEight);

function tellAmountEight() {
  amount = 96;
  fetchData(amount, 809);
  pokemonAmount.textContent = `There are 96 pokemons in generation 8.`;
}

const buttonNine = document.getElementById("buttonIX");
buttonNine.addEventListener("click", tellAmountNine);

function tellAmountNine() {
  amount = 112;
  fetchData(amount, 905);
  pokemonAmount.textContent = `There are 112 pokemons in generation 9.`;
}
