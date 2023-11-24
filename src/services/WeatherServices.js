import axios from "axios";

const apiKey = import.meta.env.VITE_APIKEY;

const url = "https://api.openweathermap.org/data/2.5"

export function fetchDataByLatAndLong(lat, long, setDetails, unit) {
    const response = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${unit==="ºC"?"metric":"imperial"}&lang=pt_br`)
    response.then((res) => {

        setDetails({
            cidade: (res.data.name),
            latitude: (res.data.coord.lat),
            longitude: (res.data.coord.lon),
            temperaturaAtual: (res.data.main.temp),
            descrição: (res.data.weather[0].description),
            minima: (res.data.main.temp_min),
            maxima: (res.data.main.temp_max),
            umidade: (res.data.main.humidity),
            vento: (res.data.wind.speed)
        })
    })
    response.catch((err) => {
        console.log(err)
        console.log(lat, long)
    })
}


export function fetchDataByCityName(searchCity, setDetails, unit) {
    const response = axios.get(`${url}/weather?q=${searchCity}&lang=pt_br&appid=${apiKey}&units=${unit==="ºC"?"metric":"imperial"}`)
    response.then((res) => {
        console.log(res.data)
        setDetails({
            cidade: (res.data.name),
            latitude: (res.data.coord.lat),
            longitude: (res.data.coord.lon),
            temperaturaAtual: (res.data.main.temp),
            descrição: (res.data.weather[0].description),
            minima: (res.data.main.temp_min),
            maxima: (res.data.main.temp_max),
            umidade: (res.data.main.humidity),
            vento: (res.data.wind.speed)
        })

    })
}

export function fetchSevenDaysData(lat, lon, setNextDays, unit) {
    const response = axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit==="ºC"?"metric":"imperial"}&lang=pt_br`)
    
    response.then((res) => {
   
        const novaLista = res.data.list
   
        const batata = novaLista.map((dado) => {
            return {
                name: dado.dt_txt,
                value: dado.main.temp
            }
        })
       
        console.log(batata)
        setNextDays(batata)
    })
    response.catch((err) => {
        console.log(err.response.data)
    })
}