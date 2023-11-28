import { useContext, useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, Legend, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { fetchSevenDaysData } from '../../services/WeatherServices';
import ModeContext from '../../contexts/modeContext';



export default function GraficoComponent({ lat, lon, nextDays, setNextDays, cidade, unit, details }) {
    const { mode } = useContext(ModeContext)
    useEffect(() => {
        fetchSevenDaysData(lat, lon, setNextDays, unit);
    }, [lat, lon, unit, cidade]);
    return (
        <StyledResponsiveContainer width="80%" height={400} mode={mode}>
            <LineChart data={nextDays}>
                <Line type="monotone" dataKey="temp" stroke="#8884d8" strokeWidth={2} name="Temperatura" />
                <Line type="monotone" dataKey="max" stroke="red" strokeWidth={2} name="Máxima" dot={false} />
                <Line type="monotone" dataKey="min" stroke="blue" strokeWidth={2} name="Mínima" dot={false} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="dia" />
                <YAxis
                    tickFormatter={(value) => `${value} ${unit}`}
                />
                <Tooltip
                    formatter={(value, name) => [`${value} ${unit}`, name]}
                    labelFormatter={(label) => `Dia ${label}`}
                    labelStyle={{ fontSize: 18 }}
                    itemStyle={{ fontSize: 20 }}
                />
                <Legend />
            </LineChart>
        </StyledResponsiveContainer>
    )
}

const StyledResponsiveContainer = styled(ResponsiveContainer)`
    background-color: ${(props) => (props.mode === "darkmode" ? "#C0C0C0" : "white")};;
  display: flex;
  align-self: flex-start;
  padding-top: 2%;
  padding-right: 2%;
  .recharts-legend-wrapper {
    font-size: 22px; 
    .recharts-legend-item {
      font-size: 18px; 
    }
  }
  @media (max-width: 1100px) {
    align-self: center;
  }
`;
