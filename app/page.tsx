"use client";

import { useGetPlayers } from "@/query/player.query";
import { Player } from "@/types/player.type";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Navbar from "@/components/navbar";
import Container from "@/components/container";
import PlayerCard from "@/components/player-card";
import Loader from "@/components/loader";
import toast from "react-hot-toast";
import { useAppSelector } from "./redux";
import { useRouter } from "next/navigation";
import PlayerCardSkeleton from "@/components/player-card-skeleton";
import { Header } from "@/components/header";

function isRateLimitError(
  error: unknown
): error is Error & { isRateLimit: boolean } {
  return typeof error === "object" && error !== null && "isRateLimit" in error;
}

const HomePage = () => {
  const [rateLimited, setRateLimited] = useState(false);
  const router = useRouter();
  const { username } = useAppSelector((state) => state.auth);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
    error,
  } = useGetPlayers();

  useEffect(() => {
    if (username === null) {
      router.replace("/login");
    }
  }, [username, router]);

  useEffect(() => {
    if (isError) {
      console.error("Error fetching players:", error);
      if (isRateLimitError(error)) {
        toast.error(error.message);
        setRateLimited(true);
        setTimeout(() => setRateLimited(false), 30000);
      } else {
        toast.error("Failed to load players: " + error.message);
      }
    }
  }, [isError, error]);

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !rateLimited) {
      fetchNextPage().catch((error) => {
        if (error?.isRateLimit) {
          setRateLimited(true);
          setTimeout(() => setRateLimited(false), 30000);
        }
      });
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, rateLimited]);

  return (
    <div>
      <Navbar />
      <Container>
        <Header label="All Player Lists" />
        {isLoading ? (
          <div className="py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <PlayerCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {data?.pages.map((page) =>
              page.data.map((player: Player) => (
                <PlayerCard key={player.id} player={player} />
              ))
            )}
          </div>
        )}

        <div ref={ref} className="h-10" />

        {isFetchingNextPage && (
          <div className="text-center pb-5 text-sm text-gray-500">
            <Loader />
          </div>
        )}

        {!hasNextPage && !isLoading && (
          <p className="text-center text-sm text-gray-500 py-4">
            No more players
          </p>
        )}

        {isError && !isLoading && !isFetchingNextPage && !rateLimited && (
          <p className="text-center text-sm text-red-500 py-4">
            {error?.message || "Something went wrong."}
          </p>
        )}

        {rateLimited && (
          <p className="text-center text-sm text-red-500 py-4">
            You’ve hit the rate limit. Please wait and try again.
          </p>
        )}
      </Container>
    </div>
  );
};

export default HomePage;
