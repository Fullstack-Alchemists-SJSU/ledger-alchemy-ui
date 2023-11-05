import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import { useState } from 'react';
type Action = {
	text: string;
	action: () => void;
};
type ModalProps = {
	title?: string;
	message: string | React.ReactNode;
	isOpen: boolean;
	primaryButtonAction: Action;
	secondaryButtonAction?: Action;
};
const ModalComponent = ({ title, message, isOpen, primaryButtonAction, secondaryButtonAction }: ModalProps) => {
	const [open, setOpen] = useState(isOpen);
	return (
		<Modal isOpen={open} onClose={() => setOpen(false)}>
			<ModalOverlay />
			<ModalContent>
				{title && <ModalHeader>{title}</ModalHeader>}
				<ModalCloseButton />
				<ModalBody>{message}</ModalBody>
				<ModalFooter>
					<Button colorScheme="linkedin" onClick={() => primaryButtonAction.action()}>
						{primaryButtonAction.text}
					</Button>
					{secondaryButtonAction && (
						<Button colorScheme="blackAlpha" onClick={() => secondaryButtonAction.action()}>
							{secondaryButtonAction.text}
						</Button>
					)}
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default ModalComponent;
