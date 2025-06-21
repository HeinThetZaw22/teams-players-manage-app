// components/player-card-skeleton.tsx
"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PlayerCardSkeleton = () => {
  return (
    <Card className="w-full shadow-sm border rounded-2xl">
      <CardHeader className="flex flex-row items-center gap-4">
        <Skeleton className="w-[50px] h-[50px] rounded-full" />
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="w-3/4 h-4" />
          <Skeleton className="w-1/2 h-3" />
        </div>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Skeleton className="w-2/3 h-3" />
        <Skeleton className="w-1/2 h-3" />
        <Skeleton className="w-1/3 h-3" />
        <Skeleton className="w-1/2 h-3" />
        <Skeleton className="w-1/3 h-3" />
      </CardContent>
    </Card>
  );
};

export default PlayerCardSkeleton;
