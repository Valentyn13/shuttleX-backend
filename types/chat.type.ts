import { IMessage } from './message.type';
import { UserWithoutPassword } from './user.type';

export type IChat = {
    name: string;
    ownerId: string;
    ownerName: string;
    members: UserWithoutPassword[];
    messages: IMessage[];
};

export type ChatWithoutMessages = Omit<IChat, 'messages'>;
