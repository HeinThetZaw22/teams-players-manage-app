// src/state/teamSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface Team {
  id: string;
  name: string;
  playerIds: number[];
  region: string;
  country: string;
}

interface TeamState {
  teams: Team[];
}

const initialState: TeamState = {
  teams: [],
};

const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    createTeam: (
      state,
      action: PayloadAction<{
        name: string;
        region: string;
        country: string;
      }>
    ) => {
      // Enforce unique name
      if (state.teams.find((team) => team.name === action.payload.name)) return;
      state.teams.push({
        id: uuidv4(),
        name: action.payload.name,
        region: action.payload.region,
        country: action.payload.country,
        playerIds: [],
      });
    },
    updateTeam: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        region: string;
        country: string;
      }>
    ) => {
      const team = state.teams.find((t) => t.id === action.payload.id);
      if (team) {
        team.name = action.payload.name;
        team.region = action.payload.region;
        team.country = action.payload.country;
      }
    },
    deleteTeam: (state, action: PayloadAction<string>) => {
      state.teams = state.teams.filter((t) => t.id !== action.payload);
    },
    addPlayerToTeam: (
      state,
      action: PayloadAction<{ teamId: string; playerId: number }>
    ) => {
      // Remove player from other teams
      state.teams.forEach((team) => {
        team.playerIds = team.playerIds.filter(
          (id) => id !== action.payload.playerId
        );
      });

      const team = state.teams.find((t) => t.id === action.payload.teamId);
      if (team && !team.playerIds.includes(action.payload.playerId)) {
        team.playerIds.push(action.payload.playerId);
      }
    },
    removePlayerFromTeam: (
      state,
      action: PayloadAction<{ teamId: string; playerId: number }>
    ) => {
      const team = state.teams.find((t) => t.id === action.payload.teamId);
      if (team) {
        team.playerIds = team.playerIds.filter(
          (id) => id !== action.payload.playerId
        );
      }
    },
  },
});

export const {
  createTeam,
  updateTeam,
  deleteTeam,
  addPlayerToTeam,
  removePlayerFromTeam,
} = teamSlice.actions;

export default teamSlice.reducer;
