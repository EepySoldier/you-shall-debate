import { useEffect, Dispatch, SetStateAction } from 'react';
import { Socket } from 'socket.io-client';
import { generateRandomUsername } from '../utils';

type useSocketSetupProps = {
  socket: Socket;
  setUsername: Dispatch<SetStateAction<string>>;
  setLoadingProgress: Dispatch<SetStateAction<number>>;
  username: string;
};

const useSocketSetup = ({
  socket,
  setUsername,
  setLoadingProgress,
  username,
}: useSocketSetupProps) => {
  useEffect(() => {
    const newUsername = generateRandomUsername();
    setUsername(newUsername);
  }, []);

  useEffect(() => {
    if (username === '') return;

    if (!socket.connected) {
      socket.connect();
      socket.emit('setUsername', username);
    }

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev < 100) return prev + 10;
        clearInterval(interval);
        return 100;
      });
    }, 300);

    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
      clearInterval(interval);
    };
  }, [username]);
};

export default useSocketSetup;
