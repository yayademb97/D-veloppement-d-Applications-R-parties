import express from 'express';
import drawingController from '../controllers/drawingController.js';
import { validateDrawingData, requestLogger } from '../middleware/validation.js';

const router = express.Router(); // ✅ Utilise le routeur d'Express

// Appliquer le logging à toutes les routes
router.use(requestLogger);

// Routes pour la gestion des dessins
router.get('/drawings', (req, res) => {
  const drawings = drawingController.getDrawings();
  res.json({
    success: true,
    data: drawings,
    count: drawings.length
  });
});

router.post('/drawings', validateDrawingData, (req, res) => {
  const drawing = drawingController.saveDrawing(req.body);
  res.status(201).json({
    success: true,
    data: drawing,
    message: 'Dessin sauvegardé avec succès'
  });
});

router.get('/drawings/stats', (req, res) => {
  const stats = drawingController.getStats();
  res.json({
    success: true,
    data: stats
  });
});

router.delete('/drawings', (req, res) => {
  const result = drawingController.clearDrawings();
  res.json({
    success: true,
    data: result
  });
});

// ✅ CORRECTION : Supprimez complètement la route avec '*'
// Ne mettez PAS de route catch-all dans le routeur

export default router;