import React from 'react'
import ReactDOM from 'react-dom'
import Game from './game'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Game />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
