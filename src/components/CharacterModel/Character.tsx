import * as THREE from "three";
import { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { useLoader } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Hair: THREE.Group;
    Hair_1: THREE.SkinnedMesh;
    Hair_2: THREE.SkinnedMesh;
    Hair_Cup: THREE.Group;
    Hair_Cup_1: THREE.SkinnedMesh;
    Hair_Cup_2: THREE.SkinnedMesh;
    Cap: THREE.Group;
    Cap_1: THREE.SkinnedMesh;
    Cap_2: THREE.SkinnedMesh;
    Cap_3: THREE.SkinnedMesh;
    Cap_Black: THREE.Group;
    Cap_Black_1: THREE.SkinnedMesh;
    Cap_Black_2: THREE.SkinnedMesh;
    Badge: THREE.Group;
    Badge_1: THREE.SkinnedMesh;
    Badge_2: THREE.SkinnedMesh;
    Cap_Line: THREE.Group;
    Cap_Line_1: THREE.SkinnedMesh;
    Cap_Line_2: THREE.SkinnedMesh;
    Cap_Clasper: THREE.Group;
    Cap_Clasper_1: THREE.SkinnedMesh;
    Cap_Clasper_2: THREE.SkinnedMesh;
    Scope: THREE.Group;
    Scope_1: THREE.SkinnedMesh;
    Scope_2: THREE.SkinnedMesh;
    Scope_3: THREE.SkinnedMesh;
    Skin: THREE.Group;
    Skin_1: THREE.SkinnedMesh;
    Skin_2: THREE.SkinnedMesh;
    Eye: THREE.Group;
    Eye_1: THREE.SkinnedMesh;
    Eye_2: THREE.SkinnedMesh;
    Eyelash: THREE.SkinnedMesh;
    Coat: THREE.Group;
    Coat_1: THREE.SkinnedMesh;
    Coat_2: THREE.SkinnedMesh;
    Coat_Collar: THREE.Group;
    Coat_Collar_1: THREE.SkinnedMesh;
    Coat_Collar_2: THREE.SkinnedMesh;
    Shirt_Collar: THREE.Group;
    Shirt_Collar_1: THREE.SkinnedMesh;
    Shirt_Collar_2: THREE.SkinnedMesh;
    Tie: THREE.Group;
    Tie_1: THREE.SkinnedMesh;
    Tie_2: THREE.SkinnedMesh;
    Clasper: THREE.Group;
    Clasper_1: THREE.SkinnedMesh;
    Clasper_2: THREE.SkinnedMesh;
    Belt: THREE.Group;
    Belt_1: THREE.SkinnedMesh;
    Belt_2: THREE.SkinnedMesh;
    Belt_Buckle: THREE.Group;
    Belt_Buckle_1: THREE.SkinnedMesh;
    Belt_Buckle_2: THREE.SkinnedMesh;
    Pants: THREE.Group;
    Pants_1: THREE.SkinnedMesh;
    Pants_2: THREE.SkinnedMesh;
    Pants_3: THREE.SkinnedMesh;
    Shoes: THREE.Group;
    Shoes_1: THREE.SkinnedMesh;
    Shoes_2: THREE.SkinnedMesh;
    Shoeslace: THREE.Group;
    Shoeslace_1: THREE.SkinnedMesh;
    Shoeslace_2: THREE.SkinnedMesh;

    MainControl: THREE.Bone;
  };
  materials: {
    Outline_Mat: THREE.MeshStandardMaterial;
    Hair_Mat: THREE.MeshBasicMaterial;
    Hair_Cup_Mat: THREE.MeshBasicMaterial;
    Cap_Blue_Mat: THREE.MeshBasicMaterial;
    Cap_Peak_Mat: THREE.MeshBasicMaterial;
    Cap_Black_Mat: THREE.MeshBasicMaterial;
    Badge_Mat: THREE.MeshBasicMaterial;
    Cap_Line_Mat: THREE.MeshBasicMaterial;
    Cap_Clasper_Mat: THREE.MeshBasicMaterial;
    Scope_Mat: THREE.MeshBasicMaterial;
    Lens_Mat: THREE.MeshBasicMaterial;
    Skin_Mat: THREE.MeshBasicMaterial;
    Eye_Mat: THREE.MeshBasicMaterial;
    Eyelash_Mat: THREE.MeshBasicMaterial;
    Coat_Mat: THREE.MeshBasicMaterial;
    Coat_Collar_Mat: THREE.MeshBasicMaterial;
    Shirt_Collar_Mat: THREE.MeshBasicMaterial;
    Tie_Mat: THREE.MeshBasicMaterial;
    Clasper_Mat: THREE.MeshBasicMaterial;
    Belt_Mat: THREE.MeshBasicMaterial;
    Belt_Buckle_Mat: THREE.MeshBasicMaterial;
    Pant_Blue_Mat: THREE.MeshBasicMaterial;
    Pant_Leg_Mat: THREE.MeshBasicMaterial;
    Shoes_Mat: THREE.MeshBasicMaterial;
    Shoeslace_Mat: THREE.MeshBasicMaterial;
  };
  animations: GLTFAction[];
};

type ActionName =
  | "Walk"
  | "Fast_Run"
  | "Breathing_Idle"
  | "Bboy_Dance"
  | "Clap"
  | "Fall"
  | "Fast_Jump"
  | "Wave_Dance"
  | "Wave_Dance"
  | "Point_Gesture";

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

interface ChProps {
  name: string;
  texture: {
    map: THREE.Texture;
  };
}

export function Character() {
  const group = useRef<THREE.Group>(null!);
  const { nodes, materials, animations } = useGLTF(
    "./Character.gltf"
  ) as GLTFResult;

  return (
    <group dispose={null} position={[0, -0.9, 0]}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.008}>
        <group name="CharacterArmature">
          <primitive object={nodes.MainControl} />
        </group>
        <group>
          <group name="Cap">
            <skinnedMesh
              name="Cap_1"
              geometry={nodes.Cap_1.geometry}
              material={materials.Cap_Blue_Mat}
              skeleton={nodes.Cap_1.skeleton}
            />
            <skinnedMesh
              name="Cap_2"
              geometry={nodes.Cap_2.geometry}
              material={materials.Cap_Peak_Mat}
              skeleton={nodes.Cap_2.skeleton}
            />
            <skinnedMesh
              name="Cap_3"
              geometry={nodes.Cap_3.geometry}
              material={materials.Outline_Mat}
              skeleton={nodes.Cap_3.skeleton}
            />
            <skinnedMesh
              name="Cap_Black_1"
              geometry={nodes.Cap_Black_1.geometry}
              material={materials.Cap_Black_Mat}
              skeleton={nodes.Cap_Black_1.skeleton}
            />
            <skinnedMesh
              name="Cap_Black_2"
              geometry={nodes.Cap_Black_2.geometry}
              material={materials.Outline_Mat}
              skeleton={nodes.Cap_Black_2.skeleton}
            />
            <skinnedMesh
              name="Badge_1"
              geometry={nodes.Badge_1.geometry}
              material={materials.Badge_Mat}
              skeleton={nodes.Badge_1.skeleton}
            />
            <skinnedMesh
              name="Badge_2"
              geometry={nodes.Badge_2.geometry}
              material={materials.Outline_Mat}
              skeleton={nodes.Badge_2.skeleton}
            />
            <skinnedMesh
              name="Cap_Line_1"
              geometry={nodes.Cap_Line_1.geometry}
              material={materials.Cap_Line_Mat}
              skeleton={nodes.Cap_Line_1.skeleton}
            />
            <skinnedMesh
              name="Cap_Line_2"
              geometry={nodes.Cap_Line_2.geometry}
              material={materials.Outline_Mat}
              skeleton={nodes.Cap_Line_2.skeleton}
            />
            <skinnedMesh
              name="Cap_Clasper_1"
              geometry={nodes.Cap_Clasper_1.geometry}
              material={materials.Cap_Clasper_Mat}
              skeleton={nodes.Cap_Clasper_1.skeleton}
            />
            <skinnedMesh
              name="Cap_Clasper_2"
              geometry={nodes.Cap_Clasper_2.geometry}
              material={materials.Outline_Mat}
              skeleton={nodes.Cap_Clasper_2.skeleton}
            />
            <skinnedMesh
              name="Scope_1"
              geometry={nodes.Scope_1.geometry}
              material={materials.Scope_Mat}
              skeleton={nodes.Scope_1.skeleton}
            />
            <skinnedMesh
              name="Scope_2"
              geometry={nodes.Scope_2.geometry}
              material={materials.Lens_Mat}
              skeleton={nodes.Scope_2.skeleton}
            />
            <skinnedMesh
              name="Scope_3"
              geometry={nodes.Scope_3.geometry}
              material={materials.Outline_Mat}
              skeleton={nodes.Scope_3.skeleton}
            />
          </group>
          <group name="Hair">
            <skinnedMesh
              name="Hair_1"
              geometry={nodes.Hair_1.geometry}
              material={materials.Hair_Mat}
              skeleton={nodes.Hair_1.skeleton}
            />
            <skinnedMesh
              name="Hair_2"
              geometry={nodes.Hair_2.geometry}
              material={materials.Outline_Mat}
              skeleton={nodes.Hair_2.skeleton}
            />
            <skinnedMesh
              name="Hair_Cup_1"
              geometry={nodes.Hair_Cup_1.geometry}
              material={materials.Hair_Cup_Mat}
              skeleton={nodes.Hair_Cup_1.skeleton}
            />
            <skinnedMesh
              name="Hair_Cup_2"
              geometry={nodes.Hair_Cup_2.geometry}
              material={materials.Outline_Mat}
              skeleton={nodes.Hair_Cup_2.skeleton}
            />
          </group>
          <group name="Body">
            <skinnedMesh
              name="Skin_1"
              geometry={nodes.Skin_1.geometry}
              material={materials.Skin_Mat}
              skeleton={nodes.Skin_1.skeleton}
            />
            <skinnedMesh
              name="Skin_2"
              geometry={nodes.Skin_2.geometry}
              material={materials.Outline_Mat}
              skeleton={nodes.Skin_2.skeleton}
            />
            <skinnedMesh
              name="Eye_1"
              geometry={nodes.Eye_1.geometry}
              material={materials.Eye_Mat}
              skeleton={nodes.Eye_1.skeleton}
            />
            <skinnedMesh
              name="Eye_2"
              geometry={nodes.Eye_2.geometry}
              material={materials.Outline_Mat}
              skeleton={nodes.Eye_2.skeleton}
            />
            <skinnedMesh
              name="Eyelash"
              geometry={nodes.Eyelash.geometry}
              material={materials.Eyelash_Mat}
              skeleton={nodes.Eyelash.skeleton}
            />
          </group>
          <group name="Shirt">
            <skinnedMesh
              name="Coat_1"
              geometry={nodes.Coat_1.geometry}
              material={materials.Coat_Mat}
              skeleton={nodes.Coat_1.skeleton}
            />
            <skinnedMesh
              name="Coat_2"
              geometry={nodes.Coat_2.geometry}
              material={materials.Outline_Mat}
              skeleton={nodes.Coat_2.skeleton}
            />
            <skinnedMesh
              name="Coat_Collar_1"
              geometry={nodes.Coat_Collar_1.geometry}
              material={materials.Coat_Collar_Mat}
              skeleton={nodes.Coat_Collar_1.skeleton}
            />
            <skinnedMesh
              name="Coat_Collar_2"
              geometry={nodes.Coat_Collar_2.geometry}
              material={materials.Outline_Mat}
              skeleton={nodes.Coat_Collar_2.skeleton}
            />
            <skinnedMesh
              name="Shirt_Collar_1"
              geometry={nodes.Shirt_Collar_1.geometry}
              material={materials.Shirt_Collar_Mat}
              skeleton={nodes.Shirt_Collar_1.skeleton}
            />
            <skinnedMesh
              name="Shirt_Collar_2"
              geometry={nodes.Shirt_Collar_2.geometry}
              material={materials.Outline_Mat}
              skeleton={nodes.Shirt_Collar_2.skeleton}
            />
            <skinnedMesh
              name="Tie_1"
              geometry={nodes.Tie_1.geometry}
              material={materials.Tie_Mat}
              skeleton={nodes.Tie_1.skeleton}
            />
            <skinnedMesh
              name="Tie_2"
              geometry={nodes.Tie_2.geometry}
              material={materials.Outline_Mat}
              skeleton={nodes.Tie_2.skeleton}
            />
            <skinnedMesh
              name="Clasper_1"
              geometry={nodes.Clasper_1.geometry}
              material={materials.Clasper_Mat}
              skeleton={nodes.Clasper_1.skeleton}
            />
            <skinnedMesh
              name="Clasper_2"
              geometry={nodes.Clasper_2.geometry}
              material={materials.Outline_Mat}
              skeleton={nodes.Clasper_2.skeleton}
            />
            <skinnedMesh
              name="Belt_1"
              geometry={nodes.Belt_1.geometry}
              material={materials.Belt_Mat}
              skeleton={nodes.Belt_1.skeleton}
            />
            <skinnedMesh
              name="Belt_2"
              geometry={nodes.Belt_2.geometry}
              material={materials.Outline_Mat}
              skeleton={nodes.Belt_2.skeleton}
            />
            <skinnedMesh
              name="Belt_Buckle_1"
              geometry={nodes.Belt_Buckle_1.geometry}
              material={materials.Belt_Buckle_Mat}
              skeleton={nodes.Belt_Buckle_1.skeleton}
            />
            <skinnedMesh
              name="Belt_Buckle_2"
              geometry={nodes.Belt_Buckle_2.geometry}
              material={materials.Outline_Mat}
              skeleton={nodes.Belt_Buckle_2.skeleton}
            />
          </group>
          <group name="Pants">
            <skinnedMesh
              name="Pants_1"
              geometry={nodes.Pants_1.geometry}
              material={materials.Pant_Blue_Mat}
              skeleton={nodes.Pants_1.skeleton}
            />
            <skinnedMesh
              name="Pants_2"
              geometry={nodes.Pants_2.geometry}
              material={materials.Pant_Leg_Mat}
              skeleton={nodes.Pants_2.skeleton}
            />
            <skinnedMesh
              name="Pants_3"
              geometry={nodes.Pants_3.geometry}
              material={materials.Outline_Mat}
              skeleton={nodes.Pants_3.skeleton}
            />
          </group>
          <group name="Shoes">
            <skinnedMesh
              name="Shoes_1"
              geometry={nodes.Shoes_1.geometry}
              material={materials.Shoes_Mat}
              skeleton={nodes.Shoes_1.skeleton}
            />
            <skinnedMesh
              name="Shoes_2"
              geometry={nodes.Shoes_2.geometry}
              material={materials.Outline_Mat}
              skeleton={nodes.Shoes_2.skeleton}
            />
            <skinnedMesh
              name="Shoeslace_1"
              geometry={nodes.Shoeslace_1.geometry}
              material={materials.Shoeslace_Mat}
              skeleton={nodes.Shoeslace_1.skeleton}
            />
            <skinnedMesh
              name="Shoeslace_2"
              geometry={nodes.Shoeslace_2.geometry}
              material={materials.Outline_Mat}
              skeleton={nodes.Shoeslace_2.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./Character.gltf");
