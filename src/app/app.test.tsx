// unit tests
import Home, { TEAMS, getCurrentGameSeason, handleSubmit } from "./page";
import React, { FormEvent } from "react";
import {
  fireEvent,
  getAllByTestId,
  getByPlaceholderText,
  getByText,
  render,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/dom";

describe("Home Component", () => {
  const mockData = {
    pts: {
      mean: 120.67241379310344,
      median: 119,
      mode: 117,
    },
    opp_pts: {
      mean: 110.24137931034483,
      median: 110,
      mode: 107,
    },
    fg: {
      mean: 43.46551724137931,
      median: 43,
      mode: 42,
    },
    fga: {
      mean: 89.74137931034483,
      median: 90.5,
      mode: 90,
    },
    fg_pct: {
      mean: 0.48551724137931035,
      median: 0.487,
      mode: 0.506,
    },
    fg3: {
      mean: 16.137931034482758,
      median: 16,
      mode: 17,
    },
    fg3a: {
      mean: 42.258620689655174,
      median: 42,
      mode: 39,
    },
    fg3_pct: {
      mean: 0.38191379310344825,
      median: 0.3715,
      mode: 0.41,
    },
    ft: {
      mean: 17.603448275862068,
      median: 17,
      mode: 15,
    },
    fta: {
      mean: 21.724137931034484,
      median: 20.5,
      mode: 20,
    },
    ft_pct: {
      mean: 0.8078620689655173,
      median: 0.821,
      mode: 0.75,
    },
    orb: {
      mean: 10.551724137931034,
      median: 10.5,
      mode: 11,
    },
    trb: {
      mean: 47.06896551724138,
      median: 46.5,
      mode: 45,
    },
    ast: {
      mean: 26.155172413793103,
      median: 26.5,
      mode: 27,
    },
    stl: {
      mean: 6.4655172413793105,
      median: 6,
      mode: 6,
    },
    blk: {
      mean: 6.568965517241379,
      median: 6,
      mode: 5,
    },
    tov: {
      mean: 11.844827586206897,
      median: 12,
      mode: 11,
    },
    pf: {
      mean: 17,
      median: 17,
      mode: 13,
    },
  };

  interface MockData2 {
    [key: string]: string;
  }

  const mockData2: MockData2 = {
    atl: "Atlanta Hawks",
    bos: "Boston Celtics",
    brk: "Brooklyn Nets",
    chi: "Chicago Bulls",
    cho: "Charlotte Hornets",
    cle: "Cleveland Cavaliers",
    dal: "Dallas Mavericks",
    den: "Denver Nuggets",
    det: "Detroit Pistons",
    gsw: "Golden State Warriors",
    hou: "Houston Rockets",
    ind: "Indiana Pacers",
    lac: "Los Angeles Clippers",
    lal: "Los Angeles Lakers",
    mem: "Memphis Grizzlies",
    mia: "Miami Heat",
    mil: "Milwaukee Bucks",
    min: "Minnesota Timberwolves",
    nop: "New Orleans Pelicans",
    nyk: "New York Knicks",
    okc: "Oklahoma City Thunder",
    orl: "Orlando Magic",
    phi: "Philadelphia 76ers",
    pho: "Phoenix Suns",
    por: "Portland Trail Blazers",
    sac: "Sacramento Kings",
    sas: "San Antonio Spurs",
    tor: "Toronto Raptors",
    uta: "Utah Jazz",
    was: "Washington Wizards",
  };

  test("form submits", async () => {
    // // mock fetch function
    // global.fetch = jest
    //   .fn()
    //   .mockResolvedValueOnce({
    //     json: () => [
    //       {
    //         game_season: 1,
    //         date_game: "2023-10-25",
    //         game_location: "@",
    //         opp_id: "NYK",
    //         game_result: "W",
    //         pts: 108,
    //         opp_pts: 104,
    //         fg: 37,
    //         fga: 77,
    //         fg_pct: 0.481,
    //         fg3: 12,
    //         fg3a: 39,
    //         fg3_pct: 0.308,
    //         ft: 22,
    //         fta: 26,
    //         ft_pct: 0.846,
    //         orb: 7,
    //         trb: 46,
    //         ast: 18,
    //         stl: 6,
    //         blk: 11,
    //         tov: 13,
    //         pf: 22,
    //       },
    //     ],
    //   })
    //   .mockResolvedValueOnce({
    //     json: () => mockData,
    //   });
    // const e = { preventDefault: jest.fn() };
    // const team = "bos";
    // const setData = jest.fn();
    // const setFeatures = jest.fn();
    // const setGP = jest.fn();
    // const {} = await render(<Home />);
    // const input = screen.getByPlaceholderText("Enter your NBA team team.");
    // const submitBtn = screen.getByText("Submit");
    // fireEvent.change(input, { target: { value: team } });
    // fireEvent.click(submitBtn);
    // // const data = await handleSubmit(e, team, setData, setFeatures, setGP);
    // // expect(data).toEqual(mockData);
    // await waitFor(() => {
    //   const allMean = screen.getAllByTestId("mean");
    //   const allMedian = screen.getAllByTestId("median");
    //   const allMode = screen.getAllByTestId("mode");
    //   expect(fetch).toHaveBeenCalledWith("/api/analysis/bos");
    //   for (let i = 0; i < allMean.length; i++) {
    //     const textContent = allMean[i].textContent;
    //     if (textContent) {
    //       const mean = parseFloat(textContent);
    //       expect(mean).toBeGreaterThan(0);
    //     }
    //   }
    //   for (let i = 0; i < allMedian.length; i++) {
    //     const textContent = allMedian[i].textContent;
    //     if (textContent) {
    //       const median = parseFloat(textContent);
    //       expect(median).toBeGreaterThan(0);
    //     }
    //   }
    //   for (let i = 0; i < allMode.length; i++) {
    //     const textContent = allMode[i].textContent;
    //     if (textContent) {
    //       const mode = parseFloat(textContent);
    //       expect(mode).toBeGreaterThan(0);
    //     }
    //   }
    // });
  });

  test("getCurrentGameSeason", async () => {
    // mock fetch function
    global.fetch = jest.fn().mockResolvedValue({
      // mock object
      json: () => [
        {
          game_season: 1,
          date_game: "2023-10-25",
          game_location: "@",
          opp_id: "NYK",
          game_result: "W",
          pts: 108,
          opp_pts: 104,
          fg: 37,
          fga: 77,
          fg_pct: 0.481,
          fg3: 12,
          fg3a: 39,
          fg3_pct: 0.308,
          ft: 22,
          fta: 26,
          ft_pct: 0.846,
          orb: 7,
          trb: 46,
          ast: 18,
          stl: 6,
          blk: 11,
          tov: 13,
          pf: 22,
        },
      ],
    });

    const GAMESPLAYED = await getCurrentGameSeason("bos");
    expect(GAMESPLAYED).toEqual(1);
  });

  test("team id to full name", async () => {
    const {} = await render(<Home />);
    const teamElement = screen.getByTestId("teamName");
    TEAMS.forEach(async (teamid) => {
      const TEAMID = screen.getByText(teamid);
      fireEvent.click(TEAMID);
      await waitFor(() => {
        const REALNAME = mockData2[teamid];
        expect(teamElement).toEqual(REALNAME);
      });
    });
  });
});
