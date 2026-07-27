# Prodesk IT Landing Page

A modern, responsive landing page for **Prodesk IT** — a digital solutions company offering web development, mobile applications, cloud solutions, AI, cybersecurity, and business analytics services.

## Features

- **Responsive Design** — Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode Toggle** — Manual toggle button with system preference detection
- **Image Adaptation** — Images are dimmed with overlay in dark mode for a cohesive experience
- **Mobile Navigation** — Hamburger menu with animated dropdown on mobile and desktop
- **Smooth Animations** — Fade-up animations, hover effects, and transitions
- **Accessibility** — Focus-visible outlines, semantic HTML, and ARIA labels
- **Performance Optimized** — Deferred JavaScript, optimized WebP images

## Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties (CSS variables), Flexbox, Grid, Media queries, Animations
- **JavaScript (Vanilla)** — Theme toggle, mobile menu, localStorage persistence

## Project Structure

```
prodesk it landing page/
├── index.html          # Main HTML file
├── style.css           # All styles (light/dark mode, responsive)
├── script.js           # Theme toggle, menu toggle, localStorage
├── README.md           # Project documentation
├── assets/
│   └── images/
│       ├── hero.webp   # Hero section image
│       └── about.webp  # About section image
```

## Dark Mode

The landing page supports three dark mode behaviors:

1. **Manual toggle** — Click the 🌙/☀️ button in the navbar
2. **System preference** — Automatically follows `prefers-color-scheme: dark`
3. **Persistent** — User preference is saved in `localStorage`

### Dark Mode Image Handling

Images are automatically adjusted in dark mode:
- **Brightness reduced** to 85% for a natural dimmed look
- **Saturation slightly reduced** to 95%
- **Subtle dark overlay** (`rgba(15, 23, 42, 0.15)`) applied via `::after` pseudo-element
- Hero section background gradient switches to dark tones

## Navigation

- **Desktop (≥769px)**: Hamburger (☰) toggles between horizontal inline layout and vertical dropdown
- **Mobile (≤768px)**: Hamburger (☰) opens a full-width vertical dropdown menu
- Clicking any nav link closes the mobile menu automatically

## Usage

Open `index.html` in any modern web browser:

```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

## Customization

### Colors

All colors are defined as CSS custom properties in `:root`. Modify these to change the theme:

```css
:root {
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --secondary: #0f172a;
  --background: #ffffff;
  --surface: #f8fafc;
  --text: #1f2937;
  --text-light: #6b7280;
}
```

### Images

Replace the WebP images in `assets/images/` with your own (keeping the same filenames or updating the `<img>` `src` attributes in `index.html`).

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

© 2026 Prodesk IT. All Rights Reserved.
