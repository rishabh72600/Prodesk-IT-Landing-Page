# Prodesk IT Landing Page

A responsive vanilla JavaScript landing page for Prodesk IT.

## Sprint 2 Engineering Features

- **JSON-driven rendering** — All page content is fetched from `content.json` and rendered at runtime.
- **Centralized state** — Theme, menu visibility, service selection, and contact-modal state live in one store.
- **Persistent sessions** — The full state is serialized to `localStorage` as `prodesk-it-state` and restored on reload.
- **No theme flash** — The saved theme is applied before the stylesheet loads.
- **Reliable theme priority** — An explicit light or dark selection overrides `prefers-color-scheme` across the whole page, including the hero and images.
- **Custom PubSub** — `EventBus` emits `state:changed` to decouple rendering from state mutations.
- **Listener cleanup** — Every registered DOM event listener is explicitly removed before re-rendering and on `pagehide`.

## Theme Management

Use the navbar moon/sun button to switch themes. The selection is saved in `localStorage` and restored before styles load. The saved theme takes priority over the operating-system color scheme, so a dark system preference cannot force the hero section to remain dark when light mode is selected.

## Interaction State

- Menu open/closed state
- Selected service card
- Contact dialog visibility
- Light/dark theme

All of these values persist across browser reloads.

## Tech Stack

- HTML5
- CSS3 (custom properties, Grid, Flexbox, responsive media queries)
- Vanilla JavaScript (DOM rendering, localStorage, PubSub)

## Project Structure

```text
prodesk it landing page/
├── index.html
├── style.css
├── script.js
├── content.json
├── HEAP_SNAPSHOT.md
├── README.md
└── assets/images/
    ├── hero.webp
    └── about.webp
```

## Run Locally

From the project folder, start a local web server:

```powershell
python -m http.server 5500
```

Then open [http://localhost:5500](http://localhost:5500) in a modern browser.

If Python is unavailable, use the VS Code **Live Server** extension instead. Do not open `index.html` directly: the page fetches `content.json`, which requires it to be served over HTTP.

## Browser Support

Chrome 90+, Firefox 88+, Safari 14+, and Edge 90+.
