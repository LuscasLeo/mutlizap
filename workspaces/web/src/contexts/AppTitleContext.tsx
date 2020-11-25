import React, { useState, createContext, FC, useContext } from "react";

import { Helmet } from "react-helmet";

export interface AppTitleContextProps {
    title: string
}

export interface AppTitleContextFunctions {
    setTitle: (value: string) => void
}

export type AppTitleContext = AppTitleContextProps & AppTitleContextFunctions;

const Context = createContext<AppTitleContext>({} as AppTitleContext);
const { Provider } = Context;

export interface AppTitleProvider {
    defaultTitle: string
}

export const AppTitleProvider: FC<AppTitleProvider> = ({ children, defaultTitle }) => {
	const [title, setTitle] = useState(defaultTitle);

	return (
		<Provider value={{ title, setTitle }}>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			{children}
		</Provider>
	);
};

export const useAppTitle = () => useContext(Context);
