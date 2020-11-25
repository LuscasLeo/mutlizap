import React, { FC, FormEvent, useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useModal } from "../../contexts/ModalContext";
import { ConnectionStatus, useMultizap } from "../../contexts/MultiSessionContext";
import Button from "../Button";
import Input from "../Input";
import Sidebar from "../Sidebar";
import List from "../Sidebar/List";
import ListItem from "../Sidebar/List/ListItem";
import { ClickableListItem } from "../Sidebar/List/ListItem/styles";

const ButModal: FC<{resolve: (val: any) => void}> = ({ resolve }) => {
	const [imageUrl, setImageUrl] = useState("");
	const [error, setError] = useState("");
	const [sessionName, setSessionName] = useState("");
	const [creating, setCreating] = useState(false);
	const { createSession, connectionStatus } = useMultizap();

	const cancel = useCallback(() => resolve(null), [resolve]);

	useEffect(() => {
		if (connectionStatus !== ConnectionStatus.CONNECTED) { cancel(); }
	}, [connectionStatus]);

	const create = async () => {
		setError("");
		setCreating(true);
		try {
			const session = await createSession(sessionName, (qr) => {
				setImageUrl(qr);
			});

			resolve(session);
		} catch (e) {
			setImageUrl("");
			setError(e);
			console.log("ERRO: " + e);
			setCreating(false);
		}
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		create();
	};

	return (
		<>
			{error && (
				<>
					<h2 color="red">Erro: {error}</h2>
					<Button color="#ac6f6f"onClick={() => resolve(null)}>Cancelar</Button>
					<Button color="#72d66f" onClick={create}>Tentar novamente</Button>
				</>
			)}
			{!creating && (
				<form onSubmit={handleSubmit}>
					<Input autoFocus placeholder="Insira o nome da sessão" {...{
						value: sessionName,
						onChange: (e) => setSessionName(e.target.value)
					}} />
				</form>
			)}
			{creating && (
				<img src={imageUrl} alt="Qr code"/>
			)}

		</>
	);
};

const SessionsSidebar: FC = () => {
	const { listSessions } = useMultizap();
	const history = useHistory();
	const sessions = listSessions();

	const modal = useModal();
	const handleAddSession = async () => {
		modal.openModal<void>("addSession", (resolve) => <ButModal {...{ resolve }} />);
	};

	return (
		<Sidebar>
			<List>
				<ListItem>
					<p>📱{sessions.length} sessões ativas</p>
				</ListItem>
				<ClickableListItem onClick={handleAddSession} >
                    ➕ Adicionar Sessão
				</ClickableListItem>
				{sessions.map(({ id, name }) => (
					<ClickableListItem onClick={() => history.push(`/${id}`)} key={id}>
						<p>
                            📱{name}
						</p>
					</ClickableListItem>
				))}
			</List>
		</Sidebar>
	);
};

export default SessionsSidebar;
