import React, { createContext, FC, ReactNode, useCallback, useContext, useState } from "react";
import { ModalOverlay } from "../components/Modal/styles";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ModalContextProps {

}

export interface ModalContextFunctions {
    openModal: <T>(name: string, modal: ModalProps<T>) => Promise<T>
}

export type ModalContext = ModalContextProps & ModalContextFunctions;

const Context = createContext<ModalContext>({} as ModalContext);
const { Provider } = Context;

export type ModalProps<T> = (resolve: (val?: T) => void) => ReactNode

interface Modal<T> {
    resolve: (value: T) => void
    modal: ModalProps<T>
    name: string
}

export const ModalProvider: FC = ({ children }) => {
	const [modals, setModals] = useState<Modal<any>[]>([]);

	const isVisible = () => modals.length > 0;

	const functions = {
		openModal<T> (name: string, modal: ModalProps<T>) {
			return new Promise<T>(resolve => {
				setModals([...modals, {
					name,
					modal,
					resolve
				} as Modal<T>]);
			});
		}
	};

	const resolveModal = useCallback((modal: Modal<any>) => {
		return (val: any) => {
			modal.resolve(val);

			setModals(modals.filter(m => m.name !== modal.name));
		};
	}, [modals]);

	const GetModal =
        modals.length > 0 && modals[modals.length - 1].modal;

	return (
		<Provider value={{ ...functions }}>
			{children}
			<ModalOverlay visible={isVisible()} bgColor="rgba(255, 255, 255, .5)">
				{GetModal && GetModal((resolveModal(modals[modals.length - 1])))}
			</ModalOverlay>
		</Provider>
	);
};

export const useModal = () => useContext(Context);
