import Navbar from '../../layout/nav';
import React from 'react';
import { Box, SimpleGrid, Text, Button, Icon } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

interface Account {
	id: number;
	name: string;
	type: string;
	balance: number;
	// Add any other relevant properties of an account here
}

interface AccountCardProps {
	account: Account;
}

const AccountCard = ({ account }: AccountCardProps) => (
	<Box borderWidth="1px"
		borderRadius="lg"
		overflow="hidden"
		p={4}
		shadow="md"
		borderColor="gray.200"
		bg="white">
		<Text fontSize='xl' fontWeight='bold'>{account.name}</Text>
		<Text>Type: {account.type}</Text>
		<Text>Balance: ${account.balance}</Text>
		{/* Add more details as needed */}
	</Box>
);

const AddAccountCard = () => (
	<Button
		leftIcon={<AddIcon />}
		colorScheme='teal'
		variant='outline'
		onClick={() => {/* handle add account */ }}
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
);

function MyWallet() {
	const accounts = [
		{ id: 1, name: 'Checking Account', type: 'Checking', balance: 1200.00 },
		{ id: 2, name: 'Savings Account', type: 'Savings', balance: 5600.00 },
		// Add more accounts as needed
	];

	return (
		<div className="h-screen flex-1 p-7">
			<h1 className="text-2xl font-semibold ">Accounts</h1>
			<Box p={5}>
				<SimpleGrid columns={{ sm: 2, md: 3 }} spacing={10}>
					{accounts.map(account => (
						<AccountCard key={account.id} account={account} />
					))}
					<AddAccountCard />
				</SimpleGrid>
			</Box>
		</div>
	);
};

export default MyWallet;
