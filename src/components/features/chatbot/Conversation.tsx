import { useDispatch, useSelector } from 'react-redux';
import BaseContainer from '../../common/responsive/BaseContainer';
import Toolbar from '../../common/toolbar/Toolbar';
import { RootState } from '../../../store/store';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Chat, setMessages as setMessagesAction, systemPromptChat } from '../../../store/slice/chat';
import { Message, Role } from '../../../store/slice/message';
import { ChatEndpoints } from '../../../services/url-constants';
import ChatBubble from './ChatBubbule';
import { IconButton, Input } from '@chakra-ui/react';
import { AiOutlineSend } from 'react-icons/ai';

const Conversation = () => {
	const [aiLoading, setAiLoading] = useState(false);
	const [userMessage, setUserMessage] = useState('');
	const [firstMessageSent, setFirstMessageSent] = useState(false);

	let { id } = useParams();
	let chat = useSelector((state: RootState) =>
		state.rootReducer.chat.chats.find((chat: Chat) => chat.id === Number(id))
	);
	const [messages, setMessages] = useState<Message[]>(chat?.messages ?? []);

	const dispatch = useDispatch();
	const messageListRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (chat) {
			if (messages.length === 0 && !firstMessageSent) {
				sendMessage([systemPromptChat(Date.now().toString(), chat.id)]);
			}
		}

		return () => {
			if (!firstMessageSent) {
				setFirstMessageSent(true);
			}
		};
	}, [chat]);

	useEffect(() => {
		setTimeout(() => {
			messageListRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'end' });
		}, 200);

		return () => {
			dispatch(setMessagesAction({ chatId: chat?.id ?? 0, messages }));
		};
	}, [messages]);

	async function sendMessage(messages: Message[]) {
		setAiLoading(true);
		const response = await fetch(ChatEndpoints.COMPLETION, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ messages }),
		});
		if (!response.ok || !response.body) {
			console.log('error');
			return;
		}

		const reader = response.body.getReader();
		const decoder = new TextDecoder();

		let messageStream = '';

		const timestamp = Date.now().toString();

		while (true) {
			const { done, value } = await reader.read();
			if (done) {
				break;
			}

			const token = decoder.decode(value);

			setMessages((messages) => {
				const lastMessage = messages[messages.length - 1]!;
				if (!lastMessage) {
					return [{ id: 0, role: Role.ASSISTANT, content: token, chat: chat?.id ?? 0, timestamp }];
				}

				if (lastMessage.role !== Role.ASSISTANT) {
					return [
						...messages,
						{ id: 0, role: Role.ASSISTANT, content: token, chat: chat?.id ?? 0, timestamp },
					];
				}

				const content = lastMessage.content + token;
				return [
					...messages.slice(0, messages.length - 1),
					{ id: 0, role: Role.ASSISTANT, content, chat: chat?.id ?? 0, timestamp },
				];
			});
		}

		setAiLoading(false);
	}

	const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserMessage(e.target.value);
	};

	const handleSend = () => {
		const newMessage: Message = {
			id: 0,
			role: Role.USER,
			content: userMessage,
			chat: chat?.id ?? 0,
			timestamp: Date.now().toString(),
		};
		const updatedMessages = [...messages, newMessage];
		setMessages(updatedMessages);
		setUserMessage('');
		sendMessage(updatedMessages);
	};

	return (
		<BaseContainer>
			<div className="flex flex-col flex-1 bg-gray-100 md:max-w-[60%] mx-auto">
				<Toolbar title={chat?.title ?? 'Conversation'} />
				<div className="flex flex-1 flex-col max-h-[90vh] overflow-y-auto" ref={messageListRef}>
					{messages.map((message) => message && <ChatBubble key={message.timestamp} message={message} />)}
				</div>
				<div className="shadow-lg m-2">
					<div className="flex flex-row items-center bg-white p-2 rounded-lg">
						<Input
							marginRight={4}
							background="white"
							padding={4}
							value={userMessage}
							onChange={handleMessageChange}
							isDisabled={aiLoading}
							placeholder={aiLoading ? 'Alchemo is thinking...' : 'Enter your message'}
						/>
						<IconButton
							isDisabled={aiLoading || userMessage.length === 0}
							colorScheme="purple"
							aria-label="send"
							icon={<AiOutlineSend color="white" />}
							onClick={() => handleSend()}
						/>
					</div>
				</div>
			</div>
		</BaseContainer>
	);
};

export default Conversation;
