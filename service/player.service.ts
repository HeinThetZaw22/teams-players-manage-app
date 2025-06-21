import { apiClient } from "./apiClient";

export const fetchPlayers = async (cursor: string | null, perPage = 10) => {
  try {
    const res = await apiClient.get("/players", {
      params: { season: 2024, cursor: cursor || undefined, per_page: perPage },
    });
    return res.data;
  } catch (error: any) {
    if (error.response?.status === 429) {
      const err = new Error("Rate limit exceeded. Please try again later.");
      (err as any).isRateLimit = true;
      throw err;
    }
    throw error;
  }
};

export const fetchPlayerById = async (id: number) => {
  const res = await apiClient.get(`/players/${id}`);
  return res.data;
};
