export const capitalizeText = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const getPokemonId = (url) => {
  const urlParts = url.split("/").filter(Boolean);

  return Number(urlParts.at(-1));
};

export const getPrimaryType = (pokemon) => {
  return pokemon.types[0].type.name;
};
