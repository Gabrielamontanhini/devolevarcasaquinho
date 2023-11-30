import styled from "styled-components";
import { colors } from "../../constants/colors/colors";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'animate.css';



export const StyledMain = styled.main`
    display: flex;
    height: 100%;
    @media (max-width: 1100px) {
    flex-direction: column;
  }
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
            width: 110px;
            height: auto;
        }
    }
    h1{
       font-size: 45px;
       font-weight: 600;
       color: ${(props) => (props.mode === "darkmode" ? (colors.darkModeFontColor) : (colors.lightModeFontColor))};
    }
    fieldset{
        width: 80%;
        height: 80px;
        border-radius: 15px;
        background-color: ${(props) => (props.mode === "darkmode" ? (colors.lightModeDarkBackground) : "#EDEDEF")};
        display: flex;
        align-items: center;
        input{
        width: 80%;
        height: 80px;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
       background-color: transparent;
        border: none;
    }
    input:focus{
        outline: none;
    }
    }
    h2{
        font-size: 110px;
        font-weight: 300;
    }
    h3{
        font-size: 32px;
        font-size: 400;
        margin: 15px;
    }
  p{
    text-shadow:
        ${(props) => (props.mode === "darkmode" ? (`0 0 7px #fff,
    0 0 10px #fff,
    0 0 2px #fff,
    0 0 4px #ffffff,
    0 0 8px #ffffff,
    0 0 9px #ffffff,
    0 0 10px #ffffff,
    0 0 15px #9b9b9b;` ) : ("none"))};;
  }
  footer{
    p{
        text-shadow: none;
        color: ${(props) => (props.mode === "darkmode" ? (colors.darkModeFontColor) : (colors.lightModeFontColor))};
    }
  }
    background-color: ${(props) => (props.mode === "darkmode" ? (colors.darkModeLightBackground) : (colors.lightModeLightBackground))};

    @media (max-width: 1100px) {
        margin-top: 20px;
        margin-bottom: 20px;
        flex: 0;
    header{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
  //      background-color: pink;
        h1{
            width: min-content;
           // background-color: red;
        }
    }
    h1{
        font-size: 44px;
    }
    h2{
        font-size: 40px;
    }
    h3{
        font-size: 30px;
    }
    p{
        font-size: 18px;
    }
    fieldset{
        height: 60px;
        input{
        height: 60px;
    }
    }
  }
  @media (max-width: 550px) {
    header{
        img{
            width: 80px;
            height: auto;
        }
        h1{
            font-size: 30px;
        }
    }
  }
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
        width: 60%;
    }
    li{
        font-size: 40px;
        font-weight: 400;
        list-style-type: none;
        cursor: pointer;
     
    }
    .hoje{
        color: ${(props) => ((props.displayData == "Hoje") ? "#C8C8C8" : "black")};
       
    }
    .prox{
        color: ${(props) => (props.displayData == "Hoje" ?  "black" : "#C8C8C8")};
       
    }
    h1{
        font-size: 130px;
        font-weight: 400;
    }
    p{
        font-size: 24px;
    }
    p, h1, li{
        color: ${(props) => (props.mode === "darkmode" ? (colors.darkModeFontColor) : (colors.lightModeFontColor))};
    }
    @media (max-width: 1100px) {
    padding: 15px;

    min-height: 600px;
    menu{
        width: 60%;
        align-self: center;

    }
    li{
        font-size: 28px;
    }
    header{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    h1{
        font-size: 60px;
    }
    p{
        font-size: 20px;
    }
    footer{
        display: flex;
        align-items: center;
        justify-content: center;
    }
  }
  @media (max-width: 550px) {
   li{
    font-size: 18px;
   }
  }
`


export const LinhaDivisoria = styled.div`
    width: 80%;
    border-top: 1px solid #ccc;
    @media (max-width: 1100px) {
        margin-top: 10px;
        margin-bottom: 10px;
    }
`;

export const TemperatureAndWeather = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .sensação {
        font-size: 20px;
    }
    h2, h3{
        color: ${(props) => props.textcolor};
        text-shadow:
        ${(props) => (props.mode === "darkmode" ? (`0 0 7px #fff,
    0 0 10px #fff,
    0 0 2px #fff,
    0 0 4px #ffffff,
    0 0 8px #ffffff,
    0 0 9px #ffffff,
    0 0 10px #ffffff,
    0 0 15px #9b9b9b;` ) : ("none"))};;
    }
`

export const TempAndImage = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
   
    img{
        width: 150px;
        background:transparent;
        border-radius: 50%;
  
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
    p{
        color: #AFADAD;
    }
    @media (max-width: 1100px) {
        height: max-content;
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-content: space-around;
    p{
        margin-top: 30px;
        text-align: center;
    }
  }
`


export const DadosDeHoje = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap ;
    align-items: center;
    justify-content: space-around;
    @media (max-width: 1100px) {
        margin-bottom: 25px;
    }
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
        color: ${(props) => (props.mode === "darkmode" ? (colors.darkModeFontColor) : (colors.lightModeFontColor))};
        text-shadow: none;
    }
    @media (max-width: 1100px) {
        p{
            font-size: 18px; 
        }
    }
`
