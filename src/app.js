import React from "react"
import { useGlobalContext } from "./gameLogic"


import Menu from "./screens/menu-box/menuBox"
import GameBoard from "./screens/gameBoard"
import GameResult from "./screens/gameResult"

export default function App(){
    const { gameSet, game } = useGlobalContext()
    const areAllPaired = game.setOfTokens && game.setOfTokens.every(token => token.isPaired)
    
    if(areAllPaired){
        return <GameResult players={game.mode}/>
    }

    if(!gameSet || !game.mode){
        return <Menu/>
    }

    return <GameBoard/>
}