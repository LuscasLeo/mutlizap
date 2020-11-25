import React, { FC, FormEvent, useRef, useState } from "react";
import Button from "../Button";
import Footer from "../Footer";
import Input from "../Input";
import {Editor, EditorState} from 'draft-js';
import { Container, EditorContainer, Form } from "./styles";

export interface InputFooterProps {
    onTextSubmit: (val: string) => void
    clearOnSubmit?: boolean
}

const InputFooter: FC<InputFooterProps> = ({onTextSubmit, clearOnSubmit}) => {

    const [val, setVal] = useState("");
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const editorRef = useRef<Editor>(null)
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        onTextSubmit(val);
        setVal("");
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Input type="text" name="message" value={val} onChange={(e) => setVal(e.target.value)}/>
                <Button>Enviar</Button>
            </Form>
        </Container>
    )
}

export default InputFooter;
