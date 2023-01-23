import { useRef } from "react";
import * as THREE from "three";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { Center, shaderMaterial, Plane } from "@react-three/drei";
import { vertexShader, fragmentShader } from "./Shader";

const NoiseMaterial = shaderMaterial(
  {
    scale: 0.3,
    size: 0.04,
    density: 7.0,
    time: 0.1,
    bg: new THREE.Color("#EDEDED"),
    yellow: new THREE.Color("#ffffff"),
    orange: new THREE.Color("#EDEDED"),
  },
  vertexShader,
  fragmentShader
);

extend({ NoiseMaterial });

function Data() {
  const material = useRef();

  useFrame(({ clock }) => {
    material.current.uniforms.time.value = Math.cos(
      (2 * Math.PI * clock.getElapsedTime()) / 40
    );
  });

  return (
    <Plane args={[10, 10]}>
      <noiseMaterial ref={material} side={THREE.DoubleSide} />
    </Plane>
  );
}

export default function Smoke() {
  return (
    <Canvas
      dpr={window.devicePixelRatio}
      camera={{ position: new THREE.Vector3(0, 0, 1) }}
      style={{ position: "absolute", width: "100%", height: "100%" }}
      className="smoke"
    >
      <Center>
        <Data />
      </Center>
    </Canvas>
  );
}
