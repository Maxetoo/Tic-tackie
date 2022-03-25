import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'

//GET NUMBER OF ROUNDS FROM LOCAL STORAGE
const setRoundsStorage = () => {
  const roundsNum = localStorage.getItem('roundsNumSingle')
  if (roundsNum) {
    return localStorage.getItem('roundsNumSingle')
  } else {
    return 0
  }
}

//GET GAMEOVER VALUE FROM LOCALSTORAGE
const setGameOverStorage = () => {
  const gameOver = localStorage.getItem('gameOverSingle')
  if (!gameOver) {
    return localStorage.getItem('gameOverSingle')
  } else {
    return false
  }
}

//LOCAL STORAGE FOR FIRST PLAYER SCORE
const setFirstPlayerSingle = () => {
  const firstPlayerSingle = localStorage.getItem('firstPlayerSingle')
  if (firstPlayerSingle) {
    return localStorage.getItem('firstPlayerSingle')
  } else {
    return 0
  }
}

//LOCAL STORAGE FOR SECOND PLAYER SCORE
const setSecondPlayerSingle = () => {
  const secondPlayerSingle = localStorage.getItem('secondPlayerSingle')
  if (secondPlayerSingle) {
    return localStorage.getItem('secondPlayerSingle')
  } else {
    return 0
  }
}
const SinglePlay = () => {
  const [turn, setTurn] = useState('x')
  const [cells, setCells] = useState(Array(9).fill(''))
  const [numRounds, setNumRounds] = useState(setRoundsStorage())
  const [notPicked, setNotPicked] = useState(true)
  const [hasWon, setHasWon] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [player, setPlayer] = useState('')
  const [isDraw, setDraw] = useState(false)
  const [firstPlayer, setFirstPlayer] = useState(setFirstPlayerSingle())
  const [secondPlayer, setSecondPlayer] = useState(setSecondPlayerSingle())
  const [gameEnded, setGameEnded] = useState(setGameOverStorage())
  const [gameWinner, setGameWinner] = useState('')
  //FUNCTION FOR WIN LOGIC OF PLAYER
  const winLogicPlayer = (val) => {
    //POSSIBLE WIN LINES
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
      if (val[a] === '' || val[b] === '' || val[c] === '') {
        return
      } else if (val[a] === 'x' && val[b] === 'x' && val[c] === 'x') {
        setHasWon(true)
        setFirstPlayer(firstPlayer + 1)
        setPlayer('You')
      }
    })
  }

  //CLICK EVENT FOR PLAYER X ENTRIES
  const handleAddValues = (eachCell) => {
    let values = [...cells]
    if (values[eachCell] !== '') return

    const playerTurn = values.filter((value) => value === '').length % 2 === 1
    if (playerTurn) {
      values[eachCell] = 'x'
      setTurn('o')
      winLogicPlayer(values)
    }

    setCells(values)
  }

  //ADD NUMBER OF ROUNDS TO UI
  const handleNumRounds = (e) => {
    setNumRounds(e.target.dataset.id)
    setNotPicked(false)
    setFirstPlayer(0)
    setSecondPlayer(0)
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
    if (numRounds < 1 || !numRounds) {
      setNotPicked(true)
      setGameEnded(true)
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

  //CLICK EVENT TO CONTINUE GAME IF GAME HAS ENDED
  const handleContinueGame = () => {
    setGameEnded(false)
  }

  //FUNCTION FOR WIN LOGIC FOR COMPUTER
  const winLogic = (compValues) => {
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
    const valid = compValues
      .map((value, ind) => (!value ? ind : ''))
      .filter((val) => val !== '')
    // const findWinLine = winLines
    //   .map((value) => value)
    //   .filter((value) => value.includes([...valid]))
    const findWinLines = winLines
      .map((value) => value)
      .filter((val, ind) => val.includes(0, 1))
    // .reduce((value, index) => {
    //   return value.concat(index)
    // }, [])
    winLines.forEach((value) => {
      const a = value[0]
      const b = value[1]
      const c = value[2]
      if (
        compValues[a] === '' ||
        compValues[b] === '' ||
        compValues[c] === ''
      ) {
        return
      } else if (
        compValues[a] === 'o' &&
        compValues[b] === 'o' &&
        compValues[c] === 'o' &&
        !hasWon
      ) {
        setSecondPlayer(secondPlayer + 1)
        setHasWon(true)
        setPlayer('Computer')
      }
    })
    console.log(valid, findWinLines)
  }

  //USEEFFECT TO MAKE COMPUTER MOVE
  useEffect(() => {
    let compValues = [...cells]
    const computerTurn =
      compValues.filter((value) => value === '').length % 2 === 0
    const filledGame = compValues.every((value) => value !== '')
    if (computerTurn && !filledGame && !hasWon) {
      const timer = setTimeout(() => {
        const availIndex = compValues
          .map((value, ind) => (!value ? ind : ''))
          .filter((value) => value !== '')
        compValues[availIndex[Math.floor(Math.random() * availIndex.length)]] =
          'o'

        setCells(compValues)
        setTurn('x')
      }, 200)
      return () => clearTimeout(timer)
    }
    winLogic(compValues)
  }, [cells, player, hasWon])

  //USEFFECT TO CHECK IF THERE IS A DRAW
  useEffect(() => {
    const everyFilled = cells.every((value) => value)
    if (everyFilled && !hasWon) {
      setDraw(true)
    }
  }, [cells, hasWon])

  //USEFFECT TO CHECK IF GAME HAS ENDED
  useEffect(() => {
    if (numRounds < 1) {
      if (firstPlayer > secondPlayer) {
        setGameWinner('You')
      } else if (secondPlayer > firstPlayer) {
        setGameWinner('Computer')
      } else if (firstPlayer === secondPlayer) {
        setGameWinner('Both')
      }
      setGameEnded(true)
    }
  }, [numRounds, firstPlayer, secondPlayer])

  //COMPONENT FOR EACH CELL
  const EachCell = ({ value }) => {
    return <td onClick={() => handleAddValues(value)}>{cells[value]}</td>
  }

  //USEEFFECT TO STORE GAMEOVER VALUE ON LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem('gameOverSingle', gameEnded)
  }, [gameEnded])

  //USEEFFECT TO STORE FIRST PLAYER SCORE ON LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem('firstPlayerSingle', +firstPlayer)
  }, [firstPlayer])

  //USEEFFECT TO STORE SECOND PLAYER SCORE ON LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem('secondPlayerSingle', +secondPlayer)
  }, [secondPlayer])

  //USEEFFECT TO STORE NUMEBER OF ROUNDS ON LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem('roundsNumSingle', numRounds)
  }, [numRounds])

  return (
    <section className='single-player-section' onClick={handleRemoveAlert}>
      <div className='go-back-container'>
        <Link to='/game-mode'>
          <h3 className='go-back'>
            <BiArrowBack />
          </h3>
        </Link>
      </div>
      <div className='display-board'>
        <div className='first-player-board'>
          <p className='player-dash'>You: X</p>
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
        <p className='player-dash'>Computer: O</p>
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
          <h3 className='winner'>{isDraw ? `Draw` : `${player} won`}</h3>

          <p>Tap to continue</p>
        </div>
      )}
      {gameEnded && (
        <div className='game-setup-container'>
          <div className='container-line'>
            <h1 className='game-over'>Game Over!</h1>
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

export default SinglePlay
