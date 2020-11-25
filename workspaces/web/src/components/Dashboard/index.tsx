import React, { FC, useEffect } from "react";
import { AppGrid } from "../../styles";

import SessionsSidebar from "../SessionsSidebar";
import MainHeader from "../MainHeader";
import CommonFooter from "../CommonFooter";
import { MainContainer } from "./styles";
import { useAppTitle } from "../../contexts/AppTitleContext";

const Dashboard: FC = () => {
	const appTitle = useAppTitle();
	useEffect(() => {
		appTitle.setTitle("Multizap - Sessões");
	}, []);
	return (
		<AppGrid>
			<MainHeader />
			<SessionsSidebar />

			<MainContainer>
				<h2>Selecione uma sessão📱</h2>
			</MainContainer>

			<CommonFooter />
		</AppGrid>
	);
};

export default Dashboard;
