import { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { fetchSevenDaysData } from '../../services/WeatherServices';


export default function GraficoComponent({ lat, lon, nextDays, setNextDays, cidade, unit }) {
    const [weatherData, setWeatherData] = useState()
    const [parametro, setParametro] = useState()

    const data = [{ dia: "A", temperatura: 200 },
    { dia: "B", temperatura: 300 }, { dia: "C", temperatura: 100 },
    { dia: "D", temperatura: 200 }, { dia: "E", temperatura: 200 },
    { dia: "F", temperatura: 300 }, { dia: "G", temperatura: 100 },
    { dia: "H", temperatura: 1000 }]


    const [teste, setTeste] = useState(nextDays)


    useEffect(() => {
        console.log(lat, lon)
        if (nextDays.length === 0) {
            console.log("ta vazio")
            fetchSevenDaysData(lat, lon, setNextDays, unit)
            setParametro(cidade)
        }

    }, [unit])

   

    return (

        <StyledResponsiveContainer width="80%" height="60%">
            <LineChart   data={nextDays}>
                <Line type="monotone" dataKey="temperatura" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="dia" />
                <YAxis />
                <Tooltip />
            </LineChart>
        </StyledResponsiveContainer>

    )
}




const StyledResponsiveContainer = styled(ResponsiveContainer)`
    
    background-color: white;
    display: flex;
    align-self: flex-start;
    padding-top: 2%;
    padding-right: 2%;
    @media (max-width: 1100px) {
        align-self: center;
    }
 
`