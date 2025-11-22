import React from 'react'
import { createRoot } from 'react-dom/client'
// The app file is named `app.jsx` (lowercase) in this project — import using the exact filename
import App from './app.jsx'
import './input.css'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
