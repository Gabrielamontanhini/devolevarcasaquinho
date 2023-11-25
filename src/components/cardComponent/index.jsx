import styled from "styled-components"
import { colors } from "../../constants/colors/colors"

export default function CardComponent({ nome, dado , mode}) {
    return (
        <CardEstilizado mode={mode}>
            <p className="nome">{nome ? nome : "Nome"}</p>
            <p className="dado">{dado ? dado : "0"}</p>
        </CardEstilizado>
    )
}


const CardEstilizado = styled.div`
     flex: 1 0 45%; 
     margin: 10px;
    height: 180px;
    background: linear-gradient(to right, ${(props) => (props.mode === "darkmode" ? "#4D4494,  #BA55D3" : "#800080, #BA55D3")});
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-left: 5%;
    p, h1{
        color: white;
        font-weight: 500;
        font-family: Poppins;
    }
    p{
font-size: 24px;
    }
    .dado{
        font-size: 48px;
    }
    .dado, .nome{
        color: white;
    }
    @media (max-width: 1200px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        p{
            font-size: 18px;
        }
        .dado{
        font-size: 28px;
    }
  }

`