import { Dispatch, SetStateAction } from "react";
import { supabase } from "@/lib/supabase";

export function getTeamNameFull(
  team: string,
  setTN: Dispatch<SetStateAction<string>>
) {
  if (team === "atl") {
    setTN("Atlanta Hawks");
  } else if (team === "bos") {
    setTN("Boston Celtics");
  } else if (team === "brk") {
    setTN("Brooklyn Nets");
  } else if (team === "chi") {
    setTN("Chicago Bulls");
  } else if (team === "cho") {
    setTN("Charlotte Hornets");
  } else if (team === "cle") {
    setTN("Cleveland Cavaliers");
  } else if (team === "dal") {
    setTN("Dallas Mavericks");
  } else if (team === "den") {
    setTN("Denver Nuggets");
  } else if (team === "det") {
    setTN("Detroit Pistons");
  } else if (team === "gsw") {
    setTN("Golden State Warriors");
  } else if (team === "hou") {
    setTN("Houston Rockets");
  } else if (team === "ind") {
    setTN("Indiana Pacers");
  } else if (team === "lac") {
    setTN("Los Angeles Clippers");
  } else if (team === "lal") {
    setTN("Los Angeles Lakers");
  } else if (team === "mem") {
    setTN("Memphis Grizzlies");
  } else if (team === "mia") {
    setTN("Miami Heat");
  } else if (team === "mil") {
    setTN("Milwaukee Bucks");
  } else if (team === "min") {
    setTN("Minnesota Timberwolves");
  } else if (team === "nop") {
    setTN("New Orleans Pelicans");
  } else if (team === "nyk") {
    setTN("New York Knicks");
  } else if (team === "okc") {
    setTN("Oklahoma City Thunder");
  } else if (team === "orl") {
    setTN("Orlando Magic");
  } else if (team === "phi") {
    setTN("Philadelphia 76ers");
  } else if (team === "pho") {
    setTN("Phoenix Suns");
  } else if (team === "por") {
    setTN("Portland Trail Blazers");
  } else if (team === "sac") {
    setTN("Sacramento Kings");
  } else if (team === "sas") {
    setTN("San Antonio Spurs");
  } else if (team === "tor") {
    setTN("Toronto Raptors");
  } else if (team === "uta") {
    setTN("Utah Jazz");
  } else if (team === "was") {
    setTN("Washington Wizards");
  }
}

export async function fetchData(TEAM: string) {
  // returns an array of objects
  const { data, error } = await supabase.from(TEAM).select("*");
  if (data) {
    return data;
  } else {
    console.log(error);
  }
}

const HTMLParser = require("node-html-parser");
export async function parseJSON(team: String) {
  const response = await fetch(
    `https://www.basketball-reference.com/teams/${team}/2024/gamelog/`
  );
  const text = await response.text();

  const html = HTMLParser.parse(text);
  return html;
}
