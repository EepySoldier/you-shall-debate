import './App.css';
import { useState } from 'react';
import socket from './socket';
import { MessageType } from './types';
import Chat from './components/Chat/Chat';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import useSocketSetup from './hooks/useSocketSetup';
import useChatMessages from './hooks/useChatMessages';
import useVotes from './hooks/useChatMessagesVotes';
import useUpToDateStatus from './hooks/useUpToDateStatus';

function App() {
  const [username, setUsername] = useState<string>('');
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessageAdded, setNewMessageAdded] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<string>('');
  const [onlineCount, setOnlineCount] = useState(-1);
  const [maxOnlineCount, setMaxOnlineCount] = useState(-1);

  useSocketSetup({ socket, setUsername, setLoadingProgress, username });

  useChatMessages({ socket, setCurrentRoom, setMessages, setNewMessageAdded });

  useVotes({ socket, setMessages });

  useUpToDateStatus({ socket, setOnlineCount, setMaxOnlineCount, setMessages });

  const updateVoteCountLocally = (messageId: number, type: 'up' | 'down') => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              upvotes: type === 'up' ? msg.upvotes + 1 : msg.upvotes,
              downvotes: type === 'down' ? msg.downvotes + 1 : msg.downvotes,
            }
          : msg,
      ),
    );
  };

  return (
    <div className="App">
      {loadingProgress < 100 ? (
        <LoadingScreen progress={loadingProgress} />
      ) : (
        <Chat
          username={username}
          messages={messages}
          newMessageAdded={newMessageAdded}
          currentRoom={currentRoom}
          onlineCount={onlineCount}
          maxOnlineCount={maxOnlineCount}
          updateVoteCountLocally={updateVoteCountLocally}
        />
      )}
    </div>
  );
}

export default App;
