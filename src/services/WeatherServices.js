import axios from "axios";
import Swal from "sweetalert2";
import { format, parseISO } from 'date-fns';






const apiKey = import.meta.env.VITE_APIKEY;

const url = "https://api.openweathermap.org/data/2.5"

export function fetchDataByLatAndLong(lat, long, setDetails, unit, setTextColor) {
    const response = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${unit === "ºC" ? "metric" : "imperial"}&lang=pt_br`)
    response.then((res) => {
console.log(res.data)
        setDetails({
            cidade: (res.data.name),
            latitude: (res.data.coord.lat),
            longitude: (res.data.coord.lon),
            temperaturaAtual: (res.data.main.temp).toFixed(1),
            descrição: (res.data.weather[0].description),
            idWeather: (res.data.weather[0].id),
            icon:(res.data.weather[0].icon),
            minima: (res.data.main.temp_min),
            maxima: (res.data.main.temp_max),
            umidade: (res.data.main.humidity),
            vento: (res.data.wind.speed)
        })
        const verified = verifyColor(res.data.weather[0].id)
        setTextColor(verified)
    })
    response.catch((err)=>{
        Swal.fire({
            title: `${err.response.data.cod === "404" ? "Cidade não encontrada" : "Busca não efetuada"}`,
            text: "Verifique o nome da cidade que você digitou",
            icon: "error"
          });
       
    })
}


export function fetchDataByCityName(searchCity, setDetails, unit, setTextColor) {
    const response = axios.get(`${url}/weather?q=${searchCity}&lang=pt_br&appid=${apiKey}&units=${unit === "ºC" ? "metric" : "imperial"}`)
    response.then((res) => {
        console.log(res.data)
        setDetails({
            cidade: (res.data.name),
            latitude: (res.data.coord.lat),
            longitude: (res.data.coord.lon),
            temperaturaAtual: (res.data.main.temp).toFixed(1),
            descrição: (res.data.weather[0].description),
            idWeather: (res.data.weather[0].id),
            icon:(res.data.weather[0].icon),
            minima: (res.data.main.temp_min),
            maxima: (res.data.main.temp_max),
            umidade: (res.data.main.humidity),
            vento: (res.data.wind.speed)
        })
        const verified = verifyColor(res.data.weather[0].id)
        setTextColor(verified)
       
    })
    response.catch((err)=>{
        console.log(err.response.data)
        Swal.fire({
            title: `${err.response.data.cod === "404" ? "Cidade não encontrada" : "Busca não efetuada"}`,
            text: "Verifique o nome da cidade que você digitou",
            icon: "error"
          });
    })
}

export function fetchSevenDaysData(lat, lon, setNextDays, unit) {
    const response = axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit === "ºC" ? "metric" : "imperial"}&lang=pt_br`)

    response.then((res) => {
        const novaLista = res.data.list
        const nextDaysForecast = novaLista.map((dado) => {
            const formattedDate = format(parseISO(dado.dt_txt), 'dd/MM (eee)'); 
            return {
              dia: formattedDate,
              temperatura: dado.main.temp,
            };
          });
          setNextDays(nextDaysForecast); 
          console.log(nextDaysForecast)
        });
    response.catch((err) => {
   
        return err.response.data
    })
}

function verifyColor(id) {
    switch (true) {
        case id >= 200 && id <= 232:
            return "#800080"; 
        case (id >= 300 && id <= 321) || (id >= 500 && id <= 531):
            return "#0000FF"; 
        case id >= 600 && id <= 622:
            return "#F5F5F5"; 
        case id >= 701 && id <= 781:
            return "#E6E6FA"; 
        case id === 800:
            return "#FFA500"; 
        case id === 801 || id === 802:
            return "#708090"; 
        case id === 803:
            return "#A9A9A9"; 
        case id === 804:
            return "#808080";
        default:
            return "#000000"; 
    }
}