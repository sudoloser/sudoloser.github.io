import React from 'react'
import ReactDOM from 'react-dom/client'
import '@spiritov/ds.css/dist/widgets/ds-clock.js'
import '@spiritov/ds.css/dist/widgets/ds-calendar.js'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
