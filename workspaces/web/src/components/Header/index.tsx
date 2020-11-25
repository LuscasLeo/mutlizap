import React, { FC } from "react";

import { Container } from "./styles";

const Header: FC = ({ children }) => {
	return (
		<Container>
			{children}
		</Container>
	);
};

export default Header;
