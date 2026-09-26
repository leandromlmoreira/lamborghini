export type Car = {
  id: number;
  carName: string;
  releaseYear: number;
  price: string;
};

export type CarsResponse = {
  cars: Car[];
};

/** Monta a URL da imagem do carro a partir do id (1.png, 2.png, ...). */
export function carImageUri(id: number): string {
  return `https://digitalinnovationone.github.io/fake-data-api-lamborghini/assets/${id}.png`;
}
