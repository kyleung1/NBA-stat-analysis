"use client";
import { useEffect, useState } from "react";
import { Analysis, ReturnObj } from "./api/analysis/[teamId]/route";

const TEAMS = [
  "atl",
  "bos",
  "brk",
  "chi",
  "cho",
  "cle",
  "dal",
  "den",
  "det",
  "gsw",
  "hou",
  "ind",
  "lac",
  "lal",
  "mem",
  "mia",
  "mil",
  "min",
  "nop",
  "nyk",
  "okc",
  "orl",
  "phi",
  "pho",
  "por",
  "sac",
  "sas",
  "tor",
  "uta",
  "was",
];

export default function Home() {
  const [team, setTeam] = useState<string>("");
  const [data, setData] = useState<ReturnObj>();
  const [features, setFeatures] = useState<string[]>([]);
  const [teamName, setTN] = useState("");

  useEffect(() => {
    getTeamNameFull();
  }, [team]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch(`/api/analysis/${team}`);
    const DATA: ReturnObj = await res.json();
    const temp = [];
    for (const key in DATA) {
      temp.push(key);
    }
    setData(DATA);
    setFeatures(temp);
    return DATA;
  }

  function getTeamNameFull() {
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

  return (
    <div className="flex flex-col items-center">
      <img
        src="nba.bmp"
        alt="nba logo"
        className="border-2 border-red-600"
      ></img>
      <h1 className="my-5">NBA 2023-24 season Performance Tracker</h1>
      <h2>
        Find the mean, median, and mode statistics of every nba season game of
        your favorite teams!
      </h2>
      <div className="flex flex-wrap justify-center mt-5">
        {TEAMS.map((item, index) => (
          <li
            key={index}
            className="list-none mx-5 hover:underline cursor-pointer hover:text-red-600"
            onClick={() => {
              setTeam(item);
            }}
          >
            {item}
          </li>
        ))}
      </div>
      <form className="my-5" onSubmit={handleSubmit}>
        <input
          placeholder="Enter your NBA team team."
          className="border-2 border-gray"
          onChange={(event) => {
            setTeam(event.target.value);
          }}
        ></input>
        <button type="submit" className="border-2 border-black rounded-md ml-5">
          Submit
        </button>
      </form>
      <h2>{teamName}</h2>
      {features.map((feature, index) => (
        <div key={index} className="w-3/4">
          <div>{feature}</div>

          {data && data[feature as keyof ReturnObj] && (
            <div className="flex justify-around">
              <div>
                <span>Mean: </span>
                <span>{data[feature as keyof ReturnObj]?.mean}</span>
              </div>
              <div>
                <span>Median: </span>
                <span>{data[feature as keyof ReturnObj]?.median}</span>
              </div>
              <div>
                <span>Mode: </span>
                <span>{data[feature as keyof ReturnObj]?.mode}</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
