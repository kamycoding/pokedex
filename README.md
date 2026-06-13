# Pokédex

A responsive Pokédex web app built with HTML, CSS and Vanilla JavaScript.

The app uses the PokeAPI to load Pokémon data, render Pokémon cards, show detail information in a dialog and provide search functionality.

## Features

- Load Pokémon data from the PokeAPI
- Render Pokémon cards dynamically
- Load more Pokémon in batches
- Stop loading after the first 151 Pokémon
- Show Pokémon details in a dialog
- Navigate between loaded Pokémon inside the dialog
- Live search after at least 3 characters
- Show a not-found message when no Pokémon matches
- Responsive layout for desktop and mobile

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript
- ES Modules
- PokeAPI

## Project Structure

```txt
assets/
css/
  reset.css
  variables.css
  base.css
  layout.css
  components.css
  pokemon-types.css
js/
  api.js
  config.js
  dom.js
  main.js
  modal.js
  render.js
  search.js
  state.js
  templates.js
  utils.js
index.html
README.md
API

This project uses the public PokeAPI:

https://pokeapi.co/api/v2

The app first loads a list of Pokémon with limit and offset.
After that, it fetches the detailed data for each Pokémon to get images, types and stats.

How to run

Open the project with a local development server, for example with the VS Code Live Server extension.

Notes

The search currently works within the Pokémon that have already been loaded.
```
