import { POKEMON_BATCH_SIZE } from "./config.js";

export const state = {
  offset: 0,
  isLoading: false,
  pokemonList: [],
};

export const setLoadingState = (isLoading) => {
  state.isLoading = isLoading;
};

export const addPokemonToState = (pokemon) => {
  state.pokemonList.push(pokemon);
};

export const increaseOffset = () => {
  state.offset += POKEMON_BATCH_SIZE;
};

export const resetPokemonState = () => {
  state.offset = 0;
  state.isLoading = false;
  state.pokemonList = [];
};
