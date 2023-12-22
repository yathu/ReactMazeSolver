import React from "react";
import { Box } from "./Box";
import { MazePath } from "..";

interface GridProps {
  data: number[][][];
  mazePath: MazePath | null;
}
export const RenderGrids: React.FC<GridProps> = ({ data, mazePath }) => {
  return (
    <>
      {data.map((itemData, index) =>
        itemData.map((innerData, i) => {
          const isPath = mazePath?.path?.some(
            (item) => JSON.stringify(item) === JSON.stringify(innerData)
          );

          return (
            <Box
              isPath={isPath}
              key={innerData.toString()}
              position={innerData}
            />
          );
        })
      )}
    </>
  );
};
