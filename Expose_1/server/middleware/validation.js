// Validation des données de dessin
export const validateDrawingData = (req, res, next) => {
  const { x, y, color, type } = req.body;

  if (typeof x !== 'number' || typeof y !== 'number') {
    return res.status(400).json({ error: 'Coordonnées x et y requises et doivent être des nombres' });
  }

  if (color && typeof color !== 'string') {
    return res.status(400).json({ error: 'La couleur doit être une chaîne de caractères' });
  }

  if (type && !['start', 'draw', 'end'].includes(type)) {
    return res.status(400).json({ error: 'Type de dessin invalide' });
  }

  next();
};

// Validation des messages WebSocket
export const validateWebSocketMessage = (message) => {
  const required = ['type', 'x', 'y'];
  return required.every(field => field in message);
};

// Middleware de logging
export const requestLogger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
};

// Middleware de gestion des erreurs async
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};