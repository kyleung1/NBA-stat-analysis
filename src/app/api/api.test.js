describe("Analysis Api", () => {
  test("returns an object with objects of mean, median, and mode", async () => {
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

    global.fetch = jest.fn().mockResolvedValue({
      json: () => mockData,
    });

    const res = await fetch("./analysis/bos");
    const data = await res.json();
    expect(data).toEqual(mockData);
  });
});
