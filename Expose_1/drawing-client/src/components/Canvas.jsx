import React, { useRef, useEffect, useState, useCallback } from 'react';

const Canvas = ({ onDraw, onDrawingStateChange, externalDrawings, color, brushSize }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Configuration du canvas
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = color;
    
    setContext(ctx);
    
    // Redimensionnement responsive
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (context) {
      context.lineWidth = brushSize;
      context.strokeStyle = color;
    }
  }, [brushSize, color, context]);

  // Gestion des dessins externes
  useEffect(() => {
    if (externalDrawings && context) {
      const message = JSON.parse(externalDrawings.data);
      if (message.type === 'drawing' && message.x && message.y) {
        drawExternalLine(message);
      } else if (message.type === 'clear') {
        clearCanvas();
      }
    }
  }, [externalDrawings, context]);

  const drawExternalLine = (data) => {
    const { x, y, type, color: extColor, brushSize: extBrushSize } = data;
    
    context.strokeStyle = extColor;
    context.lineWidth = extBrushSize;

    if (type === 'start') {
      context.beginPath();
      context.moveTo(x, y);
    } else if (type === 'draw') {
      context.lineTo(x, y);
      context.stroke();
    }
  };

  const clearCanvas = () => {
    if (context) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const startDrawing = useCallback((e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    onDrawingStateChange(true);
    
    if (context) {
      context.beginPath();
      context.moveTo(x, y);
    }

    onDraw({ x, y, type: 'start' });
  }, [context, onDraw, onDrawingStateChange]);

  const draw = useCallback((e) => {
    if (!isDrawing || !context) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    context.lineTo(x, y);
    context.stroke();

    onDraw({ x, y, type: 'draw' });
  }, [isDrawing, context, onDraw]);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
    onDrawingStateChange(false);
    
    if (context) {
      context.closePath();
    }

    onDraw({ type: 'end' });
  }, [context, onDraw, onDrawingStateChange]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={(e) => {
          e.preventDefault();
          startDrawing(e.touches[0]);
        }}
        onTouchMove={(e) => {
          e.preventDefault();
          draw(e.touches[0]);
        }}
        onTouchEnd={stopDrawing}
        className={`w-full h-[600px] bg-white cursor-crosshair touch-none ${
          isDrawing ? 'drawing-cursor' : ''
        }`}
      />
      
      {/* Overlay d'instructions */}
      {!isDrawing && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="glass-effect rounded-2xl p-6 text-center max-w-xs">
            <p className="text-gray-600 font-medium">
              👆 Commencez à dessiner !
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Canvas;