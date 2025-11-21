
import React, { useState, useEffect } from 'react';
import { Message } from '../types';

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'chef', text: 'Hello! I\'m starting on your order now. Any special requests?', timestamp: '10:30 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const userMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
  };

  useEffect(() => {
    // Simulate a chef's response
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.sender === 'user') {
      const timeoutId = setTimeout(() => {
        const chefResponse: Message = {
          id: Date.now(),
          sender: 'chef',
          text: 'Got it! I\'ll make sure to do that. Thanks for letting me know.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, chefResponse]);
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-80 bg-white rounded-lg border">
      <div className="p-4 border-b">
        <h4 className="font-bold text-center">Chat with your Chef</h4>
      </div>
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
              <p className="text-sm">{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-red-100' : 'text-gray-500'} text-right`}>{msg.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="p-4 border-t flex items-center space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button type="submit" className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
