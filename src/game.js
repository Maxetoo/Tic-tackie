import React from 'react'
import './main.css'
import StartPage from './pages/start-page'
import GameMode from './pages/game-mode'
import SinglePlayer from './games/single-play'
import MultiPlayer from './games/multi-play'
import ErrorPage from './pages/error-page'
import { Routes, Route } from 'react-router-dom'

const Game = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<StartPage />}></Route>
        <Route path='/game-mode' element={<GameMode />}></Route>
        <Route path='/single-player' element={<SinglePlayer />}></Route>
        <Route path='/multi-player' element={<MultiPlayer />}></Route>
        <Route path='*' element={<ErrorPage />}></Route>
      </Routes>
    </>
  )
}

export default Game
