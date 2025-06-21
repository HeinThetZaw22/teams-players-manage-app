"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Team } from "@/state/teamSlice";
import { Pencil, Settings, Trash2 } from "lucide-react";
import { useAppDispatch } from "@/app/redux";
import { deleteTeam } from "@/state/teamSlice";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ConfirmModal } from "@/components/modal/confirm-modal";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { TeamEditDialog } from "./team-edit-dialog";
import { useRouter } from "next/navigation";

interface TeamCardProps {
  team: Team;
  onEdit?: (team: Team) => void;
}

export const TeamCard = ({ team, onEdit }: TeamCardProps) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleDelete = () => {
    dispatch(deleteTeam(team.id));
    toast.success("Team deleted successfully!");
  };

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>{team.name}</CardTitle>
        <div className="flex gap-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="text-muted-foreground hover:text-primary"
              >
                <Pencil className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Edit Team</DialogTitle>
              <TeamEditDialog team={team} onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>

          <ConfirmModal onConfirm={handleDelete}>
            <Button
              size="icon"
              variant="ghost"
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </ConfirmModal>
        </div>
      </CardHeader>
      <CardContent className="space-y-1 text-sm text-gray-600">
        <p>
          <span className="font-medium">Region:</span> {team.region}
        </p>
        <p>
          <span className="font-medium">Country:</span> {team.country}
        </p>
        <p>
          <span className="font-medium">Players:</span> {team.playerIds.length}
        </p>
      </CardContent>
      <CardFooter className=" flex justify-end">
        <Button
          onClick={() => router.push(`/teams/${team.id}`)}
          variant={"outline"}
          size={"sm"}
        >
          Manage
        </Button>
      </CardFooter>
    </Card>
  );
};
