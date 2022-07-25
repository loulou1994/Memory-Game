import React from 'react'

import { useGlobalContext } from '../gameLogic'

const Button = ({style, clickHandler, btnVal}) => {
    const {newGameSet} = useGlobalContext()
    
  return (
    <button className={`${style} ${newGameSet.players === btnVal ? "clicked" : ""}`} onClick={clickHandler}>{btnVal}</button>
  )
}

export default Button