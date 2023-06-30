import React, { useEffect, useState, useRef } from 'react';
import removeCharacter from '@/utils/removeCharacter';
import axiosInstance from '@/libs/axios/axiosConfig';

interface IChatContainer {
  socket: any;
  currentUserChat: { [key: string]: any };
  currentUser: { [key: string]: any };
}

interface IMessage {
  message: string;
  inRoom: [string, string];
  sender: string;
  _id?: string;
}

const ChatContainer: React.FC<IChatContainer> = ({
  socket,
  currentUser,
  currentUserChat,
}) => {
  const [conservation, setConservation] = useState<IMessage[]>([])
  const scrollRef = useRef<any>()
  const [message, setMessage] = useState('')
  const count = useRef<any>(0)

  useEffect(() => {
    if (currentUserChat._id) {
      (async () => {
        const response = await axiosInstance.get(
          `messages/get?from=${currentUser._id}&to=${currentUserChat._id}`
        );
        setConservation(response.data);
      })();
      socket.emit(
        'join-room',
        Math.abs(
          removeCharacter(currentUser._id) - removeCharacter(currentUserChat._id)
        )
      );
    }

    return () => setConservation([]);
  }, [currentUserChat._id]);

  useEffect(() => {
    socket.on('message-receive', (data: any) => {
      setConservation((prevMessages) => [...prevMessages, data]);
    });
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [conservation.length]);

  const sendMessage = async (inputMessage: string) => {
    socket.emit(
      'send-message',
      Math.abs(
        removeCharacter(currentUser._id) - removeCharacter(currentUserChat._id)
      ),
      {
        message: inputMessage,
        inRoom: [currentUser._id, currentUserChat._id],
        sender: currentUser._id,
      }
    );

    setConservation((prev) => [
      ...prev,
      {
        message: inputMessage,
        inRoom: [currentUser._id, currentUserChat._id],
        sender: currentUser._id,
      },
    ]);

    await axiosInstance.post('messages/create', {
      from: currentUser._id,
      to: currentUserChat._id,
      message: inputMessage,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault()
    sendMessage(message)
    setMessage('')
  }

  return (
    <main className='flex-1 flex flex-col '>
      <div className={`flex-1 flex flex-col max-h-[440px] border-b-2 p-3 overflow-y-auto `} >
        {conservation.map((item, index) => (
          <div key={index} ref={scrollRef} className={`${item.sender === currentUser._id ? `flex justify-end mt-5 ` : 'flex items-center mt-5'}`}>
            {item.sender !== currentUser._id ? currentUserChat && currentUserChat.avatarUrl ?
              <img src={currentUserChat.avatarUrl} className='h-[50px] w-[50px] rounded-full' alt="" />
              :
              <i className=" fa fa-user h-[50px] w-[50px] ring-1 rounded-full text-2xl text-gray-300 flex justify-center items-center "></i>
              : ""
            }
            <p className={`max-w-[80%] break-words ${item.sender === currentUser._id ?
              ` text-white bg-cyan-500 p-3 rounded-lg w-fit me-2`
              :
              `text-black p-3 ms-2 rounded-lg w-fit bg-slate-300`}`} key={index}>{item.message}
            </p>
            {item.sender === currentUser._id ? currentUserChat && currentUserChat.avatarUrl ?
              <img src={currentUserChat.avatarUrl} className='h-[50px] w-[50px] rounded-full' alt="" />
              :
              <i className="fa fa-user h-[50px] w-[50px] ring-1 rounded-full text-2xl text-gray-300 flex justify-center items-center "></i>
              : ""
            }
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="bg-white py-3 flex ps-3">
          <input
            placeholder="gửi tin nhắn..."
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            name="message"
            className="bg-gray-200 p-2 ps-3 rounded-md w-full outline-none"
          />
          <button type="submit" className="text-2xl mx-5" disabled={!message} >
            <i className={`fas fa-paper-plane  ${message ? 'text-red-600' : 'text-trueGray-500'}`}></i>
          </button>
        </div>
      </form>
    </main >
  );
};

export default ChatContainer;
