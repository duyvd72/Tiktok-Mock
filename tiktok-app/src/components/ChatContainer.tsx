import React, { useEffect, useState, useRef } from 'react';
import { Formik, Field, Form } from 'formik';
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
  const [conservation, setConservation] = useState<IMessage[]>([]);
  const scrollRef = useRef<any>();
  const initialValues = {
    message: '',
  };

  useEffect(() => {
    if (currentUserChat._id) {
      (async () => {
        const response = await axiosInstance.get(
          `messages/get?from=${currentUser.id}&to=${currentUserChat._id}`
        );
        setConservation(response.data);
      })();
      socket.emit(
        'join-room',
        Math.abs(
          removeCharacter(currentUser.id) - removeCharacter(currentUserChat._id)
        )
      );
    }

    return () => setConservation([]);
  }, [currentUserChat._id]);

  useEffect(() => {
    socket.on('message-receive', (data: any) => {
      setConservation((prevMessages) => [...prevMessages, data]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [conservation.length]);

  const sendMessage = async (inputMessage: string) => {
    socket.emit(
      'send-message',
      Math.abs(
        removeCharacter(currentUser.id) - removeCharacter(currentUserChat._id)
      ),
      {
        message: inputMessage,
        inRoom: [currentUser.id, currentUserChat._id],
        sender: currentUser.id,
      }
    );

    setConservation((prev) => [
      ...prev,
      {
        message: inputMessage,
        inRoom: [currentUser.id, currentUserChat._id],
        sender: currentUser.id,
      },
    ]);

    await axiosInstance.post('messages/create', {
      from: currentUser.id,
      to: currentUserChat._id,
      message: inputMessage,
    });
  };

  return (
    <main>
      <div className="flex-1 flex flex-col border-b-2 h-[440px] overflow-y-auto p-3">
        {conservation.map((item, index) => (
          <div
            key={item._id}
            ref={scrollRef}
            className={`${
              item.sender === currentUser.id ? `flex justify-end ` : ''
            }`}
          >
            <p
              className={`${
                item.sender === currentUser.id
                  ? ` text-white bg-cyan-500 p-3 rounded-lg w-fit mt-5`
                  : `text-black mt-5 p-3 rounded-lg w-fit bg-slate-300`
              }`}
              key={index}
            >
              {item.message}
            </p>
          </div>
        ))}
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          sendMessage(values.message);
          resetForm();
        }}
      >
        <Form>
          <div className="bg-white py-3 flex ps-3">
            <Field
              placeholder="gửi tin nhắn..."
              type="text"
              name="message"
              className="bg-gray-200 p-2 ps-3 rounded-md w-full outline-none"
            />
            <button type="submit" className="text-2xl mx-5">
              <i className="fas fa-paper-plane text-red-600"></i>
            </button>
          </div>
        </Form>
      </Formik>
    </main>
  );
};

export default ChatContainer;
