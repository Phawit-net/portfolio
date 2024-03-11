import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh } from "three";
import { useGLTF, useAnimations, useTexture, Trail } from "@react-three/drei";
import { useControls } from "leva";
import { useGame } from "../../stores/useGame";
import { BallCollider, RapierCollider, vec3 } from "@react-three/rapier";

export default function EcctrlModel() {
  const groupRef = useRef<Group>(null!);
  const { nodes, scene, animations } = useGLTF("/EcctrlCharacter.glb");
  const { actions } = useAnimations(animations, groupRef);

  const gradientMapTexture = useTexture("./textures/3.jpg");
  gradientMapTexture.minFilter = THREE.NearestFilter;
  gradientMapTexture.magFilter = THREE.NearestFilter;
  gradientMapTexture.generateMipmaps = false;

  // hand Ref for attack action
  const rightHandRef = useRef<THREE.Mesh>(null!);
  const rightHandColliderRef = useRef<RapierCollider>(null!);
  const leftHandRef = useRef<THREE.Mesh>(null!);
  const leftHandColliderRef = useRef<RapierCollider>(null!);
  const rightHandPos = useMemo(() => new THREE.Vector3(), []);
  const leftHandPos = useMemo(() => new THREE.Vector3(), []);
  const bodyPos = useMemo(() => new THREE.Vector3(), []);
  const bodyRot = useMemo(() => new THREE.Quaternion(), []);
  let rightHand: THREE.Object3D;
  let leftHand: THREE.Object3D;
  let mugModel: THREE.Object3D;

  // GUI โดย lib leva จาก R3F เจ้าเดียวกัน
  const { mainColor, outlineColor, trailColor } = useControls(
    "Character Model",
    {
      mainColor: "mediumslateblue",
      outlineColor: "black",
      trailColor: "violet",
    }
  );

  // เกี่ยวกับมือขวาที่ถือแก้ mug
  useEffect(() => {
    groupRef.current.traverse((obj) => {
      // Prepare both hands bone object
      if (obj instanceof THREE.Bone) {
        if (obj.name === "handSlotRight") rightHand = obj;
        if (obj.name === "handSlotLeft") leftHand = obj;
      }
      // Prepare mug model for cheer action
      if (obj.name === "mug") {
        mugModel = obj;
        mugModel.visible = false;
      }
    });
  });

  // Character Animation Setup
  const curAnimation = useGame(
    (state: { curAnimation: any }) => state.curAnimation
  );
  const resetAnimation = useGame((state: { reset: any }) => state.reset);
  const initializeAnimationSet = useGame(
    (state: { initializeAnimationSet: any }) => state.initializeAnimationSet
  );

  // ชื่อ String เป็น ชื่อ Animation ใน glb เลย
  const animationSet = {
    idle: "Idle",
    walk: "Walk",
    run: "Run",
    jump: "Jump_Start",
    jumpIdle: "Jump_Idle",
    jumpLand: "Jump_Land",
    fall: "Climbing", // This is for falling from high sky
    action1: "Wave",
    action2: "Dance",
    action3: "Cheer",
    action4: "Attack(1h)",
  };

  useEffect(() => {
    // Initialize animation set
    initializeAnimationSet(animationSet);
  }, []);

  // ตรงนี้สำหรับ ACTION4 = ต่อยโดนของ จะทำการเล่น punchEffect (2d effect sprite)
  useFrame(() => {
    // console.log("useFrame");
    if (curAnimation === animationSet.action4) {
      if (rightHand) {
        rightHand.getWorldPosition(rightHandPos);
        groupRef.current.getWorldPosition(bodyPos);
        groupRef.current.getWorldQuaternion(bodyRot);
      }
      // Apply hands position to hand colliders
      if (rightHandColliderRef.current) {
        // check if parent group autobalance is on or off
        if (
          groupRef.current.parent?.quaternion.y === 0 &&
          groupRef.current.parent?.quaternion.w === 1
        ) {
          rightHandRef.current.position
            .copy(rightHandPos)
            .sub(bodyPos)
            .applyQuaternion(bodyRot.conjugate());
        } else {
          rightHandRef.current.position.copy(rightHandPos).sub(bodyPos);
        }
        rightHandColliderRef.current.setTranslationWrtParent(
          rightHandRef.current.position
        );
      }
    }
  });

  // เล่น Animation AUTO
  useEffect(() => {
    // Play animation ตอนนี้ set ให้เป็น idle ขยับมือธรรมดาก่อน
    const action = actions[
      curAnimation ? curAnimation : animationSet.idle
    ] as THREE.AnimationAction;
    // ตอนแรกไม่มี curAnimation เลยเป็นท่า Idle

    // For jump and jump land animation, only play once and clamp when finish
    if (
      curAnimation === animationSet.jump ||
      curAnimation === animationSet.jumpLand ||
      curAnimation === animationSet.action1 ||
      curAnimation === animationSet.action2 ||
      curAnimation === animationSet.action3 ||
      curAnimation === animationSet.action4
    ) {
      action
        .reset()
        .fadeIn(0.2)
        .setLoop(THREE.LoopOnce, undefined as unknown as number)
        .play();
      action.clampWhenFinished = true;
      // Only show mug during cheer action
      if (curAnimation === animationSet.action3) {
        mugModel.visible = true;
      } else {
        mugModel.visible = false;
      }
    } else {
      action.reset().fadeIn(0.2).play();
      mugModel.visible = false;
    }

    // When any action is clamp and finished reset animation
    (action as any)._mixer.addEventListener("finished", () => resetAnimation());

    return () => {
      // Fade out previous action
      action.fadeOut(0.2);

      // Clean up mixer listener, and empty the _listeners array
      (action as any)._mixer.removeEventListener("finished", () =>
        resetAnimation()
      );
      (action as any)._mixer._listeners = [];

      // Move hand collider back to initial position after action
      if (curAnimation === animationSet.action4) {
        if (rightHandColliderRef.current) {
          rightHandColliderRef.current.setTranslationWrtParent(
            vec3({ x: 0, y: 0, z: 0 })
          );
        }
      }
    };
  }, [curAnimation]);

  return (
    <Suspense fallback={<capsuleGeometry args={[0.3, 0.7]} />}>
      {/* Head collider */}
      <BallCollider args={[0.5]} position={[0, 0.45, 0]} />

      {/* Right hand collider มือขวาที่มีถือแก้ว */}
      <mesh ref={rightHandRef} />
      <BallCollider
        args={[0.1]}
        ref={rightHandColliderRef}
        // onCollisionEnter={(e) => {
        //   if (curAnimation === animationSet.action4) {
        //     // Play punch effect
        //     setPunchEffectProp((prev) => ({
        //       ...prev,
        //       visible: true,
        //       play: true,
        //     }));
        //   }
        // }}
      />

      {/* Left hand collider */}
      <mesh ref={leftHandRef} />
      <BallCollider args={[0.1]} ref={leftHandColliderRef} />

      {/* Character model GLB */}
      <group ref={groupRef} dispose={null}>
        <group name="Scene" scale={0.8} position={[0, -0.6, 0]}>
          <group name="KayKit_Animated_Character">
            <Trail
              width={1.5}
              color={trailColor}
              length={3}
              decay={2}
              attenuation={(width) => width}
            >
              <primitive object={scene} />
            </Trail>
          </group>
        </group>
      </group>
    </Suspense>
  );
}
