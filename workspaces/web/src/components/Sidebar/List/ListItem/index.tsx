import React, { FC } from "react";
import { Container } from "./styles";

const ListItem: FC = ({ children }) => {
	return (
		<Container>
			{children}
		</Container>
	);
};

export default ListItem;
