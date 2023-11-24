import { useState } from 'react'
import styled from 'styled-components'
import MainPage from './pages/mainPage'


function App() {


  return (
    <StyledApp>
      <MainPage />

    </StyledApp>
  )
}

const StyledApp = styled.div`
  width: 100dvw;
  height: 100dvh;
  background-color: white;

`

export default App
