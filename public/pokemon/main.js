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
  
  //sprites..other..offical-artwork
  async function getPokemonData(url){
      try {
    const response = await fetch(url)
    const data = await response.json()
      return data
    } catch (error) {
      console.error(error)
    }
  }
  
  function populatePokeData(){
      getPokemonData(`https://pokeapi.co/api/v2/pokemon?offset=4&limit=25`).then(
          async data => {
            for (const pokemon of data.results) {
              await getPokemonData(pokemon.url).then((details) => {
                pokeData.push(extractPokeData(details))
            })
          }
        })
    }
    
    function extractPokeData(pokemonDetail) {
        let ourPokeDetails =  {
            name: pokemonDetail.name,
            pictureURL: pokemonDetail.sprites.other["official-artwork"].front_default,
            moves: []
      };
      pokemonDetail.moves.forEach((element, index, array) => {
          if (element.move.name != undefined || element.move.name != null) {
            ourPokeDetails.moves.push(element.move.name);
          }
      })
      return ourPokeDetails;
    }
    
  const loadButton = document.querySelector('.load')
    
  loadButton.addEventListener('click', () => {
    populatePokeData();
    console.log(pokeData)
  })
  