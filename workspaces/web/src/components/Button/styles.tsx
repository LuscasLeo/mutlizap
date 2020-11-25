import styled from "styled-components";
import Color from 'color';

export interface ButtonProps {
    color?: string
}
export const Container = styled.button<ButtonProps>`
    font-family: inherit;
    padding: .5rem 1rem;
    border-radius: 4px;
    background-color: ${props => props.color};
    font-size: 16px;
    color: ${({color}) => Color(color).isDark() ? "#fff" : "#333"};
    border: 1px solid ${({color}) => Color(color).darken(.2).hex()};
    cursor: pointer;

    &:hover {
        border: 1px solid ${({color}) => Color(color).darken(.1).hex()};
        background-color: ${({color}) => Color(color).lighten(.2).hex()};
    }
    
    &:focus {
        /* outline: 2px rounded ${({color}) => Color(color).darken(.5).hex()}; */
    }

    &:active {
        border: 1px solid ${({color}) => Color(color).darken(.3).hex()};
        background-color: ${({color}) => Color(color).darken(.2).hex()};
    }

    &[disabled] {
        cursor: initial;
        background-color: ${({color}) => Color(color).darken(.5).hex()};

        &:hover {
            background-color: auto;
        }
    }
`;