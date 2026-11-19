import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { AppProvider } from "./contexts/AppContext";
import { LanguageProvider } from "./contexts/LanguageContext";

import "./index.css";

console.log("MAIN.TSX EXECUTED");

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <LanguageProvider>
            <AppProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AppProvider>
        </LanguageProvider>
    </React.StrictMode>
);
