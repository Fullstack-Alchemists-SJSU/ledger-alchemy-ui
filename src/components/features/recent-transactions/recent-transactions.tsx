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
import { Location, Transaction, getTransactionsByUserId, syncTransactionsByUserId } from '../../../store/slice/transaction';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

function RecentTransactions() {
	// State to store transactions
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.rootReducer.user.user);
	const transactions = useSelector((state: RootState) => state.rootReducer.transactionReducer.transactions || []);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
	const [activeButton, setActiveButton] = useState('');
	const [isCustomRange, setIsCustomRange] = useState(false);
	const [dateError, setDateError] = useState('');
	// const [sortField, setSortField] = useState<keyof Transaction | ''>('');
	// const [sortDirection, setSortDirection] = useState('');
	const { isOpen, onOpen, onClose } = useDisclosure(); 	// Disclosure for AlertDialog
	const cancelRef = React.useRef(null);
	const { networkState, error } = useSelector((state: RootState) => state.rootReducer.transactionReducer);
	const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

	const onSelectTransaction = (transaction: Transaction) => {
		setSelectedTransaction(transaction);
		onOpen(); // Open the alert dialog
	};

	useEffect(() => {
		// Dispatch actions to get transactions
		dispatch(getTransactionsByUserId({ userSub: user?.sub as string, token: user?.token as string }) as any);
		dispatch(syncTransactionsByUserId({ userSub: user?.sub as string, token: user?.token as string }) as any);
	}, []);

	useEffect(() => {
		setFilteredTransactions(transactions);
	}, [transactions]);

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

	const filterTransactions = (start: any, end: any) => {
		const filtered = transactions.filter((trans) => {
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

	// const sortedTransactions = useMemo(() => {
	// 	console.log('sortField form sortedTransactions : ', sortField);
	// 	if (!sortField) return filteredTransactions;

	// 	const sorted = [...filteredTransactions].sort((a, b) => {
	// 		const valueA = a[sortField as keyof Transaction] || '';
	// 		const valueB = b[sortField as keyof Transaction] || '';

	// 		if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
	// 		if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
	// 		return 0;
	// 	});

	// 	return sorted;
	// }, [filteredTransactions, sortField, sortDirection]);

	// const handleSort = (field: keyof Transaction | '') => {
	// 	if (sortField === field) {
	// 		setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
	// 	} else {
	// 		setSortField(field);
	// 		setSortDirection('asc');
	// 	}
	// };

	// const getSortIcon = (field: string) => {
	// 	return sortField === field ? sortDirection === 'asc' ? <TriangleUpIcon /> : <TriangleDownIcon /> : null;
	// };

	// Function to generate a Google Maps URL from a Location object
	const generateMapsUrl = (location: Location) => {
		if (location.lat && location.lon) {
			// Use latitude and longitude if available
			return `https://www.google.com/maps/?q=${location.lat},${location.lon}`;
		} else if (location.address) {
			// Alternatively use the address
			return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`;
		}
		return null;
	};

	return (
		<div className="h-screen flex-1 p-7 max-h-screen overflow-auto">
			{networkState === 'loading' && <Text>Loading transactions...</Text>}
			{/* {error && <Text color="red.500">{error}</Text>} */}
			<h1 className="text-2xl font-semibold ">Recent Transactions</h1>
			<Stack direction="row" spacing={4} align="center" mb={4}>
				<FormControl>
					<FormLabel htmlFor="from-date">From</FormLabel>
					<Input
						id="from-date"
						type="date"
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
					/>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor="to-date">To</FormLabel>
					<Input id="to-date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
				</FormControl>
				<Button
					colorScheme={isCustomRange ? 'blue' : 'gray'}
					onClick={() => {
						if (validateDates()) applyCustomRange();
					}}
				>
					Apply
				</Button>
				<ButtonGroup isAttached variant="outline">
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
				<Table variant="striped" colorScheme="gray">
					<TableCaption>Recent financial transactions</TableCaption>
					<Thead>
						<Tr>
							<Th>Sr.</Th>
							{/* <Th onClick={() => handleSort('date')}>Date {getSortIcon('date')}</Th>
							<Th onClick={() => handleSort('name')}>Description {getSortIcon('name')}</Th>
							<Th isNumeric onClick={() => handleSort('amount')}>
								Amount ($) {getSortIcon('amount')}
							</Th> */}
							<Th >Date </Th>
							<Th >Description </Th>
							<Th isNumeric >
								Amount($)
							</Th>
							<Th>Info</Th>
						</Tr>
					</Thead>
					<Tbody>
						{filteredTransactions.map((trans, index) => (
							<Tr key={trans.account_id}>
								<Td>{index + 1}</Td>
								<Td>{trans.date}</Td>
								<Td>{trans.name}</Td>
								<Td
									isNumeric
									color={trans.amount.toString().charAt(0) === '-' ? 'red.500' : 'green.500'}
								>
									{trans.amount}
								</Td>
								<Td>
									<IconButton aria-label="More info" icon={<InfoIcon />} onClick={() => { onOpen(); onSelectTransaction(trans); }} />
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
			{/* AlertDialog for Transaction Details */}
			<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Transaction Details
						</AlertDialogHeader>
						<AlertDialogBody>{selectedTransaction ? (
							<Stack spacing={3}>
								{selectedTransaction.logo_url && (<img src={selectedTransaction.logo_url} alt="Merchant Logo" style={{ maxWidth: '100px' }} />)}
								<Text><strong>Name:</strong> {selectedTransaction.name}</Text>
								<Text><strong>Amount:</strong> ${selectedTransaction.amount}</Text>
								<Text><strong>Date:</strong> {selectedTransaction.date}</Text>
								<Text><strong>Type:</strong> {selectedTransaction.transaction_type}</Text>
								<Text><strong>Merchant:</strong> {selectedTransaction.merchant_name || 'N/A'}</Text>
								<Text><strong>Payment Channel:</strong> {selectedTransaction.payment_channel}</Text>
								<Text><strong>Category:</strong> {selectedTransaction.category.join(', ')}</Text>
								<Text><strong>Pending:</strong> {selectedTransaction.pending ? 'Yes' : 'No'}</Text>
								<Text><strong>Authorized Date:</strong> {selectedTransaction.authorized_date || 'N/A'}</Text>
								<Text><strong>Currency:</strong> {selectedTransaction.iso_currency_code}</Text>
								{selectedTransaction.website && <Text><strong>Website:</strong> {selectedTransaction.website}</Text>}
								{selectedTransaction.location && (
									<div>
										<Text>Location:</Text>
										<Text>{selectedTransaction.location.address || 'N/A'}</Text>
										<Text>{selectedTransaction.location.city || 'N/A'}</Text>
										<Text>{selectedTransaction.location.region || 'N/A'}</Text>
										<Text>{selectedTransaction.location.country || 'N/A'}</Text>
										{generateMapsUrl(selectedTransaction.location) && (
											<a ref={generateMapsUrl(selectedTransaction.location)} target="_blank" rel="noopener noreferrer">
												View on Maps
											</a>
										)}
									</div>
								)}
							</Stack>
						) : (
							<Text>No transaction selected</Text>
						)}</AlertDialogBody>
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
