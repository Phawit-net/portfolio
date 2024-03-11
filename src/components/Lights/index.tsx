import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { DirectionalLight } from "three";

export default function Lights() {
  const directionalLightRef = useRef<DirectionalLight>(null!);
  const roomLightRef = useRef<DirectionalLight>(null!);

  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);
  useHelper(roomLightRef, THREE.DirectionalLightHelper, 1);

  return (
    <>
      <directionalLight
        castShadow
        shadow-normalBias={0.06}
        position={[20, 30, 10]}
        intensity={1}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={50}
        shadow-camera-top={50}
        shadow-camera-right={50}
        shadow-camera-bottom={-50}
        shadow-camera-left={-50}
        name="followLight"
        ref={directionalLightRef}
      />
      <directionalLight
        castShadow
        position={[3.42551, 3.97507, -4.60459]}
        rotation={[-21.295, 34.609, -55.6759]}
        intensity={1}
        name="Light"
        ref={roomLightRef}
      />
      <ambientLight intensity={1} />
    </>
  );
}
