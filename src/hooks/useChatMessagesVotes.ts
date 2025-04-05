import { useEffect, Dispatch, SetStateAction } from 'react';
import { Socket } from 'socket.io-client';
import { MessageType } from '../types';

type useVotesProps = {
  socket: Socket;
  setMessages: Dispatch<SetStateAction<MessageType[]>>;
};

const useVotes = ({ socket, setMessages }: useVotesProps) => {
  useEffect(() => {
    const updateVoteCounts = ({
      messageId,
      upvotes,
      downvotes,
    }: {
      messageId: number;
      upvotes: number;
      downvotes: number;
    }) => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === messageId ? { ...msg, upvotes, downvotes } : msg)),
      );
    };

    socket.on('updateVoteCounts', updateVoteCounts);
    return () => {
      socket.off('updateVoteCounts', updateVoteCounts);
    };
  }, []);
};

export default useVotes;
