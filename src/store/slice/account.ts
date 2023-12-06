import { Slice, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import NetworkState from '../networkstate';
import { createLinkTokenService, getAccessTokenService, getAccountsByUserIdService } from '../../services/account';

export type LinkToken = {
    link_token: string;
    expiration: string;
};

export type Balance = {
    available: number | null;
    current: number;
    iso_currency_code: string;
    limit: number | null;
    unofficial_currency_code: string | null;
};

export type Account = {
    account_id: string;
    balances: Balance;
    mask: string;
    name: string;
    official_name: string | null;
    subtype: string;
    type: string;
};

export type AccountState = {
    linkToken: LinkToken | null;
    accounts: Account[] | null;
    networkState: NetworkState;
    error: string | undefined;
};

const initialState: AccountState = {
    linkToken: null,
    accounts: null,
    networkState: 'idle',
    error: undefined,
};

export const createLinkToken = createAsyncThunk(
    'account/createLinkToken',
    async (userSub: string) => {
        try {
            const response = await createLinkTokenService(userSub);
            return response.data;
        } catch (error: any) {
            console.log('error', error);
            throw Error(error.response.data.message);
        }
    }
);

export const getAccessToken = createAsyncThunk(
    'account/getAccessToken',
    async (data: { userSub: string; public_token: string }) => {
        try {
            const response = await getAccessTokenService(data.userSub, data.public_token);
            const accounts = response.data.map((account: Account) => ({
                account_id: account.account_id,
                balances: account.balances,
                mask: account.mask,
                name: account.name,
                official_name: account.official_name,
                subtype: account.subtype,
                type: account.type,
            }));
            console.log('accounts in getAccessToken', accounts);

            return accounts;
        } catch (error: any) {
            console.log('error', error);
            throw Error(error.response.data.message);
        }
    }
);

export const getAccountsByUserId = createAsyncThunk('account/getAccountsByUserId', async (userSub: string) => {
    try {
        const response = await getAccountsByUserIdService(userSub);
        const accounts = response.data.map((account: Account) => ({
            account_id: account.account_id,
            balances: account.balances,
            mask: account.mask,
            name: account.name,
            official_name: account.official_name,
            subtype: account.subtype,
            type: account.type,
        }));
        console.log('accounts in getAccountsByUserID', accounts);

        return accounts;
    } catch (error: any) {
        console.log('Error fetching accounts', error);
        throw Error(error.response.data.message);
    }
});

const accountSlice: Slice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        clearAccount() {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createLinkToken.pending, (state) => {
            state.networkState = 'loading';
        });
        builder.addCase(createLinkToken.fulfilled, (state, action) => {
            state.networkState = 'success';
            state.linkToken = action.payload;
        });
        builder.addCase(createLinkToken.rejected, (state, action) => {
            state.networkState = 'error';
            state.error = action.error.message;
        });
        builder.addCase(getAccessToken.pending, (state) => {
            state.networkState = 'loading';
        });
        builder.addCase(getAccessToken.fulfilled, (state, action) => {
            state.networkState = 'success';
            if (state.accounts !== null) {
                state.accounts = [...state.accounts, ...action.payload]
            } else {
                state.accounts = action.payload;
            }
        });
        builder.addCase(getAccessToken.rejected, (state, action) => {
            state.networkState = 'error';
            state.error = action.error.message;
        });
        builder.addCase(getAccountsByUserId.pending, (state) => {
            state.networkState = 'loading';
        });
        builder.addCase(getAccountsByUserId.fulfilled, (state, action) => {
            state.networkState = 'success';
            state.accounts = action.payload;
        });
        builder.addCase(getAccountsByUserId.rejected, (state, action) => {
            state.networkState = 'error';
            state.error = action.error.message;
        });
    },
});

export default accountSlice.reducer;

export const { clearAccount } = accountSlice.actions;
