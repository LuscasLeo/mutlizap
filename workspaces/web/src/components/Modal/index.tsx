import React from "react";
import { FC } from "react";
import { Container } from "./styles";

const Modal: FC = ({children}) => {
    return (
        <Container>
            {children}
        </Container>
    );
}

export default Modal;