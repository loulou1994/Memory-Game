import React from 'react'

import { useGlobalContext } from '../gameLogic'

function GameControls() {
  const { restartGame, newGameStart} = useGlobalContext()

  return (
    <>
        <button className="clr-white bg-orange nw-game-hover" onClick={newGameStart}>New Game</button>
        <button className="clr-btns bg-btns-menu reset-ctrl-hover" onClick={restartGame}>Restart</button>
    </>
  )
}

export default GameControls