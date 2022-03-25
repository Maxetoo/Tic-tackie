import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'

//LOCAL STORAGE TO STORE NUMBER OF ROUNDS
const setRoundsStorage = () => {
  const roundsNum = localStorage.getItem('roundsNum')
  if (roundsNum) {
    return localStorage.getItem('roundsNum')
  } else {
    return 0
  }
}

//GET GAMEOVER VALUE FROM LOCALSTORAGE
const setGameOverStorageMulti = () => {
  const gameOver = localStorage.getItem('gameOver')
  if (!gameOver) {
    return localStorage.getItem('gameOver')
  } else {
    return false
  }
}

//LOCAL STORAGE FOR FIRST PLAYER SCORE
const setFirstPlayerMulti = () => {
  const firstPlayerMulti = localStorage.getItem('firstPlayerMulti')
  if (firstPlayerMulti) {
    return localStorage.getItem('firstPlayerMulti')
  } else {
    return 0
  }
}

//LOCAL STORAGE FOR SECOND PLAYER SCORE
const setSecondPlayerMulti = () => {
  const secondPlayerMulti = localStorage.getItem('secondPlayerMulti')
  if (secondPlayerMulti) {
    return localStorage.getItem('secondPlayerMulti')
  } else {
    return 0
  }
}

const MultiPlay = () => {
  const [turn, setTurn] = useState('x')
  const [cells, setCells] = useState(Array(9).fill(''))
  const [numRounds, setNumRounds] = useState(setRoundsStorage())
  const [notPicked, setNotPicked] = useState(true)
  const [hasWon, setHasWon] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [player, setPlayer] = useState('')
  const [isDraw, setDraw] = useState(false)
  const [firstPlayer, setFirstPlayer] = useState(setFirstPlayerMulti())
  const [secondPlayer, setSecondPlayer] = useState(setSecondPlayerMulti())
  const [gameEnded, setGameEnded] = useState(setGameOverStorageMulti())
  const [gameWinner, setGameWinner] = useState('')
  //WINNING LOGIG SETUP
  const winLogic = (cells) => {
    const winLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    winLines.forEach((value) => {
      const a = value[0]
      const b = value[1]
      const c = value[2]
      if (cells[a] === '' || cells[b] === '' || cells[c] === '') {
        return
      } else if (cells[a] === cells[b] && cells[b] === cells[c]) {
        if (cells[a] === 'x') {
          setFirstPlayer(firstPlayer + 1)
        } else if (cells[a] === 'o') {
          setSecondPlayer(secondPlayer + 1)
        }
        setHasWon(true)
        setPlayer(cells[a])
      }
    })
  }

  //EVENT TO ADD VALUES[X AND O] TO GAME
  const handleClick = (cellValue) => {
    let allValues = [...cells]
    if (allValues[cellValue] !== '') return

    if (turn === 'x') {
      allValues[cellValue] = 'x'
      setTurn('o')
    } else {
      allValues[cellValue] = 'o'
      setTurn('x')
    }

    setCells(allValues)
    winLogic(allValues)
  }

  //ADD NUMBER OF ROUNDS TO UI
  const handleNumRounds = (e) => {
    setNumRounds(e.target.dataset.id)
    setNotPicked(false)
    setFirstPlayer(0)
    setSecondPlayer(0)
  }

  //CELL COMPONENT
  const EachCell = ({ value }) => {
    return <td onClick={() => handleClick(value)}>{cells[value]}</td>
  }

  //REMOVE ALERT MESSAGE

  const handleRemoveAlert = () => {
    if (showAlert) {
      setShowAlert(false)
      setCells(Array(9).fill(''))
      setNumRounds(numRounds - 1)
      setHasWon(false)
      setDraw(false)
    }
  }

  //USEEFFECT TO CHECK IF NUMBER OF ROUNDS HAVE BEEN PICKED
  useEffect(() => {
    if (numRounds < 1) {
      setNotPicked(true)
    } else {
      setNotPicked(false)
    }
  }, [numRounds])

  //USEEFFECT TO CHECK IF EACH GAME ROUND HAS BEEN WON
  useEffect(() => {
    if (hasWon) {
      setShowAlert(true)
    } else {
      setShowAlert(false)
      setHasWon(false)
    }
  }, [hasWon])

  //USEEFFECT TO CHECK IF THE GAME ENDED IN A DRAW
  useEffect(() => {
    if (isDraw) {
      setShowAlert(true)
    } else {
      setShowAlert(false)
      setDraw(false)
    }
  }, [isDraw])

  //USEFFECT TO CHECK IF GAME HAS ENDED
  useEffect(() => {
    if (numRounds < 1) {
      if (firstPlayer > secondPlayer) {
        setGameWinner('x')
      } else if (secondPlayer > firstPlayer) {
        setGameWinner('o')
      } else if (firstPlayer === secondPlayer) {
        setGameWinner('Both')
      }
      setGameEnded(true)
    } else {
      setGameEnded(false)
    }
  }, [numRounds, firstPlayer, secondPlayer])

  //CLICK EVENT TO CONTINUE GAME IF GAME HAS ENDED
  const handleContinueGame = () => {
    setGameEnded(false)
  }

  useEffect(() => {
    const everyFilled = cells.every((value) => value)
    if (everyFilled && !hasWon) {
      setDraw(true)
    }
  }, [cells, hasWon])

  const handleGoBack = () => {
    setGameEnded(false)
  }

  //USEEFFECT TO STORE NUMEBER OF ROUNDS ON LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem('roundsNum', numRounds)
  }, [numRounds])

  //USEEFFECT TO STORE FIRST PLAYER SCORE ON LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem('firstPlayerMulti', +firstPlayer)
  }, [firstPlayer])

  //USEEFFECT TO STORE SECOND PLAYER SCORE ON LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem('secondPlayerMulti', +secondPlayer)
  }, [secondPlayer])

  return (
    <section className='multi-player-section' onClick={handleRemoveAlert}>
      <div className='go-back-container'>
        <Link to='/game-mode'>
          <h3 className='go-back' onClick={handleGoBack}>
            <BiArrowBack />
          </h3>
        </Link>
      </div>

      <div className='display-board'>
        <div className='first-player-board'>
          <p className='player-dash'>1st Player: X</p>
        </div>
        <div className='rounds-board'>
          <p>Num Of Rounds: {numRounds}</p>
        </div>
      </div>
      <p className='player-turn'>Turn: {turn}</p>
      <div className='main-multi-play-board'>
        <table>
          <tbody>
            <tr>
              <EachCell value={0} />
              <EachCell value={1} />
              <EachCell value={2} />
            </tr>
            <tr>
              <EachCell value={3} />
              <EachCell value={4} />
              <EachCell value={5} />
            </tr>
            <tr>
              <EachCell value={6} />
              <EachCell value={7} />
              <EachCell value={8} />
            </tr>
          </tbody>
        </table>
      </div>
      <div className='second-player-board'>
        <p className='player-dash'>2nd Player: O</p>
      </div>

      {notPicked && (
        <div className='number-rounds-container'>
          <div className='number-rounds'>
            <p className='round-label'>Select Number Of Rounds</p>
            <div className='rounds-container'>
              <ul onClick={handleNumRounds}>
                <li data-id='3'>3</li>
                <li data-id='5'>5</li>
                <li data-id='7'>7</li>
                <li data-id='10'>10</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {showAlert && (
        <div className='alert-container'>
          <h3 className='winner'>
            {isDraw ? `Draw` : `Player ${player.toLocaleLowerCase()} won`}
          </h3>

          <p>Tap to continue</p>
        </div>
      )}

      {gameEnded && (
        <div className='game-setup-container'>
          <div className='container-line'>
            <div className='setup-container'>
              <div className='winner-label'>{gameWinner} won this round</div>
              <div className='setup-btn-lists'>
                <Link to='/'>
                  <div className='setup-btn'>Menu</div>
                </Link>
                <div className='continue-btn' onClick={handleContinueGame}>
                  Continue
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default MultiPlay
