import React from "react"
import * as FontAwesome from "react-icons/fa"

import GameControls from ".././components/gameControls"
import SoloMode from ".././components/soloMode"
import Multiplayer from "../components/multiplayer"
import Token from "../components/token"

import { useGlobalContext } from "../gameLogic"
import useMedia from "../customHooks/useMedia"

export default function GameBoard(){
    const { game: {setOfTokens, mode } } = useGlobalContext()
    
    const soloMutli = useMedia(mode)

    const tokenSizeStyle = {
        gridTemplateColumns: setOfTokens.length > 16 ? "repeat(6, 1fr)": "repeat(4, 1fr)"
    }

    return (
        <main className="game grid flow" style={soloMutli}>
            <h1 className="game__title">Memory</h1>
            <section className="game__board grid" style={tokenSizeStyle}>
            {
                setOfTokens.map((token, index) => {
                    const { element, identifier, textContent, flip } = token
                    const tokenComponent = textContent ? 
                    React.createElement(element, {["data-identifer"]: identifier}, textContent)
                    :
                    React.createElement(FontAwesome[element], {["data-identifer"]: identifier})
                    return <Token token={{tokenComponent, token}} flipState={flip} key={`token${index + 1}`}/>
                })
            }
            </section>
                { mode.length > 1
                    ?
                    <section className="game__players-nbr flex">
                        { mode.map((player, index ) => {
                            return <Multiplayer {...player} key={`player${index + 1}`}/>
                        })}
                    </section>
                    :
                    mode.map((player, index) => <SoloMode key={`player${index + 1}`} moves={player.moves}/>)
                }
            <section className="game__controls flex">
                <GameControls/>
            </section>
        </main>                                                        
    )
}