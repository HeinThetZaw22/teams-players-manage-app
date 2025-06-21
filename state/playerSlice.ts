// src/state/playerSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Player {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  team: {
    full_name: string;
  };
}

interface PlayerState {
  players: Player[];
  page: number;
  hasMore: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: PlayerState = {
  players: [],
  page: 1,
  hasMore: true,
  loading: false,
  error: null,
};

// Async thunk to fetch players
export const fetchPlayers = createAsyncThunk(
  "players/fetchPlayers",
  async (page: number, thunkAPI) => {
    const res = await fetch(
      `https://www.balldontlie.io/api/v1/players?page=${page}&per_page=10`
    );
    const data = await res.json();
    return data;
  }
);

const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    resetPlayers: (state) => {
      state.players = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.loading = false;
        state.players.push(...action.payload.data);
        state.page += 1;
        state.hasMore = action.payload.meta.next_page !== null;
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch players.";
      });
  },
});

export const { resetPlayers } = playerSlice.actions;
export default playerSlice.reducer;
