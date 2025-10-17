import React from 'react';

const Toolbar = ({ color, setColor, brushSize, setBrushSize, isDrawing }) => {
  const colors = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
    '#ec4899', '#000000', '#ffffff', '#64748b', '#f97316'
  ];

  const brushSizes = [2, 5, 10, 15, 20];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span>🎨</span>
          Couleurs
        </h3>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((colorOption) => (
            <button
              key={colorOption}
              onClick={() => setColor(colorOption)}
              className={`w-10 h-10 rounded-full border-2 transition-all transform hover:scale-110 ${
                color === colorOption 
                  ? 'border-gray-800 scale-110 shadow-lg' 
                  : 'border-gray-300'
              }`}
              style={{ backgroundColor: colorOption }}
              title={colorOption}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span>🖌️</span>
          Taille du pinceau
        </h3>
        <div className="space-y-3">
          {brushSizes.map((size) => (
            <button
              key={size}
              onClick={() => setBrushSize(size)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                brushSize === size
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <div
                className="rounded-full bg-current"
                style={{ width: size, height: size }}
              />
              <span className="font-medium">{size}px</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span>⚡</span>
          Statut
        </h3>
        <div className={`p-4 rounded-lg text-center ${
          isDrawing 
            ? 'bg-green-100 text-green-800 animate-pulse' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          <div className="flex items-center justify-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              isDrawing ? 'bg-green-500 animate-ping' : 'bg-blue-500'
            }`} />
            <span className="font-medium">
              {isDrawing ? 'En train de dessiner...' : 'Prêt à dessiner'}
            </span>
          </div>
        </div>
      </div>

      {/* Aperçu du pinceau */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-600 mb-2">Aperçu</h4>
        <div className="flex items-center justify-center h-20 bg-white rounded border">
          <div
            className="rounded-full"
            style={{
              width: brushSize,
              height: brushSize,
              backgroundColor: color,
              boxShadow: '0 0 0 1px rgba(0,0,0,0.1)'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;