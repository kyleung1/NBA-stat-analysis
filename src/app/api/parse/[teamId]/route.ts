import { NextResponse } from "next/server";
import { HTMLElement } from "../route";
import { parseJSON } from "@/functions/helpers";

export async function GET(request: Request) {
  // gets the latest game log of the current season
  const url = request.url;
  const splitUrl = url.split("/");
  const TEAM = splitUrl[splitUrl.length - 1].toLowerCase();
  const ROOT = await parseJSON(TEAM);
  const CELLS: HTMLElement[] = ROOT.querySelectorAll("td");
  let game_season = 0;
  let date_game = "";
  let game_location = "_";
  let opp_id = "";
  let game_result = "";
  let pts = 0;
  let opp_pts = 0;
  let fg = 0;
  let fga = 0;
  let fg_pct = 0.0;
  let fg3 = 0;
  let fg3a = 0;
  let fg3_pct = 0.0;
  let ft = 0;
  let fta = 0;
  let ft_pct = 0.0;
  let orb = 0;
  let trb = 0;
  let ast = 0;
  let stl = 0;
  let blk = 0;
  let tov = 0;
  let pf = 0;
  const allGamesList = [];
  for (const element of CELLS) {
    if (element.rawAttrs.includes('data-stat="game_season"')) {
      game_season = parseInt(element.innerText);
    } else if (element.rawAttrs.includes('data-stat="date_game"')) {
      date_game = element.innerText;
    } else if (element.rawAttrs.includes('data-stat="game_location"')) {
      if (element.innerText) game_location = element.innerText;
    } else if (element.rawAttrs.includes('data-stat="opp_id"')) {
      opp_id = element.innerText;
    } else if (element.rawAttrs.includes('data-stat="game_result"')) {
      game_result = element.innerText;
    } else if (element.rawAttrs.includes('data-stat="pts"')) {
      pts = parseInt(element.innerText);
    } else if (element.rawAttrs.includes('data-stat="opp_pts"')) {
      opp_pts = parseInt(element.innerText);
    } else if (element.rawAttrs.includes('data-stat="fg"')) {
      fg = parseInt(element.innerText);
    } else if (element.rawAttrs.includes('data-stat="fga"')) {
      fga = parseInt(element.innerText);
    } else if (element.rawAttrs.includes('data-stat="fg_pct"')) {
      fg_pct = parseFloat(element.innerText);
    } else if (element.rawAttrs.includes('data-stat="fg3"')) {
      fg3 = parseInt(element.innerText);
    } else if (element.rawAttrs.includes('data-stat="fg3a"')) {
      fg3a = parseInt(element.innerText);
    } else if (element.rawAttrs.includes('data-stat="fg3_pct"')) {
      fg3_pct = parseFloat(element.innerText);
    } else if (element.rawAttrs.includes('data-stat="ft"')) {
      ft = parseInt(element.innerText);
    } else if (element.rawAttrs.includes('data-stat="fta"')) {
      fta = parseInt(element.innerText);
    } else if (element.rawAttrs.includes('data-stat="ft_pct"')) {
      ft_pct = parseFloat(element.innerText);
    } else if (element.rawAttrs.includes('data-stat="orb"')) {
      orb = parseInt(element.innerText);
    } else if (element.rawAttrs.includes('data-stat="trb"')) {
      trb = parseInt(element.innerText);
    } else if (element.rawAttrs.includes('data-stat="ast"')) {
      ast = parseInt(element.innerText);
    } else if (element.rawAttrs.includes('data-stat="stl"')) {
      stl = parseInt(element.innerText);
    } else if (element.rawAttrs.includes('data-stat="blk"')) {
      blk = parseInt(element.innerText);
    } else if (element.rawAttrs.includes('data-stat="tov"')) {
      tov = parseInt(element.innerText);
    } else if (element.rawAttrs.includes('data-stat="pf"')) {
      pf = parseInt(element.innerText);
    }

    if (
      game_season &&
      date_game &&
      game_location &&
      opp_id &&
      game_result &&
      pts &&
      opp_pts &&
      fg &&
      fga &&
      fg_pct &&
      fg3 &&
      fg3a &&
      fg3_pct &&
      ft &&
      fta &&
      ft_pct &&
      orb >= 0 &&
      trb &&
      ast &&
      stl &&
      blk >= 0 &&
      tov &&
      pf
    ) {
      allGamesList.push({
        game_season: game_season,
        date_game: date_game,
        game_location: game_location,
        opp_id: opp_id,
        game_result: game_result,
        pts: pts,
        opp_pts: opp_pts,
        fg: fg,
        fga: fga,
        fg_pct: fg_pct,
        fg3: fg3,
        fg3a: fg3a,
        fg3_pct: fg3_pct,
        ft: ft,
        fta: fta,
        ft_pct: ft_pct,
        orb: orb,
        trb: trb,
        ast: ast,
        stl: stl,
        blk: blk,
        tov: tov,
        pf: pf,
      });
      // reset everything for next game entry
      game_season = 0;
      date_game = "";
      game_location = "_";
      opp_id = "";
      game_result = "";
      pts = 0;
      opp_pts = 0;
      fg = 0;
      fga = 0;
      fg_pct = 0.0;
      fg3 = 0;
      fg3a = 0;
      fg3_pct = 0.0;
      ft = 0;
      fta = 0;
      ft_pct = 0.0;
      orb = 0;
      trb = 0;
      ast = 0;
      stl = 0;
      blk = 0;
      tov = 0;
      pf = 0;
    }
  }

  return NextResponse.json(allGamesList);
}
