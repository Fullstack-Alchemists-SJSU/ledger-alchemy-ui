import { combineReducers } from 'redux';
import userReducer from './slice/user';
import chatReducer from './slice/chat';
import messageReducer from './slice/message';
import accountReducer from './slice/account';
import transactionReducer from './slice/transaction';
export default combineReducers({
	user: userReducer,
	chat: chatReducer,
	messages: messageReducer,
	accountReducer: accountReducer,
	transactionReducer: transactionReducer,
});
