import Color from "color";
import styled from "styled-components";

export interface ContactButtonProps {
    color: string
}

export const Container = styled.button<ContactButtonProps>`
    width: 100%;
    border: none;
    background-color: ${({ color }) => color};
    height: 4rem;
    display: flex;
    align-items: center;
    flex-direction: row;
    cursor: pointer;
    padding: 0 .5rem;
    font-family: inherit;
    border-bottom: 1px solid ${({ color }) => Color(color).darken(0.1).hex()};

    &:hover, :focus {
        background-color: ${({ color }) => Color(color).darken(0.1).hex()}
    }
`;

Container.defaultProps = {
	color: "#eee"
};

export const ProfilePicture = styled.img`
    height: 49px;
    width: 49px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 1em;
`;

export const Heading = styled.span`
    font-size: 17px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 10rem;
`;

export const LastMessage = styled.span`
    font-size: 13px;
`;

export const LastMessageDateTime = styled.span`
    font-size: 12px;
`;

export const TopContent = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const BottomContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    text-overflow: ellipsis;
    overflow: hidden;
`;

export const Marks = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;
`;
