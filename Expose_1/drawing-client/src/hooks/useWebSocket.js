import { useState, useEffect, useRef } from 'react';

export default function useWebSocket(url) {
  const [lastMessage, setLastMessage] = useState(null);
  const [readyState, setReadyState] = useState(0); // 0: Connecting, 1: Open, 2: Closing, 3: Closed
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(url);
    
    ws.current.onopen = () => {
      console.log('WebSocket connected');
      setReadyState(1);
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
      setReadyState(3);
    };

    ws.current.onmessage = (event) => {
      setLastMessage(event);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [url]);

  const sendMessage = (message) => {
    if (ws.current && readyState === 1) {
      ws.current.send(message);
    } else {
      console.warn('WebSocket not connected');
    }
  };

  return { sendMessage, lastMessage, readyState };
}