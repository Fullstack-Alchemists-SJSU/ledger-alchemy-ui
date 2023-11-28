import { io } from 'socket.io-client';
import { SocketEndpoint } from './url-constants';
import { Message, setMessages, addMessage } from '../store/slice/message';
import store, { RootState } from '../store/store';

const socket = io(new URL(SocketEndpoint.BASE_URL).toString());

socket.on('syncedMessage', (data: { newMessages: Message[]; userId: string }) => {
	const user = (store.getState() as RootState).rootReducer.user.user;
	if (data && data.newMessages && data.userId && data.userId === user?.sub) {
		data.newMessages.forEach((message) => {
			store.dispatch(addMessage(message));
		});
	}
});

export default socket;
