import { combineReducers } from 'redux';
import userReducer from './slice/user';
import chatReducer from './slice/chat';
export default combineReducers({
	user: userReducer,
	chat: chatReducer,
});
