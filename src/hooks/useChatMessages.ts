import { useEffect, Dispatch, SetStateAction } from 'react';
import { Socket } from 'socket.io-client';
import { MessageType } from '../types';

type useChatMessagesProps = {
  socket: Socket;
  setMessages: Dispatch<SetStateAction<MessageType[]>>;
  setNewMessageAdded: Dispatch<SetStateAction<boolean>>;
  setCurrentRoom: Dispatch<SetStateAction<string>>;
};

const useChatMessages = ({
  socket,
  setCurrentRoom,
  setMessages,
  setNewMessageAdded,
}: useChatMessagesProps) => {
  useEffect(() => {
    const loadPreviousMessages = (messageHistory: MessageType[], roomID: string) => {
      setMessages(messageHistory);
      setCurrentRoom(roomID.slice(12));
    };

    socket.on('previousMessages', loadPreviousMessages);
    return () => {
      socket.off('previousMessages', loadPreviousMessages);
    };
  }, []);

  useEffect(() => {
    const addNewMessage = (newMessage: MessageType) => {
      setMessages((prev) => [...prev, newMessage].slice(-100));
      setNewMessageAdded(true);
    };

    socket.on('newMessage', addNewMessage);
    return () => {
      socket.off('newMessage', addNewMessage);
    };
  }, []);

  useEffect(() => {
    const removeMessage = ({ messageId }: { messageId: number }) => {
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    };

    socket.on('deleteMessage', removeMessage);
    return () => {
      socket.off('deleteMessage', removeMessage);
    };
  }, []);
};

export default useChatMessages;
