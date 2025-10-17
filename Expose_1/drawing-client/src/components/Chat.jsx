import React, { useState, useEffect, useRef } from 'react';

const Chat = ({ onSendMessage, messages, isOpen, onToggle }) => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    if (messages) {
      const messageData = JSON.parse(messages.data);
      if (messageData.type === 'chat') {
        setChatMessages(prev => [...prev, messageData]);
      }
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header du chat */}
      <div className="p-4 border-b border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <span>💬</span>
            Chat en direct
          </h3>
          <button
            onClick={onToggle}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Discutez avec les autres artistes
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {chatMessages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">👋</div>
            <p>Soyez le premier à envoyer un message !</p>
          </div>
        ) : (
          chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${msg.user === 'Vous' ? 'flex-row-reverse' : ''}`}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                {msg.user?.charAt(0) || 'U'}
              </div>
              <div className={`flex-1 ${msg.user === 'Vous' ? 'text-right' : ''}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-800 text-sm">
                    {msg.user}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
                <div className={`inline-block px-4 py-2 rounded-2xl max-w-xs ${
                  msg.user === 'Vous'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {msg.message}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white/50">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tapez votre message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            maxLength={200}
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="px-4 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;