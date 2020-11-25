import React, { createContext, FC, useContext, useEffect, useState } from "react";
import {ThemeProvider as StyledThemeProvider} from 'styled-components';
import dark from "../styles/themes/dark";
import light from "../styles/themes/light";

export enum ThemeColorScheme {
    LIGHT = "LIGHT",
    DARK = "DARK"
}

export interface ThemeContextProps {
    colorScheme: ThemeColorScheme;
}

export interface ThemeContextFunctions {
    setColorScheme: (value: ThemeColorScheme) => void
}

export type ThemeContext = ThemeContextFunctions & ThemeContextProps;

const THEME_KEY = "APP_THEME";

const Context = createContext<ThemeContext>({} as ThemeContext);

const {Provider} = Context;

export const ThemeProvider: FC = ({children}) => {

    const [colorScheme, setColorScheme] = useState<ThemeColorScheme>(ThemeColorScheme.LIGHT);

    useEffect(() => {
        const match = window.matchMedia('(prefers-color-scheme: dark)');
        if(!colorScheme)
            handleThemeColorScheme(match.matches);
        match.addEventListener('change', ({matches}) => handleThemeColorScheme(matches));

    }, []);



    const handleThemeColorScheme = (value: boolean) => {
        console.log(`IS dark mode: ${value}`)
        value ?
            setColorScheme(ThemeColorScheme.DARK)
        :
            setColorScheme(ThemeColorScheme.LIGHT);
    }

    const functions = {
        setColorScheme(value: ThemeColorScheme) {
            setColorScheme(value);
        }
    }

    return (
        <Provider value={{colorScheme, ...functions}}>
            <StyledThemeProvider theme={colorScheme === ThemeColorScheme.DARK ? dark : light}>
                {children}
            </StyledThemeProvider>
        </Provider>
    );
}

export const useAppTheme = () => useContext(Context);