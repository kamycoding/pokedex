import { API_BASE_URL } from "./config.js";

export const getPokemonListUrl = (limit, offset) => {
  return `${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;
};

export const getPokemonDetailsUrl = (id) => {
  return `${API_BASE_URL}/pokemon/${id}`;
};
