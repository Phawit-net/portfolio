import { KeyboardControls } from "@react-three/drei";
import Ecctrl from "../RigidBody/Ecctrl";
import { EcctrlAnimation } from "../RigidBody/EcctrlAnimation";
import { Character } from "../CharacterModel/Character";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { RapierRigidBody } from "@react-three/rapier";

export default function Player() {
  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
    { name: "action1", keys: ["1"] },
    { name: "action2", keys: ["2"] },
    { name: "action3", keys: ["3"] },
    { name: "action4", keys: ["4"] },
    { name: "action5", keys: ["5"] },
  ];

  const AnimationSet = {
    idle: "Breathing_Idle",
    walk: "Walk",
    run: "Fast_Run",
    jump: "Fast_Jump",
    jumpIdle: "Fast_Jump",
    jumpLand: "Fast_Jump",
    fall: "Fast_Jump",
    action1: "Clap",
    action2: "Point_Gesture",
    action3: "Wave_Gesture",
    action4: "Wave_Dance",
    action5: "Bboy_Dance",
  };

  const ref = useRef<RapierRigidBody>();

  // useFrame(() => {
  //   if (ref.current) {
  //     const position = ref.current.translation();
  //     // console.log(position);

  //     // Reset
  //     if (position.y < -10) {
  //       reset();
  //     }
  //   }
  // });

  // const reset = () => {
  //   ref.current.setTranslation({ x: 0, y: 0, z: 0 }, true);
  //   ref.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
  //   ref.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
  // };

  // useEffect(reset, []);

  return (
    <KeyboardControls map={keyboardMap}>
      <Ecctrl
        ref={ref}
        animated
        followLight
        springK={2}
        dampingC={0.2}
        position={[0, 0, 0]}
      >
        <EcctrlAnimation
          characterURL={"/Character.gltf"}
          animationSet={AnimationSet}
        >
          <Character />
        </EcctrlAnimation>
      </Ecctrl>
    </KeyboardControls>
  );
}
