import { Slice, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import NetworkState from '../networkstate';
import {
	getTransactionsByUserIdService,
	readTransactionsByUserIdService,
	syncTransactionsByUserIdService,
} from '../../services/transaction';

export type Location = {
	address: string | null;
	city: string | null;
	country: string | null;
	lat: number | null;
	lon: number | null;
	postal_code: string | null;
	region: string | null;
	store_number: string | null;
};

export type PaymentMeta = {
	by_order_of: string | null;
	payee: string | null;
	payer: string | null;
	payment_method: string | null;
	payment_processor: string | null;
	ppd_id: string | null;
	reason: string | null;
	reference_number: string | null;
};

export type PersonalFinanceCategory = {
	confidence_level: string;
	detailed: string;
	primary: string;
	icon_url?: string;
};

export type Transaction = {
	account_id: string;
	account_owner: string | null;
	amount: number;
	authorized_date: string | null;
	authorized_datetime: string | null;
	category: string[];
	category_id: string;
	check_number: string | null;
	counterparties: any[]; // Define a more specific type if structure is known
	date: string;
	datetime: string | null;
	iso_currency_code: string;
	location: Location;
	logo_url: string | null;
	merchant_entity_id: string | null;
	merchant_name: string | null;
	name: string;
	payment_channel: string;
	payment_meta: PaymentMeta;
	pending: boolean;
	pending_transaction_id: string | null;
	personal_finance_category: PersonalFinanceCategory;
	transaction_code: string | null;
	transaction_id: string;
	transaction_type: string;
	unofficial_currency_code: string | null;
	website: string | null;
};

export type TransactionState = {
	transactions: Transaction[];
	networkState: NetworkState;
	error: string | undefined;
};

const initialState: TransactionState = {
	transactions: [],
	networkState: 'idle',
	error: undefined,
};

export const getTransactionsByUserId = createAsyncThunk(
	'transaction/getTransactionsByUserId',
	async (data: { userSub: string; token: string }) => {
		try {
			const response = await getTransactionsByUserIdService(data.userSub, data.token);
			const transactions = response.data.map((transaction: Transaction) => ({
				account_id: transaction.account_id,
				account_owner: transaction.account_owner,
				amount: transaction.amount,
				authorized_date: transaction.authorized_date,
				authorized_datetime: transaction.authorized_datetime,
				category: transaction.category,
				category_id: transaction.category_id,
				check_number: transaction.check_number,
				counterparties: transaction.counterparties,
				date: transaction.date,
				datetime: transaction.datetime,
				iso_currency_code: transaction.iso_currency_code,
				location: transaction.location,
				logo_url: transaction.logo_url,
				merchant_entity_id: transaction.merchant_entity_id,
				merchant_name: transaction.merchant_name,
				name: transaction.name,
				payment_channel: transaction.payment_channel,
				payment_meta: transaction.payment_meta,
				pending: transaction.pending,
				pending_transaction_id: transaction.pending_transaction_id,
				personal_finance_category: transaction.personal_finance_category,
				transaction_code: transaction.transaction_code,
				transaction_id: transaction.transaction_id,
				transaction_type: transaction.transaction_type,
				unofficial_currency_code: transaction.unofficial_currency_code,
				website: transaction.website,
			}));
			return transactions;
		} catch (error: any) {
			console.log('Error getting accounts', error);
			throw Error(error.response.data.message);
		}
	}
);

export const syncTransactionsByUserId = createAsyncThunk(
	'transaction/syncTransactionsByUserId',
	async (data: { userSub: string; token: string }) => {
		try {
			const response = await syncTransactionsByUserIdService(data.userSub, data.token);
			return response.data;
		} catch (error: any) {
			console.log('Error syncing accounts', error);
			throw Error(error.response.data.message);
		}
	}
);

export const readTransactionsByUserId = createAsyncThunk(
	'transaction/readTransactionsByUserId',
	async (data: { userSub: string; token: string }) => {
		try {
			const response = await readTransactionsByUserIdService(data.userSub, data.token);
			const transactions = response.data.map((transaction: Transaction) => ({
				account_id: transaction.account_id,
				account_owner: transaction.account_owner,
				amount: transaction.amount,
				authorized_date: transaction.authorized_date,
				authorized_datetime: transaction.authorized_datetime,
				category: transaction.category,
				category_id: transaction.category_id,
				check_number: transaction.check_number,
				counterparties: transaction.counterparties,
				date: transaction.date,
				datetime: transaction.datetime,
				iso_currency_code: transaction.iso_currency_code,
				location: transaction.location,
				logo_url: transaction.logo_url,
				merchant_entity_id: transaction.merchant_entity_id,
				merchant_name: transaction.merchant_name,
				name: transaction.name,
				payment_channel: transaction.payment_channel,
				payment_meta: transaction.payment_meta,
				pending: transaction.pending,
				pending_transaction_id: transaction.pending_transaction_id,
				personal_finance_category: transaction.personal_finance_category,
				transaction_code: transaction.transaction_code,
				transaction_id: transaction.transaction_id,
				transaction_type: transaction.transaction_type,
				unofficial_currency_code: transaction.unofficial_currency_code,
				website: transaction.website,
			}));
			return transactions;
		} catch (error: any) {
			console.log('Error syncing accounts', error);
			throw Error(error.response.data.message);
		}
	}
);

const transactionSlice = createSlice({
	name: 'transaction',
	initialState,
	reducers: {
		clearTransactions: () => {
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getTransactionsByUserId.pending, (state) => {
			state.networkState = 'loading';
		});
		builder.addCase(getTransactionsByUserId.fulfilled, (state, action) => {
			state.networkState = 'success';
			state.transactions = action.payload;
		});
		builder.addCase(getTransactionsByUserId.rejected, (state, action) => {
			state.networkState = 'error';
			state.error = action.error.message;
		});
		builder.addCase(syncTransactionsByUserId.pending, (state) => {
			state.networkState = 'loading';
		});
		builder.addCase(syncTransactionsByUserId.fulfilled, (state, action) => {
			state.networkState = 'success';
			// state.transactions = action.payload;
		});
		builder.addCase(syncTransactionsByUserId.rejected, (state, action) => {
			state.networkState = 'error';
			state.error = action.error.message;
		});
		builder.addCase(readTransactionsByUserId.pending, (state) => {
			state.networkState = 'loading';
		});
		builder.addCase(readTransactionsByUserId.fulfilled, (state, action) => {
			state.networkState = 'success';
			state.transactions = action.payload;
		});
		builder.addCase(readTransactionsByUserId.rejected, (state, action) => {
			state.networkState = 'error';
			state.error = action.error.message;
		});
	},
});

export const { clearTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;
