import styled from "styled-components";
import { Container as FooterContainer } from "../Footer/styles";

export const Container = styled(FooterContainer)`
    display: flex;
    padding: 0 1em;
`;

export const EditorContainer = styled.div`

`;

export const Form = styled.form`
    display: flex;
    width: 100%;

    input {
        flex: 1;
    }
`;
