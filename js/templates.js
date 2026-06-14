import { capitalizeText, getPrimaryType } from "./utils.js";

const MAX_STAT_VALUE = 255;

const STAT_LABELS = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SP.ATK",
  "special-defense": "SP.DEF",
  speed: "SPD",
};

const ICON_ARROW_LEFT = `
  <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
`;

const ICON_ARROW_RIGHT = `
  <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
`;

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
      const label = STAT_LABELS[statInfo.stat.name] || statInfo.stat.name;
      const percentage = Math.min(
        (statInfo.base_stat / MAX_STAT_VALUE) * 100,
        100,
      );

      return `
        <li class="pokemon-dialog__stat">
          <span class="pokemon-dialog__stat-name">${label}</span>
          <span class="pokemon-dialog__stat-value">${statInfo.base_stat}</span>
          <div class="pokemon-dialog__stat-bar">
            <div class="pokemon-dialog__stat-bar-fill" style="width: ${percentage}%"></div>
          </div>
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
      <span class="pokemon-card__number">#${String(pokemon.id).padStart(3, "0")}</span>
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
      <span class="pokemon-dialog__number">#${String(pokemon.id).padStart(3, "0")}</span>
      <img class="pokemon-dialog__image" data-id="dialog-image" src="${pokemonImage}" alt="${pokemonName}" />
      <h2 class="pokemon-dialog__name">${pokemonName}</h2>
      <div class="pokemon-dialog__types">
        ${pokemonTypes}
      </div>
      <ul class="pokemon-dialog__stats">
        ${pokemonStats}
      </ul>
      <div class="pokemon-dialog__navigation">
        <button class="pokemon-dialog__nav-button" data-id="prev-button" type="button" aria-label="Previous Pokémon">
          ${ICON_ARROW_LEFT}
          PREV
        </button>
        <button class="pokemon-dialog__nav-button" data-id="next-button" type="button" aria-label="Next Pokémon">
          NEXT
          ${ICON_ARROW_RIGHT}
        </button>
      </div>
    </article>
  `;
};
