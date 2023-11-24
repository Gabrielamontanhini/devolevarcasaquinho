import styled from "styled-components";
import { colors } from "../../constants/colors/colors";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export const StyledMain = styled.main`
    display: flex;
    height: 100%;
`

export const CurrentWeather = styled.section`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    flex: 1;
    header{
        display: flex;
        width: 80%;
        img{
            height: 120px;
        }
    }
    h1{
       font-size: 55px;
       font-weight: 600;
       color: black;
  
    }
    fieldset{
        width: 80%;
        height: 80px;
        border-radius: 15px;
       background-color: #EDEDEF;
        display: flex;
        align-items: center;
        input{
        width: 80%;
        height: 80px;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
       background-color: #EDEDEF;
        border: none;
    }
    input:focus{
        outline: none;
    }
    }
    
    h2{
        font-size: 140px;
        font-weight: 300;
        
    }
    h3{
        font-size: 32px;
        font-size: 400;
        margin: 15px;
    }
    background-color: ${(props) => (props.mode === "darkmode" ? (colors.darkModeLightBackground) : (colors.lightModeLightBackground))};;
`

export const WeatherDetails = styled.section`
    height: 100%;
    flex: 2;
    padding-left: 2%;
    background-color: ${(props) => (props.mode === "darkmode" ? (colors.darkModeDarkBackground) : (colors.lightModeDarkBackground))};;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    menu{
        display: flex;
        justify-content: space-between;
        width: 40%;
    }
    li{
        font-size: 48px;
        font-weight: 400;
        list-style-type: none;
    }
    h1{
        font-size: 150px;
        font-weight: 400;
    }
    p{
        font-size: 24px;
    }
`


export const LinhaDivisoria = styled.div`
    width: 80%;
    border-top: 1px solid #ccc;
`;

export const TemperatureAndWeather = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    h2, h3{
        color: ${(props) => props.textColor}
    }
`

export const TempAndImage = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    img{
        width: 150px;
    }
    h2{
        text-shadow:
    0 0 7px #fff,
    0 0 10px #fff,
    0 0 2px #fff,
    0 0 4px #ffffff,
    0 0 8px #ffffff,
    0 0 9px #ffffff,
    0 0 10px #ffffff,
    0 0 15px #9b9b9b;
    }
`

export const IconeEstilizado = styled(FontAwesomeIcon)`
  color: grey;
  font-size: 34px;
  width: 20%;
`;


export const Hoje = styled.div`
    width: 80%;
    height: 60%;

`


export const DadosDeHoje = styled.div`
    width: 100%;
    height: 80%;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;

`
export const SwitchButtons = styled.div`
    width: 80%;

    display: flex;
    flex-direction: column;
    align-items: center;
    div{
        height: 60px;
        
        width: 180px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        label{
            margin-left: 10px;
            font-size: 24px;
       
        }
    }

`

export const DataEHora = styled.div`
display: flex;
flex-direction: column;
align-items: center;
    p{
        font-size: 24px;
    }

`
