import React, { useState, useCallback } from 'react';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';
import UserCounter from './components/UserCounter';
import Chat from './components/Chat';
import useWebSocket from './hooks/useWebSocket';

function App() {
  const [color, setColor] = useState('#3b82f6');
  const [brushSize, setBrushSize] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [users, setUsers] = useState(0);

  const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:8080');

  // Gestion des messages WebSocket
  React.useEffect(() => {
    if (lastMessage) {
      const message = JSON.parse(lastMessage.data);
      
      switch (message.type) {
        case 'userCount':
          setUsers(message.count);
          break;
        default:
          break;
      }
    }
  }, [lastMessage]);

  const handleDraw = useCallback((drawingData) => {
    sendMessage(JSON.stringify({
      type: 'drawing',
      ...drawingData,
      color,
      brushSize
    }));
  }, [sendMessage, color, brushSize]);

  const handleClear = () => {
    sendMessage(JSON.stringify({ type: 'clear' }));
  };

  const handleChatMessage = (message) => {
    sendMessage(JSON.stringify({
      type: 'chat',
      message,
      user: `User${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString()
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="glass-effect shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">D</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">DrawTogether</h1>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                En ligne
              </span>
            </div>
            
            <UserCounter count={users} />
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowChat(!showChat)}
                className="btn-secondary flex items-center gap-2"
              >
                <span>💬</span>
                Chat
              </button>
              <button
                onClick={handleClear}
                className="btn-primary flex items-center gap-2"
              >
                <span>🗑️</span>
                Effacer
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Toolbar */}
          <div className="lg:col-span-1">
            <div className="glass-effect rounded-2xl p-6 shadow-lg sticky top-6">
              <Toolbar
                color={color}
                setColor={setColor}
                brushSize={brushSize}
                setBrushSize={setBrushSize}
                isDrawing={isDrawing}
              />
            </div>
          </div>

          {/* Canvas Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <Canvas
                onDraw={handleDraw}
                onDrawingStateChange={setIsDrawing}
                externalDrawings={lastMessage}
                color={color}
                brushSize={brushSize}
              />
            </div>
          </div>

          {/* Chat Sidebar */}
          <div className={`lg:col-span-1 transition-all duration-300 ${showChat ? 'block' : 'hidden lg:block'}`}>
            <div className="glass-effect rounded-2xl shadow-lg h-[600px]">
              <Chat
                onSendMessage={handleChatMessage}
                messages={lastMessage}
                isOpen={showChat}
                onToggle={() => setShowChat(!showChat)}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Chat Toggle */}
      <div className="lg:hidden fixed bottom-6 right-6">
        <button
          onClick={() => setShowChat(!showChat)}
          className="w-14 h-14 bg-primary-500 rounded-full shadow-lg flex items-center justify-center text-white text-xl hover:bg-primary-600 transition-all transform hover:scale-110"
        >
          {showChat ? '✕' : '💬'}
        </button>
      </div>
    </div>
  );
}

export default App;