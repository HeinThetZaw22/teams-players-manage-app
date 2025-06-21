import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchPlayers, fetchPlayerById } from "@/service/player.service";
import toast from "react-hot-toast";
import { PlayerResponse } from "@/types/player.type";

export const useGetPlayers = (perPage = 10) => {
  return useInfiniteQuery<
    PlayerResponse,
    Error,
    { pages: PlayerResponse[]; pageParams: (string | null)[] },
    ["players"],
    string | null
  >({
    queryKey: ["players"],
    queryFn: ({ pageParam }) =>
      fetchPlayers(pageParam as string | null, perPage),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.meta?.next_cursor ?? undefined,
    refetchOnWindowFocus: false,
    retry: (failureCount, error: any) => {
      if (error?.isRateLimit) return false;
      return failureCount < 3;
    },
  });
};

export const useGetPlayer = (id: number) => {
  return useQuery({
    queryKey: ["player", id],
    queryFn: () => fetchPlayerById(id),
    enabled: !!id,
  });
};
