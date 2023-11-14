import { combineReducers } from 'redux';
import userReducer from './slice/user';
import chatReducer from './slice/chat';
import messageReducer from './slice/message';
export default combineReducers({
	user: userReducer,
	chat: chatReducer,
	messages: messageReducer,
});
