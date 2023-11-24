import styled from "styled-components"

export default function CardComponent({ nome, dado }) {
    return (
        <CardEstilizado>
            <p>{nome ? nome : "Nome"}</p>
            <p className="dado">{dado ? dado : "0"}</p>
        </CardEstilizado>
    )
}


const CardEstilizado = styled.div`
    width: 500px;
    height: 180px;
    background-color: DarkMagenta;
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

`