import { capitalizeText, getPrimaryType } from "./utils.js";

const getPokemonImage = (pokemon) => {
  return pokemon.sprites.other["official-artwork"].front_default;
};

const createPokemonTypesTemplate = (types) => {
  return types
    .map((typeInfo) => {
      return `<span class="pokemon-card__type">${typeInfo.type.name}</span>`;
    })
    .join("");
};

export const createPokemonCardTemplate = (pokemon) => {
  const primaryType = getPrimaryType(pokemon);
  const pokemonName = capitalizeText(pokemon.name);
  const pokemonImage = getPokemonImage(pokemon);
  const pokemonTypes = createPokemonTypesTemplate(pokemon.types);

  return `
    <button class="pokemon-card ${primaryType}" data-id="card" data-pokemon-id="${pokemon.id}">
      <span class="pokemon-card__number">#${pokemon.id}</span>
      <img class="pokemon-card__image" data-id="card-image" src="${pokemonImage}" alt="${pokemonName}" />
      <h2 class="pokemon-card__name">${pokemonName}</h2>
      <div class="pokemon-card__types">
        ${pokemonTypes}
      </div>
    </button>
  `;
};
