import styled from "styled-components";

export const Container = styled.div`
    /* background-color: #eee; */
    width: 30rem;
    display: flex;
    flex-direction: column;
    min-height: 300px;
    flex: .9;
`;

export const ModalWrapper = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    background: #eee;
`;

export const ModalHeading = styled(ModalWrapper)`
    font-weight: bold;
    font-size: 21px;
    display: flex;
    align-items: center;
    min-height: 3rem;
    border-radius: .5rem .5rem 0 0;
    border-bottom: 1px solid #8db3b3;
`;

export const ModalBody = styled(ModalWrapper)`
    flex: 1;
`;

export const ModalFooter = styled(ModalWrapper)`
    border-radius: 0 0 .5rem .5rem;
    min-height: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding-bottom: .5rem;
`;

export interface ModalOverlayProps {
    bgColor: string
    visible: boolean
}

export const ModalOverlay = styled.div<ModalOverlayProps>`

    opacity: ${({ visible }) => visible ? "1" : "0"};
    pointer-events: ${({ visible }) => visible ? "initial" : "none"};
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${props => props.bgColor};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    

`;
