export {};

declare global {
  interface Date {
    getDayName(): string;
    getMonthName(): string;
  }
}

Date.prototype.getDayName = function () {
  const days = [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ];
  return days[this.getDay()];
};

Date.prototype.getMonthName = function () {
  const months = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ];
  return months[this.getMonth()];
};
