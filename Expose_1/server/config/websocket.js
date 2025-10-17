import { WebSocketServer, WebSocket } from 'ws';

// Stockage des clients connectés
const clients = new Set();

export default function setupWebSocket(server) {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    console.log('🔗 Nouveau client connecté');
    clients.add(ws);

    // Gestion des messages
    ws.on('message', (data) => {
      try {
        const message = JSON.parse(data);
        handleWebSocketMessage(ws, message);
      } catch (error) {
        console.error('❌ Erreur parsing message:', error);
        ws.send(JSON.stringify({ type: 'error', message: 'Format de message invalide' }));
      }
    });

    // Gestion de la déconnexion
    ws.on('close', () => {
      console.log('🔌 Client déconnecté');
      clients.delete(ws);
      broadcastUserCount();
    });

    // Gestion des erreurs
    ws.on('error', (error) => {
      console.error('💥 Erreur WebSocket:', error);
    });

    // Envoi du nombre d'utilisateurs connectés
    broadcastUserCount();
  });

  return wss;
}

function handleWebSocketMessage(ws, message) {
  switch (message.type) {
    case 'drawing':
      // Broadcast du dessin à tous les autres clients
      broadcastToOthers(ws, message);
      break;
    case 'clear':
      // Broadcast de l'effacement du canvas
      broadcastToAll(message);
      break;
    case 'chat':
      // Broadcast d'un message de chat
      broadcastToAll(message);
      break;
    default:
      console.log('📨 Message type inconnu:', message.type);
      ws.send(JSON.stringify({ type: 'error', message: 'Type de message non supporté' }));
  }
}

function broadcastToOthers(sender, message) {
  clients.forEach((client) => {
    if (client !== sender && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

function broadcastToAll(message) {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

function broadcastUserCount() {
  const userCount = clients.size;
  const message = {
    type: 'userCount',
    count: userCount
  };
  broadcastToAll(message);
}

// Export des fonctions pour les tests ou autres utilisations
export { broadcastToAll, broadcastToOthers, broadcastUserCount };