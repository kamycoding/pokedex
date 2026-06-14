# Pokédex

A responsive Pokédex web application built with **HTML**, **CSS**, and **Vanilla JavaScript**. It fetches data from the public [PokeAPI](https://pokeapi.co/), renders dynamic Pokémon cards, supports live search across all 151 Pokémon, and displays detailed stats in a modal dialog with a retro Game Boy pixel art style.

🔗 **Live Demo:** [https://kamycoding.github.io/pokedex/](https://kamycoding.github.io/pokedex/)

---

## ✨ Features

- Fetch Pokémon data directly from the PokeAPI
- Render Pokémon cards dynamically with type-based color borders
- Load Pokémon in batches of 20 using a **Load More** button
- Stop loading automatically after the first **151 Pokémon** (Gen I)
- Load all 151 Pokémon in the background for full search coverage
- Display loading feedback while data is being fetched
- View detailed Pokémon info in a modal dialog
- Show image, name, ID, types, and base stats with **animated progress bars**
- Navigate between Pokémon inside the modal with **previous / next** buttons
- Disable navigation buttons at the start and end of the list
- **Live search** triggered after at least 3 characters — searches all 151 Pokémon
- Reset results automatically when input drops below 3 characters
- Friendly not-found message when no Pokémon matches
- Retro **Game Boy pixel art** design with Press Start 2P font
- Fully responsive layout for desktop and mobile

---

## 🛠️ Tech Stack

- **HTML5**
- **CSS3** — custom properties, clamp, pixel art borders
- **Vanilla JavaScript** (ES Modules)
- **PokeAPI** — data source
- **Press Start 2P** — Google Fonts pixel art typeface
- **GitHub Pages** — hosting

---

## 📂 Project Structure

```text
pokedex/
├── assets/
│   ├── favicon/
│   └── icons/
├── css/
│   ├── reset.css
│   ├── variables.css
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   └── pokemon-types.css
├── js/
│   ├── api.js
│   ├── config.js
│   ├── dom.js
│   ├── main.js
│   ├── modal.js
│   ├── render.js
│   ├── search.js
│   ├── state.js
│   ├── templates.js
│   └── utils.js
├── index.html
└── README.md
```

---

## ⚙️ How It Works

The app is organized into focused ES modules, each with a single responsibility:

| Module         | Responsibility                                                                     |
| :------------- | :--------------------------------------------------------------------------------- |
| `config.js`    | Project constants — API base URL, batch size, max Pokémon count, min search length |
| `api.js`       | Builds API URLs and handles fetch logic                                            |
| `state.js`     | Holds app state — offset, loading status, visible list, and full background list   |
| `dom.js`       | Centralized DOM element references                                                 |
| `templates.js` | Generates HTML templates for cards and modal content including stat bars           |
| `render.js`    | Handles rendering, UI feedback, and button states                                  |
| `modal.js`     | Controls dialog open/close and previous/next navigation                            |
| `search.js`    | Manages live search logic across all loaded Pokémon                                |
| `main.js`      | Connects all modules, starts the app, and triggers background fetch                |

On page load, `main.js` fetches the first 20 Pokémon and simultaneously loads all 151 in the background for search. Results are stored in `state.js`, turned into markup by `templates.js`, and painted to the screen by `render.js`. Clicking a card opens the modal via `modal.js`, while typing in the search field hands off to `search.js`.

---

## 🚀 How to Run Locally

Because the project uses **ES Modules**, it must be served over HTTP rather than opened directly from the file system.

```bash
# 1. Clone the repository
git clone https://github.com/kamycoding/pokedex.git

# 2. Move into the project folder
cd pokedex

# 3. Start a local server (choose one)

# Python 3
python -m http.server 8000

# Node.js
npx serve
```

Then open `http://localhost:8000` in your browser.

> 💡 If you use VS Code, the **Live Server** extension is the quickest way to run the project.

---

## 🌐 API Used

This project uses the free and open [**PokeAPI**](https://pokeapi.co/) to retrieve Pokémon data, including names, IDs, sprites, types, and base stats. No API key is required.

---

## 📚 What I Learned

- Structuring a Vanilla JavaScript app with **ES Modules** and clear separation of concerns
- Working with **asynchronous JavaScript** (`fetch`, Promises, `async/await`)
- Consuming and transforming data from a public **REST API**
- Managing application **state** without a framework
- Building **responsive pixel art UI** with CSS custom properties and `clamp()`
- Implementing UX details like loading feedback, live search, modal navigation, and stat progress bars
- Background data fetching to improve search UX without blocking the UI

---

## 🔮 Future Improvements

- Add filtering by type and sorting options
- Add favorites with local storage persistence
- Improve accessibility (keyboard navigation and ARIA attributes)
- Add support for more Pokémon generations beyond Gen I
- Add automated tests

---

## 👤 Author

**kamycoding**

- GitHub: [@kamycoding](https://github.com/kamycoding)

---

⭐ If you like this project, feel free to star the repository!
