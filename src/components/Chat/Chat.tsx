import './Chat.css';
import { useEffect, useRef } from 'react';
import ChatInput from './ChatInput/ChatInput';
import Message from './Message/Message';
import TopicDisplay from './TopicDisplay/TopicDisplay';
import socket from '../../socket';
import { MessageType } from '../../types';
import LeftUI from './LeftUI/LeftUI';
import VotingOverlay from './VotingOverlay/VotingOverlay';

type ChatProps = {
  username: string;
  messages: MessageType[];
  newMessageAdded: boolean;
  currentRoom: string;
  onlineCount: number;
  maxOnlineCount: number;
  updateVoteCountLocally: (messageId: number, type: 'up' | 'down') => void;
};

const Chat = ({
  username,
  messages,
  newMessageAdded,
  currentRoom,
  onlineCount,
  maxOnlineCount,
  updateVoteCountLocally,
}: ChatProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.removeItem('modalOpen');
  }, []);

  useEffect(() => {
    if (newMessageAdded) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, newMessageAdded]);

  const handleSend = (text: string) => {
    if (text.trim()) {
      socket.emit('sendMessage', { username, text });
    }
  };

  return (
    <div className="chat">
      <header className="chat__header">
        <LeftUI />
        <div className="chat__topicDisplay">
          <TopicDisplay topic="Current Topic here" />
        </div>
        <div className="chat__rightUI">
          Room({currentRoom}) {onlineCount} / {maxOnlineCount} online
        </div>
      </header>
      <section className="chat__messages">
        {messages.map((msg) => (
          <Message
            key={msg.id}
            {...msg}
            isMine={msg.username === username}
            onVote={updateVoteCountLocally}
          />
        ))}
        <VotingOverlay />
        <div ref={messagesEndRef} />
      </section>
      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default Chat;
