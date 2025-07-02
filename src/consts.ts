import Land from './land';

export const lands = [
  new Land('Nuvarkel', [1, 2, 5], 40),
  new Land('Zonthéria', [0, 3, 6], 40),
  new Land('Ulquassor', [0, 7, 8], 40),
  new Land('Pemdravax', [1, 4, 9], 40),
  new Land('Liranjou', [3, 11, 17], 40),
  new Land('Tobrekian', [0, 6, 10], 40),
  new Land('Azondiël', [1, 5, 12], 40),
  new Land('Flegmorah', [2, 8, 15], 40),
  new Land('Cadrivèze', [2, 7, 13], 40),
  new Land('Yurbaqan', [3, 18, 16], 40),
  new Land('Mifrolyn', [5, 11, 18], 40),
  new Land('Keuzéria', [4, 10, 17], 40),
  new Land('Ombrixane', [6, 14, 17], 40),
  new Land('Dourmavèk', [8, 15, 19], 40),
  new Land('Zélanquo', [12, 15, 17], 40),
  new Land('Grivénatch', [7, 13, 14], 40),
  new Land('Reknubral', [9, 18, 19], 40),
  new Land('Chamoutréa', [4, 11, 12, 14], 40),
  new Land('Velgatrod', [9, 10, 16], 40),
  new Land('Épounazi', [13, 16], 40),
];

export const rarities = [
  'Commun',
  'Peu Commun',
  'Rare',
  'Épique',
  'Légendaire',
  'Mythique',
  'Secret',
];

export * as consts from './consts';
