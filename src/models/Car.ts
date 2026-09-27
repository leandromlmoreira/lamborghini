export type Car = {
  id: number;
  carName: string;
  releaseYear: number;
  price: string;
};

export type CarsResponse = {
  cars: Car[];
};

export function carImageUri(id: number): string {
  return `https://digitalinnovationone.github.io/fake-data-api-lamborghini/assets/${id}.png`;
}
