export class Drawing {
  constructor(id, data, timestamp = new Date().toISOString()) {
    this.id = id;
    this.data = data; // { x, y, color, type, etc. }
    this.timestamp = timestamp;
  }

  toJSON() {
    return {
      id: this.id,
      data: this.data,
      timestamp: this.timestamp
    };
  }

  // Méthode statique pour créer une instance
  static create(data) {
    return new Drawing(Date.now().toString(), data);
  }

  // Validation des données de dessin
  static validate(data) {
    const required = ['x', 'y'];
    return required.every(field => field in data);
  }
}

export default Drawing;