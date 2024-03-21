'use client'

// Import necessary modules
import { useState, useEffect, useRef } from 'react';
import { CameraIcon } from '@heroicons/react/24/outline';
import SideBar from '@/components/SideBar';
import io from 'socket.io-client';
import { BACKEND_URL } from '@/lib/Constants';
import { useSession } from 'next-auth/react';

// Define the Message interface
interface Message {
  text: string;
  name: string;
}

// Define the ChatPage component
const ChatPage = () => {
  // Access session data
  const { data: session } = useSession(); 
  // Initialize socket state
  const [socket, setSocket] = useState<any>(null); 
  // Initialize messages state
  const [messages, setMessages] = useState<Message[]>([]); 
  // Initialize new message state
  const [newMessage, setNewMessage] = useState(''); 
  // Initialize chatRef
  const chatRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    // Establish connection with server
    const newSocket = io(BACKEND_URL); 
    // Set the socket state
    setSocket(newSocket); 

    // Socket event listeners
    newSocket.on('connect', () => {
      console.log('Connected to socket server');
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    // Fetch all messages from server
    newSocket.emit('findAllMessages', {}, (response: Message[]) => {
      setMessages(response);
    });

    // Listen for incoming messages
    newSocket.on('message', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up function to disconnect from the server when component unmounts
    return () => {
      newSocket?.disconnect();
    };
  }, []);

  useEffect(() => {
    // Join the chat when the component mounts
    if (socket && session && session.user.firstName && session.user.lastName) {
      joinChat(`${session.user.lastName} ${session.user.firstName}`);
    }
  }, [socket, session]);

  const joinChat = (name: string) => {
    if (socket && name) {
      socket.emit('join', { name }, () => {
        console.log('Joined the chat');
      });
    }
  };

  // Event handler for input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  // Event handler for form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      socket.emit('createMessage', { text: newMessage, name: `${session?.user.lastName} ${session?.user.firstName}` || 'Unknown' });
      setNewMessage('');
    }
  };

  useEffect(() => {
    // Scroll to bottom on new message
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
              <div key={index} className={`flex ${message.name === `${session?.user.lastName} ${session?.user.firstName}` ? 'justify-end' : ''} mb-4`}>
                <div className={`flex items-center space-x-2 ${message.name === `${session?.user.lastName} ${session?.user.firstName}` ? 'flex-row-reverse' : ''}`}>
                  {message.name !== `${session?.user.lastName} ${session?.user.firstName}` && (
                    <div className="bg-gray-700 text-xs text-gray-300 px-2 py-1 rounded-md">
                      {message.name}
                    </div>
                  )}
                  <div className={`rounded-lg px-4 py-2 max-w-md ${message.name === `${session?.user.lastName} ${session?.user.firstName}` ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}>
                    {message.text}
                  </div>
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
