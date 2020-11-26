import styled from "styled-components";

export const Container = styled.div`
    grid-area: sidebar;
    width: 350px;
    background-color: ${props => props.theme.colors.secondary};
    overflow: auto;

    a, p, span, h1, h2, h3, h4, h5, h6 {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    

`;
