import './VotingOverlay.css';
import { useState, useEffect } from 'react';
import socket from '../../../socket';

const VotingOverlay = () => {
  useEffect(() => {
    const handleServerVote = () => {
      console.log('Emit received from the server');
    };

    socket.on('serverVote', handleServerVote);

    return () => {
      socket.off('serverVote', handleServerVote);
    };
  }, []);

  return <div className="voting-overlay"></div>;
};

export default VotingOverlay;
