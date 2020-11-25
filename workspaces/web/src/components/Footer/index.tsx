import React, { FC } from "react";
import { Container } from "./styles";

const Footer: FC = ({ children }) => {
	return (
		<Container>
			{children}
		</Container>
	);
};

export default Footer;
