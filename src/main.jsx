// applique le fond au moment où React démarre
document.body.style.minHeight = '100vh';
document.body.style.background = 'linear-gradient(135deg, #6b21a8 0%, #8b5cf6 45%, #4c1d95 100%)';
document.body.style.color = '#ffffff';
import React from "react"
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
