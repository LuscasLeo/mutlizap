import React, { ButtonHTMLAttributes } from "react";
import { FC } from "react";
import { ButtonProps, Container } from "./styles";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps> = ({children, color = "#eee", ...props }) => {
    return (
        <Container {...props} color={color}>
            {children}
        </Container>
    )
}

export default Button;