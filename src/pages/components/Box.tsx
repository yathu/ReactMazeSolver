import React, { useRef } from "react";
import { MeshProps } from "@react-three/fiber";
import { Color, Mesh } from "three";

interface BoxProps extends MeshProps {
  isPath?: boolean;
}
export const Box = (props: BoxProps) => {
  const { isPath } = props;
  const mesh = useRef<Mesh>(null!);
  const color = new Color(isPath ? "green" : "#f04444");
  // color.setHex(Math.random() * 0xffffff); // to random color
  return (
    <mesh {...props} ref={mesh}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />

      <meshStandardMaterial
        // wireframe
        // attach="material"
        color={color}
      />
    </mesh>
  );
};
