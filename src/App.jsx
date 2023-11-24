import { useState } from 'react'
import styled from 'styled-components'
import MainPage from './pages/mainPage'
import { colors } from './constants/colors/colors'
import ModeProvider from './contexts/modeContext'
import ModeContext from './contexts/modeContext'


function App() {

  const lsMode = localStorage.getItem("mode");

  const [mode, setMode] = useState(lsMode)

  function setModeAndPersist(mode) {
    setMode(mode)
    localStorage.setItem("mode", mode);
  }

  return (
    <StyledApp>
      <ModeContext.Provider value={{ mode, setMode, setModeAndPersist }}>
        <MainPage />
      </ModeContext.Provider>
    </StyledApp>
  )
}

const StyledApp = styled.div`
  width: 100dvw;
  height: 100dvh;
 // background-color: ${colors.lightModeLightBackground};

`

export default App
