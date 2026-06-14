import { dom } from "./dom.js";
import { state } from "./state.js";
import { createPokemonDialogTemplate } from "./templates.js";

let activePokemonId = null;

const getPokemonById = (pokemonId) => {
  return state.pokemonList.find((pokemon) => {
    return pokemon.id === pokemonId;
  });
};

const getActivePokemonIndex = () => {
  return state.pokemonList.findIndex((pokemon) => {
    return pokemon.id === activePokemonId;
  });
};

const updateNavigationButtons = () => {
  const activePokemonIndex = getActivePokemonIndex();

  dom.previousButton.disabled = activePokemonIndex <= 0;
  dom.nextButton.disabled = activePokemonIndex >= state.pokemonList.length - 1;
};

const renderDialogContent = (pokemon) => {
  dom.dialogContent.innerHTML = createPokemonDialogTemplate(pokemon);
  updateNavigationButtons();
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
  const activePokemonIndex = getActivePokemonIndex();
  const previousPokemon = state.pokemonList[activePokemonIndex - 1];

  if (!previousPokemon) {
    return;
  }

  activePokemonId = previousPokemon.id;
  renderDialogContent(previousPokemon);
};

const showNextPokemon = () => {
  const activePokemonIndex = getActivePokemonIndex();
  const nextPokemon = state.pokemonList[activePokemonIndex + 1];

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
  dom.previousButton.addEventListener("click", showPreviousPokemon);
  dom.nextButton.addEventListener("click", showNextPokemon);

  dom.dialog.addEventListener("click", (event) => {
    if (event.target === dom.dialog) {
      closePokemonDialog();
    }
  });
};
