import { dom } from "./dom.js";
import { state } from "./state.js";
import { createPokemonDialogTemplate } from "./templates.js";

let activePokemonId = null;

const getActiveList = () => {
  return state.isSearchActive ? state.searchResults : state.pokemonList;
};

const getPokemonById = (pokemonId) => {
  const sourceList =
    state.allPokemonList.length > 0 ? state.allPokemonList : state.pokemonList;

  return sourceList.find((pokemon) => pokemon.id === pokemonId);
};

const getActivePokemonIndex = () => {
  return getActiveList().findIndex((pokemon) => pokemon.id === activePokemonId);
};

const updateNavigationButtons = () => {
  const activeList = getActiveList();
  const activePokemonIndex = getActivePokemonIndex();
  const prevButton = dom.dialogContent.querySelector('[data-id="prev-button"]');
  const nextButton = dom.dialogContent.querySelector('[data-id="next-button"]');

  if (prevButton) prevButton.disabled = activePokemonIndex <= 0;
  if (nextButton)
    nextButton.disabled = activePokemonIndex >= activeList.length - 1;
};

const renderDialogContent = (pokemon) => {
  dom.dialogContent.innerHTML = createPokemonDialogTemplate(pokemon);
  updateNavigationButtons();
  bindNavigationButtons();
};

const bindNavigationButtons = () => {
  const prevButton = dom.dialogContent.querySelector('[data-id="prev-button"]');
  const nextButton = dom.dialogContent.querySelector('[data-id="next-button"]');

  if (prevButton) prevButton.addEventListener("click", showPreviousPokemon);
  if (nextButton) nextButton.addEventListener("click", showNextPokemon);
};

export const openPokemonDialog = (pokemonId) => {
  const pokemon = getPokemonById(pokemonId);

  if (!pokemon) {
    return;
  }

  activePokemonId = pokemon.id;
  renderDialogContent(pokemon);
  document.body.style.overflow = "hidden";
  dom.dialog.showModal();
};

export const closePokemonDialog = () => {
  dom.dialog.close();
  document.body.style.overflow = "";
  activePokemonId = null;
};

const showPreviousPokemon = () => {
  const activeList = getActiveList();
  const activePokemonIndex = getActivePokemonIndex();
  const previousPokemon = activeList[activePokemonIndex - 1];

  if (!previousPokemon) {
    return;
  }

  activePokemonId = previousPokemon.id;
  renderDialogContent(previousPokemon);
};

const showNextPokemon = () => {
  const activeList = getActiveList();
  const activePokemonIndex = getActivePokemonIndex();
  const nextPokemon = activeList[activePokemonIndex + 1];

  if (!nextPokemon) {
    return;
  }

  activePokemonId = nextPokemon.id;
  renderDialogContent(nextPokemon);
};

export const initPokemonDialog = () => {
  dom.pokemonGrid.addEventListener("click", (event) => {
    const pokemonCard = event.target.closest('[data-id="card"]');

    if (!pokemonCard) {
      return;
    }

    const pokemonId = Number(pokemonCard.dataset.pokemonId);
    openPokemonDialog(pokemonId);
  });

  dom.closeDialogButton.addEventListener("click", closePokemonDialog);

  dom.dialog.addEventListener("click", (event) => {
    if (event.target === dom.dialog) {
      closePokemonDialog();
    }
  });
};
