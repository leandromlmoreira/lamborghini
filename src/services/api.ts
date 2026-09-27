import axios from "axios";
import type { CarsResponse } from "../models/Car";

const API_URL =
  "https://digitalinnovationone.github.io/fake-data-api-lamborghini/api/lamborghini.json";

const api = axios.create({ baseURL: API_URL, timeout: 12000 });

export async function fetchCars() {
  const response = await api.get<CarsResponse>("");
  return response.data.cars;
}
