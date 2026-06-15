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

const fetchBatchDetails = async (pokemonList) => {
  const promises = pokemonList.map((pokemon) => {
    return fetchPokemonDetails(getPokemonId(pokemon.url));
  });

  return Promise.all(promises);
};

const hasReachedMax = () => {
  return state.offset >= MAX_POKEMON_COUNT;
};

const getCurrentBatchSize = () => {
  return Math.min(POKEMON_BATCH_SIZE, MAX_POKEMON_COUNT - state.offset);
};

const startLoading = () => {
  setLoadingState(true);
  setLoadMoreButtonState(true);
  setLoadMoreButtonText("Loading...");
};

const stopLoading = () => {
  setLoadingState(false);

  if (hasReachedMax()) {
    setLoadMoreButtonState(true);
    setLoadMoreButtonText("All Pokémon loaded");
    return;
  }

  setLoadMoreButtonState(false);
  setLoadMoreButtonText("Load More");
};

const saveBatchToState = (pokemonDetailsList) => {
  pokemonDetailsList.forEach((pokemon) => {
    addPokemonToState(pokemon);
  });
};

const loadPokemonBatch = async () => {
  if (state.isLoading || hasReachedMax()) {
    return;
  }

  startLoading();

  try {
    const batchSize = getCurrentBatchSize();
    const listData = await fetchPokemonList(batchSize, state.offset);
    const detailsList = await fetchBatchDetails(listData.results);

    saveBatchToState(detailsList);
    renderPokemonCards(detailsList);
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
    const listData = await fetchPokemonList(MAX_POKEMON_COUNT, 0);
    const detailsList = await fetchBatchDetails(listData.results);

    addAllPokemonToState(detailsList);
  } catch (error) {
    console.error("Failed to load all Pokémon for search:", error);
  }
};

dom.loadMoreButton.addEventListener("click", loadPokemonBatch);

initPokemonDialog();
initSearch();
loadPokemonBatch();
loadAllPokemonInBackground();
