import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { IconButton, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Chat, deleteChatById, getChatsByUserId } from '../../../store/slice/chat';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

const ChatList = () => {
	const user = useSelector((state: RootState) => state.rootReducer.user.user);
	const { chats, networkState, error } = useSelector((state: RootState) => state.rootReducer.chat);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (chats.length === 0) {
			dispatch(getChatsByUserId(user!!.id) as any);
		}
	}, []);

	const handleChatClick = (chat: Chat) => {
		navigate(`/chat/${chat.id}`, { state: { messages: chat.messages } });
	};

	return (
		<div className="h-full w-full bg-white">
			<TableContainer>
				<Table variant="striped">
					<TableCaption>Say Hi to Alchemo! Your personal financial advisor!</TableCaption>
					<Thead>
						<Tr>
							<Th>ID</Th>
							<Th>Title</Th>
							<Th>Created</Th>
						</Tr>
					</Thead>
					<Tbody>
						{chats.map((chat: Chat) => (
							<Tr key={chat.id} className="cursor-pointer hover:bg-gray-100 group">
								<Td onClick={() => handleChatClick(chat)}>{chat.id}</Td>
								<Td onClick={() => handleChatClick(chat)}>{chat.title}</Td>
								<Td onClick={() => handleChatClick(chat)}>{new Date(chat.createdAt).toDateString()}</Td>
								<Td>
									<IconButton
										isLoading={networkState === 'loading'}
										icon={<MdDelete />}
										aria-label="Delete Chat"
										className="invisible group-hover:visible"
										onClick={() => dispatch(deleteChatById(chat.id) as any)}
									/>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default ChatList;
