# Firefox iframe Popup Bug Demo

Demonstrates a Firefox bug with popups triggered from cross-origin iframes using Lit web components.

## Project Structure

This project deploys two separate Fly.dev apps to create a cross-origin iframe scenario:

```
apps/
├── main/           # Parent page (firefox-demo.fly.dev)
│   ├── index.html
│   ├── Dockerfile
│   ├── Caddyfile
│   └── fly.toml
└── iframe/         # Cross-origin iframe content (firefox-demo-iframe.fly.dev)
    ├── src/
    │   └── my-component.js   # Lit web component
    ├── iframe-content.html   # Lit version
    ├── iframe-vanilla.html   # Vanilla JS version
    ├── package.json
    ├── vite.config.js
    ├── Dockerfile
    ├── Caddyfile
    └── fly.toml
```

## Local Development

```bash
# Install iframe app dependencies
cd apps/iframe && npm install

# Run iframe dev server
npm run dev
# Then open http://localhost:5173/iframe-content.html
```

## Deployment

First time setup - create the iframe app:
```bash
cd apps/iframe
fly apps create firefox-demo-iframe
```

Deploy both apps:
```bash
# From root directory
npm run deploy

# Or deploy individually:
npm run deploy:iframe  # Deploy iframe app first
npm run deploy:main    # Then deploy main app
```

## URLs

- **Main page:** https://firefox-demo.fly.dev
- **Iframe app:** https://firefox-demo-iframe.fly.dev

## Reproduce the bug

1. Open https://firefox-demo.fly.dev in Firefox
2. Click the "Open popup and redirect after 5s" button in either iframe
3. Wait 5 seconds for the redirect to trigger
4. Compare behavior between Vanilla JS and Lit versions
