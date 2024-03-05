// // need to recreate the client for some reason
// import { createClient } from "@supabase/supabase-js";
// import { Any } from "@tensorflow/tfjs";
// import {
//   LinearRegression,
//   RidgeRegression,
//   Scikit1D,
//   Scikit2D,
// } from "scikitjs";

// const supabaseUrl = "https://wdhrryjkgypzxknnphol.supabase.co";
// const supabaseKey = "";
// // console.log(supabaseKey);
// const supabase = createClient(supabaseUrl, supabaseKey);

// const tf = require("@tensorflow/tfjs");
// const sk = require("scikitjs");
// sk.setBackend(tf);

// const fs = require("fs");

export interface FeatureArrays {
  game_season?: string[];
  game_location?: string[];
  opp_id?: string[];
  game_result?: string[];
  pts?: number[];
  opp_pts?: number[];
  fg?: number[];
  fga?: number[];
  fg_pct?: number[];
  fg3?: number[];
  fg3a?: number[];
  fg3_pct?: number[];
  ft?: number[];
  fta?: number[];
  ft_pct?: number[];
  orb?: number[];
  trb?: number[];
  ast?: number[];
  stl?: number[];
  blk?: number[];
  tov?: number[];
  pf?: number[];
}

// interface GameData {
//   game_season: string;
//   date_game: string;
//   game_location: string;
//   opp_id: string;
//   game_result: string;
//   pts: number;
//   opp_pts: number;
//   fg: number;
//   fga: number;
//   fg_pct: number;
//   fg3: number;
//   fg3a: number;
//   fg3_pct: number;
//   ft: number;
//   fta: number;
//   ft_pct: number;
//   orb: number;
//   trb: number;
//   ast: number;
//   stl: number;
//   blk: number;
//   tov: number;
//   pf: number;
// }

// const TEAMS = [
//   "atl",
//   "bos",
//   "brk",
//   "chi",
//   "cho",
//   "cle",
//   "dal",
//   "den",
//   "det",
//   "gsw",
//   "hou",
//   "ind",
//   "lac",
//   "lal",
//   "mem",
//   "mia",
//   "mil",
//   "min",
//   "nop",
//   "nyk",
//   "okc",
//   "orl",
//   "phi",
//   "pho",
//   "por",
//   "sac",
//   "sas",
//   "tor",
//   "uta",
//   "was",
// ];

// async function fetchData(TEAM: string) {
//   // returns an array of objects
//   const { data, error } = await supabase.from(TEAM).select("*");
//   if (data) {
//     return data;
//   } else {
//     console.log("this from fetchData ");
//     console.log(error);
//   }
// }

// async function main() {
//   let featureArrays: FeatureArrays = {
//     // game_season: [],
//     // game_location: [],
//     // opp_id: [],
//     // game_result: [],
//     pts: [],
//     opp_pts: [],
//     fg: [],
//     fga: [],
//     fg_pct: [],
//     fg3: [],
//     fg3a: [],
//     fg3_pct: [],
//     ft: [],
//     fta: [],
//     ft_pct: [],
//     orb: [],
//     trb: [],
//     ast: [],
//     stl: [],
//     blk: [],
//     tov: [],
//     pf: [],
//   };

//   for (const team of TEAMS) {
//     const data = await fetchData(team);
//     if (data) {
//       for (const game of data) {
//         for (const [key, value] of Object.entries(game)) {
//           if (key in featureArrays) {
//             (featureArrays[key as keyof FeatureArrays] as any[]).push(value);
//           }
//         }
//       }
//     }
//   }

//   // const FEATURES = Object.keys(featureArrays);

//   // for (let i = 0; i < FEATURES.length; i++) {
//   //   const currentFeature = FEATURES[i];
//   //   let X: Scikit2D = []; // 2D Matrix with a single column vector [[1], [2]]
//   //   let y: Scikit1D = [];

//   //   for (
//   //     let j = 0;
//   //     j < featureArrays[currentFeature as keyof FeatureArrays]!.length;
//   //     j++
//   //   ) {
//   //     const tempX: (number | string)[] = [];
//   //     const tempy: (number | string)[] = [];

//   //     for (const feature of FEATURES) {
//   //       if (feature !== currentFeature) {
//   //         tempX.push(featureArrays[feature as keyof FeatureArrays]![j]);
//   //       }
//   //     }

//   //     tempy.push(featureArrays[currentFeature as keyof FeatureArrays]![j]);

//   //     X.push(tempX as any);
//   //     y.push(tempy as any);
//   //   }

//   //   const ridge = new RidgeRegression({ fitIntercept: false, alpha: 0.5 });
//   //   await ridge.fit(X, y);
//   //   await ridge.save("./models/model_" + currentFeature + ".json");
//   // }

//   const features = Object.keys(featureArrays);

//   for (let i = 0; i < features.length; i++) {
//     const currentFeature = features[i];
//     const X = [];
//     const y = [];

//     // Populate X and y with data
//     for (
//       let j = 0;
//       j < featureArrays[currentFeature as keyof FeatureArrays]!.length;
//       j++
//     ) {
//       const sampleX = [];
//       const sampleY = [];

//       // Construct tempX and tempY
//       for (const feature of features) {
//         if (feature !== currentFeature) {
//           sampleX.push(featureArrays[feature as keyof FeatureArrays]![j]);
//         }
//       }

//       sampleY.push(featureArrays[currentFeature as keyof FeatureArrays]![j]);

//       X.push(sampleX);
//       y.push(sampleY);
//     }

//     const ridge = new RidgeRegression({ fitIntercept: false, alpha: 0.5 });
//     await ridge.fit(X as Scikit2D, y as unknown as Scikit1D);
//     // await ridge.save("./models/model_" + currentFeature + ".json"); //can't save
//     const COEFFS = ridge.coef;
//     const INTERCEPTS = ridge.intercept;
//     console.log("model_" + currentFeature);
//     console.log(COEFFS);
//     console.log(INTERCEPTS);
//     if (currentFeature === "pts") {
//       console.log(
//         ridge.predict([
//           [100, 20, 20, 50.0, 20, 20, 40.1, 10, 10, 20.1, 5, 6, 6, 5, 4, 3, 8],
//         ])
//       );
//     }
//   }

//   // console.log(featureArrays);
// }

// main();
