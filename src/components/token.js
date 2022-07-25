import React from 'react'

import { useGlobalContext } from '../gameLogic'
import useMounted from "../customHooks/useMounted"

export default function Token({token, flipState}) {
  const { tokenClick } = useGlobalContext()
  const isMounted = useMounted()
  
  return (
    <button className="menu-btns" onClick={() => tokenClick(token.token)} disabled={token.token.flip === "is-flipped" || token.token.isPaired}>
        <div className={isMounted ? flipState : ""}>
            <div className="token-unflipped">
            </div>
            <div className="token-container bg-orange flex">
                { token.tokenComponent }
            </div> 
        </div>
    </button>
  )
}