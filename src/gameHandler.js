export const reducer = (state, action) => {
    switch(action.type){
        case "new game":
            const [tokens, gameMode] = [...action.payload()]
            return {
                setOfTokens: tokens,
                mode: gameMode
            }
        case "flip-token":
            const updatePlayers = state.mode.map(player => {
                const {playing, flippedTokens} = player
                if(playing){
                    return {...player, flippedTokens: [...flippedTokens, action.payload]}
                    }
                    return player
                })

            const arePairs = updatePlayers.some(player => {
                const playing = player.playing  
                return playing && player.flippedTokens.length > 1
            })
            
            const updatedTokens = state.setOfTokens.map(token => {

                if(token === action.payload){
                    return {
                        ...token,
                        flip: "is-flipped"
                    }
                }
                if(arePairs && token.flip !== "is-flipped"){
                    return {
                        ...token,
                        isPaired: true
                    }
                }
                return token
            })

            return {
                setOfTokens: updatedTokens,
                mode: updatePlayers
            }
        case "flipped-pairs":
            const matchedPairs = action.payload.reduce((prevToken, currToken) => {
                return prevToken.identifier === currToken.identifier ? prevToken.identifier : false
            })

            const newSetOfTokens = state.setOfTokens.map(token => {
                const { identifier, isPaired, flip } = token

                if(flip !== "is-flipped"){
                    return {...token, isPaired: false}
                }

                if(identifier === matchedPairs){
                    return {...token, isPaired: true}
                }else if(!isPaired){
                    return {...token, flip: "is-unflipped"}
                }
                return token
            })

            const newPlayers = state.mode.map((player, index) => {
                const { flippedTokens } = player
                const updatedPlayer = !(state.mode.length - 1) || flippedTokens.length ? {
                    ...player,
                    moves: player.moves + 1,
                    wins: matchedPairs ? player.wins + 1 : player.wins,
                    flippedTokens: []
                } : player
                const nextPlayer = index + 1 > state.mode.length - 1 ? 0 : index  + 1

                if(flippedTokens.length && state.mode.length - 1 ){
                    state.mode[nextPlayer].playing = true

                    if(matchedPairs){
                        updatedPlayer.wins = player.wins + 1
                        updatedPlayer.playing = false
                    }else {
                        updatedPlayer.playing = false
                    }
                }
                return updatedPlayer
            })

            return {
                setOfTokens: newSetOfTokens,
                mode: newPlayers
            }
        case "set game":
            return {}
    default:
        return state
    }
}