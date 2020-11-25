import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`

    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        list-style: none;

        &::-webkit-scrollbar {
            width: 7px;
            height: 7px;
        }

        &::-webkit-scrollbar-button {
            width: 0px;
            height: 0px;
        }

        &::-webkit-scrollbar-thumb {
            background: #e1e1e1;
            border: 0px none #ffffff;
            border-radius: 50px;
        }

        &::-webkit-scrollbar-thumb:hover {
            background: #ffffff;
        }

        &::-webkit-scrollbar-thumb:active {
            background: #000000;
        }

        &::-webkit-scrollbar-track {
            background: #666666;
            border: 0px none #ffffff;
            /* border-radius: 50px; */
        }

        &::-webkit-scrollbar-track:hover {
            background: #666666;
        }

        &::-webkit-scrollbar-track:active {
            background: #333333;
        }

        &::-webkit-scrollbar-corner {
            background: transparent;
        }
    }

    html, body, #root {
        max-height: 100vh;
        font-family: "Segoe UI";
        color: ${props => props.theme.colors.text};
        background-color: ${props => props.theme.colors.background};
    }

    

`

export const AppGrid = styled.div`
    display: grid;
    grid-template-columns: minmax(220px, 300px) 1fr 1fr 1fr;
    grid-template-rows: 4rem 1fr 5rem;

    grid-template-areas: 
        "header header header header"
        "sidebar main main main"
        "sidebar footer footer footer"
    ;
    height: 100vh;
    max-height: 100vh;


`
