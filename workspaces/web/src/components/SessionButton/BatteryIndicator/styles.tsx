import styled from "styled-components";

export interface PercentageProps {
    value: number
}

export const Container = styled.div`
    display:flex;
    align-items: center;
`;

export const BatteryIcon = styled.span<PercentageProps>`
    border: 1px solid #333;
    width: 15px;
    height: 10px;
    display: flex;
    flex-direction: row;
    border-radius: 3px;
    padding: 1px;

    &::after {
        content: '';
        display: block;
        flex: ${({ value }) => value};
        background-color: #49b449;
        position: relative;
        border-radius: 1px;
    }
`;

export const PercentageText = styled.span`
    font-size: 10px;

`;
