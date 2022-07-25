import React, { useState, useEffect, useContext, useReducer } from "react";
import { reducer } from "./gameHandler"

import { icons } from "./components/icons";

// The Context setup of the whole App
const AppContext = React.createContext()

const AppProvider = ({children}) => {
    // Setting states for the menu component
    const [newGameSet, setSetupGame] = useState({
        tokenType: "",
        players: 0,
        boardSize: 0,
        gameSet: false
    })
    const [timer, setTimer] = useState({
        currentTime: "00:00:00",
        startingTime : 0,
        minsHours : ["00", "00"]
    })
    const [game, dispatch] = useReducer(reducer, {})

    useEffect(() => {
            newGameSet.gameSet && dispatch({type: "new game", payload: generateGame});
        },[newGameSet.gameSet])

    useEffect(() => {
        if(game.mode){            
            const isFlippedPairs = game.mode.filter(player => {
                const {playing, flippedTokens} = player
                return (playing || playing === undefined) && flippedTokens.length > 1
            })
            if(isFlippedPairs.length){
                setTimeout( () => {
                    dispatch({type: "flipped-pairs", payload: isFlippedPairs[0].flippedTokens})
                }, 1000)
            }
        }
    }, [game.mode])
    // event handlers for the menu component's inputs
    const setNewGame = (e) => {
        setSetupGame(prevState => {
        let value = !e.target.value ? parseInt(e.target.textContent) : parseInt(e.target.value.slice(0, 1)) ? parseInt(e.target.value.slice(0, 1)) : e.target.value
        const name = e.target.name ? e.target.name : "players"

        return {...prevState, [name]: value}
        })
    }
    // launch the game once all settings are set/ eventHandler for the Start btn
    const startGame = () => {
        setSetupGame(prevState => {
        let settingGame = true
        for(const setting in prevState){
            if(setting !== "gameSet" && !prevState[setting]){
                settingGame = false
            }
        }
        return settingGame ? {...prevState, gameSet: true} : {...prevState}
        })
    }
    const restartGame = () => {
        dispatch({type: "new game", payload: generateGame})
        resetTimer()
    }
    // generate the game following the player/s defined settings
    const generateGame = () => {    
        const setOfTokens = generateBoard(newGameSet.tokenType, newGameSet.boardSize)
        .map(token => {
            return {
                element: newGameSet.tokenType === "Icons" ? token : "span",
                identifier: token,
                textContent: typeof token === "number" && token,
                flip: "",
                isPaired: false
            }
        })
        const gameMode = generatePlayers(newGameSet.players)
        return [setOfTokens, gameMode]
    }
    // generate the board depending on the configs set
    const generateBoard = (type, size) => {
        const tokens = type === "Numbers" ? Array.from({length: 18}, (_, i) => i + 1) : [...icons]
        if(size === 4){
            tokens.splice(randomNum([0, 8]), 10)
        }
        return shuffleTokens([...tokens, ...tokens])
    }
    // generate the fixed number of players
    const generatePlayers = (player) => {
        const players = Array.from(Array(player + 1).keys()).slice(1)
        return players.map((player, index) => {
            return {
                id: player,
                wins: 0,
                moves: 0,
                playing: index == 0 ? true : false,
                flippedTokens: []
            }
        })
    }
    const updateTimer = () => {
        setTimer((prevState) => {
            let {currentTime, startingTime, minsHours} = {...JSON.parse(JSON.stringify(prevState))}
            let timeElapsed = Math.floor((Date.now() - startingTime) / 1000)
            
            if(timeElapsed < 10){
                timeElapsed = "0" + timeElapsed
            }
            
            if(timeElapsed > 59){
                minsHours[0] = typeof minsHours[0] === "string" && parseInt(minsHours[0]) + 1 < 10 ? "0" + (parseInt(minsHours[0]) + 1) : typeof minsHours[0] === "number" ? minsHours[0] + 1 : parseInt(minsHours[0]) + 1
                startingTime = Date.now()
                timeElapsed = "00"
            }

            if(minsHours[0] > 59 ){
                minsHours[1] = typeof minsHours[1] === "string" && parseInt(minsHours[1]) + 1 < 10 ? "0" + (parseInt(minsHours[1]) + 1) : typeof "string" ? parseInt(minsHours[1]) + 1 : minsHours[1] + 1
                minsHours[0] = "00"
                timeElapsed = "00"
            }

            currentTime = `${minsHours[1]}:${minsHours[0]}:${timeElapsed}`
            return {currentTime, startingTime, minsHours}
        })
    }
    const resetTimer = () => {
        console.log(game.mode.length)
        game.mode.length === 1 && setTimer({
            currentTime: "00:00:00",
            startingTime : 0,
            minsHours : ["00", "00"]
        })                
    }
    // what happens on token click
    const tokenClick = (token) => {
        dispatch({type: "flip-token", payload: token})
    }
    const shuffleTokens = (array) => {
        return array.sort(() => Math.random() - 0.5 )
    }
    const newGameStart = () => {
        resetTimer()
        dispatch({type: "set game"})
        setSetupGame({
            tokenType: "",
            players: 0,
            boardSize: 0,
            gameSet: false
        })

    }
    // return random element value from the passed array argument
    function randomNum(arrayContainer){
        const index = Math.floor(Math.random() * arrayContainer.length)
        return arrayContainer[index]
    }
    return <AppContext.Provider value = {{
        newGameSet,
        gameSet: newGameSet.gameSet,
        setNewGame,
        startGame,
        game,
        dispatch,
        tokenClick,
        timer,
        updateTimer,
        setTimer,
        restartGame,
        newGameStart
        }
    }>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export default AppProvider