import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh } from "three";
import { useGLTF, useAnimations } from "@react-three/drei";

// type GLTFResult = GLTF & {
//   nodes: {
//     Cube: THREE.Mesh;
//   };
// };

export default function SimpleModel() {
  // const { nodes, scene, animations } = useGLTF("/multipleScene.gltf");
  const { nodes, scene, animations } = useGLTF("/skinMesh.gltf");

  const groupRef = useRef<Group>(null!);

  const { actions, names } = useAnimations(animations, groupRef);
  const [hovered, setHovered] = useState(false);

  useEffect(
    () => void (document.body.style.cursor = hovered ? "pointer" : "auto"),
    [hovered]
  );

  // useEffect(() => {
  // console.log("groupRef", groupRef);

  //   actions[names[index]]
  //     ?.reset()
  //     .setLoop(THREE.LoopOnce, 1)
  //     .fadeIn(0.5)
  //     .play();

  //   // mixer.addEventListener("finished", (e) => console.log(e, "finished"));

  //   // actions[names[index]].reset().fadeIn(0.5).play();
  //   // // In the clean-up phase, fade it out
  //   // return () => actions[names[index]].fadeOut(0.5);
  // }, [index, actions, names]);
  const HoverOver = (name: string) => {
    if (names.includes(name)) {
      setHovered(true);
    } else {
      setHovered(false);
    }
  };

  const HoverOut = (name: string) => {
    if (names.includes(name)) {
      setHovered(false);
    } else {
      setHovered(true);
    }
  };

  const ClickAnimate = (name: string) => {
    if (names.includes(name)) {
      const idx = names.indexOf(name);
      actions[names[idx]]
        ?.reset()
        .setLoop(THREE.LoopOnce, 1)
        .fadeIn(0.5)
        .play();
    }
  };

  // if (animations.length) {
  //   mixer = new THREE.AnimationMixer(scene);
  //   // เป็น NLA Animation[0] อันบนสุดใน blender = แท่ง Cylinder
  //   void mixer.clipAction(animations[0]).play();

  //   // เป็น animation ของ Cube
  //   void mixer.clipAction(animations[1]).play();

  //   animations.forEach((clip) => {
  //     const action = mixer.clipAction(clip);
  //     action.setLoop(THREE.LoopOnce, 1);
  //     action.play();
  //   });
  // }

  // useFrame((state, delta) => {
  //   mixer?.update(delta);
  // });

  return (
    <Suspense fallback={<capsuleGeometry args={[0.3, 0.7]} />}>
      <group ref={groupRef} dispose={null}>
        <primitive
          object={scene}
          position={[0, 0, 0]}
          onClick={(e: { object: any }) => {
            console.log(e.object);
            ClickAnimate(e.object.name);
          }}
          onPointerEnter={(e: {
            stopPropagation: () => void;
            object: { name: string };
          }) => {
            e.stopPropagation();
            HoverOver(e.object.name);
          }}
          onPointerLeave={(e: {
            stopPropagation: () => void;
            object: { name: string };
          }) => {
            e.stopPropagation();
            HoverOut(e.object.name);
          }}
        />
      </group>
    </Suspense>
  );
}

// SimpleModel
// ตอนนี้ยังไม่รู้ว่าเราควรจะแยก Scene room, Props ต่างๆกับ Character ไว้แยกไฟล์ไหม ต้องลอง import มาก่อน
// เป็นตัวอย่างในการ Animate Props ต่างๆใน Scene
// Mesh แบบไม่มี Joint ใช้การสร้าง keyframe และ bake ทุก frame มี key animation
// และเอามาต่อกับ Event Click ให้มันขยับ animation เวลาเลือกกด

// Use for
// prop เด้งๆ เล็กๆน้อยๆ ของฉาก แบบ โคมไฟไรงี้ ควัน ปล่องๆ disco light ขยับนิดหน่อย
// ลองแล้วใช้ได้ทั้งที่เป็น skinMesh ที่ animate จาก Joint
