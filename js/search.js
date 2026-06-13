import { MIN_SEARCH_LENGTH } from "./config.js";
import { dom } from "./dom.js";
import { state } from "./state.js";
import {
  hideLoadMoreButton,
  hideNotFoundMessage,
  replacePokemonCards,
  showLoadMoreButton,
  showNotFoundMessage,
} from "./render.js";

const getSearchValue = () => {
  return dom.searchInput.value.trim().toLowerCase();
};

const getFilteredPokemon = (searchValue) => {
  return state.pokemonList.filter((pokemon) => {
    return pokemon.name.includes(searchValue);
  });
};

const resetSearchResults = () => {
  hideNotFoundMessage();
  showLoadMoreButton();
  replacePokemonCards(state.pokemonList);
};

const renderSearchResults = (filteredPokemon) => {
  hideLoadMoreButton();
  replacePokemonCards(filteredPokemon);

  if (filteredPokemon.length === 0) {
    showNotFoundMessage();

    return;
  }

  hideNotFoundMessage();
};

const handleSearch = () => {
  const searchValue = getSearchValue();

  if (searchValue.length === 0) {
    resetSearchResults();

    return;
  }

  if (searchValue.length < MIN_SEARCH_LENGTH) {
    hideNotFoundMessage();

    return;
  }

  const filteredPokemon = getFilteredPokemon(searchValue);

  renderSearchResults(filteredPokemon);
};

const handleSearchSubmit = (event) => {
  event.preventDefault();
  handleSearch();
};

export const initSearch = () => {
  dom.searchForm.addEventListener("submit", handleSearchSubmit);
  dom.searchInput.addEventListener("input", handleSearch);
};
