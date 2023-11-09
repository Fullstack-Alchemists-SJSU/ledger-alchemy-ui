import NetworkState from '../networkstate';

export enum Role {
	SYSTEM = 'system',
	USER = 'user',
	ASSISTANT = 'assistant',
}

export type Message = {
	id: number;
	chat: number;
	content: string;
	role: Role;
	timestamp: string;
};
