import { useEffect, useState } from "react"
import styled from "styled-components"
import CatWithCoat from "../../assets/cat.webp"

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import CardComponent from "../../components/cardComponent";
import GraficoComponent from "../../components/graficoComponent";
import { fetchDataByCityName, fetchDataByLatAndLong, fetchSevenDaysData } from "../../services/WeatherServices";
import { colors } from "../../constants/colors/colors";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { CurrentWeather, DadosDeHoje, DataEHora, Hoje, IconeEstilizado, LinhaDivisoria, StyledMain, TempAndImage, TemperatureAndWeather, WeatherDetails } from "./styled";


export default function MainPage() {
    const [darkMode, setDarkMode] = useState(false)
    const [nextDays, setNextDays] = useState([])
    const [unit, setUnit] = useState("ºC")
    const [searchCity, setSearchCity] = useState()
    const [displayData, setDisplayData] = useState("Hoje")
    const [textColor, setTextColor]=useState("#C71585")
    const [details, setDetails] = useState({
        cidade: '',
        latitude: '',
        longitude: '',
        temperaturaAtual: '',
        descrição: '',
        idWeather: '',
        icon:'',
        minima: '',
        maxima: '',
        umidade: '',
        vento: ''
    })


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {fetchDataByLatAndLong(position.coords.latitude, position.coords.longitude, setDetails, unit, setTextColor)},
            (error) => {console.error('Erro ao pegar geolocalização:', error.message);});
    }, []);


    function handleSearch() {
        fetchDataByCityName(searchCity, setDetails, unit, setTextColor)
        setSearchCity('')
    }



    function handleDisplayData() {
        if (displayData === "Hoje") {
            fetchSevenDaysData(details.latitude, details.longitude, setNextDays, unit)
            setDisplayData("proximos")
        } else {
            setDisplayData("Hoje")
        }
    }


    function switchMode() {
        setDarkMode(!darkMode)
        console.log("oi?")
    }

function unitsChange(){
    if (unit === "ºC"){
        setUnit("ºF")
        fetchDataByLatAndLong(details.latitude, details.longitude, setDetails, "ºF")
    } else {
        setUnit("ºC")
        fetchDataByLatAndLong(details.latitude, details.longitude, setDetails, "ºC")
    }
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
                <TemperatureAndWeather textColor={textColor}>
                    <TempAndImage>
                        <img src={`https://openweathermap.org/img/wn/${details.icon}@2x.png`}  alt="current-weather" />
                        <h2>{details.temperaturaAtual}{unit}</h2>
                    </TempAndImage>
                    <h3>    {details.descrição}</h3>
                </TemperatureAndWeather>
                <LinhaDivisoria />
                <DataEHora>
                    <p>16/11/2023</p>
                    <p>Quinta-feira, 16:32</p>
                </DataEHora>
                <FormGroup>
                    <FormControlLabel control={<Switch onClick={unitsChange}/>} label="Fº"  />
                    <FormControlLabel control={<Switch />} label="DarkMode" style={{ fontSize: '24px' }}/>
                </FormGroup>
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
                {displayData === "Hoje" ? (
                <Hoje>
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


                    <p>{(details.minima > 25 && unit === "ºC") || (details.minima > 77 && unit === "Fº") ? "Não, não precisa de casaqunho!" : "Sim! É uma boa ideia levar um casaquinho!"}</p>
                </Hoje>
                ) : (
                    <GraficoComponent
                        lat={details.latitude}
                        lon={details.longitude}
                        nextDays={nextDays}
                        setNextDays={setNextDays}
                        cidade={details.cidade}
                        unit={unit}
                    />
                )}
                <footer>
                    <p>Dados retirados da minha cabecinha</p>
                </footer>
            </WeatherDetails>
        </StyledMain>
    )
}
