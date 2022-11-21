import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import ConnectWallet from './components/ConnectWallet'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ConnectWallet />
  </React.StrictMode>,
)
