import { useEffect, useState } from 'react';
import BaseContainer from '../../common/responsive/BaseContainer';
import Toolbar from '../../common/toolbar/Toolbar';
import { Button, IconButton, Stack } from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { createNewChat } from '../../../store/slice/chat';
import ChatList from './ChatList';

const Chatbot = () => {
	const [reply, setReply] = useState('');

	const user = useSelector((state: RootState) => state.rootReducer.user.user);
	const { chats, networkState, error } = useSelector((state: RootState) => state.rootReducer.chat);
	const dispatch = useDispatch();

	const handleNewChat = () => {
		dispatch(createNewChat(user!!.id) as any);
	};

	useEffect(() => {
		console.log('err', error);
	}, [error]);

	return (
		<BaseContainer>
			<div className="flex flex-col flex-1">
				<Toolbar title="Talk to Alchemo" />
				<ChatList />
			</div>
			<div className="absolute bottom-0 right-0 m-8">
				<Stack direction="row" spacing="8">
					<Button
						loadingText="Creating..."
						isLoading={networkState === 'loading'}
						leftIcon={<AiOutlinePlus />}
						aria-label="new chat"
						colorScheme="blue"
						className="p-4"
						onClick={() => handleNewChat()}
					>
						New Chat
					</Button>
				</Stack>
			</div>
		</BaseContainer>
	);
};

export default Chatbot;
