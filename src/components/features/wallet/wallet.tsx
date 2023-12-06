import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, SimpleGrid, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { createLinkToken, getAccessToken, getAccountsByUserId } from '../../../store/slice/account';
import { Account } from '../../../store/slice/account';
import { RootState } from '../../../store/store';
import { PlaidLink, usePlaidLink } from 'react-plaid-link';

const AccountCard = ({ account }: { account: Account }) => (
	<Box borderWidth="1px"
		borderRadius="lg"
		overflow="hidden"
		p={4}
		shadow="md"
		borderColor="gray.200"
		bg="white">
		<Text fontSize='xl' fontWeight='bold'>{account.name}</Text>
		<Text>Type: {account.type}</Text>
		<Text>Balance: ${account.balances.current}</Text>
		<Text>Available: ${account.balances.available}</Text>
		<Text>Subtype: {account.subtype}</Text>
		{/* Add more details as needed */}
	</Box>
);

function MyWallet(this: any) {
	const dispatch = useDispatch();
	const userSub = useSelector((state: RootState) => state.rootReducer.user.user?.sub);
	const accounts = useSelector((state: RootState) => state.rootReducer.accountReducer.accounts || []);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const { networkState, error, linkToken } = useSelector((state: RootState) => state.rootReducer.accountReducer);

	const { open, ready } = usePlaidLink({
		token: linkToken?.link_token,
		onSuccess: (public_token, metadata) => {
			// send public_token to server
			dispatch(getAccessToken({ userSub: userSub as string, public_token }) as any);
			setIsModalOpen(false);
			console.log('accounts in usePlaidLink', accounts);
		},
	});

	useEffect(() => {
		if (accounts != null && accounts.length === 0) {
			dispatch(getAccountsByUserId(userSub as string) as any);
			console.log('accounts in useEffect', accounts);
		}
	}, []);

	useEffect(() => {
		console.log("linkToken", linkToken);
	}, [networkState, linkToken, error]);

	return (
		<div className="h-screen flex-1 p-7">
			<h1 className="text-2xl font-semibold ">Accounts</h1>
			<Box p={5}>
				<SimpleGrid columns={{ sm: 2, md: 3 }} spacing={10}>
					{accounts && accounts.map((account: Account) => (
						<AccountCard key={account.account_id} account={account} />
					))}
					<Button
						leftIcon={<AddIcon />}
						colorScheme='teal'
						variant='outline'
						onClick={() => {
							setIsModalOpen(true);
							dispatch(createLinkToken(userSub as string) as any);
						}}
						borderWidth="1px"
						borderRadius="lg"
						overflow="hidden"
						p={4}
						shadow="md"
						borderColor="gray.200"
						bg="white"
						height="100%"
						width="100%"
						display="flex"
						flexDirection="column"
						alignItems="center"
						justifyContent="center"
					>
						Add Account
					</Button>
					<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
						<ModalOverlay />
						<ModalContent>
							<ModalHeader>Add New Account</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								<Text>You will be redirected to a Plaid portal to register a new account.</Text>
							</ModalBody>
							<ModalFooter>
								<Button colorScheme="blue" mr={3} onClick={() => open()} disabled={!ready}>
									Connect to Plaid
								</Button>
								<Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
				</SimpleGrid>
			</Box>
		</div >
	);
}

export default MyWallet;