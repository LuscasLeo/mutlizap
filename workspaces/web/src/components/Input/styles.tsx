import styled from "styled-components";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InputProps {

}

export const Container = styled.input`
    font-size: 16px;
    font-family: inherit;
    padding: .5rem 1rem;
    border-radius: 4px;
    background-color: #fff;
    color: #333;
    border: 1px solid #2a1da1;

    &[disabled] {
        background-color: #d8d8d8;
    }
`;
