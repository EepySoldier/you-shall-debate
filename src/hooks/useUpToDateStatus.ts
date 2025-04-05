import { useEffect, Dispatch, SetStateAction } from 'react';
import { Socket } from 'socket.io-client';
import { MessageType } from '../types';

type useUpToDateStatusProps = {
  socket: Socket;
  setMessages: Dispatch<SetStateAction<MessageType[]>>;
  setOnlineCount: Dispatch<SetStateAction<number>>;
  setMaxOnlineCount: Dispatch<SetStateAction<number>>;
};

const useUpToDateStatus = ({
  socket,
  setMaxOnlineCount,
  setMessages,
  setOnlineCount,
}: useUpToDateStatusProps) => {
  useEffect(() => {
    const fetchOnlineCount = (_onlineCount: number, _onlineMaxCount: number) => {
      setOnlineCount(_onlineCount);
      setMaxOnlineCount(_onlineMaxCount);
    };

    socket.on('onlineCount', fetchOnlineCount);
    return () => {
      socket.off('onlineCount', fetchOnlineCount);
    };
  }, []);

  useEffect(() => {
    const updateUserStatus = (
      { username, online }: { username: string; online: boolean },
      onlineCount: number,
    ) => {
      setMessages((prev) =>
        prev.map((msg) => (msg.username === username ? { ...msg, online } : msg)),
      );
      setOnlineCount(onlineCount);
    };

    socket.on('userStatusChange', updateUserStatus);
    return () => {
      socket.off('userStatusChange', updateUserStatus);
    };
  }, []);
};

export default useUpToDateStatus;
