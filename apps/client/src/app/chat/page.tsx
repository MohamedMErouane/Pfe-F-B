'use client'

import { useState, useEffect, useRef } from 'react';
import SideBar from '@/components/SideBar';
import io from 'socket.io-client';
import { BACKEND_URL } from '@/lib/Constants';
import { useSession } from 'next-auth/react';
import { Link } from 'react-router-dom';

interface Message {
  id : number
  text: string;
  name: string;
  image : string
}

const ChatPage = () => {
  const { data: session } = useSession();
  const [socket, setSocket] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('');
  const chatRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    const newSocket = io(BACKEND_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to socket server');
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    newSocket.emit('findAllMessages', {}, (response : Message[]) => {
      setMessages(response);
    });

    newSocket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket && session && session.user.username) {
      joinChat(session.user.username);
    }
  }, [socket, session]);

  const joinChat = (name : string) => {
    if (socket && name) {
      socket.emit('join', { name }, () => {
        console.log('Joined the chat');
      });
    }
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      socket.emit('createMessage', { text: newMessage, name: session?.user.username || 'Unknown' });
      setNewMessage('');
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 h-screen flex flex-col justify-center items-center bg-gray-900">
        <div className="bg-gray-800 rounded-lg p-8 w-full max-w-screen-md flex flex-col flex-grow mx-auto">
          <h1 className="text-white text-3xl mb-4">Chat App</h1>
          <div className="flex-1 overflow-y-auto" ref={chatRef} style={{ maxHeight: '70vh', scrollbarWidth: 'thin', scrollbarColor: 'transparent transparent' }}>
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.name === session?.user.username ? 'justify-end' : ''} mb-4`}>
              <div className={`flex items-center space-x-2 ${message.name === session?.user.username ? 'flex-row-reverse' : ''}`}>
                {message.name !== session?.user.username && (
                  <div className="flex items-center space-x-2">
                    <img 
                      src={message.image ? `http://localhost:3333/user/profile/${message.name}` : '/1.jpg'} 
                      alt="Profile Picture" 
                      className="h-9 w-9 rounded-full" // Set height and width of the image
                    />
                    <div>
                      <a href={`/profile/${message.name}`}>
                        <p className="text-xs text-gray-300">{message.name}</p>
                      </a>
                      <p className={`rounded-lg px-4 py-2 max-w-md ${message.name === session?.user.username ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}>
                        {message.text}
                      </p>
                    </div>
                  </div>
                )}
                {message.name === session?.user.username && (
                  <div>
                    <p className={`rounded-lg px-4 py-2 max-w-md bg-blue-500 text-white`}>
                      {message.text}
                    </p>
                  </div>
                )}
              </div>
            </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex items-center mt-4">
            <input
              type="text"
              value={newMessage}
              onChange={handleInputChange}
              className="bg-gray-700 text-white flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ml-2"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
