import { MAX_POKEMON_COUNT, POKEMON_BATCH_SIZE } from "./config.js";
import { fetchPokemonDetails, fetchPokemonList } from "./api.js";
import { dom } from "./dom.js";
import { initPokemonDialog } from "./modal.js";
import { initSearch } from "./search.js";
import {
  addPokemonToState,
  addAllPokemonToState,
  increaseOffset,
  setLoadingState,
  state,
} from "./state.js";
import {
  renderPokemonCards,
  setLoadMoreButtonState,
  setLoadMoreButtonText,
  showErrorMessage,
} from "./render.js";
import { getPokemonId } from "./utils.js";

const fetchPokemonBatchDetails = async (pokemonList) => {
  const pokemonDetailsPromises = pokemonList.map((pokemon) => {
    const pokemonId = getPokemonId(pokemon.url);

    return fetchPokemonDetails(pokemonId);
  });

  return Promise.all(pokemonDetailsPromises);
};

const hasReachedMaxPokemonCount = () => {
  return state.offset >= MAX_POKEMON_COUNT;
};

const getCurrentBatchSize = () => {
  const remainingPokemonCount = MAX_POKEMON_COUNT - state.offset;

  return Math.min(POKEMON_BATCH_SIZE, remainingPokemonCount);
};

const startLoading = () => {
  setLoadingState(true);
  setLoadMoreButtonState(true);
  setLoadMoreButtonText("Loading...");
};

const stopLoading = () => {
  setLoadingState(false);

  if (hasReachedMaxPokemonCount()) {
    setLoadMoreButtonState(true);
    setLoadMoreButtonText("All Pokémon loaded");

    return;
  }

  setLoadMoreButtonState(false);
  setLoadMoreButtonText("Load More");
};

const loadPokemonBatch = async () => {
  if (state.isLoading || hasReachedMaxPokemonCount()) {
    return;
  }

  startLoading();

  try {
    const currentBatchSize = getCurrentBatchSize();

    const pokemonListData = await fetchPokemonList(
      currentBatchSize,
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
  } catch (error) {
    console.error(error);
    showErrorMessage();
  } finally {
    stopLoading();
  }
};

const loadAllPokemonInBackground = async () => {
  try {
    const pokemonListData = await fetchPokemonList(MAX_POKEMON_COUNT, 0);

    const pokemonDetailsList = await fetchPokemonBatchDetails(
      pokemonListData.results,
    );

    addAllPokemonToState(pokemonDetailsList);
  } catch (error) {
    console.error("Failed to load all Pokémon for search:", error);
  }
};

dom.loadMoreButton.addEventListener("click", loadPokemonBatch);

initPokemonDialog();
initSearch();
loadPokemonBatch();
loadAllPokemonInBackground();
