import React from "react";
import { Box } from "./Box";
import { MazePath } from "..";

interface GridProps {
  data: number[][][][];
  mazePath: MazePath | null;
}
export const RenderGrids: React.FC<GridProps> = ({ data, mazePath }) => {
  return (
    <>
      {data.map((itemData, index) =>
        itemData.map((innerData, i) =>
          innerData.map((finalData) => {
            const isPath = mazePath?.path?.some(
              (item) => JSON.stringify(item) === JSON.stringify(finalData)
            );

            return (
              <Box
                isPath={isPath}
                key={finalData.toString()}
                position={finalData}
              />
            );
          })
        )
      )}
    </>
  );
};
