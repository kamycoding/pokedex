import { MAX_POKEMON_COUNT, POKEMON_BATCH_SIZE } from "./config.js";
import { fetchPokemonDetails, fetchPokemonList } from "./api.js";
import { dom } from "./dom.js";
import { initPokemonDialog } from "./modal.js";
import { initSearch } from "./search.js";
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

const hasReachedMaxPokemonCount = () => {
  return state.offset >= MAX_POKEMON_COUNT;
};

const getCurrentBatchSize = () => {
  const remainingPokemonCount = MAX_POKEMON_COUNT - state.offset;

  return Math.min(POKEMON_BATCH_SIZE, remainingPokemonCount);
};

const loadPokemonBatch = async () => {
  if (state.isLoading || hasReachedMaxPokemonCount()) {
    return;
  }

  setLoadingState(true);
  setLoadMoreButtonState(true);

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
  } finally {
    setLoadingState(false);

    if (hasReachedMaxPokemonCount()) {
      setLoadMoreButtonState(true);

      return;
    }

    setLoadMoreButtonState(false);
  }
};

dom.loadMoreButton.addEventListener("click", loadPokemonBatch);

initPokemonDialog();
initSearch();
loadPokemonBatch();
