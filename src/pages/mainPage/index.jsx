import { useContext, useEffect, useState } from "react"
import CatWithCoat from "../../assets/cat.webp"
import DarkCatWithCoat from "../../assets/gato-casaco.png"
import catTeste from "../../assets/cutecat.webp"

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import CardComponent from "../../components/cardComponent";
import GraficoComponent from "../../components/graficoComponent";
import { fetchDataByCityName, fetchDataByLatAndLong, fetchSevenDaysData } from "../../services/WeatherServices";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { CurrentWeather, DadosDeHoje, DataEHora, Hoje, IconeEstilizado, LinhaDivisoria, StyledMain, TempAndImage, TemperatureAndWeather, WeatherDetails } from "./styled";
import ModeContext from "../../contexts/modeContext";

import 'animate.css';


export default function MainPage() {
    const {setModeAndPersist} = useContext(ModeContext)
    const {mode}=useContext(ModeContext)
    const [dataFormatada, setDataFormatada] = useState('');
    const [horaFormatada, setHoraFormatada] = useState('');
    const [nextDays, setNextDays] = useState([])
    const [unit, setUnit] = useState("ºC")
    const [searchCity, setSearchCity] = useState()
    const [displayData, setDisplayData] = useState("Hoje")
    const [darkCat, setDarkCat]=useState(CatWithCoat)
    const [textColor, setTextColor]=useState("#C71585")
    const [animationKey, setAnimationKey] = useState(0)
    const [animationKeyNumber, setAnimationKeyNumber]=useState(0)
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
        const agora = new Date();
      
        const formatoData = new Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
        const dataFormatada = formatoData.format(agora);
  
        const formatoHora = new Intl.DateTimeFormat('pt-BR', {
          weekday: 'long',
          hour: 'numeric',
          minute: 'numeric',
        });
        const horaFormatada = formatoHora.format(agora);
  
        setDataFormatada(dataFormatada);
        setHoraFormatada(horaFormatada);
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetchDataByLatAndLong(position.coords.latitude, position.coords.longitude, setDetails, unit, setTextColor)
            },
            (error) => {console.error('Erro ao pegar geolocalização:', error.message);});
        if (mode === "darkmode"){
            setDarkCat(DarkCatWithCoat)
        } else if (mode === "lightmode"){
            setDarkCat(catTeste)
        }
    }, []);

function handleKeyDown(e){
    if (e.key === 'Enter') {
        handleSearch() 
    }
}
    function handleSearch() {
       
      fetchDataByCityName(searchCity.trim(), setDetails, unit, setTextColor)   
       setSearchCity('')
    }



    function handleDisplayData() {
        console.log(displayData)
        if (displayData === "Hoje") {
            fetchSevenDaysData(details.latitude, details.longitude, setNextDays, unit)
            setDisplayData("proximos")
        } else if (displayData === "proximos") {
            setDisplayData("Hoje")
        }
    }


    function switchMode() {
        
        setAnimationKey((prevKey) => prevKey + 1);
        if (mode === "darkmode"){
            setModeAndPersist("lightmode")
          
            setDarkCat(catTeste)  
                   
        } else {
            setModeAndPersist("darkmode")
            
            setDarkCat(DarkCatWithCoat)  

        }
        
    }

function unitsChange(){
    setAnimationKeyNumber((prevKey) => prevKey + 1);
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
            <CurrentWeather mode={mode}>
                <header>
                    <img src={darkCat} alt="cat"  key={animationKey}  className={"animate__animated animate__slideInDown animate__slow"}/>
                    <h1 >Devo levar um casaquinho?</h1>
                </header>
                <fieldset>
                    <IconeEstilizado icon={faSearch} onClick={handleSearch} />
                    <input
                        type="text"
                        onKeyDown={handleKeyDown}
                        placeholder="Procure por uma cidade"
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                    />
                </fieldset>
                <TemperatureAndWeather textcolor={textColor} mode={mode}>
                    <TempAndImage >
                        <img src={`https://openweathermap.org/img/wn/${details.icon}@2x.png`}  alt="current-weather" />
                        <h2 key={animationKeyNumber} className="animate__animated  animate__fadeIn animate__slower  animate__delay-0.9s" >{details.temperaturaAtual}{unit}</h2>
                    </TempAndImage>
                    <h3>    {details.descrição}</h3>
                </TemperatureAndWeather>
                <LinhaDivisoria />
                <DataEHora mode={mode}>
                    <p>{dataFormatada}</p>
                    <p>{horaFormatada}</p>
                </DataEHora>
                <FormGroup>
                    <FormControlLabel control={<Switch onClick={unitsChange} />} label="Fº"  />
                    <FormControlLabel control={<Switch onClick={switchMode} checked={mode === "darkmode"}/>} label="DarkMode" style={{ fontSize: '24px' }}/>
                </FormGroup>
                <footer>
                    <p>Todos os direitos reservados. 2023</p>
                </footer>
            </CurrentWeather>
            <WeatherDetails mode={mode} displayData={displayData}>
                <menu >
                    <li className="hoje" onClick={handleDisplayData}>Hoje</li>
                    <li className="prox" onClick={handleDisplayData}>Próximos Dias</li>
                </menu>
                <header>
                    <h1 >{details.cidade}</h1>
                    <p>Lat: {details.latitude} Long: {details.longitude}</p>
                </header>
                {displayData === "Hoje" ? (
                <Hoje>
                    <DadosDeHoje  key={animationKeyNumber}  className="animate__animated  animate__fadeIn animate__slower">
                        <CardComponent mode={mode}
                            nome="Mínima"
                            dado={`${details.minima} ${unit}`}
                        />
                        <CardComponent mode={mode} 
                            nome="Máxima"
                            dado={`${details.maxima} ${unit}`}
                        />
                        <CardComponent mode={mode} 
                            nome="Umidade"
                            dado={`${details.umidade}%`}
                        />
                        <CardComponent mode={mode} 
                            nome="Velocidade do vento"
                            dado={`${details.vento} ${unit === "ºC"?"m/s":"mph"}`}
                        />
                    </DadosDeHoje>


                    <p>{(details.minima < 17 && unit === "ºC") || (details.minima < 62.6 && unit === "Fº") ? "Sim! É uma boa ideia levar um casaquinho!": "Não, não precisa de casaqunho!" }</p>
                </Hoje>
                ) : (
                    <GraficoComponent
                        lat={details.latitude}
                        lon={details.longitude}
                        nextDays={nextDays}
                        setNextDays={setNextDays}
                        cidade={details.cidade}
                        unit={unit}
                        details={details}
                    />
                )}
                <footer>
                    <p>Dados retirados da OpenWeatherMap API</p>
                </footer>
            </WeatherDetails>
        </StyledMain>
    )
}
