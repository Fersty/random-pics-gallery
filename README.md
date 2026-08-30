# Random Pics Gallery

A photo gallery app built for XM Test task: an infinite-scrolling random photostream, a favorites library persisted in `localStorage`, and a single full-screen photo view.

## Features

- **Gallery** (`/`) — infinite-scrolling grid of random photos. Clicking a photo adds it to Favorites.
- **Favorites** (`/favorites`) — list of favorited photos, persisted in `localStorage`. Clicking a photo opens it full-screen.
- **Photo** (`/photos/:id`) — full-screen photo view with an "Add/Remove from Favorites" button.

## Running locally

```bash
npm install
npm start
```

Then open http://localhost:4200/.

## Running tests

```bash
npm test
```
