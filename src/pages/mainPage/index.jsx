import { useEffect, useState } from "react"
import styled from "styled-components"
import CatWithCoat from "../../assets/cat.webp"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import CardComponent from "../../components/cardComponent";
import GraficoComponent from "../../components/graficoComponent";
import { fetchDataByCityName, fetchDataByLatAndLong, fetchSevenDaysData } from "../../services/WeatherServices";
import { colors } from "../../constants/colors/colors";
import { Switch } from "@mui/material";


export default function MainPage() {
    const [darkMode, setDarkMode]=useState(false)
    const [nextDays, setNextDays]=useState([])
    const [unit, setUnit] = useState("ºC")
    const [searchCity, setSearchCity] = useState()
    const [details, setDetails] = useState({
        cidade: '',
        latitude: '',
        longitude: '',
        temperaturaAtual: '',
        descrição: '',
        minima: '',
        maxima: '',
        umidade: '',
        vento: ''
    })


    const [displayData, setDisplayData] = useState("Hoje")

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetchDataByLatAndLong(position.coords.latitude, position.coords.longitude, setDetails)
            },
            (error) => {
                console.error('Erro ao pegar geolocalização:', error.message);
            }
        )

            ;

    }, []);



    function handleSearch() {
        fetchDataByCityName(searchCity, setDetails)
        setSearchCity('')
    }



    function handleDisplayData() {
        if (displayData === "Hoje") {
            
            fetchSevenDaysData(details.latitude, details.longitude, setNextDays)
            setDisplayData("proximos")
        } else {
            setDisplayData("Hoje")
        }

    }


function switchMode(){
    setDarkMode(!darkMode)
    console.log("oi?")
}


    return (
        <StyledMain>
            <CurrentWeather>
                <header>
                    <img src={CatWithCoat} alt="cat" />
                    <h1 >Devo levar um casaquinho?</h1>
                </header>
                <fieldset>
                    <IconeEstilizado icon={faSearch} onClick={handleSearch} />
                    <input
                        type="text"
                        placeholder="Procure por uma cidade"
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                    />
                </fieldset>
                <TemperatureAndWeather>
                    <TempAndImage>
                        <img src="https://openweathermap.org/img/wn/04d@2x.png" alt="current-weather" />
                        <h2>{details.temperaturaAtual}{unit}</h2>
                    </TempAndImage>
                    <h3>    {details.descrição}</h3>
                </TemperatureAndWeather>
                <LinhaDivisoria />
                <DataEHora>
                    <p>16/11/2023</p>
                    <p>Quinta-feira, 16:32</p>
                </DataEHora>
                <SwitchButtons>
                    <div>
                    <Switch  />
                        <label htmlFor="fahrenheit">Fº</label>
                    </div>

                    <div >
                    <Switch  />
                        <label for="darkMode">Dark Mode </label>
                        
                    </div>


                </SwitchButtons>
                <footer>
                    <p>Nenhum direito reservado. 2023</p>
                </footer>
            </CurrentWeather>
            <WeatherDetails>
                <menu>
                    <li onClick={handleDisplayData}>Hoje</li>
                    <li onClick={handleDisplayData}>Próximos Dias</li>
                </menu>
                <header>
                    <h1>{details.cidade}</h1>
                    <p>Lat: {details.latitude} Long: {details.longitude}</p>
                </header>
                {displayData === "Hoje" ? (<Hoje>
                    <DadosDeHoje>
                        <CardComponent
                            nome="Mínima"
                            dado={details.minima}
                        />
                        <CardComponent
                            nome="Máxima"
                            dado={details.maxima}
                        />
                        <CardComponent
                            nome="Umidade"
                            dado={details.umidade}
                        />
                        <CardComponent
                            nome="Velocidade do vento"
                            dado={details.vento}
                        />
                    </DadosDeHoje>


                    <p>{(details.maxima < 20) ? "Sim, é bom levar um casaquinho!" : "Não, por favor, eu imploro, nenhum casaquinho!"} </p>
                </Hoje>
                ) : (
                    <GraficoComponent 
                    lat={details.latitude}
                    lon={details.longitude}
                    nextDays={nextDays}
                    setNextDays={setNextDays}
                    cidade={details.cidade}
                    />
                )}
                <footer>
                    <p>Dados retirados da minha cabecinha</p>
                </footer>
            </WeatherDetails>
        </StyledMain>
    )
}

const StyledMain = styled.main`
    display: flex;
    height: 100%;
`

const CurrentWeather = styled.section`
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
        color: #EC6E4C; //ira mudar
    }
    h3{
        font-size: 32px;
        font-size: 400;
        margin: 15px;
    }
`

const WeatherDetails = styled.section`
    height: 100%;
    flex: 2;
    padding-left: 2%;
    background-color: ${colors.lightModeDarkBackground};
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


const LinhaDivisoria = styled.div`
    width: 80%;
    border-top: 1px solid #ccc;
`;

const TemperatureAndWeather = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`

const TempAndImage = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    img{
        width: 150px;
    }
`

const IconeEstilizado = styled(FontAwesomeIcon)`
  color: grey;
  font-size: 34px;
  width: 20%;
`;


const Hoje = styled.div`
    width: 80%;
    height: 60%;

`


const DadosDeHoje = styled.div`
    width: 100%;
    height: 80%;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;

`
const SwitchButtons = styled.div`
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

const DataEHora = styled.div`
display: flex;
flex-direction: column;
align-items: center;
    p{
        font-size: 24px;
    }

`