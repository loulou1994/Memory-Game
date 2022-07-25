import React, {useEffect}from 'react'

import { useGlobalContext } from '../gameLogic'

export default function SoloMode({moves}) {
  const {timer, updateTimer, setTimer} = useGlobalContext()
  
  useEffect(() => {
    if(!timer.startingTime){
      setTimer(prevState => ({...prevState, startingTime: Date.now()}))
    }
    
    const clearTime = setTimeout(() => {
      updateTimer()
    }, 1000)

    return () => {
      clearTimeout(clearTime)
    }
  }, [timer])
  
  return (
    <section className="game__solo-mode flex">
        <div className="timer-wrapper flex">
            <label htmlFor="timer">Time</label>
            <input type="text" value={timer.currentTime} disabled id="timer" className="input-style"/>
        </div>
        <div className="moves-wrapper flex">
            <label htmlFor="movesCount">Moves</label>
            <input type="text" value={moves} disabled id="movesCount" className="input-style"/>
        </div>
    </section>
  )
}
