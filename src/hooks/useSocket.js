// src/hooks/useSocket.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { setSocket, setOnlineUsers } from '../redux/socketSlice';
import { useAuthContext } from './AuthContext';

const useSocket = () => {
  const dispatch = useDispatch();
  const { socket, onlineUsers } = useSelector((state) => state.socket);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socketInstance = io('http://localhost:4000', {
        query: {
          userId: authUser,
        },
      });

      dispatch(setSocket(socketInstance));

      socketInstance.on('getOnlineUsers', (users) => {
        dispatch(setOnlineUsers(users));
      });

      return () => socketInstance.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser, dispatch, socket]);

  return { socket, onlineUsers };
};

export default useSocket;
