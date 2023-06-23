import { useState, useEffect } from 'react';
import useModal from '@/hooks/useModal';
import UserChat from './UserChat';
import ChatContainer from './ChatContainer';
import io from 'socket.io-client';
import axiosInstance from '@/libs/axios/axiosConfig';

const socket = io('http://localhost:3005');

function Chat() {
  const { currentUser } = useModal();
  const [listUser, setListUser] = useState<any[]>([]);
  const [currentUserChat, setCurrentUserChat] = useState<{
    [key: string]: any;
  }>({});
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);

  useEffect(() => {
    socket.emit('add-user', currentUser.id);
  }, []);

  useEffect(() => {
    socket.on('user-connected', (onlineUsers) => {
      setOnlineUsers(Object.values(onlineUsers));
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/accounts');
        setListUser(response.data);
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <main
        className="w-[90%] h-[90%] my-auto flex box shadow-lg p-0.5 rounded-lg"
        style={{ background: 'rgb(248, 248, 248)' }}
      >
        <article className="w-1/4 flex flex-col bg-white rounded-lg h-full">
          <div className="flex items-center justify-between p-3">
            <p className="font-bold text-xl ps-2">Tin nhắn</p>
            <p className="text-2xl">
              <i className="fas fa-cog "></i>
            </p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {listUser &&
              listUser.map((user: any) => {
                if (user?._id !== currentUser?.id) {
                  return (
                    <section
                      className={`${currentUserChat._id == user._id
                        ? `bg-slate-200`
                        : `hover:bg-slate-100 `
                        }`}
                      key={user?._id}
                      onClick={() => {
                        setCurrentUserChat(user);
                      }}
                    >
                      <UserChat userData={user} onlineUsers={onlineUsers} />
                    </section>
                  );
                }
                return null;
              })}
          </div>
        </article>
        {currentUserChat && currentUserChat._id && (
          <article className="w-3/4 bg-white rounded-lg ms-5 flex flex-col">
            <div className="p-5 border-b-2">{currentUserChat?.fullname}</div>
            <ChatContainer
              currentUser={currentUser}
              currentUserChat={currentUserChat}
              socket={socket}
            />
          </article>
        )}
      </main>
    </>
  );
}

export default Chat;
