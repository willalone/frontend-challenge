import type { CatImage } from '../types';

const API_BASE = 'https://api.thecatapi.com/v1';

export async function fetchCats(page: number, limit = 15): Promise<CatImage[]> {
  const response = await fetch(
    `${API_BASE}/images/search?limit=${limit}&page=${page}&order=ASC`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch cats: ${response.status}`);
  }

  return response.json();
}
