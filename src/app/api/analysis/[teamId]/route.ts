import { supabase } from "@/lib/supabase";
import { FeatureArrays } from "@/lib/training";
import { NextResponse } from "next/server";
import * as ss from "simple-statistics";
import { ReturnObj } from "../../types";

async function fetchData(TEAM: string) {
  // returns an array of objects
  const { data, error } = await supabase.from(TEAM).select("*");
  if (data) {
    return data;
  } else {
    console.log(error);
  }
}

// scrapes data of all current games this season
const HTMLParser = require("node-html-parser");
async function parseJSON(team: String) {
  const response = await fetch(
    `https://www.basketball-reference.com/teams/${team}/2024/gamelog/`
  );
  const text = await response.text();

  const html = HTMLParser.parse(text);
  return html;
}

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
