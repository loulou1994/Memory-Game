import React from 'react'

export default function Multiplayer({id, playing, moves, time}) {
  return (
    <>    
        <div className={`flex ${playing ? "active-player" : ""}`}>
            <label htmlFor="pl-1">player {id}</label>
            <input type="text" value={moves} id={`pl-${id}`} disabled className="input-style"/>
            {playing && <span className="player-playing">Current Turn</span>}
        </div>
    </>
  )
}
