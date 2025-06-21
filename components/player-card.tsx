// components/player-card.tsx
"use client";

import Image from "next/image";
import React from "react";
import Profile from "@/assets/profile.png";
import { Player } from "@/types/player.type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface PlayerCardProps {
  player: Player;
  onRemove?: () => void;
}

const PlayerCard = ({ player, onRemove }: PlayerCardProps) => {
  return (
    <Card className="w-full shadow-sm border rounded-2xl">
      <CardHeader className="flex flex-row items-center gap-4">
        <Image
          src={Profile}
          alt="profile"
          width={50}
          height={50}
          className="rounded-full object-cover"
        />
        <div>
          <CardTitle className="text-lg font-semibold">
            {player.first_name} {player.last_name}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Position: {player.position || "N/A"}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="grid gap-1 text-sm text-gray-600">
        <p>
          <span className="font-medium">Age:</span>{" "}
          {player.age?.match(/\d+\syears/)?.[0] || "N/A"}
        </p>
        <p>
          <span className="font-medium">Birth Date:</span>{" "}
          {format(new Date(player.birth_date), "MMM d, yyyy")}
        </p>
        <p>
          <span className="font-medium">Height:</span> {player.height || "N/A"}{" "}
          cm
        </p>
        <p>
          <span className="font-medium">Weight:</span> {player.weight || "N/A"}{" "}
          kg
        </p>

        {onRemove && (
          <Button
            variant="outline"
            className="mt-3 text-red-500 w-full"
            onClick={onRemove}
          >
            Remove from Squad
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PlayerCard;
