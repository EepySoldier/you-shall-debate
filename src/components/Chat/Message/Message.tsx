import './Message.css';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import socket from '../../../socket';
import VoteArrow from './VoteArrow/VoteArrow';

type MessageProps = {
  isMine: boolean;
  id: number;
  username: string;
  text: string;
  timestamp: number;
  online: boolean;
  upvotes: number;
  downvotes: number;
  onVote: (messageId: number, type: 'up' | 'down') => void;
};

const Message = ({
  isMine,
  username,
  text,
  timestamp,
  online,
  id,
  upvotes,
  downvotes,
  onVote,
}: MessageProps) => {
  const formattedTime = useMemo(() => new Date(timestamp).toLocaleTimeString(), [timestamp]);
  const [voted, setVoted] = useState<'up' | 'down' | null>(null);

  const handleVote = (type: 'up' | 'down') => {
    if (voted) return;

    onVote(id, type);

    socket.emit(type === 'up' ? 'upvote' : 'downvote', id);
    setVoted(type);
  };

  return (
    <motion.div
      className={`message ${isMine ? 'message--mine' : 'message--other'}`}
      initial={{ opacity: 0, x: isMine ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'tween', duration: 0.3 }}
    >
      <div className="message__header">
        <span className={`status-dot ${online ? 'online' : 'offline'}`}>●</span>
        <span className="username">{username}</span>
        <span className="timestamp">{formattedTime}</span>
      </div>
      <div className="message__text">{text}</div>
      <div className="message__votes" style={isMine ? { pointerEvents: 'none', opacity: 0.6 } : {}}>
        <VoteArrow
          type="up"
          voted={voted === 'up'}
          onClick={() => handleVote('up')}
          isDisabled={voted !== null}
        />
        <span>{upvotes}</span>
        <VoteArrow
          type="down"
          voted={voted === 'down'}
          onClick={() => handleVote('down')}
          isDisabled={voted !== null}
        />
        <span>{downvotes}</span>
      </div>
    </motion.div>
  );
};

export default Message;
