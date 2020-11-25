import React, { FC, InputHTMLAttributes } from "react";
import { Container, InputProps } from "./styles";

const Input: FC<InputHTMLAttributes<HTMLInputElement> & InputProps> = ({ ...props }) => {
	return (
		<Container {...props}/>
	);
};

export default Input;
