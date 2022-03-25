import React from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const GameMode = () => {
  return (
    <section className='game-mode-section'>
      <div className='title-container'>
        <Link to='/'>
          <h3 className='icon-back'>
            <BiArrowBack />
          </h3>
        </Link>

        <h3 className='mode-title'>Game Mode</h3>
      </div>
      <div className='mode-container'>
        <div className='mode-btn-lists'>
          <Link to='/single-player'>
            <button className='mode-btn'>Single Player</button>
          </Link>
          <Link to='/multi-player'>
            <button className='mode-btn'>Multi Player</button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default GameMode
