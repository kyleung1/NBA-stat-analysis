import { fetchData } from "@/functions/helpers";

describe("Analysis Api", () => {
  const SELECTSPY = jest.fn().mockReturnThis();

  jest.mock("../../lib/supabase", () => ({
    supabase: {
      from: jest.fn().mockReturnValue({
        select: SELECTSPY,
      }),
    },
  }));
  test("fetch data from supabase with correct arguments", async () => {
    const FROMSPY = jest.fn().mockReturnThis();

    // await fetchData("bos");
    // expect(FROMSPY).toHaveBeenCalledWith("bos");
    // expect(SELECTSPY).toHaveBeenCalledWith("*");
    // expect(supabase.from).toHaveBeenCalledWith("TEAM");
    // expect(supabase.from("TEAM").select).toHaveBeenCalledWith("*");
  });
});

describe("Parse Api", () => {
  test("returns an object with objects of mean, median, and mode", async () => {});
});
