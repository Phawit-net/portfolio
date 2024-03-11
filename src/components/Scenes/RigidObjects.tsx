import { Html, Text } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  CylinderCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import useDistance from "../../stores/useDistance";
import { useFrame, useThree } from "@react-three/fiber";
import { useFollowCam } from "../../hooks/useFollowCam";
import TWEEN from "@tweenjs/tween.js";

// function Annotation({ children, increment, ...props }) {
//   const [zoom, setZoom] = useState(false);
//   const { scene, camera } = useThree();

//   useFrame((state) => {
//     if (zoom == true) {
//       state.camera.position.lerp(new THREE.Vector3(10, 5, 4), 0.03);
//       // console.log("ZOOM1 ", state.camera.position);
//       // state.camera.lookAt(new THREE.Vector3(14.44, 0.91, 8.795));
//     } else if (zoom == false) {
//       // console.log("กด ออก EXIT");
//       state.camera.position.lerp(new THREE.Vector3(0, 0, 0), 0.03);
//       // console.log("ZOOM2 ", state.camera.position);
//       // state.camera.lookAt(0, 0, 0);
//       // console.log("false", zoom);
//     }
//   });

// useEffect(() => {
//   console.log("zoom toogle", zoom);
//   if (zoom == true) {
//     console.log("กด ZOOM", camera.position);
//     camera.position.lerp(new THREE.Vector3(0, 5, 0), 0.03);
//     // console.log("ZOOM1 ", state.camera.position);
//     // state.camera.lookAt(new THREE.Vector3(14.44, 0.91, 8.795));
//   } else if (zoom == false) {
//     console.log("กด ออก EXIT", camera.position);
//     camera.position.lerp(new THREE.Vector3(0, 0, 0), 0.03);
//     // console.log("ZOOM2 ", state.camera.position);
//     // state.camera.lookAt(0, 0, 0);
//     // console.log("false", zoom);
//   }
// }, [zoom]);
//   return (
//     <Html {...props} transform sprite>
//       <div
//         className="annotation"
//         onClick={() => {
//           // increment();
//           setZoom(!zoom);
//         }}
//       >
//         {children}
//       </div>
//     </Html>
//   );
// }

export default function RigidObjects() {
  const mesh1 = useRef(null!);
  const mesh2 = useRef(null!);
  const { count, increment, decrement } = useDistance();

  useEffect(() => {
    if (mesh1 && mesh2) {
      const mesh1Position = mesh1.current.position;
      const mesh2Position = mesh2.current.position;
      const distance = mesh1Position.distanceTo(mesh2Position);
      // console.log(distance);
      if (distance < 2) {
        console.log("CLOSE");
        // mesh2.current.material.color.setHex("#34e8eb");
        mesh2.current.material.color = new THREE.Color(0x34e8eb);
        console.log(mesh2.current.material.color);
      }
    }
  }, [mesh1, mesh2]);

  // [7,0,4]
  // [9.4,-0.09,3.7]
  // [9.84,0.91,4.89]
  // [8.10,2,6.7]
  return (
    <>
      {/* Rigid body boxes */}
      <RigidBody>
        <mesh receiveShadow castShadow position={[8, 1, 5]} ref={mesh1}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
      </RigidBody>
      {/* <Annotation position={[8, 1, 5]} increment={increment}>
        Bed <span style={{ fontSize: "1.5em" }}>🌗</span> {count}
      </Annotation> */}
      <RigidBody>
        <mesh receiveShadow castShadow position={[0, 0, 4]} ref={mesh2}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color={"green"} />
        </mesh>
      </RigidBody>
      <RigidBody position={[15, 0, 0]} colliders={false}>
        <Text
          scale={0.5}
          color="black"
          maxWidth={10}
          textAlign="center"
          position={[0, 1, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        >
          mass: 1
        </Text>
        <CuboidCollider args={[0.5, 0.5, 0.5]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={"lightsteelblue"} />
        </mesh>
      </RigidBody>
      <RigidBody position={[15, 0, -2]} colliders={false}>
        <Text
          scale={0.5}
          color="black"
          maxWidth={10}
          textAlign="center"
          position={[0, 1.5, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        >
          mass: 3.375
        </Text>
        <CuboidCollider args={[1.5 / 2, 1.5 / 2, 1.5 / 2]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial color={"lightsteelblue"} />
        </mesh>
      </RigidBody>
      <RigidBody position={[15, 0, -5]} colliders={false}>
        <Text
          scale={0.5}
          color="black"
          maxWidth={10}
          textAlign="center"
          position={[0, 2, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        >
          mass: 8
        </Text>
        <CuboidCollider args={[1, 1, 1]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color={"lightsteelblue"} />
        </mesh>
      </RigidBody>

      {/* Fun toy */}
      <RigidBody colliders={false} position={[15, 5, -10]}>
        <Text
          scale={0.5}
          color="black"
          maxWidth={10}
          textAlign="center"
          position={[0, 1.5, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        >
          mass: 1.24
        </Text>
        <CylinderCollider args={[0.03, 2.5]} position={[0, 0.25, 0]} />
        <BallCollider args={[0.25]} />
        <mesh receiveShadow castShadow>
          <cylinderGeometry args={[2.5, 0.2, 0.5]} />
          <meshStandardMaterial color={"lightsteelblue"} />
        </mesh>
      </RigidBody>
    </>
  );
}
