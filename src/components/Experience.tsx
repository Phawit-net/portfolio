import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Group, Mesh } from "three";
import { Perf } from "r3f-perf";

export default function Experience() {
  // เป็นเหมือน function requestAnimation ที่เรียกตัวเองตลอดเวลาไว้ทำ animate
  // จะทำยังไงให้ update cube ได้หละ เพราะมันเป็น hook ต้องใช้ ref
  const boxRef = useRef<Mesh>(null!);
  const groupRef = useRef<Group>(null!);

  // useThree เป็น hook ที่ใช้เข้าถึง state ต่างๆ
  const { camera } = useThree();

  useFrame((state, delta) => {
    // state เป็นข้อมูลของ canvas
    // delta เป็นเวลา 16 millisecond ทำให้ frame rate คงที่

    boxRef.current.rotation.y += delta;
    // groupRef.current.rotation.y += delta;
    // const angle = state.clock.elapsedTime;
    // state.camera.position.x = Math.sin(angle) * 8;
    // state.camera.position.z = Math.cos(angle) * 8;
    // state.camera.lookAt(0, 0, 0);
  });

  return (
    // ใน THREEjs ปกติ จะเขียน assign เพราะมันเป็นแบบ JS แต่ตอนนี้ R3F เป็น JSX จะต้องเขียนเป็นแนว <Tag>
    // พวก geometry เราไม่ต้อง import เข้ามา และมันจะถูก add เข้าไปใน scene ให้อัตโนมัติ

    <>
      {/* // เป็นตัว mornitor performance */}
      <Perf position="top-left" />

      <OrbitControls camera={camera} />
      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />
      <group ref={groupRef}>
        <mesh position={[-2, 2, 0]} castShadow>
          {/* จริงๆเราต้องกำหนดว่ามันเป็นประเภทอะไรด้วย attach='geometry' มันะจเทียบเท่ากับ mesh.geometry = .... */}
          {/* และ property ต่างๆของ object ปกติเราใส่ใน() sphereGeometry(x,y,z) แต่ของ R3F จะต้องอยู่ใน args แบบ array และเรียง param ตาม THREE */}
          {/* และต้องจำไว้ว่าเวลาเราเปลี่ยน parameter ต่างๆ มันไม่ได้ทำการแก้ไข มันทำการลบและสร้างใหม่ทับ ระวังเรื่อง performance ให้ดี */}
          {/* จะทำให้ใหญ่ขึ้นให้ขยาย scale ที่ mesh  */}
          <sphereGeometry />
          {/* ของ material ก็จะเป็น attach='material' จะเท่ากับ mesh.material = .... */}
          {/* ส่วน property ของ material ขอแค่ 1 parameter ที่เป็น obj ดังนั้นเราจะต้อง args={[{color: 'orange'}]} */}
          {/* แต่เราไม่ต้องใส่ให้ยุ่งยาก สามารถใช้ property ใส่ได้เลย ตาม THREE doc แต่ Geometry ไม่ได้นะ!!! */}
          <meshStandardMaterial color="orange" />
          {/* แต่ว่าใน R3F มันใช้ Detech คำจาก Tag อัตโนมัติ เลยไม่ต้องใส่ attach */}
        </mesh>
        {/* scene ถูกวาดขึ้นแต่ละ frame มันรันไว้อยู่แล้ว เราลองทำ ให้ box rotate แบบที่เราไป render ใน requestAnimationFrame */}
        {/* จะต้องใช้ UseFrame(Hook) ของ R3F ซึ่งใช้ได้แค่ภายใน Canvas เท่านั้น เราจึงสร้าง Experience ขึ้นมา*/}
        <mesh
          ref={boxRef}
          castShadow
          rotation-y={Math.PI * 0.25}
          position={[2, 2, 0]}
          scale={1.5}
        >
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </group>
      <mesh position-y={-1.25} receiveShadow>
        <boxGeometry args={[10, 0.5, 10]} />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
