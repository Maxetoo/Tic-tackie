import React from 'react'
import { Link } from 'react-router-dom'

const StartPage = () => {
  const shareUrl = () => {
    window.navigator
      .share({
        url: window.location,
        title: 'Tic Tac Toe',
        text: 'share with friends',
      })
      .then(() => console.log('success'))
      .catch(() => 'Error')
  }
  return (
    <section className='start-page'>
      <article className='container'>
        <h2 className='title'>Tic Tac Toe</h2>
        <div className='btn-lists'>
          <Link to='/game-mode'>
            <button className='start-btn'>Play</button>
          </Link>
          <a href='mailto: etombimaxwell123@gmail.com'>
            <button className='start-btn'>Report a bug</button>
          </a>
          <button className='start-btn' onClick={shareUrl}>
            Share
          </button>
        </div>
      </article>
    </section>
  )
}

export default StartPage
