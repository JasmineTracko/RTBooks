export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const editions = [
  "Mondadori",
  "Rizzoli",
  "Sonzogno",
  "Giunti Editore",
  "TEA",
  "Einaudi",
  "Feltrinelli",
  "Garzanti",
  "Newton Compton",
  "Salani",
];

export function getRandomEdition() {
  const randomIndex = Math.floor(Math.random() * editions.length);
  return editions[randomIndex];
}

const genres = [
  "Horror",
  "Thriller",
  "Avventura",
  "Fantasy",
  "Fantascienza",
  "Storico",
  "Narrativa",
];

export function getRandomGenre() {
  const randomIndex = Math.floor(Math.random() * genres.length);
  return genres[randomIndex];
}
