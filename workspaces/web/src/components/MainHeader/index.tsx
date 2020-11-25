import React, { FC } from "react";
import { Link } from "react-router-dom";
import { connection } from "websocket";
import { ConnectionStatus, useMultizap } from "../../contexts/MultiSessionContext";
import { ThemeColorScheme, useAppTheme } from "../../contexts/ThemeContext";
import Button from "../Button";
import Header from "../Header";
import { LeftContent, LogoLink, RightContent } from "../Header/styles";

const MainHeader: FC = () => {
    const {colorScheme, setColorScheme} = useAppTheme();
    const {initWebSocketConnection, connectionStatus} = useMultizap();

    const handleSwitchTheme = () => {
        setColorScheme(colorScheme === ThemeColorScheme.LIGHT ? ThemeColorScheme.DARK: ThemeColorScheme.LIGHT);
    }
    return (
        <Header>
            <LeftContent>
                <LogoLink>
                    <Link to="/">Multizap</Link>
                </LogoLink>
            </LeftContent>
            <RightContent>
                {[ConnectionStatus.DISCONNECTED, ConnectionStatus.CONNECTION_ERROR, ConnectionStatus.CONNECTING].includes(connectionStatus) && (
                    <Button onClick={initWebSocketConnection} disabled={connectionStatus === ConnectionStatus.CONNECTING}>{connectionStatus === ConnectionStatus.CONNECTING ? 'conectando...' : 'Reconectar ao servidor WebSocket'}</Button>
                )}
                <Button onClick={handleSwitchTheme}>Trocar Tema</Button>
            </RightContent>
        </Header>
    )
}

export default MainHeader;
