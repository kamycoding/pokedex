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

const createPokemonStatsTemplate = (stats) => {
  return stats
    .map((statInfo) => {
      return `
        <li class="pokemon-dialog__stat">
          <span class="pokemon-dialog__stat-name">${statInfo.stat.name}</span>
          <span class="pokemon-dialog__stat-value">${statInfo.base_stat}</span>
        </li>
      `;
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

export const createPokemonDialogTemplate = (pokemon) => {
  const primaryType = getPrimaryType(pokemon);
  const pokemonName = capitalizeText(pokemon.name);
  const pokemonImage = getPokemonImage(pokemon);
  const pokemonTypes = createPokemonTypesTemplate(pokemon.types);
  const pokemonStats = createPokemonStatsTemplate(pokemon.stats);

  return `
    <article class="pokemon-dialog__card ${primaryType}">
      <span class="pokemon-dialog__number">#${pokemon.id}</span>
      <img class="pokemon-dialog__image" data-id="dialog-image" src="${pokemonImage}" alt="${pokemonName}" />
      <h2 class="pokemon-dialog__name">${pokemonName}</h2>

      <div class="pokemon-dialog__types">
        ${pokemonTypes}
      </div>

      <ul class="pokemon-dialog__stats">
        ${pokemonStats}
      </ul>
    </article>
  `;
};
