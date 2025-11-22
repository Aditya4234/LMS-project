# Frontend

## Dev

1) Install

   npm install

2) Optional API base

   Create a .env file with:

   VITE_API_URL=http://localhost:5000

   If not set, defaults to http://localhost:5000

3) Run

   npm run dev

## Build

- npm run build
- npm run preview
# Frontend (Tailwind) — Quick restore

This folder contains a minimal Tailwind CSS setup.

Commands (PowerShell):

```powershell
cd "c:\Users\aditya\OneDrive\Desktop\LMS3\frontend"
# install deps if node_modules was removed
npm install
# build CSS once
npm run build:css
# or watch during development
npm run watch:css
```

Open `index.html` in a browser after `dist/output.css` is generated.
