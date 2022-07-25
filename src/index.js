import React from "react";
import ReactDOM from "react-dom/client";

import ContextProvider from "./gameLogic"
import App from "./app"

import "./style/style.scss"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <React.StrictMode>
        <ContextProvider>
            <App></App>
        </ContextProvider>
    </React.StrictMode>
)