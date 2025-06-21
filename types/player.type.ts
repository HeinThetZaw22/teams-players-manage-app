export interface Player {
  id: number;
  name: string;
  age: string;
  birth_date: string;
  first_name: string;
  last_name: string;
  position: string;
  height: string;
  weight: string;
  team: Team;
}

export interface Team {
  id: number;
  name: string;
  player_count: number;
  region: string;
  country: string;
}

export interface PlayerResponse {
  data: Player[];
  meta: {
    prev_cursor: string | null;
    next_cursor: string | null;
    per_page: number;
  };
}
