class Land {
  id: number;
  name: string;
  destinations: number[];

  constructor(id: number, name: string, destinations: Array<number>) {
    this.id = id;
    this.name = name;
    this.destinations = destinations;
  }

  static lands = [
    new Land(1, 'Nuvarkel', [2, 3, 6]),
    new Land(2, 'Zonthéria', [1, 4, 7]),
    new Land(3, 'Ulquassor', [1, 8, 9]),
    new Land(4, 'Pemdravax', [2, 5, 10]),
    new Land(5, 'Liranjou', [4, 12, 18]),
    new Land(6, 'Tobrekian', [1, 7, 11]),
    new Land(7, 'Azondiël', [2, 6, 13]),
    new Land(8, 'Flegmorah', [3, 9, 16]),
    new Land(9, 'Cadrivèze', [3, 8, 14]),
    new Land(10, 'Yurbaqan', [4, 19, 17]),
    new Land(11, 'Mifrolyn', [6, 12, 19]),
    new Land(12, 'Keuzéria', [5, 11, 18]),
    new Land(13, 'Ombrixane', [7, 15, 18]),
    new Land(14, 'Dourmavèk', [9, 16, 20]),
    new Land(15, 'Zélanquo', [13, 16, 18]),
    new Land(16, 'Grivénatch', [8, 14, 15]),
    new Land(17, 'Reknubral', [10, 19, 20]),
    new Land(18, 'Chamoutréa', [5, 12, 13, 15]),
    new Land(19, 'Velgatrod', [10, 11, 17]),
    new Land(20, 'Épounazi', [14, 17]),
  ];

  equals(other: Land) {
    return (
      this.id === other.id &&
      this.name === other.name &&
      this.destinations === other.destinations
    );
  }
}

export default Land;
