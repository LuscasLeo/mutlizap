import React, { FC, FormEvent, useState } from "react";
import Button from "../Button";
import Input from "../Input";
import { Container, Form } from "./styles";

export interface InputFooterProps {
    onTextSubmit: (val: string) => void
    clearOnSubmit?: boolean
}

const InputFooter: FC<InputFooterProps> = ({ onTextSubmit }) => {
	const [val, setVal] = useState("");
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		onTextSubmit(val);
		setVal("");
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<Input type="text" name="message" value={val} onChange={(e) => setVal(e.target.value)}/>
				<Button>Enviar</Button>
			</Form>
		</Container>
	);
};

export default InputFooter;
