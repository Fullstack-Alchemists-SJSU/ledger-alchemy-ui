import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Chat, getChatsByUserId } from '../../../store/slice/chat';
import { useNavigate } from 'react-router-dom';

const ChatList = () => {
	const { chats, networkState, error } = useSelector((state: RootState) => state.rootReducer.chat);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (chats.length === 0) {
			dispatch(getChatsByUserId(1) as any);
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
						{chats.map((chat) => (
							<Tr
								key={chat.id}
								className="cursor-pointer hover:bg-gray-100"
								onClick={() => handleChatClick(chat)}
							>
								<Th>{chat.id}</Th>
								<Th>{chat.title}</Th>
								<Th>{new Date(chat.createdAt).toDateString()}</Th>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default ChatList;
