import React from 'react';
import { FC } from 'react';
import { Container } from './styles';


const Sidebar: FC = ({children}) => {

    return (
        <Container>
            {children}
        </Container>
    );
    
}



export default Sidebar;