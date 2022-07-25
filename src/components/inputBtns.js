import React from 'react'

import { useGlobalContext } from '../gameLogic'

export default function InputBtns({id, name, ClassName, value, handleClick, inputType}) {
  const {newGameSet} = useGlobalContext()
  const inputValue = parseInt(value.slice(0)) ? parseInt(value.slice(0, 1)) : value
  return (
    <>
      <label htmlFor={id} className='sr-only'>{value}</label>
      <input type="button" value={value} name={name} id={id} className={`${ClassName} ${inputValue === newGameSet[inputType] ? "clicked" : ""}`} onClick={event => handleClick(event)}/>
    </>
  )
}