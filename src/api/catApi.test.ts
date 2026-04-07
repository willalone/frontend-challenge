import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchCats } from './catApi';

describe('fetchCats', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches cats from the API', async () => {
    const mockCats = [
      { id: '1', url: 'https://example.com/1.jpg', width: 400, height: 300 },
    ];

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockCats),
    }));

    const result = await fetchCats(0);
    expect(result).toEqual(mockCats);
    expect(fetch).toHaveBeenCalledWith(
      'https://api.thecatapi.com/v1/images/search?limit=15&page=0&order=ASC'
    );
  });

  it('throws on non-ok response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    }));

    await expect(fetchCats(0)).rejects.toThrow('Failed to fetch cats: 500');
  });

  it('passes custom limit', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    }));

    await fetchCats(1, 10);
    expect(fetch).toHaveBeenCalledWith(
      'https://api.thecatapi.com/v1/images/search?limit=10&page=1&order=ASC'
    );
  });
});
