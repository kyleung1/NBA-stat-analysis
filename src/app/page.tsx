"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GameData, ReturnObj } from "./api/types";
import {
  getCurrentGameSeason,
  getTeamNameFull,
  handleSubmit,
} from "@/functions/helpers";

export const TEAMS = [
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
  const [teamName, setTN] = useState<string>("");
  const [games_played, setGP] = useState<number>(0);

  useEffect(() => {
    getTeamNameFull(team, setTN);
  }, [team]);

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
      <form
        className="my-5"
        onSubmit={(event) => {
          handleSubmit(event, team, setData, setFeatures, setGP);
        }}
      >
        <input
          placeholder="Enter your NBA team team."
          className="border-2 border-gray"
          onChange={(event) => {
            setTeam(event.target.value);
          }}
          value={team}
        ></input>
        <button type="submit" className="border-2 border-black rounded-md ml-5">
          Submit
        </button>
      </form>
      <h2 data-testid="teamName">{teamName}</h2>
      {data && (
        <h2>
          Over <span className="games-played">{games_played}</span> games played
          this season.
        </h2>
      )}

      {features.map((feature, index) => (
        <div key={index} className="w-3/4">
          <div>{feature}</div>

          {data && data[feature as keyof ReturnObj] && (
            <div className="flex justify-around">
              <div>
                <span>Mean: </span>
                <span data-testid="mean" className="mean">
                  {data[feature as keyof ReturnObj]?.mean}
                </span>
              </div>
              <div>
                <span>Median: </span>
                <span data-testid="median" className="median">
                  {data[feature as keyof ReturnObj]?.median}
                </span>
              </div>
              <div>
                <span>Mode: </span>
                <span data-testid="mode" className="mode">
                  {data[feature as keyof ReturnObj]?.mode}
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
