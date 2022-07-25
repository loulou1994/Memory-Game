import React from 'react'

export default function PlayerRank({winner, playerId, wins}) {
  return <>
  <div className={winner ? "winner" : "bg-btns-menu"}>
        <p className='flex'>
            <span>Player {playerId} {winner && "(winner)"}</span>
            <span>{wins} PAIRS</span>
        </p>
    </div>
  </>
}