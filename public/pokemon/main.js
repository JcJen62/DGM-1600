const data = {
  "count": 1118,
  "next": "https://pokeapi.co/api/v2/pokemon?offset=4&limit=4",
  "previous": null,
  "results": [{
    "name": "bulbasaur",
    "url": "https://pokeapi.co/api/v2/pokemon/1/"
  }, {
    "name": "ivysaur",
    "url": "https://pokeapi.co/api/v2/pokemon/2/"
  }, {
    "name": "venusaur",
    "url": "https://pokeapi.co/api/v2/pokemon/3/"
  }, {
    "name": "charmander",
    "url": "https://pokeapi.co/api/v2/pokemon/4/"
  }]
};

let pokeData = []

async function getPokemonData(url) {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

function populatePokeData() {
  getPokemonData(`https://pokeapi.co/api/v2/pokemon?offset=4&limit=25`).then(
    async data => {
      for (const pokemon of data.results) {
        await getPokemonData(pokemon.url).then((details) => {
          let pokemonDetails = extractPokeData(details)
          createCard(pokemonDetails)
          pokeData.push(pokemonDetails)
        })
      }
    })
}

function extractPokeData(pokemonDetail) {
  let ourPokeDetails = {
    name: pokemonDetail.name,
    pictureURL: pokemonDetail.sprites.other["official-artwork"].front_default,
    moves: []
  };

  ourPokeDetails.moves = pokemonDetail.moves.map(x => x.move.name)
  return ourPokeDetails;
}

const loadButton = document.querySelector('.load')
const newPokemonButton = document.querySelector('.newPokemon')
const pokeGrid = document.querySelector('.pokemonGrid')

newPokemonButton.addEventListener('click', () => {
  let pokeName = prompt('What is your new Pokemon name?')
  let newPokemon = new Pokemon(
    pokeName,
    'https://i.redd.it/3k7uvh8rz5k41.jpg',
    ['Tackle', 'Retreat', 'Head Butt', 'Faint', 'Cut', 'Scratch', 'Mega-Punch', 'Snore']
  )
  createCard(newPokemon)
})

function Pokemon(name, pictureURL, moves) {
  this.name = name
  this.pictureURL = pictureURL
  this.moves = moves
}

function createCard(data) {
  let pokeScene = document.createElement('div')
  pokeScene.className = 'scene'
  let pokeCard = document.createElement('div')
  pokeCard.className = 'card'
  pokeCard.addEventListener('click', function () {
    pokeCard.classList.toggle('is-flipped')
  })
  pokeCard.appendChild(populateCardFront(data))
  pokeCard.appendChild(populateCardBack(data))
  pokeScene.appendChild(pokeCard)
  pokeGrid.appendChild(pokeScene)
}

function populateCardFront(data) {
  let pokeFront = document.createElement('div')
  pokeFront.className = 'card__face card__face--front'
  let frontLabel = document.createElement('p')
  frontLabel.className = "heroPokeName"
  frontLabel.textContent = data.name
  let frontImage = document.createElement('img')
  frontImage.className = 'pokeHero'
  frontImage.src = data.pictureURL
  pokeFront.appendChild(frontImage)
  pokeFront.appendChild(frontLabel)
  return pokeFront
}

function populateCardBack(data) {
  let pokeBack = document.createElement('div')
  pokeBack.className = 'card__face card__face--back'
  let backLabel = document.createElement('p')
  backLabel.className = 'lableTitle'
  backLabel.textContent = `Total Moves ${data.moves.length}`
  let backDescription = document.createElement('p')
  backDescription.className = 'descriptionTitle'
  backDescription.textContent = 'Highlighted Moves'
  pokeBack.appendChild(backLabel)
  pokeBack.appendChild(backDescription)
  let moveList = document.createElement('ul')
  for (let i = 0; i <= 7; i++) {
    let move = document.createElement('li')
    move.className = 'moveText'
    move.textContent = data.moves[i]
    moveList.appendChild(move)
  }
  pokeBack.appendChild(moveList)
  return pokeBack
}

// function createPokeCards() {
//   for (const item of pokeData) {
//     createCard(item)
//   }
// }

loadButton.addEventListener('click', () => {
  populatePokeData();
})