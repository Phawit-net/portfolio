import {
  Physics,
  RigidBody,
  CuboidCollider,
  CylinderCollider,
  RapierRigidBody,
  InstancedRigidBodies,
  type InstancedRigidBodyProps,
} from "@react-three/rapier";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { InstancedMesh } from "three";

export default function PhysicExperience() {
  const [hitSound] = useState(() => new Audio("./hit.mp3"));
  const hamburger = useGLTF("./hamburger.glb");
  const rigidBodyRef = useRef<RapierRigidBody>(null!);
  const rigidBodyMetalRef = useRef<RapierRigidBody>(null!);
  const twister = useRef<RapierRigidBody>(null!);
  const cubeInstanceRef = useRef<InstancedMesh>(null!);

  const { camera } = useThree();

  // ถ้าต้องการ update object position/ rotation มีอยู่ 2 วิธี
  // 1 คือ ต้องเคลื่อนมัน 1 ครั้ง --> next lesson
  // 2 คือ ถ้าต้องการเคลื่อนมันตลอดเวลา fix same speed --> ใช้ type เป็น kinematic
  // มี 2 type คือ kinematicPosition และ kinematicVelocity มีความต่างกันตรง ทำอย่างไรที่จะ update มัน
  // kinematicPosition เราต้องหา next position และมันจะ update ความเร็วของ object ให้
  // kinematicVelocity เราต้องหา ความเร็วโดยตรง

  const cubeCount = 50;
  // useEffect(() => {
  //   // Matrix4 จะประกอบด้วย position, rotation, scale ของ object มันเหมือนเป็น information ของ InstanceMesh
  //   // การทำแบบนี้มันจะ เป็นการวาดครั้งเดียว แต่ได้ Mesh มาทั้งหมดตามจำนวนที่ระบุไป check ได้จาก จำนวนGeometries(นับMeshที่ import มาด้วย + <Physic>)
  //   // เรียวกว่า one draw call เราจะเพิ่มเป็น 100 ก็ยังใช้ performance น้อย
  //   for (let i = 0; i < cubeCount; i++) {
  //     const matrix = new THREE.Matrix4();
  //     // ใช้ method compose เราใส่ position(Vector3), rotation(quaternion), scale(Vector3) มันจะแปลงเป็น Matrix4 ให้
  //     matrix.compose(
  //       new THREE.Vector3(i * 2, 0, 0),
  //       new THREE.Quaternion(),
  //       new THREE.Vector3(1, 1, 1)
  //     );
  //     cubeInstanceRef.current.setMatrixAt(i, matrix);
  //   }
  // }, []);
  const instances = useMemo(() => {
    const instances: InstancedRigidBodyProps[] = [];
    for (let i = 0; i < cubeCount; i++) {
      instances.push({
        key: "instance_" + i,
        position: [
          (Math.random() - 0.5) * 8,
          6 + i * 0.2,
          (Math.random() - 0.5) * 8,
        ],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
      });
    }
    return instances;
  }, []);

  useFrame((state) => {
    // ทำการ update rotation/position แต่ละ frame จึงใช้ useFrame แต่ปกติเราจะ ref กับ Mesh โดยตรง
    // แต่ นี่เป็น rigidBody ต้องทำดังนี้ โดนการ access setKinematicTranslation/ setKinematicRotation
    // ต้อง animate แบบ time base จึงใช้ clock
    const time = state.clock.getElapsedTime();
    // setKinematicRotation ต้องการ Quaternion ไม่ใช้ Euler

    // 1 สร้าง Euler โดยใช้ time
    const eulerRotation = new THREE.Euler(0, time * 3, 0);
    // 2 สร้าง Quaternion
    const quaternionRotation = new THREE.Quaternion();
    // 3 แปลงเป็น Quaternion
    quaternionRotation.setFromEuler(eulerRotation);
    // 4 set เข้าไปที่ NextKinematic เพื่อหาตำแหน่งถัดไป
    twister.current.setNextKinematicRotation(quaternionRotation);

    const angle = time * 0.5;
    const x = Math.cos(angle);
    const z = Math.sin(angle);
    twister.current.setNextKinematicTranslation({ x: x, y: -0.8, z: z });
  });

  const collisionEnter = () => {
    console.log("HIT!");
    hitSound.currentTime = 0;
    hitSound.volume = 1;
    hitSound.play();
  };

  const boxJump = () => {
    // จะทำให้กล่องกระโดดได้มีอยู่ 2 ตัวเลือกคือ addForce, applyImpulse เช็คดูได้ใน doc Method RigidBody
    // addForce = ใช้ในการสร้างแรง คล้ายกับลม โดนมีระเวลายาวนาน
    // applyImpulse = ใช้ในการสร้างแรงส่งระยะสั้นมากๆ เหมือน projectile
    // console.log(rigidBodyRef.current);
    rigidBodyRef.current.applyImpulse({ x: 0, y: 5, z: 0 }, false);
    rigidBodyRef.current.applyTorqueImpulse({ x: 0, y: 1, z: 0 }, false);
  };

  const meatalBoxJump = () => {
    // ต้องเอามาคูณ mass ด้วยถึงจะได้ค่าเท่ากับ mass default
    const mass = rigidBodyMetalRef.current.mass();
    rigidBodyMetalRef.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 }, false);
    rigidBodyMetalRef.current.applyTorqueImpulse(
      { x: 0, y: 1 * mass, z: 0 },
      false
    );
  };

  // object ที่อยู่ใน <Physics> เท่านั้นทื่จะได้รับผลกระทบทาง physic
  // RigidBody เราต้องจะระบุ object ที่จะได้รับผลกระทบด้วยการใช้ RigidBody : มีแรงโน้มถ่วง
  // เราจะไม่ update physic ทุกๆ frame
  // Collider คือรูปร่างที่ตกแต่ง RigidBody จะเห็นว่าตอรแรก sphere มี ridigbody เป็น box | default เป็น Cuboid shape
  // จะเปลี่ยนรูปร่างยังไง? = property collider ที่ rigidBody ball,cuboid,hull,trimesh
  // Custom collider ยังไง = โดยการ import Collider รูปแบบต่างๆเข้ามาวางได้เลย
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls camera={camera} />
      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      {/* gravity = -9.81 | restitution แรงต้านกระทบ ปกติ=0 ไม่เด้ง ใช้ในการทำ bouncing | friction แรงเสียดทาน default = 0.7 ถ้า 0 น่าจะลื่น*/}
      {/* mass มวล mass of rigibody ถูกคำนวณอัตโนมัติจากผลรวมของมวลของ collider และ mass of collider คำนวณจากผลรวมของรูปร่างและปริมาตรของวัตถุ */}
      {/* พูดในอีกแง่นึงคือ ยิ่งวัตถุขนาดใหญ่กว่า มวลของวัตถุจะมีมากกว่า ในทางตรงกันข้ามมวลจะไม่เปลี่ยนความเร็วของวัตถุที่ตกลงมา*/}
      <Physics debug gravity={[0, -9.81, 0]}>
        <RigidBody colliders="ball" restitution={1}>
          <mesh position={[-2, 2, 0]} castShadow>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>
        {/* RigidBody จะสร้าง Collider ตามแต่ละ mesh ของมันเอง */}
        {/* ถ้ามี 2 mesh ใน 1 RigidBody มันก็จะเปรีบยว่ามี 1 RigidBody ตามทั้ง 2 shape */}
        {/* gravityScale คือตัวคูณใช้เพื่อปรับให้เจาะจงแต่ละ Object */}
        <RigidBody
          ref={rigidBodyRef}
          gravityScale={1}
          restitution={0}
          friction={0.7}
          onSleep={() => console.log("Sleep")}
          onWake={() => console.log("Wake")}
        >
          <mesh
            castShadow
            // rotation={[10, 3, 8]}
            position={[1, 2, 0]}
            // scale={1.5}
            onClick={boxJump}
          >
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
          {/* <mesh ref={boxRef} castShadow position={[2, 2, 3]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="pink" />
          </mesh> */}
        </RigidBody>
        {/* จะเปลี่ยนแปลงมวลได้ยังไง เช่น เราไม่อยากให้มวลของ กล่องเหล็กเท่ากับ กล่องลัง */}
        {/* ถึงมวลจะมากขึ้น ก็ไม่ได้ทำให้ตกเร็วกว่า object อื่น */}
        {/* เมื่อเราเพิ่มมวลของวัตถุแล้ว เวลากดให้กระโดดมันจะหนักขึ้น กระโดดได้สูงลง */}
        <RigidBody
          ref={rigidBodyMetalRef}
          position={[2.5, 2, 0]}
          gravityScale={1}
          restitution={0}
          friction={0.7}
          colliders={false}
        >
          <mesh castShadow onClick={meatalBoxJump}>
            <boxGeometry />
            <meshStandardMaterial color={"#68eda5"} />
          </mesh>
          <CuboidCollider mass={2} args={[0.5, 0.5, 0.5]} />
        </RigidBody>
        {/* ทดลองให้เป็น kinematic type เพื่อให้กล่องหมุนตลอดเวลาด้วย ความเร็วคงที่ตาม Time */}
        <RigidBody
          ref={twister}
          position={[0, -0.8, 0]}
          friction={0}
          type="kinematicPosition"
          onCollisionEnter={collisionEnter}
          onCollisionExit={() => console.log("Exit")}
        >
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color={"#ed68af"} />
          </mesh>
        </RigidBody>
        {/* <RigidBody colliders={false} position={[0, 1, 0]}>
          <mesh castShadow>
            <torusGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
          <CuboidCollider args={[0.5, 0.5, 1]} />
        </RigidBody> */}
        {/* การใช้ friction ถ้าใส่พื้นให้มีค่า 0 จะไม่มีแรงเสียทานเลยทำให้เคลื่อนที่ infinity */}
        <RigidBody type="fixed" friction={1.5}>
          <mesh position-y={-1.25} receiveShadow>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
        {/* object แบบ import GLTF เข้ามาโดยใช้ useGLTF() */}
        {/* ใช้ collider shape แบบ ทรงกระบอกแทนการ auto collider */}
        <RigidBody position={[0, 4, 0]} colliders={false}>
          <CylinderCollider args={[0.5, 1.2]} />
          <primitive object={hamburger.scene} scale={0.25} />
        </RigidBody>
        {/* Wall */}
        <RigidBody type="fixed">
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.5]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]} />
        </RigidBody>
        {/* Instance ต้องการ 3 argument = geometry, material, number of instance*/}
        {/* และเราต้องจัดหาร matrix4 ให้ instance ด้วย ไม่งั้นจะไม่ทำงาน ใช้ Ref */}
        {/* ทำการ Wrap ด้วย InstanceRigidBodiesc และต้องส่ง matrices ไปให้ instanceMesh */}
        {/* เราจะไม่ใช้ UseEffect ละ ให้ลบ ref ออกด้วย */}
        {/* เราจะทำการสร้าง Array และใส่ Object เข้าไปเก็บในแต่ละ instance ที่เราต้องการ และเราจะทำแค่ครั้งเดียวและเก็บค่าไว้เมื่อตอน component re-render */}
        {/* ใช้ useMemo */}
        <InstancedRigidBodies instances={instances}>
          <instancedMesh
            castShadow
            // ref={cubeInstanceRef}
            args={[undefined, undefined, cubeCount]}
          >
            <boxGeometry />
            <meshStandardMaterial color="#e0d277" />
          </instancedMesh>
        </InstancedRigidBodies>
      </Physics>
    </>
  );
}

// STEP 1 : Add Physics สร้างขอบเขตของการคำนวณ Physic
// STEP 2 : Add RigidBody เป็นตัวบอกว่า Object ไหนจะถูกกระทำการทาง Physic ได้บ้าง โดยมีแบบ  Fixed, Dynamic, Kinematic
// STEP 3 : ปรับแต่ง Collider คือขอบเขต Bounding Box ในการคำนวณการชน โดน จะมี default เป็น cuboid สีเหลี่ยม
//          สามารถ import ประเภทต่างๆมาใช้ได้ หรือใช้ property auto ของ RigidBody มี ball, cuboid, hull, trimesh
// STEP 4 : ปรับแต่งแรงต่างๆของ Physic, RigidBody เช่น Gravity, Restitution(Bouncing), Friction(แรงเสียดทาน), Mass(มวลวัตถุ)
// STEP 5 : ทำการ Update Position/Rotation ของ RigidBody ให้ animate โดยที่มีความเร็วเท่าเดิม ใช้ทำพวกจลนศาสตร์
// STEP 6 : Event ของ RigidBody ใช้กำหนด event ต่างๆเหมือนกับ onClick ของ Mesh
//          1. onCollisionEvent เมื่อ RigidBody hit something
//          2. onCollisionExit เมื่อ RigidBody แยกออกจาก object ที่มันพึ่งจะชน
//          3. onSleep เมื่อ RigidBody เริ่ม sleep เมื่อเวลาผ่านไป rapier จะ sleep object ที่ไม่ถูกกระทำ เพื่อจัดการ performance เราจะทำการ onClick
//             กล่องไม่ได้ แล้วจะทำยังไงดี ?
//          4. onWake เมื่อ RigidBody หยุกการ sleep
// STEP 7 : ทำการ load model glb/gltf โดยใช้ <primitive> object property คลุมด้วย RigidBody ได้ด้วย
// STEP 8 : สร้าง Wall โดยใช้แค่ Collider ที่ import เข้ามาไม่ต้องมี Mesh
// STEP 9 : Instance Mesh ถ้าเราต้องการทำ instance เยอะๆ เราจะต้องลอง Test performance ของ Rapier ก่อน
