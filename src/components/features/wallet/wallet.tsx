import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Box,
	SimpleGrid,
	Text,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Flex, Heading, Badge,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { createLinkToken, getAccessToken, getAccountsByUserId } from '../../../store/slice/account';
import { Account } from '../../../store/slice/account';
import { RootState } from '../../../store/store';
import { PlaidLink, usePlaidLink } from 'react-plaid-link';

const AccountCard = ({ account }: { account: Account }) => (
	<Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} shadow="md" borderColor="gray.200" bg="white">
		<Heading fontSize="xl" mb={2}>{account.name}</Heading> {/* Bank Name */}

		<Flex justify="space-between" align="center" mb={2}>
			<Text fontWeight="bold">Account ID:</Text>
			<Badge colorScheme="blue">{account.account_id}</Badge>
		</Flex>

		<Text mb={2}>Type: {account.type}</Text> {/* Account Type */}
		<Text mb={2}>Subtype: {account.subtype}</Text> {/* Account Subtype */}

		{account.official_name && <Text mb={2}>Official Name: {account.official_name}</Text>} {/* Official Name */}

		<Flex justify="space-between" align="baseline">
			<Box>
				<Text mb={1}>ISO Currency Code: {account.balances.iso_currency_code}</Text>
				{account.balances.unofficial_currency_code && <Text mb={1}>Unofficial Currency Code: {account.balances.unofficial_currency_code}</Text>}
			</Box>
			<Box textAlign="right">
				<Text fontSize="lg" fontWeight="bold" color="green.500">Balance: ${account.balances.current}</Text>
				<Text fontSize="md">Available: ${account.balances.available}</Text>
			</Box>
		</Flex>
	</Box>
);

function MyWallet(this: any) {
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.rootReducer.user.user);
	const accounts = useSelector((state: RootState) => state.rootReducer.accountReducer.accounts || []);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const { networkState, error, linkToken } = useSelector((state: RootState) => state.rootReducer.accountReducer);

	const { open, ready } = usePlaidLink({
		token: linkToken?.link_token,
		onSuccess: (public_token, metadata) => {
			// send public_token to server
			dispatch(
				getAccessToken({ userSub: user?.sub as string, public_token, token: user?.token as string }) as any
			);
			setIsModalOpen(false);
			console.log('accounts in usePlaidLink', accounts);
		},
	});

	useEffect(() => {
		if (accounts != null && accounts.length === 0) {
			dispatch(getAccountsByUserId({ userSub: user?.sub as string, token: user?.token as string }) as any);
			console.log('accounts in useEffect', accounts);
		}
	}, []);

	useEffect(() => {
		console.log('linkToken', linkToken);
	}, [networkState, linkToken, error]);

	return (
		<div className="h-screen flex-1 p-7">
			<h1 className="text-2xl font-semibold ">Accounts</h1>
			<Box p={5}>
				<SimpleGrid columns={{ sm: 2, md: 3 }} spacing={10}>
					{accounts &&
						accounts.map((account: Account) => <AccountCard key={account.account_id} account={account} />)}
					<Button
						leftIcon={<AddIcon />}
						colorScheme="teal"
						variant="outline"
						onClick={() => {
							setIsModalOpen(true);
							dispatch(
								createLinkToken({ userSub: user?.sub as string, token: user?.token as string }) as any
							);
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
								<Button variant="ghost" onClick={() => setIsModalOpen(false)}>
									Cancel
								</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
				</SimpleGrid>
			</Box>
		</div>
	);
}

export default MyWallet;
