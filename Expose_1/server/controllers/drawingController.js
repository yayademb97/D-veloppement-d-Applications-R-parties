// Pour gérer les fonctionnalités avancées (sauvegarde, historique, etc.)
class DrawingController {
  constructor() {
    this.drawings = []; // Stockage en mémoire (remplacer par BDD en production)
  }

  // Sauvegarder un dessin
  saveDrawing(drawingData) {
    const drawing = {
      id: Date.now().toString(),
      data: drawingData,
      timestamp: new Date().toISOString()
    };
    
    this.drawings.push(drawing);
    return drawing;
  }

  // Récupérer l'historique des dessins
  getDrawings() {
    return this.drawings;
  }

  // Récupérer un dessin par ID
  getDrawingById(id) {
    return this.drawings.find(drawing => drawing.id === id);
  }

  // Effacer tous les dessins
  clearDrawings() {
    this.drawings = [];
    return { message: 'Tous les dessins ont été effacés', count: 0 };
  }

  // Obtenir les statistiques
  getStats() {
    return {
      totalDrawings: this.drawings.length,
      lastDrawing: this.drawings[this.drawings.length - 1]?.timestamp || null
    };
  }
}

// Export d'une instance unique (Singleton)
const drawingController = new DrawingController();
export default drawingController;