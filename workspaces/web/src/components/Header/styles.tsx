import styled from "styled-components";


export const Container = styled.header`
    grid-area: header;
    display: flex;
    align-items: center;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primaryText};
    padding: 0 1rem;
    font-weight: 600;
`;
export const RightContent = styled.div`
`;

export const LeftContent = styled.div`
    flex: 1;
`;

export const LogoLink = styled.span`
    a {
        color: inherit;
        font-size: 16pt;
        text-decoration: none;
    }
`;