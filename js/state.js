export const state = {
  offset: 0,
  isLoading: false,
  pokemonList: [],
  allPokemonList: [],
  searchResults: [],
  isSearchActive: false,
};

export const setLoadingState = (isLoading) => {
  state.isLoading = isLoading;
};

export const addPokemonToState = (pokemon) => {
  state.pokemonList.push(pokemon);
};

export const addAllPokemonToState = (pokemonList) => {
  state.allPokemonList = pokemonList;
};

export const setSearchResults = (results) => {
  state.searchResults = results;
  state.isSearchActive = results.length > 0;
};

export const clearSearchResults = () => {
  state.searchResults = [];
  state.isSearchActive = false;
};

export const increaseOffset = () => {
  state.offset += POKEMON_BATCH_SIZE;
};

export const resetPokemonState = () => {
  state.offset = 0;
  state.isLoading = false;
  state.pokemonList = [];
  state.allPokemonList = [];
  state.searchResults = [];
  state.isSearchActive = false;
};
