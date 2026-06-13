import { dom } from "./dom.js";
import { createPokemonCardTemplate } from "./templates.js";

export const renderPokemonCards = (pokemonList) => {
  const pokemonCardsTemplate = pokemonList
    .map((pokemon) => {
      return createPokemonCardTemplate(pokemon);
    })
    .join("");

  dom.pokemonGrid.insertAdjacentHTML("beforeend", pokemonCardsTemplate);
};

export const replacePokemonCards = (pokemonList) => {
  clearPokemonGrid();
  renderPokemonCards(pokemonList);
};

export const clearPokemonGrid = () => {
  dom.pokemonGrid.innerHTML = "";
};

export const showNotFoundMessage = () => {
  dom.notFoundMessage.hidden = false;
};

export const hideNotFoundMessage = () => {
  dom.notFoundMessage.hidden = true;
};

export const setLoadMoreButtonState = (isDisabled) => {
  dom.loadMoreButton.disabled = isDisabled;
};

export const showLoadMoreButton = () => {
  dom.loadMoreButton.hidden = false;
};

export const hideLoadMoreButton = () => {
  dom.loadMoreButton.hidden = true;
};
