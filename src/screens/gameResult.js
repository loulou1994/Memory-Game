import React from 'react'

import GameControls from "../components/gameControls"
import PlayerRank from '../components/playerRank'

export default function gameResult({players}) {
    const sortedPlayers = JSON.parse(JSON.stringify(players))
    const greastestVal = sortedPlayers.map(player => player.wins).reduce((preVal, nextVal) => Math.max(preVal, nextVal))
    
    const dispResult = () => {
        const winners = players.filter(player => { return player.wins === greastestVal })

        const resultContainer = []
        let resultTitle, resultSubTitle

        if(winners.length === 1 && players.length > 1){
            resultTitle = `player ${winners[0].id} wins`
            resultSubTitle = `${winners[0].moves} moves were made`
        }else if (winners.length > 1){
            resultTitle = `It's a DRAW`
            resultSubTitle = `No Decisive Winner`
        }else {
            resultTitle = `FINAL SCORE`
            resultSubTitle = `${winners[0].moves} moves were made`
        }

        resultContainer.push(resultTitle, resultSubTitle)
        return resultContainer
    }

  return (
    <div className="overlay">
        <section className='result flow'>
            <div className="result__announce">
                <h2>{dispResult()[0]}</h2>
                <p>{dispResult()[1]}</p>
            </div>
            <div className="result__ranking flow">
                {
                    sortedPlayers.sort((currPl, nextPl) => nextPl.wins - currPl.wins).map((player, index) => {
                        const {id, wins} = {...player}

                        return <PlayerRank key={index + 1}
                            winner={greastestVal === wins ? "winner" : false}
                            playerId={id}
                            wins={wins}
                        />
                    })
                }
            </div>
            <div className="result__controls flex">
                <GameControls/>
            </div>
        </section>
    </div>
  )
}