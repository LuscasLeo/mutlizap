import React, { FC } from "react";
import { Container } from "./styles";

const List: FC = ({ children }) => {
	return (
		<Container>
			{children}
		</Container>
	);
};

export default List;
