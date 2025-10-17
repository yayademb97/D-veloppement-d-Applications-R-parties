// Fonctions utilitaires diverses

// Génération d'ID unique
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Formatage de la date
export const formatDate = (date = new Date()) => {
  return date.toISOString();
};

// Validation d'email (si besoin plus tard)
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Retard artificiel pour le développement
export const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Export par défaut de toutes les fonctions utilitaires
export default {
  generateId,
  formatDate,
  isValidEmail,
  delay
};