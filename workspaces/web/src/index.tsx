import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppTitleProvider } from "./contexts/AppTitleContext";
import { ModalProvider } from "./contexts/ModalContext";
import { MultizapProvider } from "./contexts/MultiSessionContext";
import { ThemeProvider } from "./contexts/ThemeContext";
ReactDOM.render(
	<AppTitleProvider defaultTitle={process.env.REACT_APP_INITIAL_TITLE}>
		<React.StrictMode>
			<ThemeProvider>
				<MultizapProvider>
					<ModalProvider>
						<App />
					</ModalProvider>
				</MultizapProvider>
			</ThemeProvider>
		</React.StrictMode>
	</AppTitleProvider>
	,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
