import React, {useState, useEffect} from "react"

export default function useMedia(mode){
    const [styles, setStlyes] = useState({})
    const mediaQueryL = window.matchMedia("(max-width: 620px)")

    let desktopLayout = {
        gridTemplateAreas : mode.length > 1 ? 
        `"logo controls""board board""score score` : `"logo controls""board board""solo-mode solo-mode"`
    }

    useEffect(() => {
        resizingHandler()
        mediaQueryL.addEventListener("change", resizingHandler)
        return () => {
            mediaQueryL.removeEventListener("change", resizingHandler)
        }
    }, [mode])

    const resizingHandler = (e) => {
        const isSolo = desktopLayout.gridTemplateAreas.indexOf("solo-mode")
        const isMatched = e ? e.matches : mediaQueryL.matches
        const mobileLayout = {}

        if(isMatched && isSolo !== -1){
            mobileLayout.gridTemplateAreas = `"logo logo""board board""solo-mode solo-mode""controls controls"`
        }else if(isMatched && isSolo === -1){
            mobileLayout.gridTemplateAreas = `"logo logo""board board""score score""controls controls"`
        }

        setStlyes(() => {
            return isMatched ? mobileLayout : desktopLayout
        })
    }
    return styles
}