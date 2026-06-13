# Pokédex

A responsive Pokédex web application built with **HTML**, **CSS**, and **Vanilla JavaScript**. It fetches data from the public [PokeAPI](https://pokeapi.co/), renders dynamic Pokémon cards, supports live search, and displays detailed Pokémon information in a modal dialog.

🔗 **Live Demo:** [https://kamycoding.github.io/pokedex/](https://kamycoding.github.io/pokedex/)

## ✨ Features

- Fetch Pokémon data directly from the PokeAPI
- Render Pokémon cards dynamically from API data
- Load Pokémon in batches using a **Load More** button
- Stop loading automatically after the first **151 Pokémon** (Gen I)
- Display loading feedback while data is being fetched
- View detailed Pokémon info in a dialog/modal
- Show image, name, ID, types, and base stats
- Navigate between loaded Pokémon inside the modal with **previous / next** buttons
- Disable navigation buttons when no Pokémon is available
- **Live search** triggered after at least 3 characters
- Reset results when the input drops below 3 characters
- Friendly **not-found** message when no Pokémon matches
- Fully responsive layout for desktop and mobile
- Clean, modular file structure with separated CSS and JavaScript modules

---

## 🛠️ Tech Stack

- **HTML5**
- **CSS3**
- **Vanilla JavaScript** (ES Modules)
- **PokeAPI** — data source
- **GitHub Pages** — hosting

---

## 📂 Project Structure

```text
pokedex/
├── assets/
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
| `state.js`     | Holds app state — offset, loading status, and loaded Pokémon                       |
| `dom.js`       | Centralized DOM element references                                                 |
| `templates.js` | Generates HTML templates for cards and modal content                               |
| `render.js`    | Handles rendering, UI feedback, and button states                                  |
| `modal.js`     | Controls dialog open/close and previous/next navigation                            |
| `search.js`    | Manages live search logic                                                          |
| `main.js`      | Connects all modules and starts the app                                            |

When the page loads, `main.js` initializes the app and requests the first batch of Pokémon through `api.js`. Results are stored in `state.js`, turned into markup by `templates.js`, and painted to the screen by `render.js`. Clicking a card opens the modal via `modal.js`, while typing in the search field hands off to `search.js`.

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

This project helped me strengthen several core frontend skills:

- Structuring a Vanilla JavaScript app with **ES Modules** and clear separation of concerns
- Working with **asynchronous JavaScript** (`fetch`, Promises, `async/await`)
- Consuming and transforming data from a public **REST API**
- Managing application **state** without a framework
- Building **responsive layouts** with reusable CSS variables and components
- Implementing UX details like loading feedback, live search, and modal navigation

---

## 🔮 Future Improvements

- Add support for more Pokémon generations beyond the first 151
- Add filtering by type and sorting options
- Cache API responses to reduce repeated requests
- Add favorites with local storage persistence
- Improve accessibility (keyboard navigation and ARIA attributes)
- Add automated tests

---

## 👤 Author

**kamycoding**

- GitHub: [@kamycoding](https://github.com/kamycoding)

---

⭐ If you like this project, feel free to star the repository!
