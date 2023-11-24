import { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import styled from 'styled-components';
import { fetchSevenDaysData } from '../../services/WeatherServices';


export default function GraficoComponent({ lat, lon, nextDays, setNextDays, cidade }) {
    const [weatherData, setWeatherData] = useState()
    const [parametro, setParametro] = useState()

    const data = [{ name: "A", value: 200 },
    { name: "B", value: 300 }, { name: "C", value: 100 },
    { name: "D", value: 200 }, { name: "E", value: 200 },
    { name: "F", value: 300 }, { name: "G", value: 100 },
    { name: "H", value: 1000 }]


    const [teste, setTeste] = useState(nextDays)


    useEffect(() => {
        console.log(lat, lon)
        if (nextDays.length === 0) {
            console.log("ta vazio")
            fetchSevenDaysData(lat, lon, setNextDays)
            setParametro(cidade)
        }

    }, [parametro])

    function verificarDados() {
        console.log(teste)
    }

    return (
        <Gráfico onClick={verificarDados}>
            <LineChart width={1000} height={450} data={nextDays} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart>
        </Gráfico>
    )
}


const Gráfico = styled.div`
    width: 80%;
    height: 50%;
    background-color: white;
    display: flex;
    align-self: flex-start;
    padding-top: 2%;
    margin-bottom: 7%;
`