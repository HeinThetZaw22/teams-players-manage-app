"use client";

import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { addPlayerToTeam, removePlayerFromTeam } from "@/state/teamSlice";
import { useGetPlayers } from "@/query/player.query";
import PlayerCard from "@/components/player-card";
import { Player } from "@/types/player.type";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { ChevronLeft } from "lucide-react";
import Container from "@/components/container";

const TeamDetailPage = () => {
  const { teamId } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>("");

  const teams = useAppSelector((state) => state.teams.teams);
  const team = teams.find((t) => t.id === teamId);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetPlayers();

  if (!team) return <p className="p-4">Team not found.</p>;
  if (isLoading) return <Loader />;

  const allPlayers: Player[] = data?.pages.flatMap((page) => page.data) || [];

  const teamPlayers = allPlayers.filter((p) => team.playerIds.includes(p.id));

  const allAssigned = new Set(teams.flatMap((t) => t.playerIds));
  const unassignedPlayers = allPlayers.filter((p) => !allAssigned.has(p.id));

  const handleAddPlayer = () => {
    const pid = Number(selectedPlayerId);
    if (!pid) return toast.error("Please select a player");

    dispatch(addPlayerToTeam({ teamId: team.id, playerId: pid }));
    toast.success("Player added!");
    setSelectedPlayerId("");
  };

  return (
    <Container>
      <div className="flex items-center my-5 gap-2">
        <span
          onClick={() => router.back()}
          className=" cursor-pointer hover:bg-gray-100 rounded-sm"
        >
          <ChevronLeft />
        </span>
        <h1 className="text-2xl font-semibold">{team.name} - Players</h1>
      </div>

      {/* Dropdown to Select Player */}
      <div className="sm:max-w-md flex items-center gap-3 mb-5">
        <Select value={selectedPlayerId} onValueChange={setSelectedPlayerId}>
          <SelectTrigger>
            <SelectValue placeholder="Select a player to add" />
          </SelectTrigger>
          <SelectContent>
            {unassignedPlayers.map((player) => (
              <SelectItem key={player.id} value={String(player.id)}>
                {player.first_name} {player.last_name} ({player.position})
              </SelectItem>
            ))}
            {hasNextPage && (
              <div className="p-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-muted-foreground"
                  onClick={(e) => {
                    e.preventDefault();
                    fetchNextPage();
                  }}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? "Loading..." : "Load more"}
                </Button>
              </div>
            )}
          </SelectContent>
        </Select>
        <Button onClick={handleAddPlayer}>Add Player</Button>
      </div>

      <h1 className="text-md mb-3 font-medium">
        Total squad members - {teamPlayers.length}
      </h1>

      {/* Selected Players List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {teamPlayers.length > 0 ? (
          teamPlayers.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onRemove={() => {
                dispatch(
                  removePlayerFromTeam({ teamId: team.id, playerId: player.id })
                );
                toast.success("Removed successfully");
              }}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center pt-10">
            No players added to this team yet.
          </p>
        )}
      </div>
    </Container>
  );
};

export default TeamDetailPage;
