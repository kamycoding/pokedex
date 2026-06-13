import { POKEMON_BATCH_SIZE } from "./config.js";
import { fetchPokemonDetails, fetchPokemonList } from "./api.js";
import {
  addPokemonToState,
  increaseOffset,
  setLoadingState,
  state,
} from "./state.js";
import { renderPokemonCards, setLoadMoreButtonState } from "./render.js";
import { getPokemonId } from "./utils.js";

const fetchPokemonBatchDetails = async (pokemonList) => {
  const pokemonDetailsPromises = pokemonList.map((pokemon) => {
    const pokemonId = getPokemonId(pokemon.url);

    return fetchPokemonDetails(pokemonId);
  });

  return Promise.all(pokemonDetailsPromises);
};

const loadPokemonBatch = async () => {
  if (state.isLoading) {
    return;
  }

  setLoadingState(true);
  setLoadMoreButtonState(true);

  const pokemonListData = await fetchPokemonList(
    POKEMON_BATCH_SIZE,
    state.offset,
  );

  const pokemonDetailsList = await fetchPokemonBatchDetails(
    pokemonListData.results,
  );

  pokemonDetailsList.forEach((pokemon) => {
    addPokemonToState(pokemon);
  });

  renderPokemonCards(pokemonDetailsList);
  increaseOffset();

  setLoadingState(false);
  setLoadMoreButtonState(false);
};

loadPokemonBatch();
