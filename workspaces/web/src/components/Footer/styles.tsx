import styled from "styled-components";

export const Container = styled.footer`
    grid-area: footer;
    display: flex;
    align-items: center;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primaryText};
`;
