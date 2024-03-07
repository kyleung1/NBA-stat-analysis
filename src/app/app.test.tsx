// unit tests
import Home, { TEAMS } from "./page";
import React from "react";
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

  // mock fetch function
  global.fetch = jest.fn().mockResolvedValue({
    json: () => mockData,
  });

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
    const {} = await render(<Home />);
    const input = screen.getByPlaceholderText("Enter your NBA team team.");
    const submitBtn = screen.getByText("Submit");

    fireEvent.change(input, { target: { value: "bos" } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      const allMean = screen.getAllByTestId("mean");
      const allMedian = screen.getAllByTestId("median");
      const allMode = screen.getAllByTestId("mode");
      expect(fetch).toHaveBeenCalledWith("/api/analysis/bos");
      for (let i = 0; i < allMean.length; i++) {
        const textContent = allMean[i].textContent;
        if (textContent) {
          const mean = parseFloat(textContent);
          expect(mean).toBeGreaterThan(0);
        }
      }
      for (let i = 0; i < allMedian.length; i++) {
        const textContent = allMedian[i].textContent;
        if (textContent) {
          const median = parseFloat(textContent);
          expect(median).toBeGreaterThan(0);
        }
      }
      for (let i = 0; i < allMode.length; i++) {
        const textContent = allMode[i].textContent;
        if (textContent) {
          const mode = parseFloat(textContent);
          expect(mode).toBeGreaterThan(0);
        }
      }
    });
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
