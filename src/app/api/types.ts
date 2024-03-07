export interface Analysis {
  mean: number;
  median: number;
  mode: number;
}

export interface ReturnObj {
  game_season?: Analysis;
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
