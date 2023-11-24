import { createContext, useState } from "react";

export const ModeContext = createContext()

export default function ModeProvider({ children }) {
const lsMode = JSON.parse(localStorage.getItem("mode"))
    const [mode, setMode] = useState(lsMode)
    return (
        <ModeContext.Provider value={{ mode, setMode }}>
            {children}
        </ModeContext.Provider>
    )
}