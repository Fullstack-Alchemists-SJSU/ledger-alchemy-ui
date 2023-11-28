import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import store from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<Auth0Provider
		domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
		clientId={process.env.REACT_APP_AUTH0_CLIENT_ID as string}
		authorizationParams={{
			redirect_uri: `${window.location.protocol}//${window.location.host}/`,
		}}
	>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistStore(store)}>
				<ChakraProvider>
					<App />
				</ChakraProvider>
			</PersistGate>
		</Provider>
	</Auth0Provider>
);
