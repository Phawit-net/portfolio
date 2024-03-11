import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useGLTF, Text, Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { easing, geometry } from "maath";
import { extend, useFrame, useThree } from "@react-three/fiber";
import "./Room.css";
import useDistance from "../../stores/useDistance";
import type { GLTF } from "three-stdlib";

extend(geometry);

type GLTFResult = GLTF & {
  nodes: {
    Bed_Big: THREE.Group;
    Bed_Big_1: THREE.Mesh;
    Bed_Big_2: THREE.Mesh;
    Bed_Big_Chester: THREE.Group;
    Bed_Big_Chester_1: THREE.Mesh;
    Bed_Big_Chester_2: THREE.Mesh;
    Bed_Body: THREE.Group;
    Bed_Body_1: THREE.Mesh;
    Bed_Body_2: THREE.Mesh;
    Bed_Mattress: THREE.Mesh;
    Bed_Small: THREE.Group;
    Bed_Small_1: THREE.Mesh;
    Bed_Small_2: THREE.Mesh;
    Bed_Small_Chester: THREE.Group;
    Bed_Small_Chester_1: THREE.Mesh;
    Bed_Small_Chester_2: THREE.Mesh;
    Pillow: THREE.Mesh;

    Chester_Big: THREE.Group;
    Chester_Big_1: THREE.Mesh;
    Chester_Big_2: THREE.Mesh;
    Bottle: THREE.Mesh;
    Bottle_Liquid: THREE.Mesh;
    Chester_Pillow: THREE.Group;
    Chester_Pillow_1: THREE.Mesh;
    Chester_Pillow_2: THREE.Mesh;
    Chester_Under: THREE.Group;
    Chester_Under_1: THREE.Mesh;
    Chester_Under_2: THREE.Mesh;
    Chester_Leg: THREE.Group;
    Chester_Leg_1: THREE.Mesh;
    Chester_Leg_2: THREE.Mesh;
    Desk: THREE.Group;
    Desk_1: THREE.Mesh;
    Desk_2: THREE.Mesh;
    Desk_Drawer: THREE.Group;
    Desk_Drawer_1: THREE.Mesh;
    Desk_Drawer_2: THREE.Mesh;
    Balcony_Pole: THREE.Group;
    Balcony_Pole_1: THREE.Mesh;
    Balcony_Pole_2: THREE.Mesh;
    Balcony_Wood: THREE.Group;
    Balcony_Wood_1: THREE.Mesh;
    Balcony_Wood_2: THREE.Mesh;
    Wooden_Floor_Upper: THREE.Group;
    Wooden_Floor_Upper_1: THREE.Mesh;
    Wooden_Floor_Upper_2: THREE.Mesh;
    Wooden_Floor_Lower: THREE.Group;
    Wooden_Floor_Lower_1: THREE.Mesh;
    Wooden_Floor_Lower_2: THREE.Mesh;
    Step_Lower: THREE.Group;
    Step_Lower_1: THREE.Mesh;
    Step_Lower_2: THREE.Mesh;
    Stair_Lower: THREE.Group;
    Stair_Lower_1: THREE.Mesh;
    Stair_Lower_2: THREE.Mesh;
    Stair_Lower_3: THREE.Mesh;
    Wall_Lower: THREE.Group;
    Wall_Lower_1: THREE.Mesh;
    Wall_Lower_2: THREE.Mesh;
    Wall_Upper: THREE.Mesh;
  };
  materials: {
    Grey_Outline_Mat: THREE.MeshStandardMaterial;
    White_Outline_Mat: THREE.MeshStandardMaterial;
    Floor_Outline_Mat: THREE.MeshStandardMaterial;
    Bed_Big_Mat: THREE.MeshBasicMaterial;
    Bed_Big_Chester_Mat: THREE.MeshBasicMaterial;
    Bed_Body_Mat: THREE.MeshBasicMaterial;
    Bed_Small_Mat: THREE.MeshBasicMaterial;
    Bed_Small_Chester_Mat: THREE.MeshBasicMaterial;
    Chester_Big_Mat: THREE.MeshBasicMaterial;
    Chester_Pillow_Mat: THREE.MeshBasicMaterial;
    Chester_Under_Mat: THREE.MeshBasicMaterial;
    Chester_Leg_Mat: THREE.MeshBasicMaterial;
    Balcony_Pole_Mat: THREE.MeshBasicMaterial;
    Balcony_Wood_Mat: THREE.MeshBasicMaterial;
    Desk_Mat: THREE.MeshBasicMaterial;
    Desk_Drawer_Mat: THREE.MeshBasicMaterial;
    Floor_Lower_Mat: THREE.MeshBasicMaterial;
    Floor_Upper_Mat: THREE.MeshBasicMaterial;
    Step_Lower_Mat: THREE.MeshBasicMaterial;
    Wall_Stair_Lower_Mat: THREE.MeshBasicMaterial;
    Wood_Stair_Lower_Mat: THREE.MeshBasicMaterial;
    Wall_Lower_Mat: THREE.MeshBasicMaterial;
    Wall_Upper_Mat: THREE.MeshBasicMaterial;
  };
};

export default function Slopes() {
  // Load models
  const room = useGLTF("./room.glb");
  const { nodes, materials, animations } = useGLTF("./room.glb") as GLTFResult;

  const { count, increment, decrement } = useDistance();

  useEffect(() => {
    // Receive Shadows
    room.scene.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        child.receiveShadow = true;
      }
    });
  }, []);

  return (
    <group>
      <group name="Root" position={[0, -5, 0]} rotation={[0, 0, 0]}>
        {/* Bed */}
        <group name="Bed">
          <RigidBody type="fixed" colliders={false}>
            <CuboidCollider
              name="Bed_body_Collider1"
              args={[1.13342, 0.136383, 1.41682]}
              position={[2.27283, 0.297368, 3.88327]}
            />
            <CuboidCollider
              name="Bed_body_Collider2"
              args={[1.17989, 0.528895, 0.151656]}
              position={[2.27107, 0.554242, 2.35909]}
            />
            <CuboidCollider
              name="Bed_body_Collider3"
              args={[1.17989, 0.912164, 0.164352]}
              position={[2.27107, 0.939252, 5.39466]}
            />
            <CuboidCollider
              name="Bed_body_Collider4"
              args={[0.550551, 0.122549, 0.351562]}
              position={[2.27107, 0.860084, 4.78149]}
            />
            <CuboidCollider
              name="Bed_body_Collider5"
              args={[0.983052, 0.144864, 1.37282]}
              position={[2.27283, 0.58342, 3.88327]}
            />
          </RigidBody>
          <group
            name="Bed_Big"
            position={nodes.Bed_Big.position}
            rotation={[0, 0, 0]}
          >
            <mesh
              castShadow
              name="Bed_Big_1"
              geometry={nodes.Bed_Big_1.geometry}
              material={materials.Bed_Big_Mat}
            />
            <mesh
              castShadow
              name="Bed_Big_2"
              geometry={nodes.Bed_Big_2.geometry}
              material={materials.Grey_Outline_Mat}
            />
          </group>
          <group
            name="Bed_Big_Chester"
            position={nodes.Bed_Big_Chester.position}
            rotation={[0, 0, 0]}
          >
            <mesh
              castShadow
              name="Bed_Big_Chester_1"
              geometry={nodes.Bed_Big_Chester_1.geometry}
              material={materials.Bed_Big_Chester_Mat}
            />
            <mesh
              castShadow
              name="Bed_Big_Chester_2"
              geometry={nodes.Bed_Big_Chester_2.geometry}
              material={materials.Grey_Outline_Mat}
            />
          </group>
          <group
            name="Bed_Body"
            position={nodes.Bed_Body.position}
            rotation={[0, 0, 0]}
          >
            <mesh
              castShadow
              name="Bed_Body_1"
              geometry={nodes.Bed_Body_1.geometry}
              material={materials.Bed_Body_Mat}
            />
            <mesh
              castShadow
              name="Bed_Body_2"
              geometry={nodes.Bed_Body_2.geometry}
              material={materials.Grey_Outline_Mat}
            />
          </group>
          <group
            name="Bed_Mattress"
            position={nodes.Bed_Mattress.position}
            rotation={[0, 0, 0]}
          >
            {/* <mesh
              castShadow
              name="Bed_Mattress"
              geometry={nodes.Bed_Mattress.geometry}
              material={materials.mattress_mat}
            /> */}
          </group>
          <group
            name="Bed_Small"
            position={nodes.Bed_Small.position}
            rotation={[0, 0, 0]}
          >
            <mesh
              castShadow
              name="Bed_Small_1"
              geometry={nodes.Bed_Small_1.geometry}
              material={materials.Bed_Small_Mat}
            />
            <mesh
              castShadow
              name="Bed_Small_2"
              geometry={nodes.Bed_Small_2.geometry}
              material={materials.Grey_Outline_Mat}
            />
          </group>
          <group
            name="Bed_Small_Chester"
            position={nodes.Bed_Small_Chester.position}
            rotation={[0, 0, 0]}
          >
            <mesh
              castShadow
              name="Bed_Small_Chester_1"
              geometry={nodes.Bed_Small_Chester_1.geometry}
              material={materials.Bed_Small_Chester_Mat}
            />
            <mesh
              castShadow
              name="Bed_Small_Chester_2"
              geometry={nodes.Bed_Small_Chester_2.geometry}
              material={materials.Grey_Outline_Mat}
            />
          </group>
          <group
            name="Pillow"
            position={nodes.Pillow.position}
            rotation={[0, 0, 0]}
          >
            {/* <mesh
              castShadow
              name="Pillow"
              geometry={nodes.Pillow.geometry}
              material={materials.pillow_mat}
            /> */}
          </group>
        </group>
        {/* Sofa */}
        <group name="Sofa">
          <RigidBody type="fixed" colliders={false}>
            <CuboidCollider
              name="Sofa_Collider1"
              args={[0.235198, 0.609909, 0.747864]}
              position={[2.01138, -0.11569, -1.32209]}
            />
            <CuboidCollider
              name="Sofa_Collider2"
              args={[0.235198, 0.609909, 0.747864]}
              position={[4.65036, -0.11569, -1.32209]}
            />
            <CuboidCollider
              name="Sofa_Collider3"
              args={[1.12633, 0.609909, 0.219727]}
              position={[3.32328, -0.11569, -0.76382]}
            />
            <CuboidCollider
              name="Sofa_Collider4"
              args={[1.12633, 0.245244, 0.547299]}
              position={[3.32328, -0.473079, -1.53477]}
            />
          </RigidBody>
          <group
            name="Chester_Big"
            position={nodes.Chester_Big.position}
            rotation={[0, 0, 0]}
          >
            <mesh
              castShadow
              name="Chester_Big_1"
              geometry={nodes.Chester_Big_1.geometry}
              material={materials.Chester_Big_Mat}
            />
            <mesh
              name="Chester_Big_2"
              geometry={nodes.Chester_Big_2.geometry}
              material={materials.Grey_Outline_Mat}
            />
          </group>
          <group
            name="Chester_Pillow"
            position={nodes.Chester_Pillow.position}
            rotation={[0, 0, 0]}
          >
            <mesh
              castShadow
              name="Chester_Big_1"
              geometry={nodes.Chester_Pillow_1.geometry}
              material={materials.Chester_Pillow_Mat}
            />
            <mesh
              name="Chester_Big_2"
              geometry={nodes.Chester_Pillow_2.geometry}
              material={materials.Grey_Outline_Mat}
            />
          </group>
          <group
            name="Chester_Under"
            position={nodes.Chester_Under.position}
            rotation={[0, 0, 0]}
          >
            <mesh
              castShadow
              name="Chester_Under_1"
              geometry={nodes.Chester_Under_1.geometry}
              material={materials.Chester_Under_Mat}
            />
            <mesh
              name="Chester_Under_2"
              geometry={nodes.Chester_Under_2.geometry}
              material={materials.Grey_Outline_Mat}
            />
          </group>
          <group
            name="Chester_Leg"
            position={nodes.Chester_Leg.position}
            rotation={[0, 0, 0]}
          >
            <mesh
              castShadow
              name="Chester_Leg_1"
              geometry={nodes.Chester_Leg_1.geometry}
              material={materials.Chester_Leg_Mat}
            />
            <mesh
              name="Chester_Leg_1"
              geometry={nodes.Chester_Leg_2.geometry}
              material={materials.Grey_Outline_Mat}
            />
          </group>
        </group>
        {/* Desk */}
        <group name="Desk">
          <RigidBody type="fixed" colliders={false}>
            <CuboidCollider
              name="Desk_Collider1"
              args={[1.08034, 0.402937, 0.565435]}
              position={[-2.7554, 0.430132, -0.200306]}
            />
          </RigidBody>
          <group
            name="Desk"
            position={nodes.Desk.position}
            rotation={[0, 0, 0]}
          >
            <mesh
              name="Desk_1"
              geometry={nodes.Desk_1.geometry}
              material={materials.Desk_Mat}
            />
            <mesh
              name="Desk_2"
              geometry={nodes.Desk_2.geometry}
              material={materials.Grey_Outline_Mat}
            />
          </group>
          <group
            name="Desk_Drawer"
            position={nodes.Desk_Drawer.position}
            rotation={[0, 0, 0]}
          >
            <mesh
              name="Desk_Drawer_1"
              geometry={nodes.Desk_Drawer_1.geometry}
              material={materials.Desk_Drawer_Mat}
            />
            <mesh
              name="Desk_Drawer_1"
              geometry={nodes.Desk_Drawer_2.geometry}
              material={materials.Grey_Outline_Mat}
            />
          </group>
        </group>
        {/* Balcony */}
        <group name="Balcony">
          <RigidBody type="fixed" colliders={false}>
            <CuboidCollider
              name="Balcony_Collider1"
              args={[0.069352, 0.435374, 0.412076]}
              position={[0.483436, 0.437079, -2.17501]}
              rotation={[0, Math.PI / 2, 0]}
            />
            <CuboidCollider
              name="Balcony_Collider2"
              args={[0.069352, 0.435374, 0.840382]}
              position={[0.826013, 0.437079, -1.27285]}
            />
            <CuboidCollider
              name="Balcony_Collider3"
              args={[0.069352, 0.435374, 2.46912]}
              position={[3.2283, 0.437079, -0.362227]}
              rotation={[0, Math.PI / 2, 0]}
            />
            <CuboidCollider
              name="Balcony_Collider4"
              args={[0.069352, 0.435374, 0.412076]}
              position={[0.483436, 0.437079, -4.05041]}
              rotation={[0, Math.PI / 2, 0]}
            />
            <CuboidCollider
              name="Balcony_Collider5"
              args={[0.069352, 0.435374, 0.797877]}
              position={[0.826013, 0.437079, -4.90289]}
            />
          </RigidBody>
          <group
            name="Balcony_Pole"
            position={nodes.Balcony_Pole.position}
            rotation={[0, 0, 0]}
          >
            <mesh
              name="Balcony_Pole_1"
              geometry={nodes.Balcony_Pole_1.geometry}
              material={materials.Balcony_Pole_Mat}
            />
            <mesh
              name="Balcony_Pole_2"
              geometry={nodes.Balcony_Pole_2.geometry}
              material={materials.Grey_Outline_Mat}
            />
          </group>
          <group
            name="Balcony_Wood"
            position={nodes.Balcony_Wood.position}
            rotation={[0, 0, 0]}
          >
            <mesh
              name="Balcony_Wood_1"
              geometry={nodes.Balcony_Wood_1.geometry}
              material={materials.Balcony_Wood_Mat}
            />
            <mesh
              name="Balcony_Wood_2"
              geometry={nodes.Balcony_Wood_2.geometry}
              material={materials.Grey_Outline_Mat}
            />
          </group>
        </group>
        {/* Floor */}
        <group name="Floor_all">
          <RigidBody type="fixed" colliders={false}>
            <CuboidCollider
              name="Floor_Upper_Collider1"
              args={[5.7, 0.01, 3.09797]}
              position={[0.000216, 0, 2.59007]}
            />
            <CuboidCollider
              name="Floor_Upper_Collider2"
              args={[2.86411, 0.01, 2.59192]}
              position={[-2.83502, 0, -3.0986]}
            />
            <CuboidCollider
              name="Floor_Upper_Collider3"
              args={[0.453292, 0.01, 0.873487]}
              position={[0.480653, 0, -4.82522]}
            />
            <CuboidCollider
              name="Floor_Upper_Collider4"
              args={[0.453292, 0.01, 0.899888]}
              position={[0.480653, 0, -1.37924]}
            />
            <CuboidCollider
              name="Floor_Upper_Collider4"
              args={[0.453292, 0.01, 0.899888]}
              position={[0.480653, 0, -1.37924]}
            />
            <CuboidCollider
              name="Floor_Lower_Collider1"
              args={[2.37689, 0.01, 2.58588]}
              position={[3.30253, -0.883428, -3.10249]}
            />
            <CuboidCollider
              name="Step_Lower_Collider1"
              args={[0.454012, 0.01, 0.872278]}
              position={[0.941203, -0.45518, -4.8214]}
              rotation={[0, 0, Math.PI / 2]}
            />
            <CuboidCollider
              name="Step_Lower_Collider2"
              args={[0.454012, 0.01, 0.456546]}
              position={[0.483924, -0.45518, -3.94633]}
              rotation={[0, Math.PI / 2, Math.PI / 2]}
            />
            <CuboidCollider
              name="Step_Lower_Collider3"
              args={[0.454012, 0.01, 0.837858]}
              position={[0.031537, -0.45518, -3.11217]}
              rotation={[0, 0, Math.PI / 2]}
            />
            <CuboidCollider
              name="Step_Lower_Collider4"
              args={[0.454012, 0.01, 0.456546]}
              position={[0.483924, -0.45518, -2.27854]}
              rotation={[0, Math.PI / 2, Math.PI / 2]}
            />
            <CuboidCollider
              name="Step_Lower_Collider5"
              args={[0.454012, 0.01, 0.877311]}
              position={[0.941203, -0.45518, -1.40376]}
              rotation={[0, 0, Math.PI / 2]}
            />
            <CuboidCollider
              name="Step_Lower_Collider6"
              args={[0.454012, 0.01, 2.37818]}
              position={[3.31446, -0.45518, -0.53033]}
              rotation={[0, Math.PI / 2, Math.PI / 2]}
            />
          </RigidBody>
          <group
            name="Wooden_Floor_Upper"
            position={nodes.Wooden_Floor_Upper.position}
            rotation={[0, 0, 0]}
          >
            <mesh
              name="Wooden_Floor_Upper_1"
              geometry={nodes.Wooden_Floor_Upper_1.geometry}
              material={materials.Floor_Upper_Mat}
            />
            <mesh
              name="Wooden_Floor_Upper_2"
              geometry={nodes.Wooden_Floor_Upper_2.geometry}
              material={materials.Floor_Outline_Mat}
            />
          </group>
          <group
            name="Wooden_Floor_Lower"
            position={nodes.Wooden_Floor_Lower.position}
            rotation={[0, 0, 0]}
          >
            <mesh
              name="Wooden_Floor_Lower_1"
              geometry={nodes.Wooden_Floor_Lower_1.geometry}
              material={materials.Floor_Lower_Mat}
            />
            <mesh
              name="Wooden_Floor_Lower_2"
              geometry={nodes.Wooden_Floor_Lower_2.geometry}
              material={materials.Floor_Outline_Mat}
            />
          </group>
          <group
            name="Step_Lower"
            position={nodes.Step_Lower.position}
            rotation={[0, 0, 0]}
          >
            <mesh
              name="Step_Lower_1"
              geometry={nodes.Step_Lower_1.geometry}
              material={materials.Step_Lower_Mat}
            />
            <mesh
              name="Step_Lower_2"
              geometry={nodes.Step_Lower_2.geometry}
              material={materials.Grey_Outline_Mat}
            />
          </group>
          <RigidBody type="fixed" colliders="trimesh">
            <group
              name="Stair_Lower"
              position={nodes.Stair_Lower.position}
              rotation={[0, 0, 0]}
            >
              <mesh
                name="Stair_Lower_1"
                geometry={nodes.Stair_Lower_1.geometry}
                material={materials.Wall_Stair_Lower_Mat}
              />
              <mesh
                name="Step_Lower_2"
                geometry={nodes.Stair_Lower_2.geometry}
                material={materials.Wood_Stair_Lower_Mat}
              />
              <mesh
                name="Stair_Lower_3"
                geometry={nodes.Stair_Lower_3.geometry}
                material={materials.White_Outline_Mat}
              />
            </group>
          </RigidBody>
        </group>
        {/* Wall */}
        <group name="Wall">
          <RigidBody type="fixed" colliders={false}>
            <CuboidCollider
              name="Balcony_Collider1"
              args={[6.04684, 0.01, 5.57527]}
              position={[-0.170924, 3.3425, 5.61154]}
              rotation={[Math.PI / 2, 0, 0]}
            />
            <CuboidCollider
              name="Balcony_Collider2"
              args={[6.04684, 0.01, 5.57527]}
              position={[-5.60916, 3.3425, 0.180607]}
              rotation={[Math.PI / 2, 0, Math.PI / 2]}
            />
            <CuboidCollider
              name="Balcony_Collider3"
              args={[6.04684, 0.01, 4.57184]}
              position={[-0.170924, 3.3425, -5.70758]}
              rotation={[Math.PI / 2, 0, 0]}
            />
            <CuboidCollider
              name="Balcony_Collider4"
              args={[6.04684, 0.01, 4.50107]}
              position={[5.69968, 3.3425, 0.180607]}
              rotation={[Math.PI / 2, 0, Math.PI / 2]}
            />
            {/* <CuboidCollider
              name="Balcony_Collider2"
              args={[0.069352, 0.435374, 0.840382]}
              position={[0.826013, 0.437079, -1.27285]}
            />
            <CuboidCollider
              name="Balcony_Collider3"
              args={[0.069352, 0.435374, 2.46912]}
              position={[3.2283, 0.437079, -0.362227]}
              rotation={[0, Math.PI / 2, 0]}
            />
            <CuboidCollider
              name="Balcony_Collider4"
              args={[0.069352, 0.435374, 0.412076]}
              position={[0.483436, 0.437079, -4.05041]}
              rotation={[0, Math.PI / 2, 0]}
            />
            <CuboidCollider
              name="Balcony_Collider5"
              args={[0.069352, 0.435374, 0.797877]}
              position={[0.826013, 0.437079, -4.90289]}
            /> */}
          </RigidBody>
          <group
            name="Wall_Upper"
            position={nodes.Wall_Upper.position}
            rotation={[0, 0, 0]}
          >
            <mesh
              name="Wall_Upper"
              geometry={nodes.Wall_Upper.geometry}
              material={materials.Grey_Outline_Mat}
            />
          </group>
          <group
            name="Wall_Lower"
            position={nodes.Wall_Lower.position}
            rotation={[0, 0, 0]}
          >
            <mesh
              name="Wall_Lower_1"
              geometry={nodes.Wall_Lower_1.geometry}
              material={materials.Wall_Lower_Mat}
            />
            <mesh
              name="Wall_Lower_2"
              geometry={nodes.Wall_Lower_2.geometry}
              material={materials.White_Outline_Mat}
            />
          </group>
        </group>
      </group>
      {/* <Annotation position={[14.44, 0.91, 8.795]} increment={increment}>
        Wardrobe <span style={{ fontSize: "1.5em" }}>🌗</span> {count}
      </Annotation>
      <Annotation position={[12.36, 1.7, 6.5]} increment={increment}>
        Bed <span style={{ fontSize: "1.5em" }}>🌗</span> {count}
      </Annotation> */}
    </group>
  );
}

useGLTF.preload("./room.glb");
