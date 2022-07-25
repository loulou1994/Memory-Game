import React from "react";

import InputBtns from "../../components/inputBtns"
import Button from "../../components/button"

import data from "./menu-data"

import {useGlobalContext} from "../../gameLogic"

function Menu() {
  const { setNewGame, startGame } = useGlobalContext()

  const numOfPlayers = data.numOfPlayers.map(player => {
    const {id, style, eventHandler} = player

    return <Button key={id}
      style={style}
      clickHandler={setNewGame}
      btnVal={id}
    />
  })

  const typeOfTokens = data.typeOfTokens.map(token => {
    const {id, stateId, name, style, value, eventHandler} = token

    return <InputBtns key={id}
      id={stateId}
      name={name}
      ClassName={style}
      value={value}
      handleClick={setNewGame}
      inputType="tokenType"
    />
  })

  const boardSize = data.boardSize.map(size => {
    const {id, stateId, name, style, value, eventHandler} = size;

    return <InputBtns key={id}
      id={stateId}
      name={name}
      ClassName={style} 
      value={value}
      handleClick={setNewGame}
      inputType="boardSize"
    />
  })

  return <main className="menu-bg flex">
      <section className="menu flex flow">
        <h1>Memory</h1>
        <div className="menu__theme flow">
          <h2>Select Theme</h2>
          <div className="theme-btns flex">
          {typeOfTokens}
          </div>
        </div>
        <div className="menu__players-number flow">
          <h2>Number of Players</h2>
          <div className="players-container flex">
            {numOfPlayers}
          </div>
        </div>
        <div className="menu__grid-size flow">
          <h2>Grid Size</h2>
          <div className="grid-btns flex">
            {boardSize}
          </div>
        </div>
        <button className="menu-btns bg-orange" onClick={startGame}>Start Game</button>
      </section>
    </main>
  }
export default Menu;