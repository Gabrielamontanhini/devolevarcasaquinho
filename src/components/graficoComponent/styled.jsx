import { ResponsiveContainer } from "recharts";
import styled from "styled-components";

export const StyledResponsiveContainer = styled(ResponsiveContainer)`
  background-color: ${(props) => (props.mode === "darkmode" ? "#C0C0C0" : "white")};
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
    padding: 0;
    align-self: center;
  }
`;
