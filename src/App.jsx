import { useState } from 'react'
import styled from 'styled-components'
import MainPage from './pages/mainPage'
import { colors } from './constants/colors/colors'
import ModeProvider from './contexts/modeContext'


function App() {
  
  const lsMode = JSON.parse(localStorage.getItem("mode"))

  return (
    <StyledApp>
      <ModeProvider>
      <MainPage />
      </ModeProvider>
    </StyledApp>
  )
}

const StyledApp = styled.div`
  width: 100dvw;
  height: 100dvh;
  background-color: ${colors.lightModeLightBackground};

`

export default App
