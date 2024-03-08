export interface Analysis {
  mean: number;
  median: number;
  mode: number;
}

export interface ReturnObj {
  game_location?: Analysis;
  opp_id?: Analysis;
  game_result?: Analysis;
  pts?: Analysis;
  opp_pts?: Analysis;
  fg?: Analysis;
  fga?: Analysis;
  fg_pct?: Analysis;
  fg3?: Analysis;
  fg3a?: Analysis;
  fg3_pct?: Analysis;
  ft?: Analysis;
  fta?: Analysis;
  ft_pct?: Analysis;
  orb?: Analysis;
  trb?: Analysis;
  ast?: Analysis;
  stl?: Analysis;
  blk?: Analysis;
  tov?: Analysis;
  pf?: Analysis;
}

export interface GameData {
  game_season: string;
  date_game: string;
  game_location: string;
  opp_id: string;
  game_result: string;
  pts: number;
  opp_pts: number;
  fg: number;
  fga: number;
  fg_pct: number;
  fg3: number;
  fg3a: number;
  fg3_pct: number;
  ft: number;
  fta: number;
  ft_pct: number;
  orb: number;
  trb: number;
  ast: number;
  stl: number;
  blk: number;
  tov: number;
  pf: number;
}
