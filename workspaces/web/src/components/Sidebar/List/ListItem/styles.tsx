import React, { DOMAttributes, FC } from "react";

import styled from "styled-components";
import Button from "../../../Button";

export const Container = styled.div`
    min-height: 2em;
    background-color: rgba(0, 0, 0, .2);
    display: flex;
    align-items: center;
    padding: 0 1em;

    p, span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 100%;

    }
`;

const ClickableListItemStyled = styled(Container)`
    border: none;
    font-family: inherit;
    cursor: pointer;
    border-radius: 0;
    color: inherit;
    &:hover {
        background-color: rgba(0, 0, 0, .5);
        border: none;
    }

    &:focus {
        border: none;
    }

`;

export const ClickableListItem: FC<DOMAttributes<HTMLButtonElement>> = (props) => <ClickableListItemStyled {...props} as={Button}/>;
