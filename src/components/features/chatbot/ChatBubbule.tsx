import { Message, Role } from '../../../store/slice/message';

interface ChatBubbleProps {
	message: Message;
}

const ChatBubble = ({ message }: ChatBubbleProps) => {
	return (
		<div
			className={`flex bg-dark-purple text-white max-w-[60%] md:max-w-[40%] p-4 m-2 rounded-b-lg font-semibold h-fit ${
				message.role === Role.ASSISTANT ? ' rounded-tr-lg self-start' : ' rounded-tl-lg self-end'
			}`}
		>
			{message.content}
		</div>
	);
};

export default ChatBubble;
