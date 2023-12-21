import React, { useEffect, useRef, useState } from "react";
import { Canvas, MeshProps, useFrame } from "@react-three/fiber";
import {
  Mask,
  OrbitControls,
  RoundedBox,
  Text,
  Text3D,
} from "@react-three/drei";
import {
  RoundedBoxGeometry,
  TextBufferGeometry,
  TextGeometry,
} from "three/examples/jsm/Addons.js";
import THREE, {
  CanvasTexture,
  Color,
  Mesh,
  MeshStandardMaterial,
  Texture,
} from "three";

function Box(props: MeshProps) {
  const mesh = useRef<Mesh>(null!);
  // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  const color = new Color(0xffffff);
  color.setHex(Math.random() * 0xffffff);

  return (
    <mesh {...props} ref={mesh}>
      <boxGeometry args={[0.75, 0.75, 0.75]} />

      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  );
}

interface PositionType {
  x: number;
  y: number;
  z: number;
}

export default function Home() {
  const [matrixArray, setMatrixArray] = useState<PositionType[]>([]);

  useEffect(() => {
    genMatrix();
  }, []);

  const genMatrix = () => {
    const x = 3;
    const y = 3;
    const z = 3;

    let positionsArray: PositionType[] = [];

    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        for (let k = 0; k < z; k++) {
          console.log("point:", i, j, k);
          positionsArray = [...positionsArray, { x: i, y: j, z: k }];
        }
      }
    }

    setMatrixArray(positionsArray);
  };

  return (
    <div className={`bg-slate-300 w-full h-screen`}>
      <Canvas>
        <OrbitControls />
        <ambientLight />
        <RenderGrids data={matrixArray} />
      </Canvas>
    </div>
  );
}

interface GridProps {
  data: PositionType[];
}

const RenderGrids: React.FC<GridProps> = ({ data }) => {
  return (
    <>
      {data.map(({ x, y, z }, index) => (
        <Box key={index} position={[x, y, z]} />
      ))}
    </>
  );
};
