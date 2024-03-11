import {
  // Grid,
  KeyboardControls,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import Lights from "./Lights";
import { Physics, RigidBody } from "@react-three/rapier";
import Ecctrl, { EcctrlAnimation } from "./RigidBody/Ecctrl";
// import RigidObjects from "./Scenes/RigidObjects";
// import { Demon } from "./CharacterModel/Demon";
import Room from "./Scenes/Room";
import { Character } from "./CharacterModel/Character";
import Player from "./Optimize/Player";

export default function CharacterExperience() {
  // ตั้งชื่อและ ใส่ key ที่ใช้ในการควบคุมด้วย
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

  // const animationSet = {
  //   idle: "CharacterArmature|Idle",
  //   walk: "CharacterArmature|Walk",
  //   run: "CharacterArmature|Run",
  //   jump: "CharacterArmature|Jump",
  //   jumpIdle: "CharacterArmature|Jump_Idle",
  //   jumpLand: "CharacterArmature|Jump_Land",
  //   fall: "CharacterArmature|Duck", // This is for falling from high sky
  //   action1: "CharacterArmature|Wave",
  //   action2: "CharacterArmature|Death",
  //   action3: "CharacterArmature|HitReact",
  //   action4: "CharacterArmature|Punch",
  // };

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

  return (
    <>
      <Perf position="top-left" minimal />

      {/* Grid view เหมือในโปรแกรม 3D */}
      {/* <Grid
        args={[300, 300]}
        sectionColor={"lightgray"}
        cellColor={"gray"}
        position={[0, -0.99, 0]}
        userData={{ camExcludeCollision: true }} // this won't be collide by camera ray
      /> */}

      {/* แสง Directional, ambientLight */}
      <Lights />

      {/* Test ด้วย character rig model มี animate หลายท่าใน NLA  */}
      <Physics timeStep="vary">
        {/* <KeyboardControls map={keyboardMap}>
          <Ecctrl
            animated
            followLight
            springK={2}
            dampingC={0.2}
            objectRefPosition={mesh1.current?.position}
          >
            <EcctrlAnimation
              characterURL={"/Demon.glb"}
              animationSet={animationSet}
            >
              <Demon />
            </EcctrlAnimation>
          </Ecctrl>
        </KeyboardControls> */}

        {/* My Character */}
        {/* <Character /> */}

        <Player />

        {/* <KeyboardControls map={keyboardMap}>
          <Ecctrl animated followLight springK={2} dampingC={0.2}>
            <EcctrlAnimation
              characterURL={"/Character.gltf"}
              animationSet={AnimationSet}
            >
              <Character />
            </EcctrlAnimation>
          </Ecctrl>
        </KeyboardControls> */}

        <Room />
        {/* Rigid body objects */}
        {/* <RigidObjects /> */}
      </Physics>
    </>
  );
}
