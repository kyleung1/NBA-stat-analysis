import { FeatureArrays } from "@/lib/training";
import { NextResponse } from "next/server";
import * as ss from "simple-statistics";
import { ReturnObj } from "../../types";
import { fetchData } from "@/functions/helpers";

export async function GET(request: Request) {
  const url = request.url;
  const splitUrl = url.split("/");
  const TEAM = splitUrl[splitUrl.length - 1].toLowerCase();

  let returnObj: ReturnObj = {};

  let featureArrays: FeatureArrays = {
    // game_season: [],
    // game_location: [],
    // opp_id: [],
    // game_result: [],
    pts: [],
    opp_pts: [],
    fg: [],
    fga: [],
    fg_pct: [],
    fg3: [],
    fg3a: [],
    fg3_pct: [],
    ft: [],
    fta: [],
    ft_pct: [],
    orb: [],
    trb: [],
    ast: [],
    stl: [],
    blk: [],
    tov: [],
    pf: [],
  };

  // organize data into their categories (featureArrays)
  const data = await fetchData(TEAM);
  if (data) {
    for (const game of data) {
      for (const [key, value] of Object.entries(game)) {
        if (key in featureArrays) {
          (featureArrays[key as keyof FeatureArrays] as any[]).push(value);
        }
      }
    }
  }

  for (const [key, value] of Object.entries(featureArrays)) {
    returnObj[key as keyof ReturnObj] = {
      mean: ss.mean(value),
      median: ss.median(value),
      mode: ss.mode(value),
    };
  }

  return NextResponse.json(returnObj);
}
