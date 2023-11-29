import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../../layout/nav';
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	useDisclosure,
	IconButton,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Button,
	ButtonGroup,
	Input,
	Stack,
	Text,
	FormControl,
	FormLabel,
} from '@chakra-ui/react';
import { InfoIcon, TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons';

interface Transaction {
	[key: string]: number | string;
	id: number;
	date: string;
	description: string;
	amount: number;
	type: string;
}

function RecentTransactions() {
	// State to store transactions
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
	const [activeButton, setActiveButton] = useState('');
	const [isCustomRange, setIsCustomRange] = useState(false);
	const [dateError, setDateError] = useState('');
	const [sortField, setSortField] = useState('');
	const [sortDirection, setSortDirection] = useState('');

	// Fetch transactions from the API
	useEffect(() => {
		// Replace with actual API call
		getTransactions().then(data => setTransactions(data));
	}, []);

	// Disclosure for AlertDialog
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef(null);

	// Function to fetch transactions (replace with actual API call)
	async function getTransactions() {
		// API call to fetch transactions
		// return await fetch('/api/getTransactions').then(res => res.json());
		return [
			// Dummy data for demonstration
			{ id: 1, date: '11/12/2023', description: 'McDonald\'s', amount: 12.4, type: 'debit' },
			{ id: 2, date: '11/15/2023', description: 'MobilePayment', amount: 120, type: 'debit' },
			{ id: 3, date: '10/25/2023', description: 'Airlines', amount: 15, type: 'credit' },
			// Add more transactions here
		];
	}

	const handleButtonClick = (period: React.SetStateAction<string>) => {
		setIsCustomRange(false);
		setActiveButton(period);
		if (period === '1m') {
			filterTransactions(getDate(-30), getDate(0));
		} else if (period === '3m') {
			filterTransactions(getDate(-90), getDate(0));
		}
	};
	const applyCustomRange = () => {
		setIsCustomRange(true);
		setActiveButton('');
		filterTransactions(startDate, endDate);
	};

	const filterTransactions = (start: string | number | Date, end: string | number | Date) => {
		const filtered = transactions.filter(trans => {
			const transDate = new Date(trans.date);
			return transDate >= new Date(start) && transDate <= new Date(end);
		});
		setFilteredTransactions(filtered);
	};

	const getDate = (days: number) => {
		const date = new Date();
		date.setDate(date.getDate() + days);
		return date.toISOString().split('T')[0];
	};

	const validateDates = () => {
		const today = new Date();
		const from = new Date(startDate);
		const to = new Date(endDate);
		if (from > to) {
			setDateError('The "From" date must be before the "To" date.');
			return false;
		} else if (from > today || to > today) {
			setDateError('Dates cannot be in the future.');
			return false;
		}
		setDateError('');
		return true;
	};

	const sortedTransactions = useMemo(() => {
		if (!sortField) return filteredTransactions;

		const sorted = [...filteredTransactions].sort((a, b) => {
			if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
			if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
			return 0;
		});

		return sorted;
	}, [filteredTransactions, sortField, sortDirection]);

	const handleSort = (field: React.SetStateAction<string>) => {
		setSortField(field);
		setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
	};

	const getSortIcon = (field: string) => {
		return sortField === field ? (sortDirection === 'asc' ? <TriangleUpIcon /> : <TriangleDownIcon />) : null;
	};


	return (
		<div className="h-screen flex-1 p-7">
			<h1 className="text-2xl font-semibold ">Recent Transactions</h1>
			<Stack direction='row' spacing={4} align='center' mb={4}>
				<FormControl>
					<FormLabel htmlFor='from-date'>From</FormLabel>
					<Input id='from-date' type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
				</FormControl>
				<FormControl>
					<FormLabel htmlFor='to-date'>To</FormLabel>
					<Input id='to-date' type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
				</FormControl>
				<Button
					colorScheme={isCustomRange ? 'blue' : 'gray'}
					onClick={() => {
						if (validateDates()) applyCustomRange();
					}}
				>
					Apply
				</Button>
				<ButtonGroup isAttached variant='outline'>
					<Button
						colorScheme={activeButton === '1m' ? 'blue' : 'gray'}
						onClick={() => handleButtonClick('1m')}
					>
						1 Month
					</Button>
					<Button
						colorScheme={activeButton === '3m' ? 'blue' : 'gray'}
						onClick={() => handleButtonClick('3m')}
					>
						3 Months
					</Button>
				</ButtonGroup>
			</Stack>
			{dateError && <Text color="red.500">{dateError}</Text>}

			<TableContainer>
				<Table variant='striped' colorScheme='gray'>
					<TableCaption>Recent financial transactions</TableCaption>
					<Thead>
						<Tr>
							<Th>Sr.</Th>
							<Th onClick={() => handleSort('date')}>Date {getSortIcon('date')}</Th>
							<Th onClick={() => handleSort('description')}>Description {getSortIcon('description')}</Th>
							<Th isNumeric onClick={() => handleSort('amount')}>Amount ($) {getSortIcon('amount')}</Th>
							<Th>Info</Th>
						</Tr>
					</Thead>
					<Tbody>
						{sortedTransactions.map((trans, index) => (
							<Tr key={trans.id}>
								<Td>{index + 1}</Td>
								<Td>{trans.date}</Td>
								<Td>{trans.description}</Td>
								<Td isNumeric color={trans.type === 'credit' ? 'green.500' : 'red.500'}>
									{trans.amount}
								</Td>
								<Td>
									<IconButton
										aria-label="More info"
										icon={<InfoIcon />}
										onClick={onOpen}
									/>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
			{/* AlertDialog for Transaction Details */}
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize='lg' fontWeight='bold'>
							Transaction Details
						</AlertDialogHeader>
						<AlertDialogBody>
							{/* Transaction details go here */}
						</AlertDialogBody>
						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Close
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</div>
	);
}

export default RecentTransactions;
