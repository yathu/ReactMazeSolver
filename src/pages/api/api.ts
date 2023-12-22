import { Console } from "node:console";

//TODO: Moved to ENV
const url =
  "https://europe-west1-swift-doodad-319113.cloudfunctions.net/find_path1";

export interface PayloadData {
  maze: number[][][][];
  start: number[];
  stop: number[];
}

export async function getData(payloadData: PayloadData) {
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(payloadData),
      method: "post",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    throw new Error("Error in API Call");
  }
}
