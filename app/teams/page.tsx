"use client";
import Container from "@/components/container";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { TeamCreateDialog } from "./_components/team-create-dialog";
import { useAppSelector } from "../redux";
import { TeamCard } from "./_components/team-card";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const TeamPage = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const teams = useAppSelector((state) => state.teams.teams);
  console.log("teams", teams);
  return (
    <Container>
      <div className=" flex py-5 justify-between items-center">
        <div className="flex items-center gap-2">
          <span
            onClick={() => router.push("/")}
            className=" cursor-pointer hover:bg-gray-100 rounded-sm"
          >
            <ChevronLeft />
          </span>
          <Header label="Teams" />
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)}>Create Team</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Create a New Team</DialogTitle>
            <TeamCreateDialog onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
        {teams.length === 0 && (
          <div className="pt-40 col-span-1 md:col-span-2 lg:col-span-3 p-4 text-center text-gray-500">
            No teams found. Create a new team to get started!
          </div>
        )}
      </div>
    </Container>
  );
};

export default TeamPage;
