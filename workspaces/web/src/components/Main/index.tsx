import React, { FC } from "react";

import { Container } from "./styles";

const Main: FC = ({ children }) => {
	return (
		<Container>
			{children}
		</Container>
	);
};

export default Main;
