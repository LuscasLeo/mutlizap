import React, { FC } from "react";
import Footer from "../Footer";
import { Container } from "./styles";

const CommonFooter: FC = () => {
    return (
        <Footer>
            <Container>
                &copy; 2020 LuscaSTudio
            </Container>
        </Footer>
    )
}

export default CommonFooter;
