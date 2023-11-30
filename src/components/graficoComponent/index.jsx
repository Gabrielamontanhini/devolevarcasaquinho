import { useContext, useEffect, useState } from 'react';
import { Line, XAxis, Legend, YAxis, Tooltip, Area, ComposedChart } from 'recharts';

import { fetchSevenDaysData } from '../../services/WeatherServices';
import ModeContext from '../../contexts/modeContext';
import { StyledResponsiveContainer } from './styled';



export default function GraficoComponent({ lat, lon, nextDays, setNextDays, cidade, unit, details }) {
  const { mode } = useContext(ModeContext)

  useEffect(() => {
    fetchSevenDaysData(lat, lon, setNextDays, unit);
  }, [lat, lon, unit, cidade]);
  return (
    <StyledResponsiveContainer width="80%" height="60%" mode={mode}>
      <ComposedChart
        width={500}
        height={400}
        data={nextDays}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >

        <XAxis dataKey="dia" />
        <YAxis
          yAxisId="left"
          tickFormatter={(value) => `${value} ${unit}`}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tickFormatter={(value) => `${value} mm`}
        />
        <Tooltip
          formatter={(value, name) => {
            if (name === 'chuva') {
              return [`${value} mm`, 'Chuva'];
            } else {
              return [`${value} ${unit}`, name];
            }
          }}
          labelFormatter={(label) => `Dia ${label}`}
          labelStyle={{ fontSize: 18 }}
          itemStyle={{ fontSize: 20 }}
        />
        <Legend />
        <Area
          yAxisId="right"
          type="monotone"
          dataKey="chuva"
          fill={mode === "darkmode" ? "#0000CD" : "#00BFFF"}
          stroke={mode === "darkmode" ? "#0000CD" : "#00BFFF"}
        />
        <Line yAxisId="left" type="monotone" dataKey="sensação" stroke={mode === "darkmode" ? "#8B008B" : "plum"} strokeWidth={3} name="Sensação térmica" dot={false} />
        <Line yAxisId="left" type="monotone" dataKey="temp" name="Temperatura" strokeWidth={2} stroke="black" />

      </ComposedChart>
    </StyledResponsiveContainer>
  )
}

