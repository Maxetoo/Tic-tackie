import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <section className='error-section'>
      <div className='container-line'>
        <h1 className='error-name'>404 ERROR!</h1>
        <p className='error-msg'>Hello, you seem to be lost</p>
        <div className='error-btn-cont'>
          <Link to='/'>
            <button className='error-btn'>Go Back</button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage
