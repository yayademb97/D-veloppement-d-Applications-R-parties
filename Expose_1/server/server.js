import express from 'express';
import http from 'http';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Import des configurations
import setupWebSocket from './config/websocket.js';
import apiRoutes from './routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);

// Middlewares globaux
app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

// Routes
app.use('/api', apiRoutes);

// Route santé
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Serveur en fonctionnement' });
});

// Configuration WebSocket
setupWebSocket(server);

// ✅ CORRECTION : Middleware pour les routes non trouvées (APRÈS toutes les routes)
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Route non trouvée' 
  });
});

// Gestion des erreurs globales
app.use((error, req, res, next) => {
  console.error('Erreur:', error);
  res.status(500).json({ 
    success: false,
    error: 'Erreur interne du serveur' 
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port: http://localhost:${PORT}`);
});