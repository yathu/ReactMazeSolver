import React, { ChangeEvent, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { PayloadData, getData } from "./api/api";
import { RenderGrids } from "./components/RenderGrids";
export interface MazePath {
  path: number[][];
}

export default function Home() {
  const [matrixArray, setMatrixArray] = useState<number[][][]>([]);
  const [dimension, setDimension] = useState<number>(0);
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [errorMsg, setErrorMessage] = useState<string>("");
  const [mazePath, setMazePath] = useState<MazePath | null>(null);

  useEffect(() => {
    genMatrix();
    setMazePath(null);
  }, [dimension]);

  const genMatrix = () => {
    let threeDArray: number[][][] = [];

    for (let i = 0; i < dimension; i++) {
      let xArray: number[][] = [];

      for (let j = 0; j < dimension; j++) {
        const yArray: number[][] = [];

        for (let k = 0; k < dimension; k++) {
          yArray.push([i, j, k]);
        }
        xArray = [...xArray, ...yArray];
      }
      threeDArray.push(xArray);
    }
    setMatrixArray(threeDArray);
  };

  const handleDimensionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(event.target.value);
    setDimension(val);
  };

  const handleStartChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStart(e.target.value);
  };

  const handleEndChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEnd(e.target.value);
  };

  const handleSubmit = async () => {
    setErrorMessage("");

    if (dimension < 2) {
      setErrorMessage("Please enter minmum 2");
      return;
    }

    const startArry = start.split(",").map((item) => parseInt(item, 10));
    const endArry = end.split(",").map((item) => parseInt(item, 10));

    const isStartExists = matrixArray.some((item, index) => {
      const check1 = item.find(
        (data) => JSON.stringify(data) === JSON.stringify(startArry)
      );
      return check1;
    });

    const isEndExists = matrixArray.some((item, index) => {
      const check1 = item.find(
        (data) => JSON.stringify(data) === JSON.stringify(endArry)
      );
      return check1;
    });

    if (!isStartExists) {
      setErrorMessage("Start position is incorrect");
      return;
    }
    if (!isEndExists) {
      setErrorMessage("End position is incorrect");
      return;
    }

    if (isStartExists && isEndExists) {
      const jsonData: PayloadData = {
        maze: matrixArray,
        start: startArry,
        stop: endArry,
      };

      try {
        const res = await getData(jsonData);
        console.log("res==>", res);
        setMazePath(res);
      } catch (error) {
        console.log("API Error", error);
      }
    }
  };

  return (
    <div className={`bg-slate-300 w-full h-screen`}>
      <div className="w-full flex flex-row p-4">
        <form className="max-w-[300px]">
          <input
            className="appearance-none border w-full rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
            id="dimension"
            type="number"
            placeholder="dimension of the Maze"
            onChange={handleDimensionChange}
          />
          <div className="flex mt-3">
            <input
              className="appearance-none border w-full rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mr-3 text-black"
              id="start"
              type="text"
              placeholder="start"
              onChange={handleStartChange}
            />
            <input
              className="appearance-none border w-full rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
              id="end"
              type="text"
              placeholder="end"
              onChange={handleEndChange}
            />
          </div>
          {errorMsg && (
            <div className="bg-red-500 mt-3 py-2 rounded pl-3 text-sm">
              {errorMsg}
            </div>
          )}
          <button
            className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={handleSubmit}>
            Find the path
          </button>
        </form>

        {/* to show API Response  in this block*/}
        {/* <div className="w-max flex-1 bg-gray-600 ml-4"></div> */}
      </div>

      <Canvas>
        <OrbitControls />
        <ambientLight />
        <RenderGrids mazePath={mazePath} data={matrixArray} />
      </Canvas>
    </div>
  );
}
